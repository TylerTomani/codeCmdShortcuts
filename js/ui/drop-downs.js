// drop-downs.js
// Almost Done fix toggling subSideBarTopics
const sub2SideBarTopics = document.querySelectorAll('ul.side-bar-topics > li > ul > li > ul')
export function initDropDowns() {   
    const dropDown = document.querySelectorAll('.drop-down')
    if(!document.listenersAdded){
        document.addEventListener("click", handleDropDown);
        // document.addEventListener("click", e => {
        //     console.log('why')
        // });
        document.addEventListener("keydown", handleDropDown);
        hideEls(sub2SideBarTopics)
        document.listenersAdded = true
    }
    
}
export function handleDropDown(e) {
    let target;
    if (e.type === "keydown") {
        if ((e.key === "Enter" || e.key === " ") &&
            document.activeElement.classList.contains("drop-down")) {
                console.log('here')
            e.preventDefault(); // THIS stops the synthetic click
            target = document.activeElement;
        } else {
            return;
        }
    } else if (e.type === "click") {
        console.log('why')
        console.log('NOT FIRING HERE')
        let target = e.target;
        // check if clicked element is drop-down or inside one
        if (!target.classList.contains("drop-down")) {
            target = target.closest(".drop-down");
        }
        if (!target) return;

        // prevent navigation for sidebar dropdowns
        if (target.closest('.side-bar')) e.preventDefault();

        toggleSnips(target);
    }

    if (!target) return
    toggleSnips(target)
}
function toggleSnips(dropDown) {
    // SIDEBAR DROPDOWN
    if (dropDown.closest('.side-bar')) {
        const li = dropDown.parentElement;
        const ul = li?.querySelector(':scope > ul');
        if (!ul) return;

        ul.classList.toggle('hide');
        return;
    }

    // CONTENT DROPDOWN (github page etc.)
    const dropParent = dropDown.closest('.drop-parent');
    const ul = dropParent?.querySelector('.topic-snips');
    if (!ul) return;

    ul.classList.toggle('hide');
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

