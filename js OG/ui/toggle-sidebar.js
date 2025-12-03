const sideBar = document.querySelector('.page-wrapper > aside.side-bar')
export const sideBarBtn = document.querySelector('#sideBarBtn')
export function initToggleSideBar(){
function toggleSidebar(e) {
    e.preventDefault()
    sideBar.classList.toggle('collapsed')
}
sideBar.addEventListener('click', e => {
    if(!e.target.tagName != 'ASIDE') return
    toggleSidebar(e)
})
sideBarBtn.addEventListener('click', e => {
    hideSideBar()
})

sideBarBtn.addEventListener('keydown', e => {
    
    if (e.key === 'Enter') hideSideBar(e)
})

function hideSideBar(e){
    sideBar.classList.toggle('hidden')
}
}