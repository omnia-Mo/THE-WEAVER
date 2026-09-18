/* =========================================
   CASE FILE OPEN / CLOSE
========================================= */

const openCase =
    document.getElementById("openCase");

const closeCase =
    document.getElementById("closeCase");

const caseOverlay =
    document.getElementById("caseOverlay");


openCase.addEventListener("click", () => {

    caseOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

});


closeCase.addEventListener("click", () => {

    caseOverlay.classList.remove("active");

    document.body.style.overflow = "";

});



/* =========================================
   LANGUAGE SYSTEM
========================================= */

const enBtn =
    document.getElementById("enBtn");

const arBtn =
    document.getElementById("arBtn");


let currentLanguage =
    localStorage.getItem("ministryLanguage") || "en";


function setLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang =
        language;


    if (language === "ar") {

        document.documentElement.dir = "rtl";

        document.body.classList.add("rtl");

    } else {

        document.documentElement.dir = "ltr";

        document.body.classList.remove("rtl");

    }



    /* =========================
       TEXT
    ========================== */

    const elements =
        document.querySelectorAll("[data-en]");


    elements.forEach(element => {

        element.textContent =
            language === "ar"
                ? element.dataset.ar
                : element.dataset.en;

    });



    /* =========================
       INPUT PLACEHOLDER
    ========================== */

    const locationInput =
        document.getElementById("locationInput");


    if (locationInput) {

        locationInput.placeholder =
            language === "ar"
                ? "اكتب المكان"
                : "ENTER LOCATION";

    }



    localStorage.setItem(
        "ministryLanguage",
        language
    );

}



/* Language buttons */

enBtn.addEventListener(
    "click",
    () => {

        setLanguage("en");

    }
);


arBtn.addEventListener(
    "click",
    () => {

        setLanguage("ar");

    }
);



/* Start saved language */

setLanguage(currentLanguage);



/* =========================================
   QUESTIONS
========================================= */

const questionCards =
    document.querySelectorAll(
        ".question-card"
    );


let currentQuestion = 1;



questionCards.forEach(card => {

    const answers =
        card.querySelectorAll(
            ".answers button"
        );


    answers.forEach(answer => {

        answer.addEventListener(
            "click",
            () => {


                /* =========================
                   PREVENT DOUBLE ANSWER
                ========================== */

                if (
                    card.classList.contains(
                        "answered"
                    )
                ) {

                    return;

                }



                const isCorrect =
                    answer.dataset.correct ===
                    "true";


                const result =
                    card.querySelector(
                        ".question-result"
                    );



                /* =========================
                   WRONG
                ========================== */

                if (!isCorrect) {

                    answer.classList.add(
                        "wrong"
                    );


                    result.textContent =
                        currentLanguage === "ar"
                            ? "إجابة غير صحيحة — راجع سلوك الكائن."
                            : "INCORRECT — REVIEW THE CREATURE'S BEHAVIOR.";


                    result.classList.add(
                        "error"
                    );


                    card.animate(
                        [
                            {
                                transform:
                                    "translateX(0)"
                            },

                            {
                                transform:
                                    "translateX(-5px)"
                            },

                            {
                                transform:
                                    "translateX(5px)"
                            },

                            {
                                transform:
                                    "translateX(0)"
                            }
                        ],

                        {
                            duration: 250
                        }
                    );


                    return;

                }



                /* =========================
                   CORRECT
                ========================== */

                card.classList.add(
                    "answered"
                );


                answer.classList.add(
                    "correct"
                );


                result.textContent =
                    currentLanguage === "ar"
                        ? "إجابة صحيحة — تم تأكيد الدليل."
                        : "CORRECT — EVIDENCE CONFIRMED.";


                result.classList.add(
                    "success"
                );



                /* Disable answers */

                answers.forEach(button => {

                    button.disabled = true;

                });



                /* =========================
                   NEXT QUESTION
                ========================== */

                const nextCard =
                    document.querySelector(
                        `.question-card[data-question="${currentQuestion + 1}"]`
                    );


                currentQuestion++;



                if (nextCard) {

                    setTimeout(() => {

                        nextCard.classList.remove(
                            "hidden-question"
                        );


                        nextCard.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }, 700);


                } else {

                    setTimeout(() => {

                        showInvestigationResult();

                    }, 900);

                }

            }
        );

    });

});



/* =========================================
   EVIDENCE CORRELATION
========================================= */

function showInvestigationResult() {

    const correlation =
        document.getElementById(
            "evidenceCorrelation"
        );


    const finalTrace =
        document.getElementById(
            "finalTrace"
        );


    correlation.classList.remove(
        "hidden-panel"
    );


    correlation.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    setTimeout(() => {

        finalTrace.classList.remove(
            "hidden-panel"
        );


        finalTrace.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 2200);

}



/* =========================================
   FINAL LOCATION
========================================= */

const locationInput =
    document.getElementById(
        "locationInput"
    );


const submitLocation =
    document.getElementById(
        "submitLocation"
    );


const locationResult =
    document.getElementById(
        "locationResult"
    );


const nextLead =
    document.getElementById(
        "nextLead"
    );



function checkLocation() {

    const answer =
        locationInput.value
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");



    const validAnswers = [

        "greenhouse",

        "green house",

        "greenhouse 03",

        "green house 03",

        "greenhouse 3",

        "green house 3",

        "greenhouse03"

    ];



    /* =========================
       CORRECT
    ========================== */

    if (
        validAnswers.includes(answer)
    ) {


        /* =================================
           CASE 001-A COMPLETED
        ================================= */

        localStorage.setItem(
            "asterSolved",
            "true"
        );



        /* =================================
           CASE 001-B UNLOCKED
        ================================= */

        localStorage.setItem(
            "greenhouseUnlocked",
            "true"
        );



        locationResult.textContent =
            currentLanguage === "ar"
                ? "✓ تم تحديد الموقع — GREENHOUSE 03"
                : "✓ LOCATION IDENTIFIED — GREENHOUSE 03";


        locationResult.className =
            "location-success";


        setTimeout(() => {

            nextLead.classList.remove(
                "hidden-panel"
            );


            nextLead.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 700);


    } else {


        /* =========================
           WRONG
        ========================== */

        locationResult.textContent =
            currentLanguage === "ar"
                ? "✕ إجابة غير صحيحة — ما زال الأثر غير واضح."
                : "✕ INCORRECT — THE TRAIL REMAINS UNCLEAR.";


        locationResult.className =
            "location-error";


        locationInput.animate(
            [
                {
                    transform:
                        "translateX(0)"
                },

                {
                    transform:
                        "translateX(-5px)"
                },

                {
                    transform:
                        "translateX(5px)"
                },

                {
                    transform:
                        "translateX(0)"
                }
            ],

            {
                duration: 250
            }
        );

    }

}



submitLocation.addEventListener(
    "click",
    checkLocation
);



/* Enter key */

locationInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            checkLocation();

        }

    }
);



/* =========================================
   RETURN TO INVESTIGATION
========================================= */

const returnInvestigation =
    document.getElementById(
        "returnInvestigation"
    );


if (returnInvestigation) {

    returnInvestigation.addEventListener(
        "click",
        () => {

            window.location.href =
                "investigation.html";

        }
    );

}
