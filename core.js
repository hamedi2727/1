
/* ============================
   CORE SYSTEM VARIABLES
============================ */

let currentLang = "en";
let selectedItem = null;

/* ============================
   SHOW DETAILS
============================ */

function showDetails(id, type) {

    selectedItem = { id, type };

    document.getElementById("detailName").textContent = id;
    document.getElementById("detailInfo").innerHTML = `<p>${type}</p>`;

    // تحديث روابط الملفات داخل dataset
    document.getElementById("btnInsuranceFile").dataset.url = pdfArchive[id]?.insurance || "";
    document.getElementById("btnSpecsFile").dataset.url = pdfArchive[id]?.specs || "";
    document.getElementById("btnManualFile").dataset.url = pdfArchive[id]?.manual || "";

    renderPDFTable(id);
    renderMaintenancePDF(id);
}

/* ============================
   DATE & TIME
============================ */

function updateDateTime() {
    const now = new Date();
    document.getElementById("dateTime").textContent =
        now.toLocaleString(currentLang === "ar" ? "ar-EG" : "en-GB");
}

setInterval(updateDateTime, 1000);
updateDateTime();

/* ============================
   LANGUAGE SWITCH
============================ */

document.getElementById("langAr").onclick = () => {
    currentLang = "ar";
    applyLanguage();
};

document.getElementById("langEn").onclick = () => {
    currentLang = "en";
    applyLanguage();
};

function applyLanguage() {

    if (currentLang === "ar") {
        document.body.dir = "rtl";

        document.getElementById("mapTitle").textContent = "المخطط الهندسي";
        document.getElementById("legendActive").textContent = "نشط";
        document.getElementById("legendStandby").textContent = "جاهز";
        document.getElementById("legendIdle").textContent = "خامل";

        document.getElementById("pdfDateHeader").textContent = "التاريخ";
        document.getElementById("pdfFileHeader").textContent = "الملف";

        document.getElementById("langAr").classList.add("active");
        document.getElementById("langEn").classList.remove("active");
    }

    else {
        document.body.dir = "ltr";

        document.getElementById("mapTitle").textContent = "Schematic System of Operations";
        document.getElementById("legendActive").textContent = "Active";
        document.getElementById("legendStandby").textContent = "Ready";
        document.getElementById("legendIdle").textContent = "Idle";

        document.getElementById("pdfDateHeader").textContent = "Date";
        document.getElementById("pdfFileHeader").textContent = "File";

        document.getElementById("langEn").classList.add("active");
        document.getElementById("langAr").classList.remove("active");
    }

    updateDateTime();
}
