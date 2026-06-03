
/* ============================
   PDF TABLE RENDERING
============================ */

function renderPDFTable(id) {

    const tableBody = document.querySelector("#pdfTable tbody");
    tableBody.innerHTML = "";

    const files = pdfArchive[id]?.archive || [];

    if (!files.length) {
        tableBody.innerHTML = `<tr><td colspan="2">— لا توجد ملفات —</td></tr>`;
        return;
    }

    files.sort((a, b) => new Date(b.date) - new Date(a.date));

    files.forEach(f => {
        if (!f.url || !f.url.startsWith("http")) return;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${f.date}</td>
            <td><a href="${f.url}" target="_blank" class="pdf-icon">📄</a></td>
        `;
        tableBody.appendChild(tr);
    });
}

function renderMaintenancePDF(id) {

    const tableBody = document.querySelector("#maintenancePdfTable tbody");
    tableBody.innerHTML = "";

    const files = pdfArchive[id]?.maintenance || [];

    if (!files.length) {
        tableBody.innerHTML = `<tr><td colspan="2">— لا توجد ملفات صيانة —</td></tr>`;
        return;
    }

    files.sort((a, b) => new Date(b.date) - new Date(a.date));

    files.forEach(f => {
        if (!f.url || !f.url.startsWith("http")) return;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${f.date}</td>
            <td><a href="${f.url}" target="_blank" class="pdf-icon">🔧</a></td>
        `;
        tableBody.appendChild(tr);
    });
}

/* ============================
   INSPECTION ARCHIVE (SHOW ARCHIVE)
============================ */

function showArchive() {

    if (!selectedItem) {
        openPopup("تنبيه", "<p>الرجاء اختيار عنصر أولاً</p>");
        return;
    }

    const files = pdfArchive[selectedItem.id]?.archive || [];
    let rows = "";

    if (!files.length) {
        rows = `<tr><td colspan="2">— لا توجد ملفات —</td></tr>`;
    } else {

        files.sort((a, b) => new Date(b.date) - new Date(a.date));

        files.forEach(f => {
            if (!f.url || !f.url.startsWith("http")) return;

            rows += `
                <tr>
                    <td>${f.date || "-"}</td>
                    <td><a href="${f.url}" target="_blank" style="color:#38bdf8;">📄 View</a></td>
                </tr>
            `;
        });
    }

    const title = currentLang === "ar"
        ? `سجل الفحص - ${selectedItem.id}`
        : `Inspection Log - ${selectedItem.id}`;

    openPopup(
        title,
        `
        <div style="max-height:400px; overflow-y:auto;">
            <table class="pdf-table">
                <thead>
                    <tr>
                        <th>${currentLang === "ar" ? "التاريخ" : "Date"}</th>
                        <th>${currentLang === "ar" ? "الملف" : "File"}</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
        `
    );
}

/* ============================
   MAINTENANCE FILES
============================ */

function showMaintenance() {

    if (!selectedItem) {
        openPopup("تنبيه", "<p>الرجاء اختيار عنصر أولاً</p>");
        return;
    }

    const files = pdfArchive[selectedItem.id]?.maintenance || [];
    let rows = "";

    if (!files.length) {
        rows = `<tr><td colspan="2">— لا توجد ملفات صيانة —</td></tr>`;
    } else {

        files.sort((a, b) => new Date(b.date) - new Date(a.date));

        files.forEach(f => {
            if (!f.url || !f.url.startsWith("http")) return;

            rows += `
                <tr>
                    <td>${f.date || "-"}</td>
                    <td><a href="${f.url}" target="_blank" style="color:#22c55e;">🔧 View</a></td>
                </tr>
            `;
        });
    }

    const title = currentLang === "ar"
        ? `سجل الصيانة - ${selectedItem.id}`
        : `Maintenance Log - ${selectedItem.id}`;

    openPopup(
        title,
        `
        <div style="max-height:400px; overflow-y:auto;">
            <table class="pdf-table">
                <thead>
                    <tr>
                        <th>${currentLang === "ar" ? "التاريخ" : "Date"}</th>
                        <th>${currentLang === "ar" ? "الملف" : "File"}</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
        `
    );
}

/* ============================
   REPAIR REPORT ARCHIVE
============================ */

function openRepairArchive() {

    const title = currentLang === "ar"
        ? "سجل تقارير الإصلاح"
        : "Repair Report Archive";

    openPopup(
        title,
        `
        <h3 style="margin-bottom:10px;">Repair Report – PDF Archive</h3>

        <table class="pdf-table" style="margin-top:15px; width:100%;">
            <thead>
                <tr>
                    <th>${currentLang === "ar" ? "التاريخ" : "Date"}</th>
                    <th>${currentLang === "ar" ? "الملف" : "File"}</th>
                </tr>
            </thead>
            <tbody id="repairArchiveBody">
                <tr><td colspan="2">— No Files Available —</td></tr>
            </tbody>
        </table>
        `
    );
}
