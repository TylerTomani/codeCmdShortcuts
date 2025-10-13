// keyboard-nav.js
addEventListener('keydown', e => {
    // const activeEl = document.activeElement
    const key = e.key.toLowerCase();

    // Only single alphanumeric characters (letters + numbers)
    if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;

    // Get all visible focusable elements
    const focusableEls = [...document.querySelectorAll('a, [id]')].filter(el => {
        const rect = el.getBoundingClientRect();
        return el.offsetParent !== null && rect.width > 0 && rect.height > 0;
    });

    if (!focusableEls.length) return;

    // Filter by first number OR first letter in the element text
    const matchingEls = focusableEls.filter(el => {
        const text = el.innerText.trim().toLowerCase();
        const numMatch = text.match(/[0-9]/);
        const letterMatch = text.match(/[a-z]/);

        return (numMatch && numMatch[0] === key) ||
            (letterMatch && letterMatch[0] === key);
    });

    if (matchingEls.length === 0) return;

    const activeEl = document.activeElement;
    let target;

    if (window.lastLetterPressed === key) {
        // Cycle within the same letter group
        const iMatchingEls = matchingEls.indexOf(activeEl);

        if (e.shiftKey) {
            // backwards in the group
            target = matchingEls[(iMatchingEls - 1 + matchingEls.length) % matchingEls.length];
        } else {
            // forwards in the group
            target = matchingEls[(iMatchingEls + 1) % matchingEls.length];
        }
    } else {
        // Fresh letter press → pick closest match (prefer below if equal)
        const currentIndex = focusableEls.indexOf(activeEl);

        const nextBelow = matchingEls.find(el => focusableEls.indexOf(el) > currentIndex);
        const candidatesAbove = matchingEls.filter(el => focusableEls.indexOf(el) < currentIndex);
        const nextAbove = candidatesAbove.length ? candidatesAbove[candidatesAbove.length - 1] : null;

        if (nextBelow && nextAbove) {
            const distBelow = focusableEls.indexOf(nextBelow) - currentIndex;
            const distAbove = currentIndex - focusableEls.indexOf(nextAbove);
            target = (distBelow <= distAbove) ? nextBelow : nextAbove;
        } else {
            target = nextBelow || nextAbove;
        }
    }

    target?.focus();
    window.lastLetterPressed = key;
});