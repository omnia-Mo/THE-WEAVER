document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       ELEMENTS
    ========================================= */

    const canvas =
        document.getElementById("traceCanvas");

    const ctx =
        canvas.getContext("2d");


    const classroom =
        document.querySelector(".classroom");


    const traceContainer =
        document.querySelector(".trace-container");


    const attemptCounter =
        document.getElementById("attemptCounter");


    const testLog =
        document.getElementById("testLog");


    const outputText =
        document.getElementById("outputText");


    const caseOverlay =
        document.getElementById("caseOverlay");


    const closeCase =
        document.getElementById("closeCase");


    const finishBtn =
        document.getElementById("finishBtn");


    const returnInvestigation =
        document.getElementById(
            "returnInvestigation"
        );


    const enBtn =
        document.getElementById("enBtn");


    const arBtn =
        document.getElementById("arBtn");


    /* =========================================
       CANVAS SETTINGS
    ========================================= */

    ctx.lineWidth = 7;

    ctx.lineCap = "round";

    ctx.lineJoin = "round";


    /* =========================================
       GAME STATE
    ========================================= */

    let drawing = false;

    let points = [];

    let castingCount = 0;

    let processingCast = false;


    /* =========================================
       LANGUAGE
    ========================================= */

    let currentLanguage = "en";


    /* =========================================
       TRANSLATIONS
    ========================================= */

    const translations = {

        en: {

            caseNumber:
                "CASE 001-C",

            caseName:
                "LUMOS",

            caseType:
                "SPELL ANOMALY",

            classroom:
                "CHARMS CLASSROOM",

            instructionTitle:
                "Cast Lumos.",

            instructionText:
                "Trace the spell symbol exactly as shown.",

            warning:
                "Observe the magical response.",

            spellTitle:
                "LUMOS",

            start:
                "START",

            end:
                "END",

            attemptLabel:
                "MAGICAL RESPONSE TEST",

            awaitingFirst:
                "Awaiting first casting...",

            castingOne:
                "Casting successful... but the light is unusually weak.",

            output18:
                "Magical output: 18%",

            awaitingSecond:
                "Awaiting second casting...",

            castingTwo:
                "Casting successful. Magical output exceeds normal limits.",

            output96:
                "Magical output: 96%",

            awaitingThird:
                "Awaiting third casting...",

            castingThree:
                "Casting successful... magical illumination is unstable.",

            unstable:
                "Magical output: UNSTABLE",

            failed:
                "Magical output: FAILED",

            traceShort:
                "Trace too short. Try again.",

            unstableTrace:
                "The spell pattern was unstable. Try again.",

            ministry:
                "MINISTRY OF MAGIC",

            department:
                "DEPARTMENT OF MAGICAL ANOMALIES",

            caseFile:
                "CASE FILE 001-C",

            subtitle:
                "SPELL ANOMALY — LUMOS",

            stamp:
                "SPELL INSTABILITY<br>CONFIRMED",

            observation:
                "OBSERVATION",

            observationText:
                "The same Lumos spell was successfully cast three times.",

            firstResponse:
                "FIRST RESPONSE",

            firstResponseText:
                "The spell produced only a weak, localized light.",

            secondResponse:
                "SECOND RESPONSE",

            secondResponseText:
                "The same spell suddenly produced an unusually powerful burst of light, illuminating the entire classroom.",

            thirdResponse:
                "THIRD RESPONSE",

            thirdResponseText:
                "Magical illumination became unstable, repeatedly weakening and intensifying without any change in the casting method.",

            conclusion:
                "CONCLUSION",

            conclusionText:
                "The caster, spell symbol and casting method remained unchanged. The magical response itself is unstable.",

            nextLead:
                "NEXT LEAD",

            leadLocation:
                "POTIONS LAB — CASE 001-D",

            leadText:
                "If magic itself is unstable, the same ingredients should not behave normally.",

            proceed:
                "PROCEED TO POTIONS LAB →",

            footer:
                "CLASSIFIED — MINISTRY EYES ONLY",

            returnText:
                "← RETURN TO INVESTIGATION"

        },


        ar: {

            caseNumber:
                "القضية 001-C",

            caseName:
                "لوموس",

            caseType:
                "خلل في التعويذة",

            classroom:
                "فصل التعويذات",

            instructionTitle:
                "ألقِ تعويذة لوموس.",

            instructionText:
                "ارسم رمز التعويذة تمامًا كما هو موضح.",

            warning:
                "راقب الاستجابة السحرية.",

            spellTitle:
                "لوموس",

            start:
                "البداية",

            end:
                "النهاية",

            attemptLabel:
                "اختبار الاستجابة السحرية",

            awaitingFirst:
                "في انتظار الإلقاء الأول...",

            castingOne:
                "نجح الإلقاء... لكن الضوء أضعف من المعتاد بشكل ملحوظ.",

            output18:
                "قوة السحر: 18%",

            awaitingSecond:
                "في انتظار الإلقاء الثاني...",

            castingTwo:
                "نجح الإلقاء. قوة السحر تجاوزت الحدود الطبيعية.",

            output96:
                "قوة السحر: 96%",

            awaitingThird:
                "في انتظار الإلقاء الثالث...",

            castingThree:
                "نجح الإلقاء... لكن الإضاءة السحرية أصبحت غير مستقرة.",

            unstable:
                "قوة السحر: غير مستقرة",

            failed:
                "قوة السحر: فشل",

            traceShort:
                "الرسم قصير جدًا. حاول مرة أخرى.",

            unstableTrace:
                "نمط التعويذة غير مستقر. حاول مرة أخرى.",

            ministry:
                "وزارة السحر",

            department:
                "إدارة الظواهر السحرية",

            caseFile:
                "ملف القضية 001-C",

            subtitle:
                "خلل في التعويذة — لوموس",

            stamp:
                "تم تأكيد<br>عدم استقرار التعويذة",

            observation:
                "الملاحظة",

            observationText:
                "تم إلقاء تعويذة لوموس نفسها بنجاح ثلاث مرات.",

            firstResponse:
                "الاستجابة الأولى",

            firstResponseText:
                "أنتجت التعويذة ضوءًا ضعيفًا ومحدود النطاق.",

            secondResponse:
                "الاستجابة الثانية",

            secondResponseText:
                "أنتجت التعويذة نفسها فجأة دفعة ضوئية قوية بشكل غير معتاد، أضاءت الفصل بالكامل.",

            thirdResponse:
                "الاستجابة الثالثة",

            thirdResponseText:
                "أصبحت الإضاءة السحرية غير مستقرة، فتضعف وتقوى بشكل متكرر دون أي تغيير في طريقة الإلقاء.",

            conclusion:
                "الاستنتاج",

            conclusionText:
                "ظل الساحر ورمز التعويذة وطريقة الإلقاء دون تغيير. الاستجابة السحرية نفسها هي التي أصبحت غير مستقرة.",

            nextLead:
                "الدليل التالي",

            leadLocation:
                "معمل الجرعات — القضية 001-D",

            leadText:
                "إذا كان السحر نفسه غير مستقر، فمن المفترض ألا تتصرف المكونات نفسها بالطريقة المعتادة.",

            proceed:
                "← الانتقال إلى معمل الجرعات",

            footer:
                "سري — لعيون وزارة السحر فقط",

            returnText:
                "→ العودة إلى التحقيق"

        }

    };


    /* =========================================
       APPLY LANGUAGE
    ========================================= */

    function applyLanguage(language) {

        currentLanguage = language;


        const t =
            translations[language];


        /* Direction */

        document.documentElement.lang =
            language === "ar"
                ? "ar"
                : "en";


        document.documentElement.dir =
            language === "ar"
                ? "rtl"
                : "ltr";


        /* =====================================
           HEADER
        ===================================== */

        document.querySelector(
            ".case-number"
        ).textContent =
            t.caseNumber;


        document.querySelector(
            ".case-name"
        ).textContent =
            t.caseName;


        document.querySelector(
            ".case-type"
        ).textContent =
            t.caseType;


        /* =====================================
           INSTRUCTIONS
        ===================================== */

        document.querySelector(
            ".small-label"
        ).textContent =
            t.classroom;


        document.querySelector(
            ".instruction-panel h1"
        ).textContent =
            t.instructionTitle;


        const instructionParagraphs =
            document.querySelectorAll(
                ".instruction-panel p"
            );


        if (
            instructionParagraphs.length >= 2
        ) {

            instructionParagraphs[0]
                .textContent =
                t.instructionText;


            instructionParagraphs[1]
                .textContent =
                t.warning;
        }


        /* =====================================
           SPELL
        ===================================== */

        document.querySelector(
            ".spell-title"
        ).textContent =
            t.spellTitle;


        document.querySelector(
            ".start-point"
        ).textContent =
            t.start;


        document.querySelector(
            ".end-point"
        ).textContent =
            t.end;


        /* =====================================
           STATUS
        ===================================== */

        document.querySelector(
            ".attempt-label"
        ).textContent =
            t.attemptLabel;


        attemptCounter.textContent =
            castingCount + " / 3";


        /* =====================================
           CASE FILE HEADER
        ===================================== */

        document.querySelector(
            ".file-top span:first-child"
        ).textContent =
            t.ministry;


        document.querySelector(
            ".file-top span:last-child"
        ).textContent =
            t.department;


        document.querySelector(
            ".file-title"
        ).textContent =
            t.caseFile;


        document.querySelector(
            ".file-subtitle"
        ).textContent =
            t.subtitle;


        document.querySelector(
            ".case-stamp"
        ).innerHTML =
            t.stamp;


        /* =====================================
           ANALYSIS
        ===================================== */

        const rows =
            document.querySelectorAll(
                ".analysis-row"
            );


        if (rows.length >= 5) {

            rows[0]
                .querySelector("strong")
                .textContent =
                t.observation;

            rows[0]
                .querySelector("p")
                .textContent =
                t.observationText;


            rows[1]
                .querySelector("strong")
                .textContent =
                t.firstResponse;

            rows[1]
                .querySelector("p")
                .textContent =
                t.firstResponseText;


            rows[2]
                .querySelector("strong")
                .textContent =
                t.secondResponse;

            rows[2]
                .querySelector("p")
                .textContent =
                t.secondResponseText;


            rows[3]
                .querySelector("strong")
                .textContent =
                t.thirdResponse;

            rows[3]
                .querySelector("p")
                .textContent =
                t.thirdResponseText;


            rows[4]
                .querySelector("strong")
                .textContent =
                t.conclusion;

            rows[4]
                .querySelector("p")
                .textContent =
                t.conclusionText;
        }


        /* =====================================
           NEXT LEAD
        ===================================== */

        document.querySelector(
            ".lead-label"
        ).textContent =
            t.nextLead;


        document.querySelector(
            ".lead-location"
        ).textContent =
            t.leadLocation;


        document.querySelector(
            ".next-lead p"
        ).textContent =
            t.leadText;


        /* =====================================
           BUTTONS
        ===================================== */

        finishBtn.textContent =
            t.proceed;


        returnInvestigation.textContent =
            t.returnText;


        /* =====================================
           ACTIVE LANGUAGE
        ===================================== */

        enBtn.classList.toggle(
            "active",
            language === "en"
        );


        arBtn.classList.toggle(
            "active",
            language === "ar"
        );


        /* =====================================
           CURRENT GAME MESSAGE
        ===================================== */

        updateCurrentMessage();
    }


    /* =========================================
       CURRENT MESSAGE
    ========================================= */

    function updateCurrentMessage() {

        const t =
            translations[currentLanguage];


        if (castingCount === 0) {

            testLog.textContent =
                t.awaitingFirst;


            outputText.textContent =
                currentLanguage === "ar"
                    ? "قوة السحر: —"
                    : "Magical output: —";

            return;
        }


        if (
            castingCount === 1 &&
            !processingCast
        ) {

            testLog.textContent =
                t.awaitingSecond;

            return;
        }


        if (
            castingCount === 2 &&
            !processingCast
        ) {

            testLog.textContent =
                t.awaitingThird;

            return;
        }
    }


    /* =========================================
       LANGUAGE BUTTONS
    ========================================= */

    enBtn.addEventListener(
        "click",
        function () {

            applyLanguage("en");

        }
    );


    arBtn.addEventListener(
        "click",
        function () {

            applyLanguage("ar");

        }
    );


    /* =========================================
       INITIAL STATE
    ========================================= */

    attemptCounter.textContent =
        "0 / 3";


    testLog.textContent =
        translations.en.awaitingFirst;


    outputText.textContent =
        "Magical output: —";


    /* =========================================
       GET POSITION
    ========================================= */

    function getPosition(event) {

        const rect =
            canvas.getBoundingClientRect();


        const scaleX =
            canvas.width /
            rect.width;


        const scaleY =
            canvas.height /
            rect.height;


        return {

            x:
                (event.clientX - rect.left)
                * scaleX,

            y:
                (event.clientY - rect.top)
                * scaleY

        };
    }


    /* =========================================
       START DRAWING
    ========================================= */

    function startDrawing(event) {

        if (castingCount >= 3) {
            return;
        }


        if (processingCast) {
            return;
        }


        event.preventDefault();


        drawing = true;

        points = [];


        traceContainer.classList.add(
            "drawing"
        );


        const position =
            getPosition(event);


        points.push(position);


        ctx.beginPath();


        ctx.moveTo(
            position.x,
            position.y
        );


        try {

            canvas.setPointerCapture(
                event.pointerId
            );

        } catch (error) {

        }
    }


    /* =========================================
       DRAW
    ========================================= */

    function draw(event) {

        if (!drawing) {
            return;
        }


        event.preventDefault();


        const position =
            getPosition(event);


        points.push(position);


        ctx.lineTo(
            position.x,
            position.y
        );


        ctx.stroke();


        ctx.beginPath();


        ctx.moveTo(
            position.x,
            position.y
        );
    }


    /* =========================================
       STOP DRAWING
    ========================================= */

    function stopDrawing(event) {

        if (!drawing) {
            return;
        }


        event.preventDefault();


        drawing = false;


        traceContainer.classList.remove(
            "drawing"
        );


        try {

            canvas.releasePointerCapture(
                event.pointerId
            );

        } catch (error) {

        }


        /* Too short */

        if (points.length < 15) {

            clearDrawing();


            testLog.textContent =
                translations[
                    currentLanguage
                ].traceShort;


            return;
        }


        checkTrace();
    }


    /* =========================================
       CLEAR DRAWING
    ========================================= */

    function clearDrawing() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        points = [];
    }


    /* =========================================
       CHECK TRACE
    ========================================= */

    function checkTrace() {

        if (processingCast) {
            return;
        }


        if (points.length === 0) {
            return;
        }


        const first =
            points[0];


        const last =
            points[points.length - 1];


        /* Find highest point */

        let highestPoint =
            points[0];


        for (
            let i = 1;
            i < points.length;
            i++
        ) {

            if (
                points[i].y <
                highestPoint.y
            ) {

                highestPoint =
                    points[i];
            }
        }


        /* Bottom-left */

        const validStart =
            first.x <= 150 &&
            first.y >= 140;


        /* Bottom-right */

        const validEnd =
            last.x >= 150 &&
            last.y >= 140;


        /* Top */

        const validTop =
            highestPoint.y <= 120;


        /* Result */

        if (
            validStart &&
            validEnd &&
            validTop
        ) {

            successfulCasting();

        } else {

            testLog.textContent =
                translations[
                    currentLanguage
                ].unstableTrace;


            outputText.textContent =
                translations[
                    currentLanguage
                ].failed;


            clearDrawing();
        }
    }


    /* =========================================
       SUCCESSFUL CAST
    ========================================= */

    function successfulCasting() {

        if (castingCount >= 3) {
            return;
        }


        processingCast = true;


        castingCount++;


        attemptCounter.textContent =
            castingCount + " / 3";


        clearDrawing();


        const t =
            translations[currentLanguage];


        /* =====================================
           FIRST CAST
        ===================================== */

        if (castingCount === 1) {

            testLog.textContent =
                t.castingOne;


            outputText.textContent =
                t.output18;


            classroom.classList.remove(
                "light-strong",
                "light-flicker"
            );


            classroom.classList.add(
                "light-weak"
            );


            setTimeout(
                function () {

                    classroom.classList.remove(
                        "light-weak"
                    );


                    processingCast =
                        false;


                    testLog.textContent =
                        translations[
                            currentLanguage
                        ].awaitingSecond;

                },
                2300
            );
        }


        /* =====================================
           SECOND CAST
        ===================================== */

        else if (
            castingCount === 2
        ) {

            testLog.textContent =
                t.castingTwo;


            outputText.textContent =
                t.output96;


            classroom.classList.remove(
                "light-weak",
                "light-flicker"
            );


            classroom.classList.add(
                "light-strong"
            );


            setTimeout(
                function () {

                    classroom.classList.remove(
                        "light-strong"
                    );


                    processingCast =
                        false;


                    testLog.textContent =
                        translations[
                            currentLanguage
                        ].awaitingThird;

                },
                3000
            );
        }


        /* =====================================
           THIRD CAST
        ===================================== */

        else if (
            castingCount === 3
        ) {

            testLog.textContent =
                t.castingThree;


            outputText.textContent =
                t.unstable;


            classroom.classList.remove(
                "light-weak",
                "light-strong"
            );


            classroom.classList.add(
                "light-flicker"
            );


            setTimeout(
                function () {

                    classroom.classList.remove(
                        "light-flicker"
                    );


                    processingCast =
                        false;


                    completeLumos();

                },
                4000
            );
        }
    }


    /* =========================================
       COMPLETE LUMOS
    ========================================= */

    function completeLumos() {

        localStorage.setItem(
            "lumosSolved",
            "true"
        );


        localStorage.setItem(
            "lumosUnlocked",
            "true"
        );


        localStorage.setItem(
            "potionUnlocked",
            "true"
        );


        castingCount = 3;


        attemptCounter.textContent =
            "3 / 3";


        caseOverlay.classList.remove(
            "hidden"
        );
    }


    /* =========================================
       CLOSE CASE
    ========================================= */

    closeCase.addEventListener(
        "click",
        function () {

            caseOverlay.classList.add(
                "hidden"
            );

        }
    );


    /* =========================================
       CLICK OUTSIDE CASE
    ========================================= */

    caseOverlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target === caseOverlay
            ) {

                caseOverlay.classList.add(
                    "hidden"
                );
            }
        }
    );


    /* =========================================
       ESC KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                caseOverlay.classList.add(
                    "hidden"
                );
            }
        }
    );


    /* =========================================
       PROCEED TO POTIONS
    ========================================= */

    finishBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "potion.html";

        }
    );


    /* =========================================
       RETURN TO INVESTIGATION
    ========================================= */

    returnInvestigation.addEventListener(
        "click",
        function () {

            window.location.href =
                "investigation.html";

        }
    );


    /* =========================================
       POINTER EVENTS
    ========================================= */

    canvas.addEventListener(
        "pointerdown",
        startDrawing
    );


    canvas.addEventListener(
        "pointermove",
        draw
    );


    canvas.addEventListener(
        "pointerup",
        stopDrawing
    );


    canvas.addEventListener(
        "pointercancel",
        stopDrawing
    );


    /* =========================================
       PREVENT RIGHT CLICK
    ========================================= */

    canvas.addEventListener(
        "contextmenu",
        function (event) {

            event.preventDefault();

        }
    );

});
