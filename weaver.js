/* =====================================================
   THE WEAVER
   CINEMATIC AUTOMATIC STORY
   ENGLISH + ARABIC
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const archiveScreen =
    document.getElementById("archiveScreen");

const weaverChamber =
    document.getElementById("weaverChamber");

const greatCorrection =
    document.getElementById("greatCorrection");

const balanceChamber =
    document.getElementById("balanceChamber");

const finalScreen =
    document.getElementById("finalScreen");


const openArchiveBtn =
    document.getElementById("openArchiveBtn");

const closeCaseBtn =
    document.getElementById("closeCaseBtn");

const descendBtn =
    document.getElementById("descendBtn");


const speedBtn =
    document.getElementById("speedBtn");


/* TWO BOOK PAGES */

const bookTextLeft =
    document.getElementById("bookTextLeft");

const bookTextRight =
    document.getElementById("bookTextRight");


const correctionText =
    document.getElementById("correctionText");

const balanceText =
    document.getElementById("balanceText");

const finalMessage =
    document.getElementById("finalMessage");


const enBtn =
    document.getElementById("enBtn");

const arBtn =
    document.getElementById("arBtn");


/* =====================================================
   LANGUAGE
===================================================== */

let currentLanguage =
    localStorage.getItem("caseLanguage") || "en";


let storyStarted = false;


/* =====================================================
   SPEED
===================================================== */

let storySpeed =
    Number(
        localStorage.getItem("storySpeed")
    ) || 1;


const speedLevels = [1, 2, 4];


function updateSpeedButton() {

    if (!speedBtn) return;

    speedBtn.textContent =
        `SPEED ×${storySpeed}`;

}


function changeSpeed() {

    const currentIndex =
        speedLevels.indexOf(storySpeed);

    const nextIndex =
        (currentIndex + 1) %
        speedLevels.length;

    storySpeed =
        speedLevels[nextIndex];

    localStorage.setItem(
        "storySpeed",
        storySpeed
    );

    updateSpeedButton();

}


if (speedBtn) {

    speedBtn.addEventListener(
        "click",
        changeSpeed
    );

}


/* =====================================================
   LANGUAGE FUNCTION
===================================================== */

function setLanguage(language) {

    currentLanguage = language;


    localStorage.setItem(
        "caseLanguage",
        language
    );


    document.documentElement.lang =
        language;


    document.documentElement.dir =
        language === "ar"
            ? "rtl"
            : "ltr";


    enBtn.classList.toggle(
        "active",
        language === "en"
    );


    arBtn.classList.toggle(
        "active",
        language === "ar"
    );


    document
        .querySelectorAll("[data-en]")
        .forEach(element => {

            const translation =
                element.getAttribute(
                    `data-${language}`
                );

            if (translation !== null) {

                element.textContent =
                    translation;

            }

        });

}


enBtn.addEventListener(
    "click",
    () => setLanguage("en")
);


arBtn.addEventListener(
    "click",
    () => setLanguage("ar")
);


/* =====================================================
   HELPERS
===================================================== */

function sleep(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


/*
    Every normal time value is divided
    by the selected speed.

    ×1 = normal
    ×2 = twice as fast
    ×4 = four times as fast
*/

function scaledTime(ms) {

    return ms / storySpeed;

}


function hideAllScreens() {

    archiveScreen.classList.add("hidden");

    weaverChamber.classList.add("hidden");

    greatCorrection.classList.add("hidden");

    balanceChamber.classList.add("hidden");

    finalScreen.classList.add("hidden");

}


function showScreen(screen) {

    hideAllScreens();

    screen.classList.remove("hidden");

}


/* =====================================================
   TYPEWRITER
===================================================== */

async function typeText(
    element,
    text,
    speed
) {

    element.textContent = "";

    element.classList.add("visible");

    element.classList.add("typing");


    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        element.textContent +=
            text[i];


        await sleep(
            scaledTime(speed)
        );

    }


    element.classList.remove("typing");

}


/* =====================================================
   ERASE
===================================================== */

async function eraseText(element) {

    element.classList.remove(
        "visible"
    );


    await sleep(
        scaledTime(750)
    );


    element.textContent = "";

}


