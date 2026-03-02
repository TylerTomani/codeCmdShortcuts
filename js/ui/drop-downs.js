// drop-downs.js
// Almost Done fix toggling subSideBarTopics
const sub2SideBarTopics = document.querySelectorAll('ul.side-bar-topics > li > ul > li > ul')
import { mainLandingPage } from "../inject-content.js";
// const codeContainer
export function initDropDowns() {   
    // const dropDown = document.querySelectorAll('.drop-down')
    // const dropSnips = document.querySelectorAll('.drop-snips')
    if(!document.listenersAdded){
        document.addEventListener("click", handleDropDown);
        // document.addEventListener("click", e => {
        //     console.log('why')
        // });
        document.addEventListener("keydown", handleDropDown);
        document.listenersAdded = true
        hideEls(sub2SideBarTopics)
    }
    // hideEls(dropSnips)
    
}

export function handleDropDown(e) {
    const snip = e.target.closest('.snip')
    if(e.type === 'click'){
        let target = e.target;
        if (snip) {
            const codeContainer = snip.querySelector('.code-container')
            codeContainer.classList.toggle('hide')
        }
        // check if clicked element is drop-down or inside one
        if (!target.classList.contains("drop-down")) {
            target = target.closest(".drop-down");
        }
        // if (!target) return;

        // prevent navigation for sidebar dropdowns
        // if (target.closest('.side-bar')) {

        //     e.preventDefault();
        // }

        toggleSnips(target);
        
    }
    if (e.shiftKey && e.metaKey && 
        e.key.toLowerCase() === 'enter'){
            e.preventDefault()
            collapsedCode(e.target)
    }

    let target;
    if(e.target.classList.contains('.side-bar')) {
        if (e.type === "keydown") {
            if (e.shiftKey && e.key.toLowerCase() === 'enter') {
                // mainC
                mainLandingPage.focus()
                mainLandingPage.scrollTo(0,0)
                
            }
        }
        return
    }
    if (e.type === "keydown" && !e.shiftKey || !e.metaKey) {
        if(snip){ return}
        if ((e.key === "Enter" || e.key === " ") &&
            document.activeElement.classList.contains("drop-down")) {
            e.preventDefault(); // THIS stops the synthetic click
            target = document.activeElement;
        } else {
            // return;
        }
    } else if (e.type === "click") {
      
    }

    if (!target) return
    toggleSnips(target)
}
function toggleSnips(dropDown) {
    // SIDEBAR DROPDOWN
    if(!dropDown) return
    if (dropDown.closest('.side-bar')) {
        const li = dropDown.parentElement;
        const ul = li?.querySelector(':scope > ul');
        if (!ul) return;

        ul.classList.toggle('hide');
        return;
    }

    // CONTENT DROPDOWN (github page etc.)
    const dropParent = dropDown.closest('.drop-parent');
    const dropSnips = dropParent?.querySelector('.drop-snips');
    if (!dropSnips) return;

    dropSnips.classList.toggle('hide');
}
function hideEls(els) {   
    els.forEach(el => {
        if(!el.classList.contains('show')){
            el.classList.add('hide')
        } else {
        }
    })
}
// function collapseCode(els){els.forEach(el => el.classList.add('collapsed'))}
// This all needs to be fixed

function collapsedCode(target){
    const snip = target.closest('.snip')
    const codeContainer = snip.querySelector('.code-container')
    const copyCode = snip.querySelector('.copy-code')
    if(codeContainer.classList.contains('hide')){
        codeContainer.classList.remove('hide')
    }
    copyCode.classList.toggle('collapse')
}