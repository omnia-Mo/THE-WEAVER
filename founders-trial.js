/* =========================================================
   FOUNDERS' TRIAL
========================================================= */


/* =========================================================
   LANGUAGE
========================================================= */

let currentLanguage =
    localStorage.getItem("caseLanguage") || "en";

const languageToggle =
    document.getElementById("languageToggle");


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
                element.getAttribute("data-en");

            const ar =
                element.getAttribute("data-ar");

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
            updateInstruction();

        }
    );

}


/* =========================================================
   ELEMENTS
========================================================= */

const board =
    document.getElementById("board");

const tabletButton =
    document.getElementById("tabletButton");

const tabletModal =
    document.getElementById("tabletModal");

const closeTablet =
    document.getElementById("closeTablet");

const relicsTray =
    document.getElementById("relicsTray");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const phaseText =
    document.getElementById("phaseText");

const instructionBox =
    document.getElementById("instructionBox");

const balanceMechanism =
    document.getElementById("balanceMechanism");

const awakenedLayer =
    document.getElementById("awakenedLayer");

const successModal =
    document.getElementById("successModal");

const returnButton =
    document.getElementById("returnButton");


/* =========================================================
   GAME STATE
========================================================= */

let tabletRead = false;

let currentPhase = "seals";

let draggedObject = null;


/* =========================================================
   CORRECT OBJECTS
========================================================= */

const sealCorrect = {

    lion: false,
    serpent: false,
    eagle: false,
    badger: false

};


const relicCorrect = {

    sword: false,
    locket: false,
    diadem: false,
    cup: false

};


/* =========================================================
   TABLET
========================================================= */

if (tabletButton) {

    tabletButton.addEventListener(
        "click",
        () => {

            tabletRead = true;

            tabletModal.classList.add(
                "show"
            );

            updateInstruction();

        }
    );

}


if (closeTablet) {

    closeTablet.addEventListener(
        "click",
        () => {

            tabletModal.classList.remove(
                "show"
            );

        }
    );

}


if (tabletModal) {

    tabletModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                tabletModal
            ) {

                tabletModal.classList.remove(
                    "show"
                );

            }

        }
    );

}


/* =========================================================
   DRAG START
========================================================= */

function dragStart(event) {

    const object =
        event.currentTarget;


    /* -----------------------------------------
       INSCRIPTION MUST BE READ FIRST
    ----------------------------------------- */

    if (!tabletRead) {

        event.preventDefault();

        return;

    }


    /* -----------------------------------------
       CORRECT OBJECTS ARE LOCKED
    ----------------------------------------- */

    if (
        object.classList.contains(
            "correct"
        )
    ) {

        event.preventDefault();

        return;

    }


    const type =
        object.dataset.type;


    /* -----------------------------------------
       SEAL PHASE
    ----------------------------------------- */

    if (
        currentPhase === "seals" &&
        type !== "seal"
    ) {

        event.preventDefault();

        return;

    }


    /* -----------------------------------------
       RELIC PHASE
    ----------------------------------------- */

    if (
        currentPhase === "relics" &&
        type !== "relic"
    ) {

        event.preventDefault();

        return;

    }


    draggedObject =
        object;


    object.classList.add(
        "dragging"
    );


    event.dataTransfer.effectAllowed =
        "move";


    event.dataTransfer.setData(
        "text/plain",
        object.id
    );

}


/* =========================================================
   DRAG END
========================================================= */

function dragEnd(event) {

    event.currentTarget.classList.remove(
        "dragging"
    );

    draggedObject = null;

}


/* =========================================================
   REGISTER DRAGGABLE OBJECTS
========================================================= */

document
    .querySelectorAll(".draggable")
    .forEach(object => {

        object.addEventListener(
            "dragstart",
            dragStart
        );

        object.addEventListener(
            "dragend",
            dragEnd
        );

    });


/* =========================================================
   BOARD DRAGOVER
========================================================= */

if (board) {

    board.addEventListener(
        "dragover",
        event => {

            event.preventDefault();

            event.dataTransfer.dropEffect =
                "move";

        }
    );

}


/* =========================================================
   BOARD DROP
========================================================= */

if (board) {

    board.addEventListener(
        "drop",
        event => {

            event.preventDefault();


            if (!draggedObject) {

                return;

            }


            const object =
                draggedObject;


            /* =====================================
               SEAL
            ===================================== */

            if (
                object.dataset.type ===
                    "seal" &&
                currentPhase ===
                    "seals"
            ) {

                moveObjectFreely(
                    object,
                    event.clientX,
                    event.clientY
                );


                /*
                   IMPORTANT:

                   Every seal placement is accepted.

                   There is NO target.
                   There is NO correct coordinate.
                   There is NO snap.
                */

                checkSeal(object);

                return;

            }


            /* =====================================
               RELIC
            ===================================== */

            if (
                object.dataset.type ===
                    "relic" &&
                currentPhase ===
                    "relics"
            ) {

                moveObjectFreely(
                    object,
                    event.clientX,
                    event.clientY
                );


                /*
                   Relics are checked against
                   the correct Founder seal.
                */

                checkRelic(object);

            }

        }
    );

}