/* =====================================================
   BOOK STORY
===================================================== */

const bookStory = {

    en: [

        {
            page: "left",
            type: "heading",
            text: "THE WEAVER",
            speed: 95,
            displayTime: 3000
        },

        {
            page: "left",
            type: "paragraph",
            text:
                "For centuries, the existence of the Weaver was considered nothing more than a myth.",
            speed: 32,
            displayTime: 3000
        },

        {
            page: "right",
            type: "paragraph",
            text:
                "But the oldest magical records tell a different story.",
            speed: 35,
            displayTime: 2600
        },

        {
            page: "right",
            type: "quote",
            text:
                "“When magic loses its balance, the Weaver awakens.”",
            speed: 42,
            displayTime: 3600
        },

        {
            type: "pause",
            duration: 1200
        },

        {
            page: "left",
            type: "emphasis",
            text:
                "THE WEAVER WAS NOT CREATED TO DESTROY.",
            speed: 55,
            displayTime: 3600
        },

        {
            page: "right",
            type: "paragraph",
            text:
                "It was created to preserve balance.",
            speed: 38,
            displayTime: 2500
        },

        {
            page: "left",
            type: "paragraph",
            text:
                "The Weaver does not control magic.",
            speed: 38,
            displayTime: 2500
        },

        {
            page: "right",
            type: "emphasis",
            text:
                "It regulates it.",
            speed: 60,
            displayTime: 3500
        }

    ],


    /* =================================================
       ARABIC
    ================================================= */

    ar: [

        {
            page: "left",
            type: "heading",
            text: "الويفر",
            speed: 95,
            displayTime: 3000
        },

        {
            page: "left",
            type: "paragraph",
            text:
                "لقرونٍ طويلة، اعتُبر وجود الويفر مجرد أسطورة لا أكثر.",
            speed: 35,
            displayTime: 3000
        },

        {
            page: "right",
            type: "paragraph",
            text:
                "لكن أقدم السجلات السحرية تحكي قصة مختلفة.",
            speed: 38,
            displayTime: 2600
        },

        {
            page: "right",
            type: "quote",
            text:
                "«عندما يفقد السحر توازنه، يستيقظ الويفر.»",
            speed: 42,
            displayTime: 3600
        },

        {
            type: "pause",
            duration: 1200
        },

        {
            page: "left",
            type: "emphasis",
            text:
                "الويفر لم يُخلق للتدمير.",
            speed: 55,
            displayTime: 3600
        },

        {
            page: "right",
            type: "paragraph",
            text:
                "لقد خُلق للحفاظ على التوازن.",
            speed: 38,
            displayTime: 2500
        },

        {
            page: "left",
            type: "paragraph",
            text:
                "الويفر لا يتحكم في السحر.",
            speed: 38,
            displayTime: 2500
        },

        {
            page: "right",
            type: "emphasis",
            text:
                "بل ينظّمه.",
            speed: 60,
            displayTime: 3500
        }

    ]

};


/* =====================================================
   CLEAR BOTH PAGES
===================================================== */

function clearBook() {

    bookTextLeft.innerHTML = "";

    bookTextRight.innerHTML = "";

}


/* =====================================================
   GET PAGE
===================================================== */

function getBookPage(page) {

    if (page === "right") {

        return bookTextRight;

    }

    return bookTextLeft;

}


/* =====================================================
   PLAY BOOK STORY
===================================================== */

async function playBookStory() {

    clearBook();


    const storyLanguage =
        currentLanguage;


    for (
        const block
        of bookStory[storyLanguage]
    ) {


        if (block.type === "pause") {

            await sleep(
                scaledTime(block.duration)
            );

            continue;

        }


        clearBook();


        const page =
            getBookPage(block.page);


        const writing =
            document.createElement("div");


        writing.className =
            `book-writing ${block.type}`;


        page.appendChild(
            writing
        );


        await typeText(
            writing,
            block.text,
            block.speed
        );


        await sleep(
            scaledTime(block.displayTime)
        );


        await eraseText(
            writing
        );


        page.innerHTML = "";


        await sleep(
            scaledTime(450)
        );

    }


    clearBook();

}


