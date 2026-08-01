"use strict";

const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuLinks = mobileMenu.querySelectorAll("a");
const mobileBreakpoint = window.matchMedia("(max-width: 1100px)");

function setMenuState(isOpen, returnFocus = false) {
    siteHeader.classList.toggle("is-menu-open", isOpen);
    document.body.classList.toggle("is-menu-open", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu",
    );
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    mobileMenu.inert = !isOpen;

    if (returnFocus) {
        menuToggle.focus();
    }
}

function closeMenu(returnFocus = false) {
    setMenuState(false, returnFocus);
}

menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    setMenuState(isOpen);
});

mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => closeMenu());
});

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        siteHeader.classList.contains("is-menu-open")
    ) {
        closeMenu(true);
    }
});

mobileBreakpoint.addEventListener("change", (event) => {
    if (!event.matches) {
        closeMenu();
    }
});
