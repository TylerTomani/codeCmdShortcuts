const sideBar = document.querySelector('.page-wrapper > aside.side-bar')
const pageWrapper = document.querySelector('.page-wrapper')
export const sideBarBtn = document.querySelector('#sideBarBtn')
export function initToggleSideBar(){
    function toggleSidebar(e) {
        e.preventDefault()
        console.log('here')
        pageWrapper.classList.toggle('collapsed')
    }
    sideBar.addEventListener('click', e => {
        if(!e.target.tagName != 'ASIDE') return
        toggleSidebar(e)
    })
    sideBarBtn.addEventListener('click', e => {
        hideSideBar()
    })

    sideBarBtn.addEventListener('keydown', e => {
        // console.log('here')
        if (e.key === 'Enter'){
            console.log(pageWrapper)
            toggleSidebar(e)
        } 
    })

    function hideSideBar(e){
        pageWrapper.classList.toggle('hidden')
    }
}