/* =========================================================
   GREENHOUSE 03 — CASE 001-B
   ========================================================= */


/* =========================================================
   LANGUAGE
   ========================================================= */

let currentLanguage =
    localStorage.getItem("ministryLanguage") || "en";


function changeLanguage(language) {

    currentLanguage = language;


    localStorage.setItem(
        "ministryLanguage",
        language
    );


    document.documentElement.lang =
        language;


    document.body.classList.toggle(
        "arabic",
        language === "ar"
    );


    document
        .querySelectorAll("[data-en]")
        .forEach(element => {

            const text =
                element.getAttribute(
                    `data-${language}`
                );


            if (text !== null) {

                element.textContent =
                    text;

            }

        });


    document
        .getElementById("enBtn")
        .classList.toggle(
            "active",
            language === "en"
        );


    document
        .getElementById("arBtn")
        .classList.toggle(
            "active",
            language === "ar"
        );


    updatePuzzleText();

    renderPaperEvidence();


    if (currentDiscovery) {

        updateDiscoveryModal();

    }

}


/* =========================================================
   LANGUAGE BUTTONS
   ========================================================= */

document
    .getElementById("enBtn")
    .addEventListener(
        "click",
        () => changeLanguage("en")
    );


document
    .getElementById("arBtn")
    .addEventListener(
        "click",
        () => changeLanguage("ar")
    );


/* =========================================================
   EVIDENCE DATA
   ========================================================= */

const evidenceData = {

    roots: {

        symbol: "◇",

        number: "03",

        enTitle:
            "ROOT ANOMALY",

        arTitle:
            "شذوذ الجذور",

        enText:
            "The roots crossed the soil boundary and continued spreading toward the stone floor.",

        arText:
            "تجاوزت الجذور حدود التربة واستمرت في الانتشار باتجاه الأرضية الحجرية."

    },


    water: {

        symbol: "≋",

        number: "17",

        enTitle:
            "ENCHANTED WATER FAILURE",

        arTitle:
            "فقدان الماء المسحور",

        enText:
            "Water taken from the greenhouse suddenly lost its magical properties.",

        arText:
            "فقد الماء المأخوذ من الدفيئة خصائصه السحرية بشكل مفاجئ."

    },


    flora: {

        symbol: "☽",

        number: "04",

        enTitle:
            "MAGICAL FLORA FADING",

        arTitle:
            "اختفاء توهج النباتات السحرية",

        enText:
            "Magical plants nearby stopped glowing even though they remained alive.",

        arText:
            "توقفت النباتات السحرية القريبة عن التوهج رغم بقائها حية."

    },


    growth: {

        symbol: "🕸",

        number: "09",

        enTitle:
            "ABNORMAL WOLFSBANE GROWTH",

        arTitle:
            "النمو غير الطبيعي لنبات الذئب",

        enText:
            "Wolfsbane began growing at an unnatural speed while absorbing magical energy from its surroundings.",

        arText:
            "بدأ نبات الذئب في النمو بسرعة غير طبيعية أثناء امتصاص الطاقة السحرية من البيئة المحيطة."

    }

};


/* =========================================================
   SYMBOL POOL
   ========================================================= */

const symbolPool = [

    "◇",
    "≋",
    "☽",
    "🕸",

    "✧",
    "⟁",
    "⊙",
    "♢",

    "⌁",
    "◈",
    "⟡",
    "△"

];


/* =========================================================
   STATE
   ========================================================= */

let discoveredEvidence =
    JSON.parse(
        localStorage.getItem(
            "greenhouseEvidence"
        ) || "[]"
    );


let selectedCorrectSymbols = [];


let currentDiscovery = null;


/* =========================================================
   DOM
   ========================================================= */

const caseOverlay =
    document.getElementById(
        "caseOverlay"
    );


const evidenceModal =
    document.getElementById(
        "evidenceModal"
    );


const openCase =
    document.getElementById(
        "openCase"
    );


const closeCase =
    document.getElementById(
        "closeCase"
    );


const closeEvidence =
    document.getElementById(
        "closeEvidence"
    );


const continueDiscovery =
    document.getElementById(
        "continueDiscovery"
    );


const evidenceCount =
    document.getElementById(
        "evidenceCount"
    );


