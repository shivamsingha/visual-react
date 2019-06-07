import { CREATE, REMOVE } from '../actionTypes';

const initialState = {
  Status: false,
  Size: 0,
  Memory: [{}]
}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE: {
      const { size } = payload;
      return {
        ...state,
        Status: true,
        Size: size,
        Memory: Array(size)
          .fill()
          .map((_, i, arr) => {
            arr[i] = {
              id: i,
              data: null
            }
          })
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