/* =========================================================
   MOVE OBJECT FREELY
========================================================= */

function moveObjectFreely(
    object,
    clientX,
    clientY
) {

    const boardRect =
        board.getBoundingClientRect();


    /*
       If the object was inside
       the relic tray, move it
       into the board.
    */

    if (
        object.parentElement !==
        board
    ) {

        board.appendChild(object);

    }


    /*
       Mouse position relative
       to the board.
    */

    let x =
        clientX -
        boardRect.left;

    let y =
        clientY -
        boardRect.top;


    /*
       Keep the object inside
       the visible board.
    */

    const rect =
        object.getBoundingClientRect();


    const halfWidth =
        rect.width / 2;

    const halfHeight =
        rect.height / 2;


    x = Math.max(
        halfWidth,
        Math.min(
            x,
            boardRect.width -
                halfWidth
        )
    );


    y = Math.max(
        halfHeight,
        Math.min(
            y,
            boardRect.height -
                halfHeight
        )
    );


    /*
       FREE POSITION.

       The object stays exactly
       where the player dropped it.
    */

    object.style.position =
        "absolute";

    object.style.left =
        `${x}px`;

    object.style.top =
        `${y}px`;

    object.style.transform =
        "translate(-50%, -50%)";


    object.style.zIndex =
        object.dataset.type ===
            "seal"
            ? "20"
            : "25";

}


/* =========================================================
   CHECK SEAL
========================================================= */

function checkSeal(seal) {

    const id =
        seal.id;


    /*
       The seal does NOT need to
       match any position.

       Any placement on the board
       is accepted.
    */

    if (
        sealCorrect[id]
    ) {

        return;

    }


    sealCorrect[id] =
        true;


    /*
       Lock the seal in the exact
       position where the player
       dropped it.
    */

    seal.classList.add(
        "correct"
    );


    seal.draggable =
        false;


    updateSealProgress();

    checkAllSeals();

}


/* =========================================================
   SEAL PROGRESS
========================================================= */

function updateSealProgress() {

    const solved =
        Object.values(
            sealCorrect
        ).filter(Boolean).length;


    const percentage =
        solved * 12.5;


    progressBar.style.width =
        `${percentage}%`;


    progressText.textContent =
        `${Math.round(
            percentage
        )}%`;


    updateInstruction();

}


/* =========================================================
   CHECK ALL SEALS
========================================================= */

function checkAllSeals() {

    const complete =
        Object.values(
            sealCorrect
        ).every(Boolean);


    if (!complete) {

        return;

    }


    setTimeout(
        () => {

            currentPhase =
                "relics";

            showRelics();

        },
        900
    );

}


/* =========================================================
   SHOW RELICS
========================================================= */

function showRelics() {

    relicsTray.classList.remove(
        "hidden"
    );


    phaseText.textContent =
        currentLanguage === "en"
            ? "PHASE II — THE ARTIFACTS"
            : "المرحلة الثانية — القطع الأثرية";


    progressBar.style.width =
        "50%";


    progressText.textContent =
        "50%";


    updateInstruction();

}


/* =========================================================
   CHECK RELIC
========================================================= */

function checkRelic(relic) {

    /*
       Example:

       sword  -> lion
       locket -> serpent
       diadem -> eagle
       cup    -> badger
    */

    const targetId =
        relic.dataset.target;


    /*
       Find the actual seal
       the player placed.
    */

    const seal =
        document.getElementById(
            targetId
        );


    if (!seal) {

        return;

    }


    /*
       Get actual screen positions.
    */

    const relicRect =
        relic.getBoundingClientRect();

    const sealRect =
        seal.getBoundingClientRect();


    /*
       Relic center.
    */

    const relicCenterX =
        relicRect.left +
        relicRect.width / 2;

    const relicCenterY =
        relicRect.top +
        relicRect.height / 2;


    /*
       Seal center.
    */

    const sealCenterX =
        sealRect.left +
        sealRect.width / 2;

    const sealCenterY =
        sealRect.top +
        sealRect.height / 2;


    /*
       Distance between relic
       and the Founder seal.
    */

    const distance =
        Math.sqrt(
            Math.pow(
                relicCenterX -
                    sealCenterX,
                2
            ) +
            Math.pow(
                relicCenterY -
                    sealCenterY,
                2
            )
        );


    /*
       How close the relic must be
       to the correct seal.

       Change this number if you
       want the placement stricter
       or easier.
    */

    const allowedDistance =
        65;


    /* =====================================
       CORRECT
    ===================================== */

    if (
        distance <=
        allowedDistance
    ) {

        relicCorrect[
            relic.id
        ] = true;


        /*
           Lock the relic exactly
           where the player dropped it.
        */

        relic.classList.add(
            "correct"
        );


        relic.draggable =
            false;


        updateRelicProgress();

        checkAllRelics();

        return;

    }


    /* =====================================
       WRONG
    ===================================== */

    /*
       DO NOTHING.

       The relic remains exactly
       where the player dropped it.

       It can be picked up again.
    */

}


