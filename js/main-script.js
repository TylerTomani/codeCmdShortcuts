// main-script.js
import { keyboardNav } from "./nav/keyboard-nav.js"
import { initInjectcontetListeners } from "./inject-content.js";
import { initToggleSideBar } from "./ui/toggle-sidebar.js";

function initMain(){
    initInjectcontetListeners()
    initToggleSideBar()
}
export function setupGlobalListeners(){
    document.addEventListener('keydown', e => {
        keyboardNav({e})       
    })    
}
initMain()
setupGlobalListeners()