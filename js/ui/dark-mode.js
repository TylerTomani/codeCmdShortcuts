export function initDarkMode(){
    const body = document.querySelector('body') 
    body.addEventListener('keydown', e => {
        let key = e.key.toLowerCase()
        if(e.shiftKey && key === 'k'){
            toggleDarkMode()
        }
    });
    function toggleDarkMode(){
        body.classList.toggle('dark-mode')
    }
}