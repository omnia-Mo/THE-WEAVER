/* =========================================
   POTION LAB
   CASE 001-D
========================================= */


/* =========================
   ELEMENTS
========================= */

const ingredients =
    document.querySelectorAll(".ingredient");

const cauldronEmpty =
    document.getElementById("cauldronEmpty");

const cauldronSpell1 =
    document.getElementById("cauldronSpell1");

const cauldronSpell2 =
    document.getElementById("cauldronSpell2");

const stirringRod =
    document.getElementById("stirringRod");

const experimentLabel =
    document.getElementById("experimentLabel");

const noteTitle =
    document.getElementById("noteTitle");

const noteInstruction =
    document.getElementById("noteInstruction");

const noteStir =
    document.getElementById("noteStir");

const noteStatus =
    document.getElementById("noteStatus");

const stirMessage =
    document.getElementById("stirMessage");

const experimentResult =
    document.getElementById("experimentResult");

const resultText =
    document.getElementById("resultText");

const resetExperiment =
    document.getElementById("resetExperiment");

const caseOverlay =
    document.getElementById("caseOverlay");

const closeCase =
    document.getElementById("closeCase");

const finishBtn =
    document.getElementById("finishBtn");

const enBtn =
    document.getElementById("enBtn");

const arBtn =
    document.getElementById("arBtn");


/* =========================
   STATE
========================= */

let currentExperiment = 1;

let draggedIngredient = null;

let ingredientsAdded = [];

let draggingRod = false;

let lastRodX = 0;

let strokeDirection = null;

let strokeCount = 0;

const REQUIRED_STROKES = 6;


/* =========================
   LANGUAGE
========================= */

let currentLanguage = "en";


const translations = {

    en: {

        experiment1: "EXPERIMENT I",

        experiment2: "EXPERIMENT II",

        noteTitle:
            "INVESTIGATION NOTE",

        drag:
            "Drag each ingredient into the cauldron.",

        stir:
            "Once all ingredients are added, stir the potion from left to right.",

        waiting:
            "AWAITING INGREDIENTS",

        ingredients:
            "INGREDIENTS READY",

        stirReady:
            "READY FOR STIRRING",

        stirInstruction:
            "STIR FROM LEFT TO RIGHT",

        stable:
            "STABLE RESPONSE",

        unstable:
            "UNSTABLE RESPONSE",

        reset:
            "RESET EXPERIMENT",

        wolfsbane:
            "Wolfsbane",

        moonstone:
            "Moonstone",

        unicorn:
            "Unicorn Hair",

        egg:
            "Ashwinder Egg",

        ministry:
            "MINISTRY OF MAGIC",

        anomaly:
            "MAGICAL ANOMALY DETECTED",

        potionInstability:
            "POTION INSTABILITY",

        intro:
            "Two controlled experiments were performed using identical ingredients, quantities, and procedure.",

        observation:
            "OBSERVATION",

        experimentOne:
            "EXPERIMENT I — STABLE",

        experimentOneText:
            "The potion remained stable and reacted normally.",

        experimentTwo:
            "EXPERIMENT II — UNSTABLE",

        experimentTwoText:
            "The potion changed unexpectedly despite identical conditions.",

        confirmed:
            "ANOMALY CONFIRMED",

        nextLead:
            "NEXT LEAD",

        connection:
            "THE FOUR INCIDENTS ARE CONNECTED",

        connectionText:
            "The same instability observed in the creature, plant, spell, and potion cases suggests a single disturbance affecting magical balance.",

        viewConnection:
            "VIEW CONNECTION →"

    },


    ar: {

        experiment1:
            "التجربة الأولى",

        experiment2:
            "التجربة الثانية",

        noteTitle:
            "ملاحظة التحقيق",

        drag:
            "اسحبي كل مكوّن إلى داخل المرجل.",

        stir:
            "بعد إضافة كل المكونات، حرّكي الخليط من اليمين إلى اليسار.",

        waiting:
            "في انتظار المكونات",

        ingredients:
            "تمت إضافة المكونات",

        stirReady:
            "جاهز للتحريك",

        stirInstruction:
            "حرّكي من اليمين إلى اليسار",

        stable:
            "استجابة مستقرة",

        unstable:
            "استجابة غير مستقرة",

        reset:
            "إعادة التجربة",

        wolfsbane:
            "ذئبية",

        moonstone:
            "حجر القمر",

        unicorn:
            "شعر وحيد القرن",

        egg:
            "بيضة آشوِندر",

        ministry:
            "وزارة السحر",

        anomaly:
            "تم اكتشاف خلل سحري",

        potionInstability:
            "عدم استقرار الجرعة",

        intro:
            "تم إجراء تجربتين متطابقتين باستخدام نفس المكونات والكميات وطريقة التحضير.",

        observation:
            "الملاحظة",

        experimentOne:
            "التجربة الأولى — مستقرة",

        experimentOneText:
            "ظل الخليط مستقرًا وتفاعل بصورة طبيعية.",

        experimentTwo:
            "التجربة الثانية — غير مستقرة",

        experimentTwoText:
            "تغير الخليط بشكل غير متوقع رغم تطابق جميع الظروف.",

        confirmed:
            "تم تأكيد الخلل",

        nextLead:
            "الخيط التالي",

        connection:
            "الحوادث الأربعة مرتبطة",

        connectionText:
            "عدم الاستقرار نفسه ظهر في حالات المخلوق والنبات والتعويذة والجرعة، مما يشير إلى اضطراب واحد يؤثر في توازن السحر.",

        viewConnection:
            "عرض الرابط ←"

    }

};


