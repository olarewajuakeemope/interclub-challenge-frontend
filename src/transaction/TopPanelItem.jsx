import React from 'react';
import PropTypes from 'prop-types';

const TopPanelItem = ({ color, content, title, icon, footerIcon, footerContent }) => (
  <div className="col-lg-3 col-md-6 col-sm-6">
    <div className="card card-stats">
      <div className="card-header" data-background-color={color}>
        <i className="material-icons">{icon}</i>
      </div>
      <div className="card-content">
        <p className="category">{content}</p>
        <h3 className="title">{title}
        </h3>
      </div>
      <div className="card-footer">
        <div className="stats">
          <i className="material-icons">{footerIcon}</i>
          {footerContent}
        </div>
      </div>
    </div>
  </div>
);

TopPanelItem.propTypes = {
  color: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  footerIcon: PropTypes.string.isRequired,
  footerContent: PropTypes.string.isRequired,
};

export default TopPanelItem;
