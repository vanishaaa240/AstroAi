/* =========================
   ZODIAC DATA
========================= */

const zodiacData = {

    Aries: {
        symbol: "♈",
        date: "Mar 21 - Apr 19",
        element: "Fire",
        planet: "Mars",
        description: "Aries is often associated with energy, confidence and initiative."
    },

    Taurus: {
        symbol: "♉",
        date: "Apr 20 - May 20",
        element: "Earth",
        planet: "Venus",
        description: "Taurus is often associated with patience, stability and determination."
    },

    Gemini: {
        symbol: "♊",
        date: "May 21 - Jun 20",
        element: "Air",
        planet: "Mercury",
        description: "Gemini is often associated with curiosity, communication and adaptability."
    },

    Cancer: {
        symbol: "♋",
        date: "Jun 21 - Jul 22",
        element: "Water",
        planet: "Moon",
        description: "Cancer is often associated with caring, intuition and sensitivity."
    },

    Leo: {
        symbol: "♌",
        date: "Jul 23 - Aug 22",
        element: "Fire",
        planet: "Sun",
        description: "Leo is often associated with creativity, confidence and warmth."
    },

    Virgo: {
        symbol: "♍",
        date: "Aug 23 - Sep 22",
        element: "Earth",
        planet: "Mercury",
        description: "Virgo is often associated with organization, practicality and attention to detail."
    },

    Libra: {
        symbol: "♎",
        date: "Sep 23 - Oct 22",
        element: "Air",
        planet: "Venus",
        description: "Libra is often associated with balance, cooperation and harmony."
    },

    Scorpio: {
        symbol: "♏",
        date: "Oct 23 - Nov 21",
        element: "Water",
        planet: "Pluto",
        description: "Scorpio is often associated with focus, determination and depth."
    },

    Sagittarius: {
        symbol: "♐",
        date: "Nov 22 - Dec 21",
        element: "Fire",
        planet: "Jupiter",
        description: "Sagittarius is often associated with curiosity, optimism and adventure."
    },

    Capricorn: {
        symbol: "♑",
        date: "Dec 22 - Jan 19",
        element: "Earth",
        planet: "Saturn",
        description: "Capricorn is often associated with discipline, patience and ambition."
    },

    Aquarius: {
        symbol: "♒",
        date: "Jan 20 - Feb 18",
        element: "Air",
        planet: "Uranus",
        description: "Aquarius is often associated with originality, curiosity and independent thinking."
    },

    Pisces: {
        symbol: "♓",
        date: "Feb 19 - Mar 20",
        element: "Water",
        planet: "Neptune",
        description: "Pisces is often associated with imagination, creativity and compassion."
    }

};


/* =========================
   ASTROAI ACTIVITY HISTORY
========================= */

function getAstroHistory() {

    try {

        return JSON.parse(
            localStorage.getItem("astroHistory")
        ) || [];

    } catch (error) {

        return [];

    }

}


function trackActivity(type, title, details) {

    const history = getAstroHistory();

    const icons = {

        zodiac: "♈",
        horoscope: "🔮",
        chatbot: "🤖",
        astrologer: "👨‍🔮",
        consultation: "📅",
        video: "📺",
        profile: "👤",
        dashboard: "🏠"

    };


    /* Prevent accidental duplicate entries */

    const last = history[0];

    if (

        last &&
        last.title === title &&
        last.details === details &&
        Date.now() -
        new Date(last.timestamp).getTime() < 5000

    ) {

        return;

    }


    history.unshift({

        id: Date.now(),

        type: type,

        title: title,

        details: details || "",

        icon: icons[type] || "✨",

        timestamp: new Date().toISOString()

    });


    /* Keep only latest 30 activities */

    localStorage.setItem(

        "astroHistory",

        JSON.stringify(
            history.slice(0, 30)
        )

    );

}


/* =========================
   ZODIAC POPUP
========================= */

