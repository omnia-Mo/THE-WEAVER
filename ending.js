/* =========================================================
   CASE 001 — FINAL RECORD
========================================================= */


/* =========================================================
   LANGUAGE
========================================================= */

let currentLanguage =
    localStorage.getItem("caseLanguage") || "en";


const languageToggle =
    document.getElementById(
        "languageToggle"
    );


function updateLanguage() {

    if (languageToggle) {

        languageToggle.textContent =
            currentLanguage === "en"
                ? "AR"
                : "EN";

    }


    document
        .querySelectorAll("[data-en]")
        .forEach(element => {

            const en =
                element.getAttribute(
                    "data-en"
                );

            const ar =
                element.getAttribute(
                    "data-ar"
                );

            element.textContent =
                currentLanguage === "en"
                    ? en
                    : ar;

        });


    document.documentElement.lang =
        currentLanguage;


    document.body.classList.toggle(
        "arabic",
        currentLanguage === "ar"
    );

}


/* =========================================================
   LANGUAGE TOGGLE
========================================================= */

if (languageToggle) {

    languageToggle.addEventListener(
        "click",
        () => {

            currentLanguage =
                currentLanguage === "en"
                    ? "ar"
                    : "en";


            localStorage.setItem(
                "caseLanguage",
                currentLanguage
            );


            updateLanguage();


            /*
                If the record has already
                finished, redraw the text
                in the new language.
            */

            if (recordFinished) {

                showClosedState();

            }

        }
    );

}


/* =========================================================
   ELEMENTS
========================================================= */

const recordText =
    document.getElementById(
        "recordText"
    );


const cursor =
    document.getElementById(
        "cursor"
    );


const closedSection =
    document.getElementById(
        "closedSection"
    );


const restartButton =
    document.getElementById(
        "restartButton"
    );


/* =========================================================
   STORY
========================================================= */

const story = {

    en: [

        "THE WEAVER HAS STOPPED.",

        "THE BALANCE HAS BEEN RESTORED.",

        "FOR THE FIRST TIME IN CENTURIES,",

        "THE CHAMBER IS SILENT.",

        "...",

        "BUT THE RECORDS WERE WRONG.",

        "THE WEAVER WAS NOT",

        "THE OLDEST THING BENEATH THE SCHOOL.",

        "[ ERROR ]",

        "UNKNOWN MAGICAL SIGNATURE DETECTED.",

        "LOCATION:",

        "BELOW THE EASTERN FOUNDATION",

        "STATUS:",

        "AWAKE"

    ],


    ar: [

        "لقد توقف الويفر.",

        "لقد تمت استعادة التوازن.",

        "لأول مرة منذ قرون،",

        "أصبحت الغرفة صامتة.",

        "...",

        "لكن السجلات كانت خاطئة.",

        "لم يكن الويفر",

        "أقدم شيء تحت المدرسة.",

        "[ خطأ ]",

        "تم اكتشاف بصمة سحرية مجهولة.",

        "الموقع:",

        "أسفل الأساس الشرقي",

        "الحالة:",

        "مستيقظ"

    ]

};


/* =========================================================
   STATE
========================================================= */

let recordFinished = false;

let currentLine = 0;

let typing = false;


/* =========================================================
   TIMING
========================================================= */

const typingSpeed = 42;

const linePause = 650;

const dramaticPause = 1200;


/* =========================================================
   TYPE LINE
========================================================= */

function typeLine(text) {

    return new Promise(resolve => {

        typing = true;

        recordText.textContent = "";

        cursor.style.opacity = "1";


        let index = 0;


        function typeCharacter() {

            if (index < text.length) {

                recordText.textContent +=
                    text[index];

                index++;

                setTimeout(
                    typeCharacter,
                    typingSpeed
                );

                return;

            }


            typing = false;

            cursor.style.opacity = "1";


            const pause =
                text === "..."
                    ? dramaticPause
                    : linePause;


            setTimeout(
                resolve,
                pause
            );

        }


        typeCharacter();

    });

}


/* =========================================================
   SHOW STORY
========================================================= */

async function playRecord() {

    const lines =
        story[currentLanguage];


    recordText.textContent = "";


    for (
        currentLine = 0;
        currentLine < lines.length;
        currentLine++
    ) {

        await typeLine(
            lines[currentLine]
        );

    }


    finishRecord();

}


/* =========================================================
   FINISH RECORD
========================================================= */

function finishRecord() {

    recordFinished = true;

    typing = false;

    cursor.style.opacity = "0";


    setTimeout(
        () => {

            showClosedState();

        },
        1500
    );

}


/* =========================================================
   CLOSED STATE
========================================================= */

function showClosedState() {

    closedSection.style.animation =
        "closedAppear 2s ease forwards";

    closedSection.style.pointerEvents =
        "auto";


    setTimeout(
        () => {

            restartButton.style.animation =
                "buttonAppear 1.5s ease forwards";

        },
        1400
    );

}


/* =========================================================
   REOPEN CASE
========================================================= */

if (restartButton) {

    restartButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "index.html";

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

updateLanguage();


setTimeout(
    () => {

        playRecord();

    },
    2200
);