import {SIDEBAR_TOGGLE, SIDEBAR_CLOSE, CREATEBUTTON_TOGGLE, CREATE, REMOVE} from "./actionTypes";

export const sidebarToggle = (showSidebar) => ({
    type: SIDEBAR_TOGGLE,
    payload: {showSidebar}
});

export const sidebarClose = (showSidebar) => ({
    type: SIDEBAR_CLOSE,
    payload: {showSidebar}
});