// inject-page.js
// import { letterFocus } from "./letter-focus-codeCmdShorts.js";
export const mainLandingPage = document.querySelector("#mainLandingPage");
const sideBarTopicsAs = document.querySelectorAll('.side-bar-topics a')
const homeAside = document.querySelector('#homeAside')
import { initDropDowns,handleDropDown } from "./ui/drop-downs.js";
export function initInjectcontetListeners(){
    let href
    href = homeAside.href
    injectPage({ href })
    sideBarTopicsAs.forEach(el => {
        if(el.hasAttribute('autofocus')){
            href = el.href
            injectPage({href})
        }
        
        // Unified pointer event for desktop & mobile
        el.addEventListener('pointerdown', e => {
            // Only primary pointer (mouse left button or finger)
            if (e.pointerType === 'mouse' || e.pointerType === 'touch') {
                e.preventDefault();      // prevent default navigation
                e.stopPropagation();     // stop bubbling

                handleDropDown(e);       // toggle the dropdown

                if (el.href) {           // inject page for this link
                    injectPage({ href: el.href });
                }
            }
        });
        el.addEventListener('keydown', e => {
            let key = e.key.toLowerCase()
            
            if(key === 'enter'){
                if (!e.shiftKey){
                    const href = e.target.href
                    injectPage({href})
                } else {
                    e.preventDefault()

                    const href = e.target.href
                    injectPage({
                        href,
                        focusMain: e.shiftKey
                    })
                }
            }
        });
    })
}
export async function injectPage({ href, focusMain = false }) {
    try {
        const response = await fetch(href)
        const html = await response.text()
        mainLandingPage.innerHTML = html
        initDropDowns()

        if (focusMain) {
            requestAnimationFrame(() => {
                const mainTopics = document.querySelector('#mainTopicsContainer')
                if (mainTopics) {
                    mainTopics.focus()
                }
            })
        }
    } catch {
        console.log('error try')
    }
}