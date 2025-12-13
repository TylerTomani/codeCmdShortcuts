// inject-page.js
// import { letterFocus } from "./letter-focus-codeCmdShorts.js";
export const mainLandingPage = document.querySelector("#mainLandingPage");
const sideBarTopicsAs = document.querySelectorAll('.side-bar-topics a')
export function initInjectcontetListeners(){
    sideBarTopicsAs.forEach(el => {
        if(el.hasAttribute('autofocus')){
            injectPage(el.href)
        }
        el.addEventListener('click', e => {
            e.preventDefault()
            e.stopPropagation()
            injectPage(e.target.href)
        });
        el.addEventListener('keydown', e => {
            let key = e.key.toLowerCase()
            if(key === 'enter'){
                injectPage(e.target.href)
            }
        });
    })
}
export async function injectPage(href){
    try {
        const response = await fetch(href)
        const html = await response.text()
        mainLandingPage.innerHTML = html
    }catch {
        console.log('error try ')
    }
}