const evidenceSlots =
    document.getElementById(
        "evidenceSlots"
    );


const paperEvidence =
    document.getElementById(
        "paperEvidence"
    );


const puzzleLocked =
    document.getElementById(
        "puzzleLocked"
    );


const symbolPuzzle =
    document.getElementById(
        "symbolPuzzle"
    );


const symbolGrid =
    document.getElementById(
        "symbolGrid"
    );


const matchCount =
    document.getElementById(
        "matchCount"
    );


const puzzleMessage =
    document.getElementById(
        "puzzleMessage"
    );


const finalResult =
    document.getElementById(
        "finalResult"
    );


const finishBtn =
    document.getElementById(
        "finishBtn"
    );


/* =========================================================
   OPEN CASE
   ========================================================= */

openCase.addEventListener(
    "click",
    () => {

        caseOverlay.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";

    }
);


/* =========================================================
   CLOSE CASE
   ========================================================= */

closeCase.addEventListener(
    "click",
    closeCaseFile
);


function closeCaseFile() {

    caseOverlay.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   DISCOVER EVIDENCE
   ========================================================= */

function discoverEvidence(type) {

    if (
        discoveredEvidence.includes(
            type
        )
    ) {

        return;

    }


    if (!evidenceData[type]) {

        return;

    }


    currentDiscovery =
        type;


    updateDiscoveryModal();


    evidenceModal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   UPDATE DISCOVERY MODAL
   ========================================================= */

function updateDiscoveryModal() {

    if (!currentDiscovery) {

        return;

    }


    const evidence =
        evidenceData[
            currentDiscovery
        ];


    const title =
        currentLanguage === "ar"
            ? evidence.arTitle
            : evidence.enTitle;


    const text =
        currentLanguage === "ar"
            ? evidence.arText
            : evidence.enText;


    document.getElementById(
        "discoverySymbol"
    ).textContent =
        evidence.symbol;


    document.getElementById(
        "discoveryTitle"
    ).textContent =
        title;


    document.getElementById(
        "discoveryText"
    ).textContent =
        text;

}


/* =========================================================
   CLOSE DISCOVERY
   ========================================================= */

closeEvidence.addEventListener(
    "click",
    closeDiscovery
);


function closeDiscovery() {

    evidenceModal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   RECORD EVIDENCE
   ========================================================= */

continueDiscovery.addEventListener(
    "click",
    recordCurrentEvidence
);


function recordCurrentEvidence() {

    if (!currentDiscovery) {

        return;

    }


    if (
        !discoveredEvidence.includes(
            currentDiscovery
        )
    ) {

        discoveredEvidence.push(
            currentDiscovery
        );

    }


    localStorage.setItem(
        "greenhouseEvidence",
        JSON.stringify(
            discoveredEvidence
        )
    );


    markSceneEvidence(
        currentDiscovery
    );


    updateEvidenceTray();

    renderPaperEvidence();

    updatePuzzleState();

    closeDiscovery();


    currentDiscovery =
        null;

}


/* =========================================================
   MARK DISCOVERED SCENE MARKER
   ========================================================= */

function markSceneEvidence(type) {

    const marker =
        document.querySelector(
            `.${type}-marker`
        );


    if (marker) {

        marker.classList.add(
            "discovered"
        );

    }

}


/* =========================================================
   EVIDENCE TRAY
   ========================================================= */

function updateEvidenceTray() {

    evidenceCount.textContent =
        `${discoveredEvidence.length} / 4`;


    evidenceSlots.innerHTML =
        "";


    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const slot =
            document.createElement(
                "div"
            );


        if (
            discoveredEvidence[i]
        ) {

            const type =
                discoveredEvidence[i];


            const evidence =
                evidenceData[type];


            slot.className =
                "evidence-slot";


            slot.textContent =
                evidence.symbol;


            slot.title =
                currentLanguage === "ar"
                    ? evidence.arTitle
                    : evidence.enTitle;

        }

        else {

            slot.className =
                "empty-slot";

        }


        evidenceSlots.appendChild(
            slot
        );

    }

}


/* =========================================================
   PAPER EVIDENCE
   ========================================================= */

function renderPaperEvidence() {

    paperEvidence.innerHTML =
        "";


    if (
        discoveredEvidence.length === 0
    ) {

        const empty =
            document.createElement(
                "p"
            );


        empty.style.opacity =
            ".55";


        empty.textContent =
            currentLanguage === "ar"
                ? "لم يتم تسجيل أي دليل بعد."
                : "No evidence has been recorded yet.";


        paperEvidence.appendChild(
            empty
        );


        return;

    }


    discoveredEvidence.forEach(
        type => {

            const evidence =
                evidenceData[type];


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "paper-evidence-card";


            const title =
                currentLanguage === "ar"
                    ? evidence.arTitle
                    : evidence.enTitle;


            const text =
                currentLanguage === "ar"
                    ? evidence.arText
                    : evidence.enText;


            card.innerHTML = `

                <div class="paper-symbol">
                    ${evidence.symbol}
                </div>

                <h4>
                    ${title}
                </h4>

                <p>
                    ${text}
                </p>

            `;


            paperEvidence.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   PUZZLE STATE
   ========================================================= */

function updatePuzzleState() {

    const allEvidenceCollected =
        discoveredEvidence.length === 4;


    if (!allEvidenceCollected) {

        puzzleLocked.classList.remove(
            "hidden"
        );


        symbolPuzzle.classList.add(
            "hidden"
        );


        finalResult.classList.add(
            "hidden"
        );


        return;

    }


    puzzleLocked.classList.add(
        "hidden"
    );


    symbolPuzzle.classList.remove(
        "hidden"
    );


    if (
        symbolGrid.children.length === 0
    ) {

        createSymbolPuzzle();

    }

}


/* =========================================================
   SHUFFLE
   ========================================================= */

function shuffle(array) {

    const copy =
        [...array];


    for (
        let i = copy.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            copy[i],
            copy[j]
        ] =
        [
            copy[j],
            copy[i]
        ];

    }


    return copy;

}


/* =========================================================
   CREATE SYMBOL PUZZLE
   ========================================================= */

function createSymbolPuzzle() {

    symbolGrid.innerHTML =
        "";


    const shuffledSymbols =
        shuffle(symbolPool);


    shuffledSymbols.forEach(
        symbol => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "symbol-button";


            button.textContent =
                symbol;


            button.addEventListener(
                "click",
                () =>
                    checkSymbol(
                        symbol,
                        button
                    )
            );


            symbolGrid.appendChild(
                button
            );

        }
    );


    selectedCorrectSymbols =
        [];


    matchCount.textContent =
        "0 / 4";


    puzzleMessage.textContent =
        "";


    puzzleMessage.className =
        "puzzle-message";

}


/* =========================================================
   CHECK SYMBOL
   ========================================================= */

function checkSymbol(
    symbol,
    button
) {

    const correctSymbols =
        Object.values(
            evidenceData
        ).map(
            evidence =>
                evidence.symbol
        );


    if (
        correctSymbols.includes(
            symbol
        )
    ) {

        if (
            selectedCorrectSymbols.includes(
                symbol
            )
        ) {

            return;

        }


        selectedCorrectSymbols.push(
            symbol
        );


        button.classList.add(
            "correct"
        );


        button.disabled =
            true;


        matchCount.textContent =
            `${selectedCorrectSymbols.length} / 4`;


        showPuzzleMessage(
            currentLanguage === "ar"
                ? "رمز صحيح. تم ربطه بأحد الأدلة."
                : "Correct symbol. It has been linked to the evidence.",
            "success"
        );


        if (
            selectedCorrectSymbols.length === 4
        ) {

            solvePuzzle();

        }

    }

    else {

        button.classList.remove(
            "wrong"
        );


        void button.offsetWidth;


        button.classList.add(
            "wrong"
        );


        showPuzzleMessage(
            currentLanguage === "ar"
                ? "هذا الرمز لا يتطابق مع الأدلة المستخرجة."
                : "This symbol does not match the recovered evidence.",
            "error"
        );

    }

}


/* =========================================================
   PUZZLE MESSAGE
   ========================================================= */

function showPuzzleMessage(
    message,
    type
) {

    puzzleMessage.textContent =
        message;


    puzzleMessage.className =
        `puzzle-message ${type}`;

}


/* =========================================================
   SOLVE PUZZLE
   ========================================================= */

function solvePuzzle() {

    /*
       Existing solved state
    */

    localStorage.setItem(
        "greenhouseSolved",
        "true"
    );


    /*
       Existing book lead
    */

    localStorage.setItem(
        "bookLeadUnlocked",
        "true"
    );


    /*
       NEW:
       Unlock CASE 001-B
       on the Investigation Board.

       This happens ONLY after
       all four symbols are correctly identified.
    */

    localStorage.setItem(
        "greenhouseUnlocked",
        "true"
    );


    puzzleMessage.textContent =
        currentLanguage === "ar"
            ? "تم تحديد جميع الرموز المرتبطة."
            : "All connected symbols identified.";


    puzzleMessage.className =
        "puzzle-message success";


    setTimeout(
        () => {

            finalResult.classList.remove(
                "hidden"
            );

        },
        500
    );

}


/* =========================================================
   PUZZLE TEXT
   ========================================================= */

function updatePuzzleText() {

    if (
        discoveredEvidence.length < 4
    ) {

        return;

    }


    if (
        symbolPuzzle.classList.contains(
            "hidden"
        )
    ) {

        return;

    }


    const instruction =
        document.querySelector(
            ".puzzle-instruction span"
        );


    const small =
        document.querySelector(
            ".puzzle-instruction small"
        );


    if (instruction) {

        instruction.textContent =
            currentLanguage === "ar"
                ? "تشير الأدلة المستخرجة إلى أربعة رموز."
                : "The recovered evidence points to four symbols.";

    }


    if (small) {

        small.textContent =
            currentLanguage === "ar"
                ? "حددي الرموز الأربعة المرتبطة بالشذوذ."
                : "Identify the four symbols connected to the anomalies.";

    }

}


/* =========================================================
   RESTORE EVIDENCE
   ========================================================= */

function restoreEvidence() {

    discoveredEvidence.forEach(
        type => {

            markSceneEvidence(
                type
            );

        }
    );


    updateEvidenceTray();

    renderPaperEvidence();

}


/* =========================================================
   RESTORE SOLVED PUZZLE
   ========================================================= */

function restoreSolvedPuzzle() {

    const solved =
        localStorage.getItem(
            "greenhouseSolved"
        ) === "true";


    if (
        !solved ||
        discoveredEvidence.length !== 4
    ) {

        return;

    }


    puzzleLocked.classList.add(
        "hidden"
    );


    symbolPuzzle.classList.remove(
        "hidden"
    );


    createSymbolPuzzle();


    const correctSymbols =
        Object.values(
            evidenceData
        ).map(
            evidence =>
                evidence.symbol
        );


    selectedCorrectSymbols =
        [...correctSymbols];


    document
        .querySelectorAll(
            ".symbol-button"
        )
        .forEach(
            button => {

                if (
                    correctSymbols.includes(
                        button.textContent
                    )
                ) {

                    button.classList.add(
                        "correct"
                    );


                    button.disabled =
                        true;

                }

            }
        );


    matchCount.textContent =
        "4 / 4";


    finalResult.classList.remove(
        "hidden"
    );

}


/* =========================================================
   FINISH CASE
   ========================================================= */

finishBtn.addEventListener(
    "click",
    () => {

        /*
           The unlock has already been saved
           inside solvePuzzle().
        */

        window.location.href =
            "investigation.html";

    }
);


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        if (
            evidenceModal.classList.contains(
                "active"
            )
        ) {

            closeDiscovery();

            return;

        }


        if (
            caseOverlay.classList.contains(
                "active"
            )
        ) {

            closeCaseFile();

        }

    }
);


/* =========================================================
   CLICK OUTSIDE DISCOVERY MODAL
   ========================================================= */

evidenceModal.addEventListener(
    "click",
    event => {

        if (
            event.target === evidenceModal
        ) {

            closeDiscovery();

        }

    }
);


/* =========================================================
   CLICK OUTSIDE CASE FILE
   ========================================================= */

caseOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target === caseOverlay
        ) {

            closeCaseFile();

        }

    }
);


/* =========================================================
   INITIALIZATION
   ========================================================= */

changeLanguage(
    currentLanguage
);


restoreEvidence();


updatePuzzleState();


restoreSolvedPuzzle();
