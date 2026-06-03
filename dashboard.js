
/* ============================
   REPORTS POPUP (LINE / MATCHING / DOCUMENTS)
============================ */

function openLineReports() {

    const title = currentLang === "ar" ? "تقارير الخطوط" : "Line Reports";

    const content = `
        <h3>${currentLang === "ar" ? "نظرة عامة على تقارير الخطوط" : "Line Reports Overview"}</h3>
        <p>${currentLang === "ar"
            ? "هذا القسم سيحتوي على تقارير تفصيلية لكل خط."
            : "This section will contain detailed reports for each ID Line."}</p>

        <ul style="margin-top:10px; line-height:1.8;">
            <li>✔ ${currentLang === "ar" ? "أداء الخط" : "Line performance"}</li>
            <li>✔ ${currentLang === "ar" ? "كميات الصب" : "Pouring quantities"}</li>
            <li>✔ ${currentLang === "ar" ? "استخدام SPB" : "SPB usage"}</li>
            <li>✔ ${currentLang === "ar" ? "توزيع المضخات" : "Pump distribution"}</li>
        </ul>
    `;

    openPopup(title, content);
}

function openMatching() {

    const title = currentLang === "ar" ? "المطابقة" : "Matching";

    const content = `
        <h3>${currentLang === "ar" ? "نظام المطابقة" : "Matching System"}</h3>
        <p>${currentLang === "ar"
            ? "هذا القسم سيحتوي على بيانات المطابقة بين المضخات والخطوط ووحدات SPB."
            : "This section will include matching data between pumps, lines, and SPB units."}</p>

        <ul style="margin-top:10px; line-height:1.8;">
            <li>✔ ${currentLang === "ar" ? "مطابقة المضخة مع الخط" : "Pump to Line Matching"}</li>
            <li>✔ ${currentLang === "ar" ? "مطابقة SPB مع الموقع" : "SPB to Location Matching"}</li>
            <li>✔ ${currentLang === "ar" ? "التحقق من تسلسل الصب" : "Pouring Sequence Validation"}</li>
        </ul>
    `;

    openPopup(title, content);
}

function openDocuments() {

    const title = currentLang === "ar" ? "المستندات" : "Documents";

    const content = `
        <h3>${currentLang === "ar" ? "أرشيف المستندات" : "Documents Archive"}</h3>
        <p>${currentLang === "ar"
            ? "هذا القسم سيحتوي على جميع المستندات والملفات المتعلقة بالنظام."
            : "This section will contain all related documents and PDF files."}</p>

        <ul style="margin-top:10px; line-height:1.8;">
            <li>✔ ${currentLang === "ar" ? "المستندات الفنية" : "Technical Documents"}</li>
            <li>✔ ${currentLang === "ar" ? "شهادات السلامة" : "Safety Certificates"}</li>
            <li>✔ ${currentLang === "ar" ? "تقارير الفحص" : "Inspection Reports"}</li>
        </ul>
    `;

    openPopup(title, content);
}

/* ============================
   DAILY POURS (TIMELINE)
============================ */

function renderDailyPours(dailyPours) {

    let dailyHTML = "";

    dailyPours.forEach(p => {
        dailyHTML += `
            <div style="margin:6px 0;">
                <div>${p.date} — ${p.qty} m³</div>
                <div style="height:14px; background:#1e293b;">
                    <div style="width:${(p.qty / 600) * 100}%; height:100%; background:#0ea5e9;"></div>
                </div>
            </div>
        `;
    });

    document.getElementById("dailyChart").innerHTML = dailyHTML;
}

/* ============================
   BAR CHART (GENERIC)
============================ */

function barChart(containerId, data, color) {

    const container = document.getElementById(containerId);
    if (!container) return;

    let html = "";

    Object.keys(data).forEach(key => {
        const value = data[key];
        const percent = (value / Math.max(...Object.values(data))) * 100;

        html += `
            <div style="margin:6px 0;">
                <div>${key}: ${value}</div>
                <div style="height:14px; background:#1e293b;">
                    <div style="width:${percent}%; height:100%; background:${color};"></div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

/* ============================
   ZOOM + PAN FOR SVG
============================ */

let currentScale = 0.5;
let currentTranslate = { x: 0, y: 0 };
let isPanning = false;
let startPan = { x: 0, y: 0 };

const svgContainer = document.getElementById("svgContainer");
const svgWrapper = document.getElementById("svgWrapper");

function updateTransform() {
    svgContainer.style.transform =
        `translate(${currentTranslate.x}px, ${currentTranslate.y}px) scale(${currentScale})`;
}

svgWrapper.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    currentScale = Math.min(2.0, Math.max(0.7, currentScale + delta));
    updateTransform();
});

svgWrapper.addEventListener("mousedown", (e) => {
    isPanning = true;
    startPan = { x: e.clientX - currentTranslate.x, y: e.clientY - currentTranslate.y };
});

window.addEventListener("mousemove", (e) => {
    if (!isPanning) return;
    currentTranslate.x = e.clientX - startPan.x;
    currentTranslate.y = e.clientY - startPan.y;
    updateTransform();
});

window.addEventListener("mouseup", () => {
    isPanning = false;
});
