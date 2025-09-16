// drop-downs.js

export function initDropDowns() {   
    hideAllCodeCmds()
    if(!document.listenersAdded){

        document.addEventListener("click", handleToggle);
        document.addEventListener("keydown", handleToggle);
        document.listenersAdded = true
    }
    // const dropChilds = document.querySelectorAll('.code-cmd') ? document.querySelectorAll('.code-cmd') : document.querySelectorAll('.topic-snips')
    
    function handleToggle(e) {
        let target;        
        if (e.type === "keydown") {
            if ((e.key === "Enter" || e.key === " ") && (document.activeElement.classList.contains("drop-down") || document.activeElement.classList.contains("drop-code-cmd"))) {
                e.preventDefault();
                target = document.activeElement;
            } else {
                return; // ignore other keys
            }
        } else if (e.type === "click") {
            // Ignore clicks triggered by keyboard
            if (e.detail === 0) return;
            target = e.target.closest(".drop-down") || e.target.closest(".drop-code-cmd");
            if (!target) return;
        }

        // Unified toggle logic
        const topic = target.closest(".topic");
        const snip = target.closest(".snip");
        // console.log("Toggled dropdown:", topic);
        // if (!topic || !snip) return;
        console.log(snip)
        if (snip){
            toggleCodeSnips(snip)
            return
        } 
        if(topic){
            toggleTopicSnips(topic)
            return 
        } 
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
function toggleTopicSnips(topic) {
    const topicSnips = topic.querySelector('.topic-snips')
    topicSnips.classList.toggle("hide"); // example toggle
}
