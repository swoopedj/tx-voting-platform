require('es6-promise').polyfill();

const actions = {};

actions.setFlashMessage = (message) => ({
  type: 'SET_FLASH_MESSAGE',
  message,
});

actions.clearFlashMessage = () => ({
  type: 'CLEAR_FLASH_MESSAGE',
});

module.exports = actions;
