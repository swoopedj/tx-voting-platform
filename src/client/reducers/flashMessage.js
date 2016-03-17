import Immutable from 'immutable';
import { createReducer } from '../lib/redux-helpers';

export const flashMessage = createReducer(Immutable.fromJS({}), {
  SET_FLASH_MESSAGE: (state, action) => {
    return Immutable.fromJS(action.message);
  },
  CLEAR_FLASH_MESSAGE: () => Immutable.fromJS({}),
});
