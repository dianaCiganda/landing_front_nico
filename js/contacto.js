 // ===== MENÚ MÓVIL =====
        document.addEventListener("DOMContentLoaded", function () {
            const toggleBtn = document.getElementById("menu-toggle");
            const mobileMenu = document.getElementById("mobile-menu");

            if (toggleBtn && mobileMenu) {
                toggleBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    mobileMenu.classList.toggle("active");
                });

                mobileMenu.querySelectorAll("a, button").forEach(function (el) {
                    el.addEventListener("click", function () {
                        mobileMenu.classList.remove("active");
                    });
                });
            }
        });