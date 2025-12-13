export function initDarkMode(){
    const body = document.querySelector('body')
    const darkModeBtn = document.querySelector('#darkModeBtn')
    body.addEventListener('keydown', e => {
        let key = e.key.toLowerCase()
        if ((e.shiftKey && e.metaKey) && key === 'k'){
            console.log('here')
            toggleDarkMode()
        }
    });
    darkModeBtn.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        toggleDarkMode()
    });
    function toggleDarkMode(){
        body.classList.toggle('dark-mode')
    }

}