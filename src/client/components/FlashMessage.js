/* eslint max-len: [0] */
import React, { PropTypes } from 'react';

const typeMap = {
  success: 'success',
  warning: 'danger',
  info: 'info',
};

const iconMap = {
  success: 'fa-check-circle',
  warning: 'fa-exclamation-circle',
  info: 'fa-info-circle',
};

const FlashMessage = ({ onCloseClick, message, type, isVisible }) => {
  const flashMessageVisibility = isVisible ? 'show' : '';
  return (
    <div className={`notification has-icon is-text-centered is-${typeMap[type]} ${flashMessageVisibility}` }>
      <button onClick={onCloseClick} className="delete"></button>
      <h3 className="title is-5"><i className={`fa ${iconMap[type]}`}></i>&nbsp;{message}</h3>
    </div>
  );
};

FlashMessage.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  message: PropTypes.string,
  type: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
};

module.exports = FlashMessage;
