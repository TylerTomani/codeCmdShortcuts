// drop-downs.js
function hideAllDropChildren(dropChilds) {
    dropChilds.forEach(el => {
        // console.log(el)
        // return    
    })
}
export function initDropDowns() {   
    if(!document.listenersAdded){

        document.addEventListener("click", handleToggle);
        document.addEventListener("keydown", handleToggle);
        document.listenersAdded = true
    }
    // const dropChilds = document.querySelectorAll('.code-cmd') ? document.querySelectorAll('.code-cmd') : document.querySelectorAll('.topic-snips')
    const dropDownChildren =  document.querySelectorAll('.topic-snips,.code-cmd')
    function handleToggle(e) {
        let target;        
        hideAllDropChildren(dropDownChildren)
        if (e.type === "keydown") {
            if ((e.key === "Enter" || e.key === " ") && document.activeElement.classList.contains("drop-down")) {
                e.preventDefault();
                target = document.activeElement;
                console.log(target)
            } else {
                return; // ignore other keys
            }
        } else if (e.type === "click") {
            // Ignore clicks triggered by keyboard
            if (e.detail === 0) return;
            target = e.target.closest(".drop-down");
            if (!target) return;
        }

        // Unified toggle logic
        const topic = target.closest(".topic");
        // console.log("Toggled dropdown:", topic);
        if(topic){
            toggleTopicSnips(topic)
        }
        if (!topic) return;
    }
}

function toggleTopicSnips(topic) {
    const topicSnips = topic.querySelector('.topic-snips,.code-cmd')
    // topicSnips.classList.toggle("collapsed"); // example toggle
    topicSnips.classList.toggle("hide"); // example toggle
}
