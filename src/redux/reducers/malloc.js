import { CREATE, REMOVE, POP, PUSH } from "../actionTypes";

const initialState = {
  Status: false,
  Size: 0,
  Top: -1,
  LastOutput: "",
  Memory: Array(0)
};

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
          .map((_, i, arr) => ({
              id: i,
              data: ""
            }))
      };
    }

    case REMOVE: {
      const { LastOutput } = state;
      return {
        ...state,
        ...initialState,
        LastOutput
      };
    }

    case PUSH: {
      const { Status, Size, Memory, Top } = state;
      const { data } = payload;

      if (!Status)
        return state;

      if (Top + 1 === Size)
        return state;

      let temp = Memory;
      temp[Top + 1] = {
        ...temp[Top + 1],
        data
      };

      return {
        ...state,
        Top: Top + 1,
        Memory: temp
      };
    }

    case POP: {
      const { Status, Memory, Top } = state;

      if (!Status)
        return state;

      if (Top < 0)
        return state;

      let temp = Memory;
      const output = temp[Top].data;
      temp[Top] = {
        ...temp[Top],
        data: ""
      };

      return {
        ...state,
        Top: Top - 1,
        LastOutput: output,
        Memory: temp
      };
    }

    default:
      return state;
  }
}