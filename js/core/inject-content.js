// inject-content.js
import { initDropDowns, toggleSidebarDropdown } from "../ui/drop-downs.js";
import { initCopyCodes } from "../copy-code.js";
import { initCollapseCode } from "../ui/collapse-code.js";
export const mainLandingPage =
    document.querySelector("#mainLandingPage");

const DEFAULT_PAGE =
    "topics/javascript-codeCmdShrt/javascript-codeCmdShrt.html";

const pageCache = new Map();

export function initInjectContentListeners() {
    const sideBar = document.querySelector(".side-bar-topics");
    // Load default page
    injectPage(DEFAULT_PAGE);
    // Sidebar click listener
    sideBar.addEventListener("click", async (e) => {
        const link = e.target.closest("a");
        if (!link) return;
        const href = link.getAttribute("href");
        if (link.classList.contains("drop-down")) {
            toggleSidebarDropdown(link);
        }
        if (!href || href === "#") return;
        e.preventDefault();
        // console.log("Injecting:", href);
        await injectPage(href);
    });
}
async function injectPage(href) {
    if (!href) return;
    try {

        let html;

        if (pageCache.has(href)) {
            html = pageCache.get(href);
        } else {

            const res = await fetch(href);

            if (!res.ok) {
                throw new Error(`Failed to fetch ${href}`);
            }

            html = await res.text();

            pageCache.set(href, html);
        }

        // Parse HTML safely
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Grab the actual page content
        const newContent =
            doc.querySelector("#mainLandingPage") ||
            doc.querySelector(".main-landing-page") ||
            doc.body;

        if (!newContent) {
            throw new Error("No valid page content found");
        }

        mainLandingPage.innerHTML = newContent.innerHTML;

        initCopyCodes();
        initDropDowns();
        initCollapseCode();

        mainLandingPage.scrollTo(0, 0);

    } catch (err) {
        // console.error("Page injection failed:", err);
        mainLandingPage.innerHTML =
            `<p style="color:red;">Failed to load page: ${href}</p>`;
    }
}