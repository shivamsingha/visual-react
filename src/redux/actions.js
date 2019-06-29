import { CREATE, REMOVE, POP, PUSH } from "./actionTypes";

export const create = (size) => ({
  type: CREATE,
  payload: {
    size
  }
});

export const remove = () => ({
  type: REMOVE
});

export const npush = (data) => ({
  type: PUSH,
  payload: {
    data
  }
});

export const npop = () => ({
  type: POP
});