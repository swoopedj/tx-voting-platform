import React, { PropTypes } from 'react';

const typeMap = {
  success: 'success',
  warning: 'error',
};

const FlashMessage = ({ onCloseClick, message, messageType, isVisible }) => {
  const flashMessageVisibility = isVisible ? 'show' : '';
  return (
    <div className={ `notification has-icon is-text-centered is-${typeMap[messageType]} ${flashMessageVisibility}` }>
      <button onClick={onCloseClick} className="delete"></button>
      <h3 className="title is-5"><i className="fa fa-check-circle"></i>&nbsp;{message}</h3>
    </div>
  );
};

FlashMessage.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  message: PropTypes.string,
  messageType: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
};

module.exports = FlashMessage;
