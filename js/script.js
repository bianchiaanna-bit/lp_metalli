/* =========================================================
   LP METALLI — SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".intro, .work-item, .statement-text, .project, .process-step, .contact-cta"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

    }


    /* =====================================================
       2. HEADER — CAMBIO LEGGERO DURANTE LO SCROLL
    ===================================================== */

    const header = document.querySelector(".site-header");

    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 40) {
                header.classList.add("is-scrolled");
            } else {
                header.classList.remove("is-scrolled");
            }

        };

        updateHeader();

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });

    }


    /* =====================================================
       3. SMOOTH SCROLL PER I LINK INTERNI
    ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       4. EFFETTO PARALLASSE LEGGERO SULLA HERO
    ===================================================== */

    const heroImage = document.querySelector(".hero-image img");

    if (heroImage && window.matchMedia("(min-width: 901px)").matches) {

        let ticking = false;

        const updateHero = () => {

            const scrollY = window.scrollY;

            if (scrollY <= window.innerHeight) {

                const movement = scrollY * 0.08;

                heroImage.style.transform =
                    `scale(1.03) translateY(${movement}px)`;

            }

            ticking = false;

        };

        window.addEventListener("scroll", () => {

            if (!ticking) {
                window.requestAnimationFrame(updateHero);
                ticking = true;
            }

        }, {
            passive: true
        });

    }


    /* =====================================================
       5. NUMERI / PROGETTI
    ===================================================== */

    const projects = document.querySelectorAll(".project");

    projects.forEach((project, index) => {

        const meta = project.querySelector(".project-meta span:first-child");

        if (!meta) return;

        const number = String(index + 1).padStart(3, "0");

        meta.textContent = `LP / ${number}`;

    });


    /* =====================================================
       6. ANNO AUTOMATICO NEL FOOTER
    ===================================================== */

    const footerYear = document.querySelector(
        ".footer-bottom span:first-child"
    );

    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} LP Metalli`;

    }


    /* =====================================================
       7. HOVER SULLE LAVORAZIONI
       Piccolo movimento dell'immagine
    ===================================================== */

    const workItems = document.querySelectorAll(".work-item");

    workItems.forEach((item) => {

        const image = item.querySelector(".work-image img");

        if (!image) return;

        item.addEventListener("mouseenter", () => {
            image.style.transform = "scale(1.07)";
        });

        item.addEventListener("mouseleave", () => {
            image.style.transform = "scale(1)";
        });

    });


    /* =====================================================
       8. CURSORE / MICRO MOVIMENTO SUL CTA
    ===================================================== */

    const cta = document.querySelector(".contact-cta");

    if (
        cta &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        const ctaButton = cta.querySelector(".cta-button");

        if (ctaButton) {

            cta.addEventListener("mousemove", (event) => {

                const rect = cta.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) / rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) / rect.height - 0.5;

                ctaButton.style.transform =
                    `translate(${x * 8}px, ${y * 8}px)`;

            });

            cta.addEventListener("mouseleave", () => {

                ctaButton.style.transform =
                    "translate(0, 0)";

            });

        }

    }

});