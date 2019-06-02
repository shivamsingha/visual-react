import { CREATE, REMOVE } from './actionTypes';

export const create = (size) => ({
  type: CREATE,
  payload: {
    size
  }
});

export const remove = () => ({
  type: REMOVE
});