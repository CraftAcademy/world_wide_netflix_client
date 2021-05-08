import React from 'react';

function Footer() {
  return (
    <footer className='footer' data-cy='footer'>
      <p data-cy='phone-number' style={{ color: 'white' }}>
        Contact us
      </p>
      <p data-cy='mail' style={{ color: 'white' }}>
        Email: worldwidenetflix@wwn.com
      </p>
    </footer>
  );
}

export default Footer;
