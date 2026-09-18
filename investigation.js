document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       ELEMENTS
    =============================== */

    const stabilityValue = document.getElementById("stabilityValue");

    const asterCase = document.getElementById("asterCase");

    const greenhouseCase = document.getElementById("greenhouseCase");
    const greenhouseState = document.getElementById("greenhouseState");
    const greenhouseStatus = document.getElementById("greenhouseStatus");

    const lumosCase = document.getElementById("lumosCase");
    const lumosState = document.getElementById("lumosState");

    const potionCase = document.getElementById("potionCase");
    const potionState = document.getElementById("potionState");


    /* ===============================
       MAGICAL STABILITY
    =============================== */

    function calculateMagicalStability() {

        let stability = 43;

        if (localStorage.getItem("asterSolved") === "true") {
            stability += 9;
        }

        if (localStorage.getItem("greenhouseSolved") === "true") {
            stability += 12;
        }

        if (localStorage.getItem("lumosSolved") === "true") {
            stability += 14;
        }

        if (localStorage.getItem("potionSolved") === "true") {
            stability += 13;
        }

        return stability;
    }


    function updateStability() {

        const stability = calculateMagicalStability();

        if (stabilityValue) {
            stabilityValue.textContent = stability + "%";
        }

        // Support any other stability elements if added later
        document.querySelectorAll(
            ".stability-value, #stabilityValue, .magical-stability-value"
        ).forEach(function (element) {
            element.textContent = stability + "%";
        });
    }


    /* ===============================
       CASE A — ASTER
    =============================== */

    function updateAster() {

        if (!asterCase) return;

        const solved =
            localStorage.getItem("asterSolved") === "true";

        if (solved) {

            asterCase.classList.remove("locked-case");
            asterCase.classList.add("open-case");
            asterCase.classList.add("solved");

        } else {

            asterCase.classList.add("open-case");
        }
    }


    /* ===============================
       CASE B — WOLFSBANE
    =============================== */

    function updateGreenhouse() {

        if (!greenhouseCase) return;

        const unlocked =
            localStorage.getItem("greenhouseUnlocked") === "true" ||
            localStorage.getItem("greenhouseSolved") === "true";

        const solved =
            localStorage.getItem("greenhouseSolved") === "true";


        if (unlocked) {

            // Remove locked appearance
            greenhouseCase.classList.remove("locked-case");
            greenhouseCase.classList.remove("locked");

            // Add open appearance
            greenhouseCase.classList.add("open-case");
            greenhouseCase.classList.add("unlocked");

            // Change lock icon to OPEN
            if (greenhouseState) {

                greenhouseState.textContent = "OPEN";
                greenhouseState.classList.remove("lock");
                greenhouseState.classList.add("case-state");

            }

            // Change status
            if (greenhouseStatus) {

                if (solved) {

                    greenhouseStatus.textContent = "SOLVED";
                    greenhouseStatus.classList.remove("mutated");
                    greenhouseStatus.classList.add("solved");

                } else {

                    greenhouseStatus.textContent = "OPEN";
                }
            }

        }
    }


    /* ===============================
       CASE C — LUMOS
    =============================== */

    function updateLumos() {

        if (!lumosCase) return;

        const unlocked =
            localStorage.getItem("lumosUnlocked") === "true" ||
            localStorage.getItem("greenhouseSolved") === "true";

        const solved =
            localStorage.getItem("lumosSolved") === "true";


        if (unlocked) {

            // Remove locked appearance
            lumosCase.classList.remove("locked-case");
            lumosCase.classList.remove("locked");

            // Add open appearance
            lumosCase.classList.add("open-case");
            lumosCase.classList.add("unlocked");


            // Change lock icon to OPEN
            if (lumosState) {

                lumosState.textContent = "OPEN";
                lumosState.classList.remove("lock");
                lumosState.classList.add("case-state");

            }


            // Change status
            const lumosStatus =
                lumosCase.querySelector(".case-status");

            if (lumosStatus) {

                if (solved) {

                    lumosStatus.textContent = "SOLVED";
                    lumosStatus.classList.remove("unstable");
                    lumosStatus.classList.add("solved");

                } else {

                    lumosStatus.textContent = "OPEN";
                }
            }


            // Make sure clicking it opens Lumos
            lumosCase.onclick = function () {
                window.location.href = "lumos.html";
            };

        }
    }


    /* ===============================
       CASE D — POTION
    =============================== */

    function updatePotion() {

        if (!potionCase) return;

        const unlocked =
            localStorage.getItem("potionUnlocked") === "true" ||
            localStorage.getItem("lumosSolved") === "true";

        const solved =
            localStorage.getItem("potionSolved") === "true";


        if (unlocked) {

            // Remove locked appearance
            potionCase.classList.remove("locked-case");
            potionCase.classList.remove("locked");

            // Add open appearance
            potionCase.classList.add("open-case");
            potionCase.classList.add("unlocked");


            // Change lock icon to OPEN
            if (potionState) {

                potionState.textContent = "OPEN";
                potionState.classList.remove("lock");
                potionState.classList.add("case-state");

            }


            // Change status
            const potionStatus =
                potionCase.querySelector(".case-status");

            if (potionStatus) {

                if (solved) {

                    potionStatus.textContent = "SOLVED";
                    potionStatus.classList.remove("unknown");
                    potionStatus.classList.add("solved");

                } else {

                    potionStatus.textContent = "OPEN";
                }
            }


            // Make sure clicking it opens Potion
            potionCase.onclick = function () {
                window.location.href = "potion.html";
            };

        }
    }


    /* ===============================
       UPDATE EVERYTHING
    =============================== */

    updateStability();
    updateAster();
    updateGreenhouse();
    updateLumos();
    updatePotion();

});