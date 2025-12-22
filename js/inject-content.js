// inject-page.js
// import { letterFocus } from "./letter-focus-codeCmdShorts.js";
export const mainLandingPage = document.querySelector("#mainLandingPage");
const sideBarTopicsAs = document.querySelectorAll('.side-bar-topics a')
const homeAside = document.querySelector('#homeAside')
import { initDropDowns } from "./ui/drop-downs.js";
export function initInjectcontetListeners(){
    let href
    sideBarTopicsAs.forEach(el => {
        if(el.hasAttribute('autofocus')){
            href = el.href
            injectPage({href})
        } else {
            href = homeAside.href
            injectPage({href})
            return
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