// inject-content.js
import { initDropDowns, handleDropDown } from "../ui/drop-downs.js"
import { initCopyCodes } from "../copy-code.js"
import { initCollapseCode } from "../ui/collapse-code.js"

export const mainLandingPage =
    document.querySelector("#mainLandingPage")

const DEFAULT_PAGE =
    "topics/javascript-codeCmdShrt/javascript-codeCmdShrt.html"

const pageCache = new Map()

export function initInjectContentListeners() {

    const sideBar = document.querySelector(".side-bar-topics")

    // load default page
    injectPage({ href: DEFAULT_PAGE })

    // single sidebar listener
    sideBar.addEventListener("click", e => {

        const link = e.target.closest("a")
        if (!link) return

        e.preventDefault()

        handleDropDown(e)

        injectPage({
            href: link.getAttribute("href")
        })

    })

}

async function injectPage({ href }) {

    if (!href) return

    try {

        let html

        // page caching
        if (pageCache.has(href)) {
            html = pageCache.get(href)
        } else {
            const res = await fetch(href)
            html = await res.text()
            pageCache.set(href, html)
        }

        mainLandingPage.innerHTML = html

        // reinitialize page features
        initCopyCodes()
        initDropDowns()
        initCollapseCode()

    } catch (err) {

        console.error("Injection failed:", err)

    }

}