/* =========================================================
   BALANCE CHAMBER
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

        }
    );

}


/* =========================================================
   ELEMENTS
========================================================= */

const titleScene =
    document.getElementById(
        "titleScene"
    );


const mechanismScene =
    document.getElementById(
        "mechanismScene"
    );


const balanceMechanism =
    document.querySelector(
        ".balance-mechanism"
    );


const mechanismGlow =
    document.getElementById(
        "mechanismGlow"
    );


const statusText =
    document.getElementById(
        "statusText"
    );


const restoredScene =
    document.getElementById(
        "restoredScene"
    );


const blackout =
    document.getElementById(
        "blackout"
    );


const finalMessage =
    document.getElementById(
        "finalMessage"
    );


const continueButton =
    document.getElementById(
        "continueButton"
    );


/* =========================================================
   START SEQUENCE
========================================================= */

function startSequence() {


    /* =========================================
       TITLE APPEARS
    ========================================= */

    setTimeout(() => {

        titleScene.style.transition =
            "opacity 2s ease";

        titleScene.style.opacity =
            "1";

    }, 300);


    /* =========================================
       TITLE DISAPPEARS
    ========================================= */

    setTimeout(() => {

        titleScene.style.transition =
            "opacity 1.5s ease";

        titleScene.style.opacity =
            "0";

    }, 3500);


    /* =========================================
       MECHANISM APPEARS
    ========================================= */

    setTimeout(() => {

        mechanismScene.style.transition =
            "opacity 1.2s ease";

        mechanismScene.style.opacity =
            "1";


        balanceMechanism.style.animation =
            "mechanismAppear 1.5s ease forwards";


        mechanismGlow.style.animation =
            "glowPulse 2.5s ease-in-out infinite";


        statusText.style.animation =
            "statusAppear 1s ease forwards";

    }, 4800);


    /* =========================================
       MECHANISM PULSE
    ========================================= */

    setTimeout(() => {

        balanceMechanism.style.animation =
            "mechanismPulse 2.5s ease-in-out infinite";

    }, 6500);


    /* =========================================
       BALANCE RESTORED
    ========================================= */

    setTimeout(() => {

        mechanismScene.style.transition =
            "opacity 1.2s ease";

        mechanismScene.style.opacity =
            "0";


        restoredScene.style.animation =
            "restoredAppear 1.5s ease forwards";

        restoredScene.style.opacity =
            "1";

    }, 8500);


    /* =========================================
       BLACKOUT
    ========================================= */

    setTimeout(() => {

        blackout.style.visibility =
            "visible";


        blackout.style.transition =
            "opacity 2.5s ease";


        blackout.style.opacity =
            "1";

    }, 11200);


    /* =========================================
       FINAL MESSAGE
    ========================================= */

    setTimeout(() => {

        finalMessage.style.animation =
            "finalMessageAppear 2s ease forwards";

    }, 14000);


    /* =========================================
       CONTINUE BUTTON
    ========================================= */

    setTimeout(() => {

        continueButton.style.transition =
            "opacity 1.5s ease";


        continueButton.style.opacity =
            "1";

    }, 16500);

}


/* =========================================================
   CONTINUE
========================================================= */

if (continueButton) {

    continueButton.addEventListener(
        "click",
        () => {

            /*
               الصفحة دي لسه هنبنيها
               بعد ما نحدد آخر مشهد.
            */

            window.location.href =
                "ending.html";

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

updateLanguage();

startSequence();