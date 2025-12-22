// keyboard-nav.js
let lastLetterPressed = null
import { pageWrapper,sideBarBtn } from "../ui/toggle-sidebar.js"

export function keyboardNav({ e, mainContentEls }) {
    const key = (e.key || '').toLowerCase()
    if (!key.match(/^[a-z]$/)) return // only handle letters    
    // all visible anchors (same as you had)
    const allEls = [...document.querySelectorAll('a,#sideBarBtn,#mainContent,#darkModeBtn,[id]')].filter(el => {
        const rect = el.getBoundingClientRect()
        return rect && rect.width > 0 && rect.height > 0
    })
    // helper: return the first alphabetic character of the element's text (or '')
    const firstAlpha = el => {
        // If element is NOT an anchor, use its ID  
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
    const matching = allEls.filter(el => firstAlpha(el) === key)
    if (matching.length === 0) return
    const activeEl = document.activeElement
    let iActiveAll = allEls.indexOf(activeEl) // position of focused element among all anchors
    const iActiveMatching = matching.indexOf(activeEl) // -1 if focused element is not one of the matches
    let newIndex

    if (key === 'm' && activeEl?.id === 'mainContent') {
        e.preventDefault()
        pageWrapper.scrollIntoView({ top: 0, behavior: 'smooth' })
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
    
    let fZone = focusZones(target)
    if (target == sideBarBtn) {
        fZone = 'sidebar'
        pageWrapper.classList.remove('collapsed')
    }


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
function focusZones(target){
    const t = target
    let focusZone
    if (t.id == 'mainContent'){
        focusZone = 'mainContent'
    } else if (t.closest('.side-bar') ){
        focusZone = 'sideBar'
    }
    // switch (t){
    //     case target.id === 'mainContent':
    //         return focusZone = 'mainContent'
    //         break
        // case target.
    // }
    return focusZone
}