require('es6-promise').polyfill();

const actions = {};
const typeDelayMap = {
  warning: 10000,
  success: 5000,
};

actions.setFlashMessage = (message) => ({
  type: 'SET_FLASH_MESSAGE',
  message,
});

actions.tryToClearFlashMessage = (message, currentTime = Date.now()) => {
  return (dispatch) => {
    const elapsedTime = currentTime - message.createdAt;
    const expectedDelay = typeDelayMap[message.type];
    if (elapsedTime > expectedDelay) dispatch(actions.clearFlashMessage());
  };
};

actions.tryToClearFlashMessageOnInterval = () => {
  return (dispatch, getState) => {
    const setInterval = () => {
      const message = getState().get('flashMessage');
      if (message.get('isVisible')) {
        dispatch(actions.tryToClearFlashMessage(message.toJS()));
        setTimeout(setInterval, 250);
      }
    };
    setInterval();
  };
};

actions.clearFlashMessage = () => ({
  type: 'CLEAR_FLASH_MESSAGE',
});

module.exports = actions;
