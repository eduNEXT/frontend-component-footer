import React from 'react';
import PropTypes from 'prop-types';
import { publish } from '@edx/frontend-platform';
import { getLocale, injectIntl, intlShape, FormattedMessage, LOCALE_CHANGED } from '@edx/frontend-platform/i18n';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { useAppEvent } from '@edx/frontend-platform/react';

import { patchPreferences, postSetLang } from './data/api';


const onLanguageSelected = (username, selectedLanguageCode) => {
    patchPreferences(username, { prefLang: selectedLanguageCode });
    postSetLang(selectedLanguageCode);
    publish(LOCALE_CHANGED, getLocale()); // TODO check the way to reflesh the lang in the MFE without reload the site
}

const LanguageSelector = ({
  intl, options, ...props
}) => {
  const { username } = getAuthenticatedUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    const previousSiteLanguage = getLocale();
    const languageCode = e.target.elements['site-footer-language-select'].value;
    if(previousSiteLanguage !== languageCode){
      onLanguageSelected(username, languageCode);
    }
  };

  return (
    <form
      className="form-inline"
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="form-group">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="site-footer-language-select" className="d-inline-block m-0">
          <FormattedMessage
            id="footer.languageForm.select.label"
            defaultMessage="Choose Language"
            description="The label for the laguage select part of the language selection form."
          />
        </label>
        <select
          id="site-footer-language-select"
          className="form-control-sm mx-2"
          name="site-footer-language-select"
          defaultValue={intl.locale}
        >
          {options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
        </select>
        <button data-testid="site-footer-submit-btn" className="btn btn-outline-primary btn-sm" type="submit">
          <FormattedMessage
            id="footer.languageForm.submit.label"
            defaultMessage="Apply"
            description="The label for button to submit the language selection form."
          />
        </button>
      </div>
    </form>
  );
};

LanguageSelector.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
};

export default injectIntl(LanguageSelector);