function showZodiac(sign) {

    const data = zodiacData[sign];

    if (!data) {
        return;
    }


    document.getElementById("modalSymbol").textContent =
        data.symbol;

    document.getElementById("modalName").textContent =
        sign;

    document.getElementById("modalDate").textContent =
        "📅 Dates: " + data.date;

    document.getElementById("modalElement").textContent =
        "🌍 Element: " + data.element;

    document.getElementById("modalDescription").textContent =
        "🪐 Ruling Planet: " +
        data.planet +
        " | ✨ " +
        data.description;

    document.getElementById("zodiacModal").style.display =
        "flex";


    /* Track the zodiac sign being viewed */

    trackActivity(

        "zodiac",

        sign + " Zodiac Viewed",

        "You viewed the " +
        sign +
        " zodiac information."

    );

}


function closeZodiac() {

    document.getElementById("zodiacModal").style.display =
        "none";

}


/* =========================
   CLOSE ZODIAC POPUP
========================= */

window.addEventListener("click", function(event) {

    const modal =
        document.getElementById("zodiacModal");

    if (
        modal &&
        event.target === modal
    ) {

        closeZodiac();

    }

});


/* =========================
   HOROSCOPE
========================= */

const horoscopeData = {

    Aries:
        "Today may be a good time to focus your energy on something positive. Stay confident and take things one step at a time. 🔥",

    Taurus:
        "Patience may help you handle today's challenges. Focus on stability and avoid rushing important decisions. 🌍",

    Gemini:
        "Communication and curiosity may help you discover something interesting today. Keep an open mind. 💨",

    Cancer:
        "Take some time for yourself and focus on the people and activities that make you feel comfortable. 💧",

    Leo:
        "Your creativity and confidence can help you make progress today. Let your ideas shine. 🔥",

    Virgo:
        "Organization may make your day easier. Focus on one task at a time and avoid overthinking. 🌍",

    Libra:
        "Balance is important today. Try to give equal attention to your responsibilities and relaxation. 💨",

    Scorpio:
        "Your determination can help you stay focused on your goals. Trust your ability to work through challenges. 💧",

    Sagittarius:
        "Curiosity may lead you toward something new today. Stay positive and enjoy learning. 🔥",

    Capricorn:
        "Small, consistent efforts can help you move toward your goals. Stay patient and focused. 🌍",

    Aquarius:
        "Your creative ideas may help you see a situation differently. Don't be afraid to think independently. 💨",

    Pisces:
        "Your imagination can be a source of creativity today. Give yourself some quiet time to think and create. 💧"

};


function showHoroscope() {

    const signElement =
        document.getElementById("horoscopeSign");

    const result =
        document.getElementById("horoscopeResult");


    if (!signElement || !result) {
        return;
    }


    const sign =
        signElement.value;


    if (sign === "") {

        result.textContent =
            "Please select a zodiac sign first. ✨";

        return;

    }


    result.innerHTML =

        "<strong>" +
        zodiacData[sign].symbol +
        " " +
        sign +
        "</strong><br><br>" +

        horoscopeData[sign];


    /* Track horoscope viewing */

    trackActivity(

        "horoscope",

        sign + " Horoscope Viewed",

        "You viewed today's " +
        sign +
        " horoscope."

    );

}


/* =========================
   CHATBOT
========================= */

async function sendMessage() {

    const input =
        document.getElementById("userInput");


    if (!input) {
        return;
    }


    const message =
        input.value.trim();


    if (message === "") {
        return;
    }


    addMessage(
        message,
        "user"
    );


    input.value = "";


    showTyping();


    /* Track chatbot activity */

    trackActivity(

        "chatbot",

        "AI Chatbot Used",

        "You asked AstroAI: " +
        message

    );


    try {

        const response =
            await fetch(
                "/api/chat",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        message: message
                    })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Server response was not successful."
            );

        }


        const data =
            await response.json();


        removeTyping();


        addMessage(

            data.reply ||
            "Sorry, I couldn't generate a response. 🤖",

            "bot"

        );


    } catch (error) {

        console.error(error);


        removeTyping();


        addMessage(

            "Sorry, I couldn't connect to the AstroAI server. 🤖",

            "bot"

        );

    }

}


/* =========================
   ADD MESSAGE
========================= */