/* =====================================================
   GREAT CORRECTION STORY
===================================================== */

const correctionStory = {

    en: [

        {
            type: "heading",
            text: "THE GREAT CORRECTION",
            speed: 75,
            displayTime: 3000
        },

        {
            type: "warning",
            text:
                "ARCHIVE WARNING\nCORRECTION PROTOCOL\nSTATUS: ACTIVE",
            speed: 45,
            displayTime: 3200
        },

        {
            type: "paragraph",
            text:
                "When magical balance reaches a critical point...",
            speed: 35,
            displayTime: 2600
        },

        {
            type: "paragraph",
            text:
                "the Weaver begins the Correction.",
            speed: 38,
            displayTime: 2600
        },

        {
            type: "paragraph",
            text:
                "It takes magic from where it has become excessive...",
            speed: 35,
            displayTime: 2800
        },

        {
            type: "paragraph",
            text:
                "and redistributes it where it has become weak.",
            speed: 35,
            displayTime: 3000
        },

        {
            type: "pause",
            duration: 1200
        },

        {
            type: "emphasis",
            text:
                "BUT SOMETHING WENT WRONG.",
            speed: 60,
            displayTime: 3200
        },

        {
            type: "paragraph",
            text:
                "The Weaver was designed to understand balance.",
            speed: 35,
            displayTime: 2600
        },

        {
            type: "emphasis",
            text:
                "Not life.",
            speed: 70,
            displayTime: 3500
        },

        {
            type: "balance",
            text:
                "MAGICAL BALANCE\n>\nINDIVIDUAL LIFE",
            speed: 50,
            displayTime: 3000
        },

        {
            type: "paragraph",
            text:
                "Aster is not a creature to protect.",
            speed: 30,
            displayTime: 2200
        },

        {
            type: "paragraph",
            text:
                "Wolfsbane is not a plant that must live.",
            speed: 30,
            displayTime: 2200
        },

        {
            type: "paragraph",
            text:
                "Lumos is not just a spell.",
            speed: 30,
            displayTime: 2200
        },

        {
            type: "paragraph",
            text:
                "All are magical energy sources involved in redistribution.",
            speed: 30,
            displayTime: 3000
        }

    ],


    /* =================================================
       ARABIC
    ================================================= */

    ar: [

        {
            type: "heading",
            text: "التصحيح الأعظم",
            speed: 75,
            displayTime: 3000
        },

        {
            type: "warning",
            text:
                "تحذير الأرشيف\nبروتوكول التصحيح\nالحالة: نشط",
            speed: 45,
            displayTime: 3200
        },

        {
            type: "paragraph",
            text:
                "عندما يصل التوازن السحري إلى نقطة حرجة...",
            speed: 35,
            displayTime: 2600
        },

        {
            type: "paragraph",
            text:
                "يبدأ الويفر عملية التصحيح.",
            speed: 38,
            displayTime: 2600
        },

        {
            type: "paragraph",
            text:
                "يسحب السحر من الأماكن التي أصبح فيها فائضًا...",
            speed: 35,
            displayTime: 2800
        },

        {
            type: "paragraph",
            text:
                "ثم يعيد توزيعه في الأماكن التي أصبح فيها ضعيفًا.",
            speed: 35,
            displayTime: 3000
        },

        {
            type: "pause",
            duration: 1200
        },

        {
            type: "emphasis",
            text:
                "لكن شيئًا ما حدث بشكل خاطئ.",
            speed: 60,
            displayTime: 3200
        },

        {
            type: "paragraph",
            text:
                "صُمم الويفر لفهم التوازن.",
            speed: 35,
            displayTime: 2600
        },

        {
            type: "emphasis",
            text:
                "وليس الحياة.",
            speed: 70,
            displayTime: 3500
        },

        {
            type: "balance",
            text:
                "التوازن السحري\n>\nحياة الفرد",
            speed: 50,
            displayTime: 3000
        },

        {
            type: "paragraph",
            text:
                "أستر ليست مخلوقًا يجب حمايته.",
            speed: 30,
            displayTime: 2200
        },

        {
            type: "paragraph",
            text:
                "والولفسبين ليس نباتًا يجب أن يعيش.",
            speed: 30,
            displayTime: 2200
        },

        {
            type: "paragraph",
            text:
                "ولوموس ليست مجرد تعويذة.",
            speed: 30,
            displayTime: 2200
        },

        {
            type: "paragraph",
            text:
                "فكلها مصادر للطاقة السحرية تدخل في عملية إعادة التوزيع.",
            speed: 30,
            displayTime: 3000
        }

    ]

};


