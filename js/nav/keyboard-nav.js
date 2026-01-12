// keyboard-nav.js
let lastLetterPressed = null
import { main, pageWrapper,sideBarBtn } from "../ui/toggle-sidebar.js"

export function keyboardNav({ e, mainContentEls }) {
    const key = (e.key || '').toLowerCase()
    if (!key.match(/^[a-z]$/)) return // only handle letters    
    // all visible anchors (same as you had)
    
    // const allEls = [...document.querySelectorAll('a,#sideBarBtn,.main-topics-container,#darkModeBtn,#findSearchBar')].filter(el => {
    // // // // // // // // // // // // // // // // // // // 
    //** make command shift + f , focus to #findSearchBar */
    const allEls = [...document.querySelectorAll('a,#sideBarBtn,#mainTopicsContainer,#darkModeBtn,#chatGptMyLink,#programShortcutsLink')].filter(el => {
        const rect = el.getBoundingClientRect()
        if(!el.hasAttribute('tabindex')){
            el.setAttribute('tabindex', '0')
        }
        return isActuallyVisible(el)
    })
    
    // helper: return the first alphabetic character of the element's text (or '')
    /** this with add tabinddex above in allEls makes this Future Full Proof (FFP) */
    const firstAlpha = el => {
        // If element is NOT an anchor, use its ID  
        // This makes sense, in FUTURE, if element is NOT an 'A' tag, add Id and use on elements
        
        if (el.tagName !== 'A') {
            const id = (el.id || '').trim().toLowerCase()
            for (let i = 0; i < id.length; i++) {
                const ch = id[i]
                if (/[a-z]/.test(ch)) return ch
            }
            return ''
        }
        // Regular <a> text logic
        const s = (el.innerText || '').trim().toLowerCase()
        for (let i = 0; i < s.length; i++) {
            if (/[a-z]/.test(s[i])) return s[i]
        }
        return ''
    }
    // matching anchors whose first alpha char equals the pressed key
    // const matching = allEls.filter(el => firstAlpha(el) === key)
    const matching = allEls.filter(el =>{ 
        return firstAlpha(el) === key
    })
    // matching.forEach(el => console.log(el))
    if (matching.length === 0) return
    const activeEl = document.activeElement
    let iActiveAll = allEls.indexOf(activeEl) // position of focused element among all anchors
    const iActiveMatching = matching.indexOf(activeEl) // -1 if focused element is not one of the matches
    let newIndex

    if (e.metaKey && e.shiftKey && key === 's') {
        if (e.target != sideBarBtn) {
            sideBarBtn.focus()
        } 
        if(e.target === sideBarBtn){
            /** This is NOT WORKING */
            // e.preventDefault()
            
            const mainTopicsContainer = document.querySelector('#mainTopicsContainer')
            console.log(mainTopicsContainer)
            mainTopicsContainer.focus()
            
            // const mainTopicsContainer = document.querySelector('#mainTopicsContainer')
            // console.log(mainTopicsContainer)
            // mainTopicsConttainer?.focus()
        }
        return
    }
    if (key === 'm' && activeEl?.id === 'mainTopicsContainer') {
        e.preventDefault()
        // mainTopicsContainer.scrollIntoView({ top: 0, behavior: 'smooth' })
        console.log(allEls.findIndex('mainTopicsContainer'))
        lastLetterPressed = key
        return
    }


    if(e.metaKey) return
    // --- NEW letter press: choose closest match below unless one is directly before (closer) ---
    if (key !== lastLetterPressed) {
        if (iActiveAll === -1) {
            // nothing focused: pick first/last
            newIndex = e.shiftKey ? matching.length - 1 : 0
        } else {
            const prevEl = allEls[iActiveAll - 1]  // the element directly before
            const nextEl = allEls[iActiveAll + 1]  // the element directly after

            // if the previous element matches the letter, go up one
            if (prevEl && matching.includes(prevEl)) {
                newIndex = matching.indexOf(prevEl)
            } else {
                // otherwise go to the next matching element after current focus
                let foundNext = false
                for (let i = iActiveAll + 1; i < allEls.length; i++) {
                    if (matching.includes(allEls[i])) {
                        newIndex = matching.indexOf(allEls[i])
                        foundNext = true
                        break
                    }
                }
                if (!foundNext) {
                    // fallback to first matching if nothing found below
                    newIndex = 0
                }
            }
        }
    }else {
        if (iActiveMatching === -1) {
            // currently focused element is not one of the matching elements
            newIndex = e.shiftKey ? matching.length - 1 : 0
        } else {
            newIndex = e.shiftKey
                ? (iActiveMatching - 1 + matching.length) % matching.length
                : (iActiveMatching + 1) % matching.length
        }
    }
    let target = matching[newIndex]
    if (!target) return
    lastLetterPressed = key
    // if(e.shiftKey && !e.target.classList.contains('copy-code')){
    //     console.log(allEls[iActiveAll].innerText[0])
    //     console.log()
    //     target.focus()
    //     if (key == allEls[iActiveAll].innerText[0].toLowerCase()){
    //         console.log('here', iActiveAll)
    //         iActiveAll += 1
            
    //     }
    //     target = allEls[iActiveAll]
    // }   
    target.focus()
}
function isActuallyVisible(el) {
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
