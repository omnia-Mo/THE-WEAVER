/* =========================
   ELEMENTS
========================= */

const oldBook = document.getElementById("oldBook");
const oldBookBtn = document.getElementById("openBookBtn");
const oldBookArea = document.getElementById("oldBookArea");
const backBtn = document.getElementById("backBtn");

const enBtn = document.getElementById("enBtn");
const arBtn = document.getElementById("arBtn");


/* =========================
   TRANSLATIONS
========================= */

const translations = {

    en: {
        mainTitle: "THE INCIDENTS ARE CONNECTED",
        mainSubtitle: "Four anomalies. One disturbance.",

        connectionTitle: "THE SAME DISTURBANCE",

        connectionText:
            "The four anomalies display the same magical instability.",

        finalMessage:
            "THE INCIDENTS ARE CONNECTED.",

        bookHint:
            "AN OLD RECORD HAS BEEN FOUND",

        openBook:
            "OPEN THE BOOK →",

        continueHint:
            "CLICK THE BOOK TO CONTINUE →",

        back:
            "← INVESTIGATION"
    },

    ar: {
        mainTitle: "الحوادث مرتبطة",

        mainSubtitle:
            "أربع ظواهر غير طبيعية. اضطراب واحد.",

        connectionTitle:
            "الاضطراب نفسه",

        connectionText:
            "تُظهر الظواهر الأربع نفس حالة عدم الاستقرار السحري.",

        finalMessage:
            "الحوادث مرتبطة.",

        bookHint:
            "تم العثور على سجل قديم",

        openBook:
            "افتح الكتاب ←",

        continueHint:
            "اضغط على الكتاب للمتابعة ←",

        back:
            "التحقيق ←"
    }
};


/* =========================
   LANGUAGE
========================= */

function changeLanguage(language) {

    const t = translations[language];

    document.getElementById("mainTitle").textContent = t.mainTitle;

    document.getElementById("mainSubtitle").textContent = t.mainSubtitle;

    document.getElementById("connectionTitle").textContent =
        t.connectionTitle;

    document.getElementById("connectionText").textContent =
        t.connectionText;

    document.getElementById("finalMessage").textContent =
        t.finalMessage;

    document.getElementById("bookHint").textContent =
        t.bookHint;

    oldBookBtn.textContent = t.openBook;

    document.getElementById("continueHint").textContent =
        t.continueHint;

    backBtn.textContent = t.back;


    if (language === "ar") {

        document.documentElement.lang = "ar";

        document.body.dir = "rtl";

        arBtn.classList.add("active");
        enBtn.classList.remove("active");

    } else {

        document.documentElement.lang = "en";

        document.body.dir = "ltr";

        enBtn.classList.add("active");
        arBtn.classList.remove("active");
    }
}


/* =========================
   OPEN BOOK
========================= */

oldBookBtn.addEventListener("click", function (event) {

    event.preventDefault();
    event.stopPropagation();

    console.log("BOOK BUTTON WORKING");


    /* Disable button */

    oldBookBtn.disabled = true;


    /* Hide button */

    oldBookBtn.style.opacity = "0";

    oldBookBtn.style.pointerEvents = "none";


    /* Fade closed book */

    oldBook.style.opacity = "0";

    oldBook.style.transform =
        "scale(0.88) rotate(-2deg)";


    /* Change to open book */

    setTimeout(function () {

        oldBook.src = "images/old-book-open.png";

        oldBook.alt = "Open ancient magical book";


        /* Show open book */

        oldBook.style.opacity = "1";

        oldBook.style.transform =
            "scale(1) rotate(0deg)";


        /* Activate open state */

        oldBook.classList.add("opened");

        oldBookArea.classList.add("book-open");


        console.log("BOOK OPENED");

    }, 500);

});


/* =========================
   CLICK OPEN BOOK
========================= */

oldBook.addEventListener("click", function (event) {

    event.preventDefault();
    event.stopPropagation();

    if (!oldBook.classList.contains("opened")) {
        return;
    }

    window.location.href = "weaver.html";

});


/* =========================
   BACK
========================= */

backBtn.addEventListener("click", function () {

    window.location.href = "investigation.html";

});


/* =========================
   LANGUAGE BUTTONS
========================= */

enBtn.addEventListener("click", function () {

    changeLanguage("en");

});


arBtn.addEventListener("click", function () {

    changeLanguage("ar");

});


/* =========================
   INITIAL LANGUAGE
========================= */

changeLanguage("en");