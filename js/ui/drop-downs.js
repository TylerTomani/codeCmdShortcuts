// drop-downs.js

import { mainLandingPage } from "../core/inject-content.js";
export function initDropDowns() {

    // Show code commands
    getCodeCmds().forEach(cmd => {
        cmd.classList.add("show");
    });

    // Collapse code blocks
    collapseAll(getCodeContainers());
    
    // Hide dropdown snippets
    hideEls(getDropSnips());
    hideEls(getSideBarTopcsSub2Ul())

    // Add keyboard listener once
    if (!document.dropDownKeyListenerAdded) {

        document.addEventListener("keydown", handleKeyDown);

        document.dropDownKeyListenerAdded = true;
    }

    
}

// Utility queries
function getSideBarTopcsSub2Ul(){
    return document.querySelectorAll('ul.side-bar-topics > li > ul ')
}
function getCodeContainers() {
    return document.querySelectorAll(".code-container");
}

function getDropSnips() {
    return document.querySelectorAll(".drop-snips");
}

function getCodeCmds() {
    return document.querySelectorAll(".code-cmd");
}


// Helpers
function collapseAll(els) {
    if (!els) return;
    els.forEach(el => {
        el.classList.add("collapse");
    });
}

function hideEls(els) {
    if (!els) return;
    els.forEach(el => {
        if (!el.classList.contains("show")) {
            el.classList.add("hide");
        }
    });
}

function toggleVisibility(el) {
    if (!el) return;
    el.classList.toggle("hide");
}
// Sidebar dropdown toggle

export function toggleSidebarDropdown(ul) {
    if(ul.closest('.topic')) return
    
    if (!ul) return;
    ul.classList.toggle("hide");

}


// Code snippet collapse shortcut

export function toggleCollapsedCode(target) {

    const snip =
        target.closest(".snip");

    if (!snip) return;

    const codeContainer =
        snip.querySelector(".code-container");

    if (!codeContainer) return;

    if (codeContainer.classList.contains("hide")) {
        codeContainer.classList.remove("hide");
    }

    codeContainer.classList.toggle("collapse");

}


// Initialization

// Keyboard handler

function handleKeyDown(e) {
    const key = e.key.toLowerCase()
    const target = document.activeElement;
    // Shift + Cmd + Enter -> toggle code snippet
    if (e.shiftKey && e.metaKey && key === "enter") {

        e.preventDefault();

        toggleCollapsedCode(target);

        return;
    }
    // Enter on dropdown elements
    if (key === "enter") {
        if(e.target.closest('li') && e.target.classList.contains('drop-down')){
            e.preventDefault()
            const li = e.target.closest('li')
            const dropUl = li.querySelector(' ul')
            
            toggleSidebarDropdown(dropUl)
        }
        const dropParent =
            target.closest(".drop-parent");

        if (dropParent) {

            e.preventDefault();

            const dropSnips =
                dropParent.querySelector(".drop-snips");

            if (dropSnips) {
                toggleVisibility(dropSnips);
            }

            return;
        }

    }
    // Shift + Enter -> focus main landing page
    if (key === "enter" && e.shiftKey && target.closest(".side-bar")) {

        mainLandingPage.focus();

        mainLandingPage.scrollTo(0, 0);
    }
}