/* =====================================================
   CORRECTION PROGRESS
===================================================== */

async function playCorrectionProgress() {

    const progress =
        document.createElement("div");

    progress.className =
        "correction-progress";

    correctionText.innerHTML = "";

    correctionText.appendChild(
        progress
    );


    const values = [12, 27, 43];


    for (
        const value
        of values
    ) {

        progress.textContent =
            `${value}%`;

        await sleep(
            scaledTime(1900)
        );

    }


    await sleep(
        scaledTime(1000)
    );


    /* ERROR */

    correctionText.innerHTML = "";


    const error =
        document.createElement("div");


    error.className =
        "error-message";


    correctionText.appendChild(
        error
    );


    await typeText(

        error,

        currentLanguage === "ar"

            ? "خطأ\nالتصحيح يتجاوز الحد الآمن"

            : "ERROR\nCORRECTION EXCEEDING SAFE LIMIT",

        45
    );


    await sleep(
        scaledTime(2800)
    );


    /* Weaver cannot stop */

    correctionText.innerHTML = "";


    const cannotStop =
        document.createElement("div");


    cannotStop.className =
        "correction-writing";


    correctionText.appendChild(
        cannotStop
    );


    await typeText(

        cannotStop,

        currentLanguage === "ar"

            ? "الويفر لا يستطيع التوقف."

            : "The Weaver cannot stop.",

        50
    );


    await sleep(
        scaledTime(2800)
    );


    await eraseText(
        cannotStop
    );


    correctionText.innerHTML = "";


    const reach =
        document.createElement("div");


    reach.className =
        "correction-writing";


    correctionText.appendChild(
        reach
    );


    await typeText(

        reach,

        currentLanguage === "ar"

            ? "إلا إذا وصل أحدهم إلى غرفة التوازن."

            : "Unless someone reaches the Balance Chamber.",

        40
    );


    await sleep(
        scaledTime(3500)
    );


    await eraseText(
        reach
    );

}


/* =====================================================
   PLAY GREAT CORRECTION
===================================================== */

async function playGreatCorrection() {

    showScreen(
        greatCorrection
    );


    await sleep(
        scaledTime(1800)
    );


    const storyLanguage =
        currentLanguage;


    for (
        const block
        of correctionStory[storyLanguage]
    ) {


        if (block.type === "pause") {

            await sleep(
                scaledTime(block.duration)
            );

            continue;

        }


        correctionText.innerHTML = "";


        const writing =
            document.createElement("div");


        writing.className =
            "correction-writing";


        if (
            block.type === "heading"
        ) {

            writing.classList.add(
                "correction-heading"
            );

        }


        if (
            block.type === "warning"
        ) {

            writing.classList.add(
                "archive-warning-text"
            );

        }


        correctionText.appendChild(
            writing
        );


        await typeText(
            writing,
            block.text,
            block.speed
        );


        await sleep(
            scaledTime(
                block.displayTime ||
                2500
            )
        );


        await eraseText(
            writing
        );


        correctionText.innerHTML = "";


        await sleep(
            scaledTime(400)
        );

    }


    await playCorrectionProgress();


    await sleep(
        scaledTime(1500)
    );


    await playBalanceChamber();

}


/* =====================================================
   BALANCE CHAMBER
===================================================== */

