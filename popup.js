/* ============================
   POPUP WINDOW
============================ */

function openPopup(title, content) {

    document.getElementById("popupTitle").textContent = title;
    document.getElementById("popupContent").innerHTML = content;

    document.getElementById("popupOverlay").style.display = "block";
    document.getElementById("popupWindow").style.display = "block";
}

function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
    document.getElementById("popupWindow").style.display = "none";
}

/* ============================
   PDF VIEWER
============================ */

function openPdfViewer(url, title = "PDF Viewer") {

    // حماية من الروابط الفارغة
    if (!url || url.trim() === "") {
        openPopup(
            title,
            `<p style="text-align:center; padding:20px;">لا يوجد ملف متاح للعرض</p>`
        );
        return;
    }

    const viewerUrl =
        `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;

    openPopup(
        title,
        `
        <iframe src="${viewerUrl}" style="
            width:100%;
            height:500px;
            border:none;
            border-radius:8px;
            background:#fff;
        "></iframe>
        `
    );
}

