// keyboard-nav.js
let lastLetterPressed = null
import { main, pageWrapper,sideBarBtn } from "../ui/toggle-sidebar.js"
import { letterNav } from "./letter-nav.js"
import { numNav } from "./number-nav.js"
export function keyboardNav({ e, mainContentEls }) {
    const key = (e.key || '').toLowerCase()
    // this exit clause ensures going to previous element if right before on dropdowns in mainTopcContainer
    // **** Special Cases For This Script
    if(key === 'enter'){
        if (e.target.id === 'mainTopicsContainer' ){
            const mainContent = document.querySelector('#mainContent')
            mainContent.scrollIntoView({ 
                behavior: 'smooth' , 
                block: 'nearest',
                inline: 'start'})
        }
        return
    }
    if (/^[1-9]$/.test(e.key)) { // number handling
        numNav({e})
    }
    if (!key.match(/^[a-z]$/)) {return} // only handle letters    
    // *****
    
    letterNav({e})    
}
export function isActuallyVisible(el) {
    if (!el) return false;
    // 1. Sidebar collapsed → block ALL sidebar descendants
    if (
        pageWrapper.classList.contains('collapsed') &&
        el.closest('.side-bar')
    ) {
        return false;
    }
    // 2. CSS visibility checks
    const style = getComputedStyle(el);
    if (
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        style.opacity === '0'
    ) {
        return false;
    }
    // 3. Zero-size or clipped
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
        return false;
    }
    // 4. Any hidden ancestor (dropdowns, containers, etc.)
    let parent = el.parentElement;
    while (parent) {
        const ps = getComputedStyle(parent);
        if (ps.display === 'none' || ps.visibility === 'hidden') {
            return false;
        }
        parent = parent.parentElement;
    }

    return true;
}
