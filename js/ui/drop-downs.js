// drop-downs.js
// Unified dropdown handler for sidebar and main landing page

import { mainLandingPage } from "../core/inject-content.js";

// Utility functions to always query fresh elements
function getCodeContainers() {
    return document.querySelectorAll('.code-container');
}
function getDropSnips() {
    return document.querySelectorAll('.drop-snips');
}
function getCodeCmds() {
    return document.querySelectorAll('.code-cmd');
}

// Collapse/show helpers
function collapseAll(els) {
    if (!els) return;
    els.forEach(el => el.classList.add('collapse'));
}

function hideEls(els) {
    if (!els) return;
    els.forEach(el => {
        if (!el.classList.contains('show')) el.classList.add('hide');
    });
}

function toggleVisibility(el) {
    if (!el) return;
    el.classList.toggle('hide');
}

// Toggle code snippet collapse for shift+cmd+enter
export function toggleCollapsedCode(target) {
    const snip = target.closest('.snip');
    if (!snip) return;
    const codeContainer = snip.querySelector('.code-container');
    if (!codeContainer) return;

    if (codeContainer.classList.contains('hide')) {
        codeContainer.classList.remove('hide');
    }
    codeContainer.classList.toggle('collapse');
}

// Main initializer
export function initDropDowns() {
    // Show all code commands initially
    getCodeCmds().forEach(cmd => cmd.classList.add('show'));

    // Collapse all code containers & hide all drop-snips
    collapseAll(getCodeContainers());
    hideEls(getDropSnips());

    // Add document-level listeners once
    if (!document.listenersAdded) {
        document.addEventListener('click', handleDropDown);
        document.addEventListener('keydown', handleDropDown);
        document.listenersAdded = true;
    }
}

// Unified click & keydown handler
export function handleDropDown(e) {
    // Normalize target
    let target = e.target.closest('.drop-down, .drop-parent, .topic-title');
    if (!target) return;

    // --- CLICK LOGIC ---
    if (e.type === 'click') {
        // Ignore copy-code clicks
        if (e.target.closest('.copy-code')) return;

        // Sidebar dropdowns
        const sidebarUL = target.closest('.side-bar ul');
        if (sidebarUL) {
            e.preventDefault();
            const liUL = target.parentElement.querySelector(':scope > ul');
            toggleVisibility(liUL);
            return;
        }

        // Main landing page dropdowns
        const dropSnips = target.closest('.drop-parent')?.querySelector('.drop-snips');
        if (dropSnips) {
            toggleVisibility(dropSnips);
            return;
        }

        // Topic titles collapse all code containers
        if (target.classList.contains('topic-title')) {
            collapseAll(getCodeContainers());
        }
    }

    // --- KEYDOWN LOGIC ---
    if (e.type === 'keydown') {
        const key = e.key.toLowerCase();

        // Shift + Cmd + Enter -> toggle code snippet collapse
        if (e.shiftKey && e.metaKey && key === 'enter') {
            e.preventDefault();
            toggleCollapsedCode(e.target);
            return;
        }

        // Enter key on drop-down elements
        // Enter key on drop-down elements
        if (key === 'enter' && document.activeElement.classList.contains('drop-down')) {
            e.preventDefault();

            // Sidebar dropdown
            const sidebarUL = document.activeElement.parentElement.querySelector(':scope > ul');
            if (sidebarUL) {
                toggleVisibility(sidebarUL);
                return;
            }

            // Main landing page dropdown
            const dropSnips = document.activeElement.closest('.drop-parent')?.querySelector('.drop-snips');
            if (dropSnips) {
                toggleVisibility(dropSnips);
                return;
            }
        }

        // Shift + Enter on sidebar -> focus main landing page
        if (key === 'enter' && e.shiftKey && target.closest('.side-bar')) {
            mainLandingPage.focus();
            mainLandingPage.scrollTo(0, 0);
        }
    }
}