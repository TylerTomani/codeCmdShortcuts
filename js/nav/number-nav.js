import { isActuallyVisible } from "./keyboard-nav.js"
export function numNav({e}){
    if (/^[1-9]$/.test(e.key)) { // number handling
        const active = document.activeElement

        const topic = active.closest('.topic')
        if (!topic) return

        const snipsContainer = topic.querySelector('.topic-snips')
        if (!snipsContainer || snipsContainer.classList.contains('hide')) return

        const snips = [...snipsContainer.querySelectorAll('.snip')]
            .filter(isActuallyVisible)

        const index = Number(e.key) - 1
        const snip = snips[index]
        if (!snip) return

        // prefer link → fallback to code
        const target =
            snip.querySelector('a, [tabindex]') ||
            snip.querySelector('.copy-code')

        if (target) {
            e.preventDefault()
            target.focus()
        }

        return
    }
}