/* =========================================================
   RELIC PROGRESS
========================================================= */

function updateRelicProgress() {

    const solved =
        Object.values(
            relicCorrect
        ).filter(Boolean).length;


    const percentage =
        50 +
        solved * 12.5;


    progressBar.style.width =
        `${percentage}%`;


    progressText.textContent =
        `${Math.round(
            percentage
        )}%`;


    updateInstruction();

}


/* =========================================================
   CHECK ALL RELICS
========================================================= */

function checkAllRelics() {

    const complete =
        Object.values(
            relicCorrect
        ).every(Boolean);


    if (!complete) {

        return;

    }


    setTimeout(
        () => {

            activateBalance();

        },
        1000
    );

}


/* =========================================================
   BALANCE ACTIVATION
========================================================= */

function activateBalance() {

    currentPhase =
        "complete";


    /*
       Hide relic tray.
    */

    relicsTray.classList.add(
        "hidden"
    );


    /*
       Full progress.
    */

    progressBar.style.width =
        "100%";


    progressText.textContent =
        "100%";


    phaseText.textContent =
        currentLanguage === "en"
            ? "BALANCE RESTORATION"
            : "استعادة التوازن";


    updateInstruction();


    /*
       Activate central mechanism.
    */

    balanceMechanism.classList.add(
        "active"
    );


    /*
       Founders awaken.
    */

    setTimeout(
        () => {

            awakenedLayer.classList.add(
                "show"
            );

        },
        1400
    );


    /*
       Success modal.
    */

    setTimeout(
        () => {

            successModal.classList.add(
                "show"
            );

        },
        3800
    );

}


/* =========================================================
   INSTRUCTIONS
========================================================= */

function updateInstruction() {

    if (!instructionBox) {

        return;

    }


    /* -----------------------------------------
       Before inscription
    ----------------------------------------- */

    if (!tabletRead) {

        instructionBox.textContent =
            currentLanguage === "en"
                ? "Read the inscription before beginning the trial."
                : "اقرئي النقش قبل بدء الاختبار.";

        return;

    }


    /* -----------------------------------------
       SEAL PHASE
    ----------------------------------------- */

    if (
        currentPhase ===
        "seals"
    ) {

        const solved =
            Object.values(
                sealCorrect
            ).filter(Boolean).length;


        if (solved === 0) {

            instructionBox.textContent =
                currentLanguage === "en"
                    ? "Place the four Founder seals on the board."
                    : "ضعي أختام المؤسسين الأربعة على اللوحة.";

        } else {

            instructionBox.textContent =
                currentLanguage === "en"
                    ? `${solved} of 4 seals placed.`
                    : `تم وضع ${solved} من أصل 4 أختام.`;

        }

        return;

    }


    /* -----------------------------------------
       RELIC PHASE
    ----------------------------------------- */

    if (
        currentPhase ===
        "relics"
    ) {

        const solved =
            Object.values(
                relicCorrect
            ).filter(Boolean).length;


        if (solved === 0) {

            instructionBox.textContent =
                currentLanguage === "en"
                    ? "Place each artifact with its corresponding Founder."
                    : "ضعي كل قطعة أثرية مع المؤسس المطابق لها.";

        } else {

            instructionBox.textContent =
                currentLanguage === "en"
                    ? `${solved} of 4 artifacts aligned.`
                    : `تم وضع ${solved} من أصل 4 قطع أثرية.`;

        }

        return;

    }


    /* -----------------------------------------
       COMPLETE
    ----------------------------------------- */

    if (
        currentPhase ===
        "complete"
    ) {

        instructionBox.textContent =
            currentLanguage === "en"
                ? "The balance has been restored."
                : "تم استعادة التوازن.";

    }

}


/* =========================================================
   RETURN BUTTON
========================================================= */

if (returnButton) {

    returnButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "balance.html";

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

updateLanguage();

updateInstruction();