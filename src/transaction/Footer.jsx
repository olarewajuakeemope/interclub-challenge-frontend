import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="container-fluid">
      <p className="copyright pull-right">
        &copy;
        {new Date().getFullYear()}
        <a
          href="https://interclub.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          INTERCLUB
        </a> Administrators Dashboard
      </p>
    </div>
  </footer>
);

export default Footer;
