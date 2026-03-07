// drop-downs.js
// Almost Done fix toggling subSideBarTopics
const sub2SideBarTopics = document.querySelectorAll('ul.side-bar-topics > li > ul > li > ul')
function updateDropSnips() {
    return document.querySelectorAll('.drop-snips')
}
import { mainLandingPage } from "../../core/inject-content.js";
export function initDropDowns() {   
    // const dropDown = document.querySelectorAll('.drop-down')
    const codeContainers = document.querySelectorAll('.code-container')
    const dropSnips = updateDropSnips()
    if(!document.listenersAdded){
        document.addEventListener("click", e => {
            handleDropDown(e,dropSnips)
        });
        // document.addEventListener("click", e => {
        //     console.log('why')
        // });
        document.addEventListener("keydown", handleDropDown);
        document.listenersAdded = true
        hideEls(sub2SideBarTopics)
    }
    collapseAll(codeContainers)
    hideEls(dropSnips)
    
}
export function handleDropDown(e) {
    if(e.type === 'click'){
        let target = e.target;
        if(e.target.classList.contains('copy-code')){
            return
        }
        if (!e.target.classList.contains("drop-down")) {
            target = e.target.closest(".drop-down");
        }
        
        if (!target) return
        if (target.closest('.side-bar')) {
            e.preventDefault()
            const li = target.parentElement;
            const ul = li?.querySelector(':scope > ul');
            if (!ul) return;
            toggleVisiblitiy(ul)
            return;
        }        
        if(e.target.closest('.drop-parent')){
            const dropParent = e.target.closest('.drop-parent')
            const target = dropParent.querySelector('.drop-snips')
            toggleVisiblitiy(target)
        }
        // Meaning it's a topic drop down
        if(!target.closest('.snip')){
            hideEls
            console.log('.topic not snip')
        }
        // prevent navigation for sidebar dropdowns

        return
    }
    if (e.type === "keydown") {
        let target;
        const key = e.key.toLowerCase()
        if (e.shiftKey && e.metaKey && key === 'enter') {
            e.preventDefault()
            toggleCollapsedCode(e.target)
        }
        if(key === 'enter'){
            if(e.target.classList.contains('.side-bar')) {
                if (e.shiftKey && key === 'enter') {
                    mainLandingPage.focus()
                    mainLandingPage.scrollTo(0,0)
                }
                if (!e.shiftKey || !e.metaKey) {
                    if (snip) { return }
                    if ((e.key === "Enter" || e.key === " ") &&
                        document.activeElement.classList.contains("drop-down")) {
                        e.preventDefault(); // THIS stops the synthetic click
                        target = document.activeElement;
                    } 
                } 
            }
        }
        if (!target) return
        toggleVisiblitiy(target)
    }
    

}
function toggleVisiblitiy(target){
    target.classList.toggle('hide');
}
// function toggleVisiblitiy(dropDown) {
//     // SIDEBAR DROPDOWN
//     if(!dropDown) return
//     if (dropDown.closest('.side-bar')) {
//         const li = dropDown.parentElement;
//         const ul = li?.querySelector(':scope > ul');
//         if (!ul) return;

//         ul.classList.toggle('hide');
//         return;
//     }
//     // CONTENT DROPDOWN (github page, javscript page , all -codeCmdShrt etc.)
//     const dropParent = dropDown.closest('.drop-parent');
//     console.log(dropParent)
//     if(dropParent.classList.contains('topic')){
//         const topicSnips = dropParent.querySelector('.topic-snips')
//         topicSnips.classList.toggle('hide')
//     }
//     const snip = dropDown.closest('.snip')
//     if(snip){
        
//     }
// }
function toggleVisiblity(target) {
    target.classList.toggle('hide');
}
// function toggleD
function hideEls(els) {   
    if(!els) return
    els.forEach(el => {
        if(!el.classList.contains('show')){
            el.classList.add('hide')
        }
    })
}
function collapseAll(els){
    if(!els) return
    els.forEach(el => {
        el.classList.add('collapse')
    })
}
// function collapseCode(els){els.forEach(el => el.classList.add('collapsed'))}
// This all needs to be fixed
export function toggleCollapsedCode(target){
    const snip = target.closest('.snip')
    const codeContainer = snip.querySelector('.code-container')
    const copyCode = snip.querySelector('.copy-code')
    if(codeContainer.classList.contains('hide')){
        codeContainer.classList.remove('hide')
    }
    codeContainer.classList.toggle('collapse')
}