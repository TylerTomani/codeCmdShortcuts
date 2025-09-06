export function keyboardNav() {
    let lastLetterPressed = null;

    document.addEventListener("keydown", (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

        const key = e.key.toLowerCase();
        if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;

        // Get ALL focusable elements across sidebar, main content, and sideBarBtn
        const allEls = [
            ...document.querySelectorAll(
                ".side-bar a,[id],#sideBarBtn,.main-content a"
            )
        ].filter(el => {
            const rect = el.getBoundingClientRect();
            return el.offsetParent !== null && rect.width > 0 && rect.height > 0;
        });

        const matchingEls = allEls.filter((el) => {
            const elId = el.getAttribute("id");
            const text = el.textContent.trim().toLowerCase();
            return elId ? elId.startsWith(key) : text.startsWith(key);
        });

        if (matchingEls.length === 0) return;

        const active = document.activeElement;
        let iActiveLettered = matchingEls.indexOf(active);

        // Compute next index
        let nextIndex;
        if (e.shiftKey) {
            nextIndex =
                iActiveLettered === -1
                    ? matchingEls.length - 1
                    : (iActiveLettered - 1 + matchingEls.length) % matchingEls.length;
        } else {
            nextIndex =
                iActiveLettered === -1
                    ? 0
                    : (iActiveLettered + 1) % matchingEls.length;
        }

        matchingEls[nextIndex]?.focus();
        lastLetterPressed = key;
    });
}
