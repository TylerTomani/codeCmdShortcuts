// drop-downs.js
export function initDropDowns() {   
    const snips = document.querySelectorAll('.snip')
    const codeCmds = document.querySelectorAll('.code-cmd')
    // hideEls(codeCmds)
    codeCmds.forEach(el => {
        el.classList.add('collapsed')
        // console.log(el)
    })
    // hideEls(snips)
    if(!document.listenersAdded){
        document.addEventListener("click", handleDropDown);
        document.addEventListener("keydown", handleDropDown);
        document.listenersAdded = true
    }
    // hideElsSnips(snips)
    function handleDropDown(e) {
        let target;        
        if (e.type === "keydown") {
            if (e.shiftKey){
                if (e.key === "Enter"){
                    e.preventDefault();
                    target = document.activeElement;
                }
            } else {
                if ((e.key === "Enter" || e.key === " ") && document.activeElement.classList.contains("drop-down")){    
                    target = document.activeElement;
                } else {
                    return; // ignore other keys
                }
            }
        } else if (e.type === "click") {
            // Ignore clicks triggered by keyboard
            if (e.detail === 0) return;
            target = e.target.closest(".drop-down");
            if (!target) return;
        }
        if(!target) return
        toggleSnips(target)
    }
    
    
}
function hideEls(els) {   
    els.forEach(el => {
        if(!el.classList.contains('show')){

            el.classList.add('hide')
        }
    })
}
// This all needs to be fixed
function toggleSnips(target){
    const dropParent = target.closest('.drop-parent')
    if(!dropParent) return
    const snips = dropParent.querySelector('.topic-snips') ? dropParent.querySelector('.topic-snips') : dropParent.querySelector('.code-cmd')
    snips?.classList.toggle('hide')
    console.log(snips)
    
}
