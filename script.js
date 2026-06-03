// بيانات المضخات
const pumps = [
    { id: 1, name: "Pump A", model: "X100", serial: "SN-001", image: "https://via.placeholder.com/300" },
    { id: 2, name: "Pump B", model: "X200", serial: "SN-002", image: "https://via.placeholder.com/300" }
];

// بيانات الخطوط
const lines = [
    { id: 1, number: "L-01", pipes: 12, type: "PVC", elbows: 4, supports: 6 },
    { id: 2, number: "L-02", pipes: 20, type: "Steel", elbows: 8, supports: 10 }
];

// بيانات الأبوم
const abooms = [
    { id: 1, number: "A-01", specs: "أبوم رئيسي", floor: "الدور 3" },
    { id: 2, number: "A-02", specs: "أبوم فرعي", floor: "الدور 5" }
];


// عرض الأقسام
function showSection(section) {
    document.querySelectorAll(".page-section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(section).classList.remove("hidden");
}

// تعبئة بطاقات المضخات
function loadPumps() {
    pumps.forEach(p => {
        document.getElementById("pumpsList").innerHTML += `
            <div class="card" onclick="showDetails('pump', ${p.id})">
                <img src="${p.image}">
                <h3>${p.name}</h3>
                <p>موديل: ${p.model}</p>
            </div>`;
    });
}

// تعبئة جدول الخطوط
function loadLines() {
    lines.forEach(l => {
        document.getElementById("linesTable").innerHTML += `
            <tr onclick="showDetails('line', ${l.id})">
                <td>${l.number}</td>
                <td>${l.pipes}</td>
                <td>${l.type}</td>
                <td>${l.elbows}</td>
                <td>${l.supports}</td>
            </tr>`;
    });
}

// تعبئة جدول الأبوم
function loadAbooms() {
    abooms.forEach(a => {
        document.getElementById("aboomsTable").innerHTML += `
            <tr onclick="showDetails('aboom', ${a.id})">
                <td>${a.number}</td>
                <td>${a.specs}</td>
                <td>${a.floor}</td>
            </tr>`;
    });
}

loadPumps();
loadLines();
loadAbooms();


// عرض التفاصيل
function showDetails(type, id) {
    let item;
    if (type === "pump") item = pumps.find(p => p.id === id);
    if (type === "line") item = lines.find(l => l.id === id);
    if (type === "aboom") item = abooms.find(a => a.id === id);

    let html = "";

    if (type === "pump") {
        html = `
            <h2>${item.name}</h2>
            <img src="${item.image}" style="width:300px;border-radius:10px;">
            <p>الموديل: ${item.model}</p>
            <p>الرقم الأصلي: ${item.serial}</p>
             <p>الرقم العام: ${item.sSl}</p>
        `;
    }

    if (type === "line") {
        html = `
            <h2>خط ${item.number}</h2>
            <p>عدد المواسير: ${item.pipes}</p>
            <p>نوع المواسير: ${item.type}</p>
            <p>عدد اليوهات: ${item.elbows}</p>
            <p>عدد الكراسي: ${item.supports}</p>
        `;
    }

    if (type === "aboom") {
        html = `
            <h2>أبوم ${item.number}</h2>
            <p>المواصفات: ${item.specs}</p>
            <p>الطابق: ${item.floor}</p>
        `;
    }

    document.getElementById("detailsContent").innerHTML = html;
    document.getElementById("detailsModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("detailsModal").classList.add("hidden");
}