/* =========================
   LANGUAGE UPDATE
========================= */

function updateLanguage() {

    const t =
        translations[currentLanguage];


    experimentLabel.textContent =
        currentExperiment === 1
            ? t.experiment1
            : t.experiment2;


    noteTitle.textContent =
        t.noteTitle;


    noteInstruction.textContent =
        t.drag;


    noteStir.textContent =
        t.stir;


    resetExperiment.textContent =
        t.reset;


    document.getElementById(
        "name1"
    ).textContent = t.wolfsbane;


    document.getElementById(
        "name2"
    ).textContent = t.moonstone;


    document.getElementById(
        "name3"
    ).textContent = t.unicorn;


    document.getElementById(
        "name4"
    ).textContent = t.egg;


    document.getElementById(
        "labelWolfsbane"
    ).textContent = t.wolfsbane;


    document.getElementById(
        "labelMoonstone"
    ).textContent = t.moonstone;


    document.getElementById(
        "labelUnicorn"
    ).textContent = t.unicorn;


    document.getElementById(
        "labelAshwinder"
    ).textContent = t.egg;


    if (ingredientsAdded.length === 4) {

        noteStatus.textContent =
            t.stirReady;

    } else {

        noteStatus.textContent =
            t.waiting;
    }


    stirMessage.textContent =
        t.stirInstruction;


    /* CASE FILE */

    document.getElementById(
        "fileMinistry"
    ).textContent = t.ministry;


    document.getElementById(
        "fileTitle"
    ).textContent = t.anomaly;


    document.getElementById(
        "fileSubtitle"
    ).textContent =
        t.potionInstability;


    document.getElementById(
        "fileIntro"
    ).textContent =
        t.intro;


    document.getElementById(
        "observationTitle"
    ).textContent =
        t.observation;


    document.getElementById(
        "experimentOneTitle"
    ).textContent =
        t.experimentOne;


    document.getElementById(
        "experimentOneText"
    ).textContent =
        t.experimentOneText;


    document.getElementById(
        "experimentTwoTitle"
    ).textContent =
        t.experimentTwo;


    document.getElementById(
        "experimentTwoText"
    ).textContent =
        t.experimentTwoText;


    document.getElementById(
        "stamp"
    ).textContent =
        t.confirmed;


    document.getElementById(
        "nextLeadLabel"
    ).textContent =
        t.nextLead;


    document.getElementById(
        "nextLeadTitle"
    ).textContent =
        t.connection;


    document.getElementById(
        "nextLeadText"
    ).textContent =
        t.connectionText;


    finishBtn.textContent =
        t.viewConnection;


    document.body.classList.toggle(
        "arabic",
        currentLanguage === "ar"
    );

}


