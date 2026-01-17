// تحميل الأقسام
async function loadSection(id, file) {
    const section = await fetch(file);
    const html = await section.text();
    document.getElementById(id).innerHTML = html;
}

// تحميل كل الأقسام
loadSection("navbar", "sections/navbar.html");
loadSection("hero", "sections/hero.html");
loadSection("services", "sections/services.html");
loadSection("whyus", "sections/whyus.html");
loadSection("products", "sections/products.html");
loadSection("templates", "sections/templates.html");
loadSection("footer", "sections/footer.html");
loadSection("request", "sections/request.html");
// تفعيل الأنيميشن عند التمرير
function reveal() {
    const reveals = document.querySelectorAll(".reveal");

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
setTimeout(reveal, 500);
function openRequest() {
    document.getElementById("requestPopup").style.display = "flex";
}

function closeRequest() {
    document.getElementById("requestPopup").style.display = "none";
}
function sendRequest() {
    let service = document.getElementById("reqService").value;

    // معالجة خيار "أخرى"
    if (service === "other") {
        service = document.getElementById("otherService").value || "أخرى";
    }

    const name = document.getElementById("reqName").value;
    const phone = document.getElementById("reqPhone").value;
    const details = document.getElementById("reqDetails").value;

    if (!name || !phone) {
        alert("الرجاء تعبئة الاسم ورقم التواصل");
        return;
    }

    // إنشاء الطلب
    const request = {
        name,
        phone,
        service,
        details,
        date: new Date().toLocaleString()
    };

    // قراءة الطلبات القديمة
    let allRequests = JSON.parse(localStorage.getItem("requests") || "[]");

    // إضافة الطلب الجديد
    allRequests.push(request);

    // حفظ الطلبات
    localStorage.setItem("requests", JSON.stringify(allRequests));

    // فتح نافذة النجاح الفخمة
    document.getElementById("successPopup").style.display = "flex";

    // تفريغ الحقول
    document.getElementById("reqName").value = "";
    document.getElementById("reqPhone").value = "";
    document.getElementById("reqService").value = "";
    document.getElementById("otherService").value = "";
    document.getElementById("reqDetails").value = "";
    document.getElementById("otherServiceBox").style.display = "none";

    // إغلاق نافذة الطلب
    closeRequest();
}
window.closeSuccess = function () {
    document.getElementById("successPopup").style.display = "none";
};