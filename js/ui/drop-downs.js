// drop-downs.js
export function initDropDowns() {   
    const snips = document.querySelectorAll('.snip')
    const codeCmds = document.querySelectorAll('.code-cmd')
    collapseCode(codeCmds)
    // hideEls(codeCmds)
    if(!document.listenersAdded){
        document.addEventListener("click", handleDropDown);
        document.addEventListener("keydown", handleDropDown);
        document.listenersAdded = true
    }
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
        } else {
        }
    })
}
function collapseCode(els){els.forEach(el => el.classList.add('collapsed'))}
// This all needs to be fixed
function toggleSnips(target){

    // This is a mess, i need to think of how to handle .topic-title drop down and .snip > .drop-down
    const dropParent = target.closest('.drop-parent')
    if(!dropParent) return
    const topicSnips = dropParent.querySelector('.topic-snips')
    const snip = dropParent.querySelector('.snip')
    // const codeCmd = dropParent.querySelector('.code-cmd')
    if(snip){
        console.log(snip)
        // console.log(codeCmd.innerText)
        // codeCmd?.classList.toggle('hide')
        return
    } else {

        topicSnips?.classList.toggle('hide')
    }
    
}