/* =========================
   LANGUAGE BUTTONS
========================= */

enBtn.addEventListener(
    "click",
    () => {

        currentLanguage = "en";

        enBtn.classList.add("active");

        arBtn.classList.remove("active");

        updateLanguage();

    }
);


arBtn.addEventListener(
    "click",
    () => {

        currentLanguage = "ar";

        arBtn.classList.add("active");

        enBtn.classList.remove("active");

        updateLanguage();

    }
);


/* =========================
   INGREDIENT DRAGGING
========================= */

ingredients.forEach(
    ingredient => {

        ingredient.addEventListener(
            "pointerdown",
            startDragging
        );

    }
);


function startDragging(event) {

    event.preventDefault();

    event.stopPropagation();

    draggedIngredient =
        event.currentTarget;


    draggedIngredient.style.zIndex =
        "80";


    draggedIngredient.classList.add(
        "dragging"
    );


    draggedIngredient.startX =
        event.clientX;


    draggedIngredient.startY =
        event.clientY;


    draggedIngredient.originalLeft =
        draggedIngredient.offsetLeft;


    draggedIngredient.originalTop =
        draggedIngredient.offsetTop;


    document.addEventListener(
        "pointermove",
        dragIngredient
    );


    document.addEventListener(
        "pointerup",
        stopDragging
    );

}


function dragIngredient(event) {

    if (!draggedIngredient) return;


    const dx =
        event.clientX -
        draggedIngredient.startX;


    const dy =
        event.clientY -
        draggedIngredient.startY;


    draggedIngredient.style.left =
        (
            draggedIngredient.originalLeft +
            dx
        ) + "px";


    draggedIngredient.style.top =
        (
            draggedIngredient.originalTop +
            dy
        ) + "px";

}


function stopDragging() {

    if (!draggedIngredient) return;


    checkIngredientDrop(
        draggedIngredient
    );


    draggedIngredient.style.zIndex =
        "40";


    draggedIngredient.classList.remove(
        "dragging"
    );


    document.removeEventListener(
        "pointermove",
        dragIngredient
    );


    document.removeEventListener(
        "pointerup",
        stopDragging
    );


    draggedIngredient = null;

}


/* =========================
   DROP CHECK
========================= */

function checkIngredientDrop(
    ingredient
) {

    const ingredientRect =
        ingredient.getBoundingClientRect();


    const cauldronRect =
        cauldronEmpty.getBoundingClientRect();


    const centerX =
        ingredientRect.left +
        ingredientRect.width / 2;


    const centerY =
        ingredientRect.top +
        ingredientRect.height / 2;


    const insideCauldron =

        centerX >
        cauldronRect.left +
        cauldronRect.width * 0.25

        &&

        centerX <
        cauldronRect.left +
        cauldronRect.width * 0.75

        &&

        centerY >
        cauldronRect.top +
        cauldronRect.height * 0.30

        &&

        centerY <
        cauldronRect.top +
        cauldronRect.height * 0.72;


    if (!insideCauldron) {

        returnIngredient(
            ingredient
        );

        return;
    }


    const name =
        ingredient.dataset.name;


    const expectedOrder = [

        "wolfsbane",
        "moonstone",
        "unicorn",
        "ashwinder"

    ];


    const expected =
        expectedOrder[
            ingredientsAdded.length
        ];


    if (name !== expected) {

        returnIngredient(
            ingredient
        );

        return;
    }


    if (
        !ingredientsAdded.includes(name)
    ) {

        ingredientsAdded.push(name);

        ingredient.style.opacity =
            "0";

        ingredient.style.pointerEvents =
            "none";


        updateIngredientStatus();

    }

}


/* =========================
   RETURN INGREDIENT
========================= */

function returnIngredient(
    ingredient
) {

    ingredient.style.transition =
        "left 0.35s ease, top 0.35s ease";


    ingredient.style.left = "";

    ingredient.style.top = "";


    setTimeout(
        () => {

            ingredient.style.transition =
                "";

        },
        400
    );

}


