// drop-downs.js

export function initDropDowns() {   
    const subTopics = document.querySelectorAll('.side-bar-topics > ul')
    hideAllCodeCmds()
    hideAllSubTopics(subTopics)
    if(!document.listenersAdded){
        document.addEventListener("click", handleToggle);
        document.addEventListener("keydown", handleToggle);
        document.listenersAdded = true
    }
    // const dropChilds = document.querySelectorAll('.code-cmd') ? document.querySelectorAll('.code-cmd') : document.querySelectorAll('.topic-snips')
    
    function handleToggle(e) {
        let target;        
        if (e.type === "keydown") {
            if (e.shiftKey){
                if (e.key === "Enter"){
                    e.preventDefault();
                    target = document.activeElement;
                }
            } else {
                if ((e.key === "Enter" || e.key === " ") && (document.activeElement.classList.contains("drop-down") || document.activeElement.classList.contains("drop-code-cmd"))) {
                    
                    target = document.activeElement;
                } else {
                    return; // ignore other keys
                }
            }
        } else if (e.type === "click") {
            // Ignore clicks triggered by keyboard
            if (e.detail === 0) return;
            target = e.target.closest(".drop-down") || e.target.closest(".drop-code-cmd");
            if (!target) return;
        }
        if(!target) return
        const topic = target.closest(".topic");
        console.log(topic)
        const topicSnips = topic.querySelector('.topic-snips')
        toggleSnips(topicSnips)
        
    }
}

function toggleCodeSnips(snip) {
    const codeCmd = snip.querySelector('.code-cmd')
    codeCmd.classList.toggle('hide')

}
function hideAllCodeCmds() {
    const codeCmds = document.querySelectorAll('.code-cmd')    
    codeCmds.forEach(el => {
        if(!el.classList.contains('show')){
            el.classList.add('hide')
        }
    })
}
function hideAllSubTopics(subTopics) {
    subTopics.forEach(el => {
        if(!el.classList.contains('show')){
            el.classList.add('hide')
        }
    })
}
function toggleSnips(snips){
    snips.classList.toggle('hide')
}
