export function initDarkMode(){
    const body = document.querySelector('body')
    body.addEventListener('keydown', e => {
        let key = e.key.toLowerCase()
        if ((e.shiftKey && e.metaKey) && key === 'k'){
            console.log('here')
            toggleDarkMode()
        }
    });
    function toggleDarkMode(){
        body.classList.toggle('dark-mode')
    }

}