export function initCollapseCode(){
    const popupBtns = document.querySelectorAll('.popupBtn')
    popupBtns.forEach(el => {
        el.addEventListener('click', toggleCollapse)
    })

}
function toggleCollapse(el){
    console.log(el)
}