// inject-content.js
import { initDropDowns, handleDropDown } from "../ui/drop-downs.js";
import { initCopyCodes } from "../copy-code.js";
import { initCollapseCode } from "../ui/collapse-code.js";

export const mainLandingPage = document.querySelector("#mainLandingPage");
const DEFAULT_PAGE = "topics/javascript-codeCmdShrt/javascript-codeCmdShrt.html";
const pageCache = new Map();

export function initInjectContentListeners() {
    const sideBar = document.querySelector(".side-bar-topics");
    // Load default page
    injectPage(DEFAULT_PAGE);
    // Single sidebar listener
    sideBar.addEventListener("click", async (e) => {

        const link = e.target.closest("a")
        if (!link) return

        const href = link.getAttribute("href")

        console.log("clicked:", href)

        // DROPDOWN ONLY
        if (link.classList.contains("drop-down")) {
            handleDropDown(e)
            return
        }

        // PAGE NAVIGATION
        if (!href || href === "#") return

        e.preventDefault()

        console.log("Injecting:", href)

        await injectPage(href)

    })
}

async function injectPage(href) {
    if (!href) return;
    mainLandingPage.innerHTML = "";
    try {
        let html;
        // Use cached page if available
        if (pageCache.has(href)) {
            html = pageCache.get(href);
        } else {
            const res = await fetch(href);
            if (!res.ok) throw new Error(`Failed to fetch ${href}`);
            html = await res.text();
            pageCache.set(href, html);
        }
        mainLandingPage.innerHTML = html;
        // Reinitialize page features
        initCopyCodes();
        initDropDowns();
        initCollapseCode();
        // Scroll to top of main landing page
        mainLandingPage.scrollTo(0, 0);
    } catch (err) {
        console.error("Page injection failed:", err);
        mainLandingPage.innerHTML = `<p style="color:red;">Failed to load page: ${href}</p>`;
    }
}