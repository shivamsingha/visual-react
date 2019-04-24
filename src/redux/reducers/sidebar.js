import {SIDEBAR_TOGGLE, SIDEBAR_CLOSE} from "../actionTypes";

const initialState = {
    showSidebar: true,
    status: false,
    createClicked:false,
    sizeval:0
};

const sidebarToggle = (state = initialState, action) => {
    if(action === SIDEBAR_TOGGLE)
        return Object.assign({}, state, {showSidebar: !state.showSidebar});
    else if(action === SIDEBAR_CLOSE)
        return Object.assign({}, state, {showSidebar: false});
    else
        return state;
}

export default sidebarToggle;