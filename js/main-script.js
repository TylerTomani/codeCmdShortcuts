// main-script.js
import { keyboardNav } from "./nav/keyboard-nav.js";
import { initDropDowns } from "./ui/drop-downs.js";
import { initToggleSideBar } from "./ui/toggle-sidebar.js";
import { dragHideSidebar } from "./ui/drag-hide-sidebar.js";

import { addCopyCodes } from "./copy-code.js";
addCopyCodes()
dragHideSidebar()
initToggleSideBar();
initDropDowns();
keyboardNav(); // only once