const balanceStory = {

    en: [

        {
            type: "heading",
            text: "BALANCE CHAMBER",
            speed: 80,
            displayTime: 3200
        },

        {
            type: "paragraph",
            text:
                "Beneath Hogwarts lies a chamber built before the modern magical institutions.",
            speed: 30,
            displayTime: 3000
        },

        {
            type: "paragraph",
            text:
                "The place where the Weaver's correction begins.",
            speed: 35,
            displayTime: 3500
        }

    ],


    ar: [

        {
            type: "heading",
            text: "غرفة التوازن",
            speed: 80,
            displayTime: 3200
        },

        {
            type: "paragraph",
            text:
                "تحت هوجورتس توجد غرفة بُنيت قبل ظهور المؤسسات السحرية الحديثة.",
            speed: 30,
            displayTime: 3000
        },

        {
            type: "paragraph",
            text:
                "إنها المكان الذي تبدأ فيه عملية تصحيح الويفر.",
            speed: 35,
            displayTime: 3500
        }

    ]

};


async function playBalanceChamber() {

    showScreen(
        balanceChamber
    );


    await sleep(
        scaledTime(1400)
    );


    const storyLanguage =
        currentLanguage;


    for (
        const block
        of balanceStory[storyLanguage]
    ) {

        balanceText.innerHTML = "";


        const writing =
            document.createElement("div");


        writing.className =
            "balance-writing";


        if (
            block.type === "heading"
        ) {

            writing.classList.add(
                "balance-heading"
            );

        }


        balanceText.appendChild(
            writing
        );


        await typeText(
            writing,
            block.text,
            block.speed
        );


        await sleep(
            scaledTime(block.displayTime)
        );


        await eraseText(
            writing
        );


        balanceText.innerHTML = "";


        await sleep(
            scaledTime(500)
        );

    }


    await sleep(
        scaledTime(1500)
    );


    await playFinalScreen();

}


/* =====================================================
   FINAL SCREEN
===================================================== */

const finalStory = {

    en: [

        {
            text:
                "THE CORRECTION HAS ALREADY BEGUN.",
            speed: 45,
            displayTime: 2600
        },

        {
            text:
                "YOU HAVE BEEN INVESTIGATING THE SYMPTOMS.",
            speed: 35,
            displayTime: 2600
        },

        {
            text:
                "NOW YOU MUST FIND THE CAUSE.",
            speed: 45,
            displayTime: 3500
        }

    ],


    ar: [

        {
            text:
                "لقد بدأ التصحيح بالفعل.",
            speed: 45,
            displayTime: 2600
        },

        {
            text:
                "لقد كنتم تحققون في الأعراض.",
            speed: 35,
            displayTime: 2600
        },

        {
            text:
                "والآن عليكم العثور على السبب.",
            speed: 45,
            displayTime: 3500
        }

    ]

};


async function playFinalScreen() {

    showScreen(
        finalScreen
    );


    await sleep(
        scaledTime(1200)
    );


    const storyLanguage =
        currentLanguage;


    for (
        const block
        of finalStory[storyLanguage]
    ) {

        finalMessage.innerHTML = "";


        const writing =
            document.createElement("div");


        finalMessage.appendChild(
            writing
        );


        await typeText(
            writing,
            block.text,
            block.speed
        );


        await sleep(
            scaledTime(block.displayTime)
        );


        await eraseText(
            writing
        );


        await sleep(
            scaledTime(500)
        );

    }

}


/* =====================================================
   OPEN ARCHIVE
===================================================== */

openArchiveBtn.addEventListener(

    "click",

    async () => {

        if (storyStarted) return;

        storyStarted = true;


        showScreen(
            weaverChamber
        );


        await sleep(
            scaledTime(1800)
        );


        await playBookStory();


        await sleep(
            scaledTime(1500)
        );


        await playGreatCorrection();

    }

);


/* =====================================================
   DESCEND
===================================================== */

/*
    IMPORTANT:

    The Weaver story reaches the final screen.
    DESCEND now goes to the Founders' Trial FIRST.

    Founders' Trial
    ↓
    Balance Chamber
    ↓
    Ending
*/

descendBtn.addEventListener(

    "click",

    () => {

        window.location.href =
            "founders-trial.html";

    }

);


/* =====================================================
   CLOSE
===================================================== */

closeCaseBtn.addEventListener(

    "click",

    () => {

        window.history.back();

    }

);


/* =====================================================
   INITIAL
===================================================== */

updateSpeedButton();

setLanguage(
    currentLanguage
);