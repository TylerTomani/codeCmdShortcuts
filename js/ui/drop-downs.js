// drop-downs.js
export function initDropDowns() {   
    const subTopics = document.querySelectorAll('.side-bar-topics > ul')
    if(!document.listenersAdded){
        document.addEventListener("click", handleDropDown);
        document.addEventListener("keydown", handleDropDown);
        document.listenersAdded = true
    }
    // const dropChilds = document.querySelectorAll('.code-cmd') ? document.querySelectorAll('.code-cmd') : document.querySelectorAll('.topic-snips')
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
function hideAllSnips(subTopics) {   
}
// send 
function toggleSnips(target){
    const dropParent = target.closest('.drop-parent')
    const snips = dropParent.querySelector('.topic-snips') ? dropParent.querySelector('.topic-snips') : dropParent.querySelector('.code-cmd')
    snips.classList.toggle('hide')
    
}
