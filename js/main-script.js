// main-script.js
import { keyboardNav } from "./nav/keyboard-nav.js"
import { initInjectcontetListeners } from "./inject-content.js";
function initMain(){
    initInjectcontetListeners()
}
export function setupGlobalListeners(){
    document.addEventListener('keydown', e => {
        keyboardNav({e})       
    })    
}
initMain()
setupGlobalListeners()