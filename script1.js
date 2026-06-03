// =========================
//   TRANSLATIONS
// =========================
const translations = {
    ar: {
        active: "نشط",
        standby: "جاهز",
        idle: "خامل",
        distributor: "موزع",
        line: "خط",
        pump: "مضخة",
        catalog: "الكتلوج",
        spec: "المواصفات"
    },
    en: {
        active: "Active",
        standby: "Ready",
        idle: "Idle",
        distributor: "Distributor",
        line: "Line",
        pump: "Pump",
        catalog: "Catalog",
        spec: "Specification"
    }
};

let currentLang = "ar";

// =========================
//   DATA
// =========================

// Pumps
const pumps = [
    { id: "SP1", name: "8800126", catalog: "SP1-catalog.pdf", spec: "SP1-spec.pdf" },
    { id: "SP2", name: "8800121", catalog: "SP2-catalog.pdf", spec: "SP2-spec.pdf" },
    { id: "SP3", name: "8800124", catalog: "SP3-catalog.pdf", spec: "SP3-spec.pdf" },
    { id: "SP4", name: "8800127", catalog: "SP4-catalog.pdf", spec: "SP4-spec.pdf" }
];

// Lines
const lines = [
    { id: "L1", name: "L1", mode: "ACTIVE", catalog: "L1-catalog.pdf", spec: "L1-spec.pdf" },
    { id: "L2", name: "L2", mode: "STANDBY", catalog: "L2-catalog.pdf", spec: "L2-spec.pdf" },
    { id: "L3", name: "L3", mode: "IDLE", catalog: "L3-spec.pdf", spec: "L3-spec.pdf" },
    { id: "L4", name: "L4", mode: "STANDBY", catalog: "L4-catalog.pdf", spec: "L4-spec.pdf" },
    { id: "L5", name: "L5", mode: "ACTIVE", catalog: "L5-catalog.pdf", spec: "L5-spec.pdf" },
    { id: "L6", name: "L6", mode: "IDLE", catalog: "L6-catalog.pdf", spec: "L6-spec.pdf" }
];

// Distributors
const distributors = [
    { id: "Wing C", name: "320043", catalog: "WC-catalog.pdf", spec: "WC-spec.pdf" },
    { id: "Center core 1", name: "320050", catalog: "CC1-catalog.pdf", spec: "CC1-spec.pdf" },
    { id: "Center core 2", name: "320051", catalog: "CC2-catalog.pdf", spec: "CC2-spec.pdf" },
    { id: "Wing A", name: "320049", catalog: "WA-catalog.pdf", spec: "WA-spec.pdf" },
    { id: "Wing B", name: "320048", catalog: "WB-catalog.pdf", spec: "WB-spec.pdf" }
];

// =========================
//   SHOW DETAILS
// =========================
function showDetails(type, id) {
    let obj;

    if (type === "pump") obj = pumps.find(p => p.id === id);
    if (type === "line") obj = lines.find(l => l.id === id);
    if (type === "distributor") obj = distributors.find(d => d.id === id);

    if (!obj) return;

    const t = translations[currentLang];

    document.getElementById("details-content").innerHTML = `
        <strong>${t[type]}:</strong> ${obj.name}<br>
        <strong>ID:</strong> ${obj.id}<br>

        <div class="doc-icons">
            <div class="doc-btn" onclick="window.open('${obj.catalog}', '_blank')">
                <div>📘</div>
                <span>${t.catalog}</span>
            </div>

            <div class="doc-btn" onclick="window.open('${obj.spec}', '_blank')">
                <div>📑</div>
                <span>${t.spec}</span>
            </div>
        </div>
    `;
}

// =========================
//   EVENT LISTENERS
// =========================
document.querySelectorAll(".pump").forEach(el => {
    el.addEventListener("click", () => showDetails("pump", el.dataset.id));
});

document.querySelectorAll(".line-box").forEach(el => {
    el.addEventListener("click", () => showDetails("line", el.dataset.id));
});

document.querySelectorAll(".distributor").forEach(el => {
    el.addEventListener("click", () => showDetails("distributor", el.dataset.id));
});