function addMessage(message, type) {

    const chatMessages =
        document.getElementById("chatMessages");


    if (!chatMessages) {
        return;
    }


    const messageDiv =
        document.createElement("div");


    messageDiv.textContent =
        message;


    if (type === "user") {

        messageDiv.className =
            "user-message";

    } else {

        messageDiv.className =
            "bot-message";

    }


    chatMessages.appendChild(
        messageDiv
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


/* =========================
   TYPING INDICATOR
========================= */

function showTyping() {

    const chatMessages =
        document.getElementById("chatMessages");


    if (!chatMessages) {
        return;
    }


    /* Don't create multiple indicators */

    if (
        document.getElementById(
            "typingIndicator"
        )
    ) {

        return;

    }


    const typing =
        document.createElement("div");


    typing.id =
        "typingIndicator";


    typing.className =
        "typing-message";


    typing.innerHTML =
        'AstroAI is typing <span class="typing-dots">...</span>';


    chatMessages.appendChild(
        typing
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


function removeTyping() {

    const typing =
        document.getElementById(
            "typingIndicator"
        );


    if (typing) {

        typing.remove();

    }

}


/* =========================
   SUGGESTED QUESTIONS
========================= */

function askQuestion(question) {

    const input =
        document.getElementById("userInput");


    if (!input) {
        return;
    }


    input.value =
        question;


    sendMessage();

}


/* =========================
   ENTER KEY
========================= */

function handleEnter(event) {

    if (
        event.key === "Enter"
    ) {

        sendMessage();

    }

}


/* =========================
   HERO BUTTON
========================= */

function goToChat() {

    const chatbot =
        document.getElementById("chatbot");


    if (!chatbot) {
        return;
    }


    chatbot.scrollIntoView({

        behavior: "smooth"

    });

}


/* =========================
   FIND MY ZODIAC
========================= */

function findZodiac() {

    const birthDateElement =
        document.getElementById("birthDate");

    const result =
        document.getElementById("zodiacResult");


    if (
        !birthDateElement ||
        !result
    ) {

        return;

    }


    const birthDate =
        birthDateElement.value;


    if (birthDate === "") {

        result.textContent =
            "Please enter your date of birth. ✨";

        return;

    }


    const date =
        new Date(
            birthDate +
            "T00:00:00"
        );


    const day =
        date.getDate();


    const month =
        date.getMonth() + 1;


    let sign = "";


    if (
        (month === 3 && day >= 21) ||
        (month === 4 && day <= 19)
    ) {

        sign = "Aries";

    }

    else if (
        (month === 4 && day >= 20) ||
        (month === 5 && day <= 20)
    ) {

        sign = "Taurus";

    }

    else if (
        (month === 5 && day >= 21) ||
        (month === 6 && day <= 20)
    ) {

        sign = "Gemini";

    }

    else if (
        (month === 6 && day >= 21) ||
        (month === 7 && day <= 22)
    ) {

        sign = "Cancer";

    }

    else if (
        (month === 7 && day >= 23) ||
        (month === 8 && day <= 22)
    ) {

        sign = "Leo";

    }

    else if (
        (month === 8 && day >= 23) ||
        (month === 9 && day <= 22)
    ) {

        sign = "Virgo";

    }

    else if (
        (month === 9 && day >= 23) ||
        (month === 10 && day <= 22)
    ) {

        sign = "Libra";

    }

    else if (
        (month === 10 && day >= 23) ||
        (month === 11 && day <= 21)
    ) {

        sign = "Scorpio";

    }

    else if (
        (month === 11 && day >= 22) ||
        (month === 12 && day <= 21)
    ) {

        sign = "Sagittarius";

    }

    else if (
        (month === 12 && day >= 22) ||
        (month === 1 && day <= 19)
    ) {

        sign = "Capricorn";

    }

    else if (
        (month === 1 && day >= 20) ||
        (month === 2 && day <= 18)
    ) {

        sign = "Aquarius";

    }

    else {

        sign = "Pisces";

    }


    const data =
        zodiacData[sign];


    result.innerHTML =

        "<strong>" +
        data.symbol +
        " " +
        sign +
        "</strong><br><br>" +

        "🌍 Element: " +
        data.element +

        "<br>" +

        "🪐 Ruling Planet: " +
        data.planet +

        "<br><br>" +

        data.description;


    /* Track zodiac finder activity */

    trackActivity(

        "zodiac",

        "Zodiac Sign Found",

        "Your selected birth date corresponds to " +
        sign +
        "."

    );

}