let lastLetterPressed = null
import { pageWrapper,sideBarBtn } from "../ui/toggle-sidebar.js"
export function keyboardNav({ e }) {
    const key = (e.key || '').toLowerCase()
    if (!key.match(/^[a-z]$/)) return // only handle letters
    // all visible anchors (same as you had)
    const allEls = [...document.querySelectorAll('a,#sideBarBtn,#mainContent')].filter(el => {
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
    const iActiveAll = allEls.indexOf(activeEl) // position of focused element among all anchors
    const iActiveMatching = matching.indexOf(activeEl) // -1 if focused element is not one of the matches
    let newIndex
    // --- NEW letter press: choose closest match below unless one is directly before (closer) ---
    if (key !== lastLetterPressed) {
        // if there's no active element inside anchors, fallback to first/last
        if (iActiveAll === -1) {
            newIndex = e.shiftKey ? matching.length - 1 : 0
        } else {
            // find nearest matching element ABOVE the active element (lower index)
            let aboveEl = null
            let aboveIdxAll = -1
            for (let i = iActiveAll - 1; i >= 0; i--) {
                if (matching.includes(allEls[i])) {
                    aboveEl = allEls[i]
                    aboveIdxAll = i
                    break
                }
            }

            // find nearest matching element BELOW the active element (higher index)
            let belowEl = null
            let belowIdxAll = -1
            for (let i = iActiveAll + 1; i < allEls.length; i++) {
                if (matching.includes(allEls[i])) {
                    belowEl = allEls[i]
                    belowIdxAll = i
                    break
                }
            }

            if (aboveEl && belowEl) {
                // choose whichever is closer; if tie, choose above (you said "directly before" has priority)
                const distAbove = iActiveAll - aboveIdxAll
                const distBelow = belowIdxAll - iActiveAll
                newIndex = (distAbove <= distBelow)
                    ? matching.indexOf(aboveEl)
                    : matching.indexOf(belowEl)
            } else if (aboveEl) {
                newIndex = matching.indexOf(aboveEl)
            } else if (belowEl) {
                newIndex = matching.indexOf(belowEl)
            } else {
                // no above/below found (edge) -> fallback
                newIndex = e.shiftKey ? matching.length - 1 : 0
            }
        }

        // --- Same letter pressed repeatedly: cycle through matching items ---
    } else {
        if (iActiveMatching === -1) {
            // currently focused element is not one of the matching elements
            newIndex = e.shiftKey ? matching.length - 1 : 0
        } else {
            newIndex = e.shiftKey
                ? (iActiveMatching - 1 + matching.length) % matching.length
                : (iActiveMatching + 1) % matching.length
        }
    }
    const target = matching[newIndex]
    if (!target) return
    if (target.id === 'mainContent'){
        scrollTo(0,0)
    }
    if(target == sideBarBtn && pageWrapper.classList.contains('collapsed')){
        pageWrapper.classList.remove('collapsed')
    }
    // let fZone = focusZones(target)
    // console.log(fZone)
    target.focus()
    lastLetterPressed = key
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