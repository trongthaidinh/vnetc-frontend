import React, { useState } from 'react';
import topheadBanner from '../../assets/images/tophead.jpg';
import vietnamFlag from '../../assets/images/vietnam-flag.png';
import ukFlag from '../../assets/images/uk-flag.png';
import '../../styles/LanguageSwitch.scss';

const LanguageSwitch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('Tiếng Việt');

  const handleLanguageClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div
      className="language-switch"
      style={{ backgroundImage: `url(${topheadBanner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <button
        className="language-button"
        onClick={handleLanguageClick}
      >
        <img
          src={language === 'Tiếng Việt' ? vietnamFlag : ukFlag}
          alt={language}
          className="flag-icon"
        />
        {language}
      </button>
      {isOpen && (
        <div className="language-menu">
          <button
            className="close-button"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
          <ul>
            <li>
              <button onClick={() => handleLanguageChange('Tiếng Việt')}>
                <img src={vietnamFlag} alt="Tiếng Việt" className="flag-icon" />
                Tiếng Việt
              </button>
            </li>
            <li>
              <button onClick={() => handleLanguageChange('English')}>
                <img src={ukFlag} alt="English" className="flag-icon" />
                English
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;
