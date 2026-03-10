// main-script.js
import { buildSidebar } from "./build-sidebar.js";
import { initDarkMode } from "../dark-mode.js";
import { keyboardNav } from "../nav/keyboard-nav.js"
import { initInjectContentListeners } from "./inject-content.js";
import { initToggleSideBar } from "../ui/toggle-sidebar.js";
import { initDropDowns } from "../ui/drop-downs.js";
import { initCopyCodes } from "../copy-code.js";


addEventListener("DOMContentLoaded", initMain)

async function initMain() {

    await buildSidebar()   // MUST be first

    initInjectContentListeners()

    initCopyCodes()
    initToggleSideBar()
    initDarkMode()

    setupGlobalListeners()
}
export function setupGlobalListeners(){
    document.addEventListener('keydown', e => {
        keyboardNav({e})       
        
    })    
}

