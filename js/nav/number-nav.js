// number-nav.js
import { isActuallyVisible } from "./keyboard-nav.js"

export function numNav({e}){
    if (/^[1-9]$/.test(e.key)) { // number handling
        let target
        const active = document.activeElement

        const topic = active.closest('.topic')
        if (!topic) return

        const topicSnips = topic.querySelector('.topic-snips')
        if (!topicSnips || topicSnips.classList.contains('hide')) return

        const snips = [...topicSnips.querySelectorAll('.snip')]
            .filter(isActuallyVisible)

        const index = Number(e.key) - 1
        const snip = snips[index]
        
        // if (!snip) return
        if (e.target.classList.contains('snip-title') || 
            e.target.classList.contains('topic-title')){
                target = snips[index].querySelector('.drop-down')

        }
        // prefer link → fallback to code
        // let target =
        //     snip.querySelector('.drop-down') ||
        //     snip.querySelector('.copy-code')
        // console.log(target)
        if (target) {
            e.preventDefault()
            target.focus()
            console.log("FOCUSING:", target)
            console.log("ACTIVE AFTER:", document.activeElement)
        }

        return
    }
}