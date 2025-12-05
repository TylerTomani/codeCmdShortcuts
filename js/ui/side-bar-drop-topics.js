// import { sideBarTopicsAs } from "./injectPage.js";
export const sideBarTopicsAs = document.querySelectorAll('.side-bar-topics a')
sideBarTopicsAs.forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault()
        const liSideBarTopic = e.target.closest('li')
        const childUl = liSideBarTopic.querySelector('ul')        
        // childUl.classList.toggle('hide')
    })
})

function getSideBarTopics(parent){
    if(parent.classList.contains('side-bar-topics')){
        return parent
    } else if (parent.parentElement){
        return getSideBarTopics(parent.parentElement)
    } else {
        return null
    }
}

