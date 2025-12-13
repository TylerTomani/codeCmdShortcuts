// main-script.js
import { initDarkMode } from "./dark-mode.js";
import { keyboardNav } from "./nav/keyboard-nav.js"
import { initInjectcontetListeners } from "./inject-content.js";
import { initToggleSideBar } from "./ui/toggle-sidebar.js";
import { initDropDowns } from "./ui/drop-downs.js";

function initMain(){
    initInjectcontetListeners()
    initToggleSideBar()
    initDropDowns()
    initDarkMode()
}
export function setupGlobalListeners(){
    document.addEventListener('keydown', e => {
        keyboardNav({e})       

    })    
}
initMain()
setupGlobalListeners()