document.addEventListener("DOMContentLoaded", () => {

    const englishBtn =
        document.getElementById("englishBtn");

    const arabicBtn =
        document.getElementById("arabicBtn");

    const elements =
        document.querySelectorAll("[data-en]");

    const enterButton =
        document.getElementById("enterButton");


    function setLanguage(language) {

        elements.forEach(element => {

            element.textContent =
                element.dataset[language];

        });


        if (language === "ar") {

            document.documentElement.lang = "ar";

            document.body.classList.add("arabic");

            arabicBtn.classList.add("active");
            englishBtn.classList.remove("active");

        } else {

            document.documentElement.lang = "en";

            document.body.classList.remove("arabic");

            englishBtn.classList.add("active");
            arabicBtn.classList.remove("active");

        }

    }


    englishBtn.addEventListener(
        "click",
        () => setLanguage("en")
    );


    arabicBtn.addEventListener(
        "click",
        () => setLanguage("ar")
    );


    enterButton.addEventListener("click", () => {

        enterButton.classList.add("loading");

        enterButton.querySelector("strong").textContent =
            document.body.classList.contains("arabic")
                ? "جاري فتح ملف القضية..."
                : "ACCESSING CASE FILE...";


        setTimeout(() => {

            window.location.href =
                "investigation.html";

        }, 900);

    });

});
