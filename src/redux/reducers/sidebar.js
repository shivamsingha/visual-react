import {SIDEBAR_TOGGLE} from "../actionTypes";
import {SIDEBAR_CLOSE} from "../actionTypes"

const initialState = {
    showSidebar: true
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