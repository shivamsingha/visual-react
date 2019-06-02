import { CREATE, REMOVE } from '../actionTypes';

const initialState = {
  Status: false,
  Size: 0
}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE: {
      const { size } = payload;
      return {
        ...state,
        Status: true,
        Size: size
      };
    }
    case REMOVE: {
      return {
        ...state,
        ...initialState
      };
    }
    default:
      return state;
  }
}