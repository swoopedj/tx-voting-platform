import Immutable from 'immutable';
import { createReducer } from '../lib/redux-helpers';



// if the getter is a function
// passes the action into the getter
// and returns the result, otherwise just returns the getter
const actionWrap = (getter, action) => {
  return typeof getter === 'function' ? getter(action) : getter;
}


const getFlashMessage = (action, getMessage, getTime, getType) => {
  return Immutable.fromJS({
    type : actionWrap(getType, action),
    time: actionWrap(getTime, action),
    message: actionWrap(getMessage, action),
  })
}

const getError = (action, getErrorMessage) => getFlashMessage()

export const flashMessage = createReducer(Immutable.fromJS({}), {
  RECEIVE_NEW_ENTRY_ERROR: () => Immutable.fromJS({}}
  CLEAR_FLASH_MESSAGE: () => Immutable.fromJS({}),
});
