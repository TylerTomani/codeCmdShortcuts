// inject-page.js
// import { letterFocus } from "./letter-focus-codeCmdShorts.js";
export const mainLandingPage = document.querySelector("#mainLandingPage");
const sideBarTopicsAs = document.querySelectorAll('.side-bar-topics a')
const homeAside = document.querySelector('#homeAside')
import { initDropDowns,handleDropDown } from "./ui/drop-downs.js";
export function initInjectcontetListeners(){
    let href
    // href = homeAside.href
    injectPage({ href })
    sideBarTopicsAs.forEach(el => {
        if(el.hasAttribute('autofocus')){
            href = el.href
            injectPage({href})
        }
        
 {       el.addEventListener('click', e => {
            e.preventDefault()
            e.stopPropagation()
            const href = e.target.href
            handleDropDown(e)
            injectPage({href})
        });
        el.addEventListener('pointerdown', e => {
            
            handleDropDown(e)
        });}
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
 async function injectPage({ href, focusMain = false }) {
     if(!href ){
        // href = 'home.html'
         href = 'topics/javascript-codeCmdShrt/javascript-codeCmdShrt.html'

    }
    try {
        const response = await fetch(href)
        const html = await response.text()
        mainLandingPage.innerHTML = html
        initDropDowns()

        const mainTopicsContainer = document.querySelector('#mainTopicsContainer')
        const mainTopicEls = mainTopicsContainer.querySelectorAll('a,[id]')
        if(mainTopicsContainer){
            // mainTo
        }
        if(mainTopicEls){
            mainTopicEls.forEach(el => {
                if(el.classList.contains('FocusEL')){
                    el.focus()
                    // return
                }
            })
        }

        // if (focusMain) {
        //     requestAnimationFrame(() => {
        //         const mainTopicsContainer = document.querySelector('#mainTopicsContainer')
        //         if (mainTopicsContainer) {
        
        //             mainTopicsContainer.focus()
        //         }
        //     })
        // }
    } catch {
        console.log('error try')
    }
}