/* =========================
   INGREDIENT STATUS
========================= */

function updateIngredientStatus() {

    const t =
        translations[currentLanguage];


    if (ingredientsAdded.length < 4) {

        noteStatus.textContent =
            `${ingredientsAdded.length}/4 INGREDIENTS ADDED`;

        return;
    }


    noteStatus.textContent =
        t.stirReady;


    activateStirring();

}


/* =========================
   ACTIVATE STIRRING
========================= */

function activateStirring() {

    stirringRod.classList.add(
        "active"
    );


    stirMessage.textContent =
        translations[currentLanguage]
            .stirInstruction;


    stirMessage.classList.add(
        "visible"
    );


    setTimeout(
        () => {

            stirMessage.classList.remove(
                "visible"
            );

        },
        3000
    );


    stirringRod.removeEventListener(
        "pointerdown",
        startStirring
    );


    stirringRod.addEventListener(
        "pointerdown",
        startStirring
    );

}


/* =========================
   START STIRRING
========================= */

function startStirring(event) {

    event.preventDefault();

    event.stopPropagation();


    if (
        ingredientsAdded.length !== 4
    ) {

        return;
    }


    draggingRod = true;


    lastRodX =
        event.clientX;


    strokeDirection = null;


    stirringRod.style.cursor =
        "grabbing";


    document.addEventListener(
        "pointermove",
        moveStirring
    );


    document.addEventListener(
        "pointerup",
        stopStirring
    );

}


/* =========================
   MOVE STIRRING ROD
========================= */

function moveStirring(event) {

    if (!draggingRod) return;


    const deltaX =
        event.clientX -
        lastRodX;


    /*
       Ignore tiny movements.
    */

    if (Math.abs(deltaX) < 8) {

        return;
    }


    const direction =
        deltaX > 0
            ? "right"
            : "left";


    /*
       Count when direction changes.
    */

    if (
        strokeDirection !== null &&
        direction !== strokeDirection
    ) {

        strokeCount++;

        checkStirProgress();

    }


    strokeDirection =
        direction;


    lastRodX =
        event.clientX;


    /*
       Move the actual rod visually.
    */

    const distanceFromCenter =
        event.clientX -
        window.innerWidth / 2;


    const limitedMovement =
        Math.max(
            -100,
            Math.min(
                100,
                distanceFromCenter
            )
        );


    stirringRod.style.transform =
        `
        translateX(${limitedMovement * 0.45}px)
        rotate(${limitedMovement * 0.10}deg)
        `;

}


/* =========================
   STOP STIRRING
========================= */

function stopStirring() {

    if (!draggingRod) return;


    draggingRod = false;


    stirringRod.style.cursor =
        "grab";


    document.removeEventListener(
        "pointermove",
        moveStirring
    );


    document.removeEventListener(
        "pointerup",
        stopStirring
    );


    stirringRod.style.transform =
        "translateX(0) rotate(0deg)";

}


/* =========================
   STIR PROGRESS
========================= */

function checkStirProgress() {

    if (
        strokeCount >=
        REQUIRED_STROKES
    ) {

        completeStirring();

    }

}


/* =========================
   COMPLETE STIRRING
========================= */

function completeStirring() {

    draggingRod = false;


    stirringRod.classList.remove(
        "active"
    );


    stirringRod.style.transform =
        "translateX(0) rotate(0deg)";


    stirMessage.classList.remove(
        "visible"
    );


    if (currentExperiment === 1) {

        showExperimentOneResult();

    } else {

        showExperimentTwoResult();

    }

}


/* =========================
   EXPERIMENT I RESULT
========================= */

function showExperimentOneResult() {

    cauldronEmpty.classList.remove(
        "active"
    );


    cauldronSpell1.classList.add(
        "active"
    );


    resultText.textContent =
        translations[currentLanguage]
            .stable;


    experimentResult.classList.add(
        "visible"
    );


    noteStatus.textContent =
        translations[currentLanguage]
            .stable;


    setTimeout(
        () => {

            experimentResult.classList.remove(
                "visible"
            );


            prepareExperimentTwo();

        },
        2500
    );

}


