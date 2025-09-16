// inject-pag
// import { letterFocus } from "./letter-focus-codeCmdShorts.js";
import { keyboardNav } from "./nav/keyboard-nav.js";
import { addCopyCodes } from "./copy-code.js";
import { initDropDowns } from "./ui/drop-downs.js";
export const sideBarTopicsAs = document.querySelectorAll('.side-bar-topics a')
const homeHref = './home-codeCmdShrt.html'
let loaded = false;

export const mainLandingPage = document.querySelector("#mainLandingPage");

export function injectPage(href) {
    fetch(href)
        .then((response) => response.text())
        .then((html) => {
            mainLandingPage.innerHTML = html;
            addCopyCodes()
            // Find the first focusable element in the injected content
            const firstFocusable = mainLandingPage.querySelector("a,[id],input,textarea,[tabindex]:not([tabindex='-1'])");
            firstFocusable?.focus();
        })
        .catch((err) => console.error("Failed to load page:", err));
}

sideBarTopicsAs.forEach((a) => {
    if(a.hasAttribute('autofocus')){
        injectPage(a.href)
    }
    a.addEventListener("click", (e) => {
        e.preventDefault();
        injectPage(a.href);
        initDropDowns()
        const innerPageTitle = document.querySelector(".main-content-title");
        if (innerPageTitle) innerPageTitle.innerHTML = a.innerHTML;
    });
    a.addEventListener("keydown", (e) => {
        let key = e.key.toLowerCase()
        if(key === 'enter'){
            initDropDowns()
            injectPage(a.href);
        }

        const innerPageTitle = document.querySelector(".main-content-title");
        if (innerPageTitle) innerPageTitle.innerHTML = a.innerHTML;
    });
});

// injectPage.js (or inside your injectPage module)
