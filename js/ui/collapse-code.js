export function initCollapseCode(){
    const popupBtns = document.querySelectorAll('.popup-btn')
    popupBtns.forEach(el => {
        el.addEventListener('click', toggleCollapse)
    })

}
function toggleCollapse(e){
    console.log(e.target)
    
    const snip = e.target.closest('.snip')
    const codeContainer = snip.querySelector('.code-container')
    codeContainer.classList.toggle('collapse')
}