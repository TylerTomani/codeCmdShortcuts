// toggle-sidebar.js
const sideBar = document.querySelector('.page-wrapper > aside.side-bar')
export const pageWrapper = document.querySelector('.page-wrapper')
export const sideBarBtn = document.querySelector('#sideBarBtn')

export function initToggleSideBar() {
    function toggleSidebar(e) {
        const isSidebarClick =
            e.currentTarget === sideBar && e.target === sideBar

        const isButtonClick =
            e.currentTarget === sideBarBtn

        if (!isSidebarClick && !isButtonClick) return

        pageWrapper.classList.toggle('collapsed')
    }

    sideBar.addEventListener('click', toggleSidebar)
    sideBarBtn.addEventListener('click', toggleSidebar)
    sideBarBtn.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault()
            pageWrapper.classList.toggle('collapsed')
        }
    })
}
