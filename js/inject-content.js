// inject-page.js
// import { letterFocus } from "./letter-focus-codeCmdShorts.js";
export const mainLandingPage = document.querySelector("#mainLandingPage");
const sideBarTopicsAs = document.querySelectorAll('.side-bar-topics a')
import { initDropDowns } from "./ui/drop-downs.js";
export function initInjectcontetListeners(){
    sideBarTopicsAs.forEach(el => {
        if(el.hasAttribute('autofocus')){
            const href = el.href
            injectPage({href })
        }
        el.addEventListener('click', e => {
            e.preventDefault()
            e.stopPropagation()
            const href = e.target.href
            injectPage({href})
        });
        el.addEventListener('keydown', e => {
            let key = e.key.toLowerCase()
            if(key === 'enter'){
                const href = e.target.href
                injectPage({href})
            }
        });
    })
}
export async function injectPage({href}){
    try {
        const response = await fetch(href)
        const html = await response.text()
        mainLandingPage.innerHTML = html
        initDropDowns()
    }catch {
        console.log('error try ')
    }
}