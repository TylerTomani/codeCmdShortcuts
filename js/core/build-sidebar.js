// build-sidebar.js
export async function buildSidebar() {

    const container =
        document.querySelector(".side-bar-topics")

    const res =
        await fetch("data/side-bar-topics.json")

    const data = await res.json()

    container.innerHTML = ""

    data.topics.forEach(topic => {
        container.appendChild(buildItem(topic))
    })

}

function buildItem(item) {

    const li = document.createElement("li")

    const a = document.createElement("a")
    a.setAttribute("tabindex", "0");

    a.textContent = item.title
    a.href = item.href || "#"

    if (item.id) {
        a.id = item.id
    }

    if (item.items) {
        a.classList.add("drop-down")
    }

    li.appendChild(a)

    if (item.items && item.items.length) {

        const ul = document.createElement("ul")

        item.items.forEach(child => {
            ul.appendChild(buildItem(child))
        })

        li.appendChild(ul)

    }

    return li
}