/* =========================
   PREPARE EXPERIMENT II
========================= */

function prepareExperimentTwo() {

    currentExperiment = 2;


    ingredientsAdded = [];


    strokeCount = 0;


    strokeDirection = null;


    draggingRod = false;


    /* EXPERIMENT TITLE */

    experimentLabel.textContent =
        translations[currentLanguage]
            .experiment2;


    /* EMPTY CAULDRON */

    cauldronSpell1.classList.remove(
        "active"
    );

    cauldronSpell2.classList.remove(
        "active"
    );

    cauldronEmpty.classList.add(
        "active"
    );


    /* RESET INGREDIENTS */

    ingredients.forEach(
        ingredient => {

            ingredient.style.opacity =
                "1";

            ingredient.style.pointerEvents =
                "auto";

            ingredient.style.left =
                "";

            ingredient.style.top =
                "";

        }
    );


    /* RESET ROD */

    stirringRod.classList.remove(
        "active"
    );

    stirringRod.style.transform =
        "translateX(0) rotate(0deg)";


    noteStatus.textContent =
        translations[currentLanguage]
            .waiting;

}


/* =========================
   EXPERIMENT II RESULT
========================= */

function showExperimentTwoResult() {

    cauldronEmpty.classList.remove(
        "active"
    );


    cauldronSpell2.classList.add(
        "active"
    );


    resultText.textContent =
        translations[currentLanguage]
            .unstable;


    experimentResult.classList.add(
        "visible"
    );


    noteStatus.textContent =
        translations[currentLanguage]
            .unstable;


    /*
       Wait before opening the file.
    */

    setTimeout(
        () => {

            experimentResult.classList.remove(
                "visible"
            );


            openCaseFile();

        },
        3000
    );

}


/* =========================
   OPEN CASE
========================= */

function openCaseFile() {

    caseOverlay.classList.add(
        "open"
    );


    localStorage.setItem(
        "potionSolved",
        "true"
    );


    localStorage.setItem(
        "potionUnlocked",
        "true"
    );


    localStorage.setItem(
        "investigationPatternUnlocked",
        "true"
    );

}


/* =========================
   CLOSE CASE
========================= */

closeCase.addEventListener(
    "click",
    () => {

        caseOverlay.classList.remove(
            "open"
        );

    }
);


/* =========================
   FINISH
========================= */

finishBtn.addEventListener(
    "click",
    () => {

        window.location.href =
            "connected.html";

    }
);


/* =========================
   RESET
========================= */

resetExperiment.addEventListener(
    "click",
    resetPotionLab
);


function resetPotionLab() {

    currentExperiment = 1;


    ingredientsAdded = [];


    strokeCount = 0;


    strokeDirection = null;


    draggingRod = false;


    /* CAULDRON EMPTY */

    cauldronSpell1.classList.remove(
        "active"
    );

    cauldronSpell2.classList.remove(
        "active"
    );

    cauldronEmpty.classList.add(
        "active"
    );


    /* INGREDIENTS */

    ingredients.forEach(
        ingredient => {

            ingredient.style.opacity =
                "1";

            ingredient.style.pointerEvents =
                "auto";

            ingredient.style.left =
                "";

            ingredient.style.top =
                "";

        }
    );


    /* ROD */

    stirringRod.classList.remove(
        "active"
    );

    stirringRod.style.transform =
        "translateX(0) rotate(0deg)";


    /* MESSAGES */

    experimentResult.classList.remove(
        "visible"
    );

    stirMessage.classList.remove(
        "visible"
    );


    /* CASE */

    caseOverlay.classList.remove(
        "open"
    );


    updateLanguage();

}


/* =========================
   INITIAL STATE
========================= */

cauldronEmpty.classList.add(
    "active"
);

cauldronSpell1.classList.remove(
    "active"
);

cauldronSpell2.classList.remove(
    "active"
);

stirringRod.classList.remove(
    "active"
);

caseOverlay.classList.remove(
    "open"
);

updateLanguage();