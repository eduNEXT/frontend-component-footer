import React, { useContext, useState } from 'react';
import _ from 'lodash';
import { intlShape, injectIntl, FormattedMessage } from '@edx/frontend-platform/i18n';
import { ensureConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import {
  ActionRow,
  Button,
  Container,
  Hyperlink,
  Image,
  TransitionReplace,
} from '@edx/paragon';
import { ExpandLess, ExpandMore, Help } from '@edx/paragon/icons';
import messages from './messages';

ensureConfig([
  'LMS_BASE_URL',
  'MARKETING_SITE_BASE_URL',
  'TERMS_OF_SERVICE_URL',
  'PRIVACY_POLICY_URL',
  'SUPPORT_EMAIL',
  'SITE_NAME',
  'STUDIO_BASE_URL',
  'SHOW_ACCESSIBILITY_PAGE',
], 'Studio Footer component');

const StudioFooter = ({
  // injected
  intl,
}) => {
  const { config } = useContext(AppContext);

  return (
    <>
      <div className="m-0 mt-6 row align-items-center justify-content-center col mr-2" />
      <Container size="xl" className="px-4">

        <ActionRow className="pt-3 m-0 x-small">
          © {new Date().getFullYear()} <Hyperlink destination={config.MARKETING_BASE_URL} target="_blank" className="ml-2">{config.SITE_NAME}</Hyperlink>
          <ActionRow.Spacer />
          {!_.isEmpty(config.TERMS_OF_SERVICE_URL) && (
            <Hyperlink destination={config.TERMS_OF_SERVICE_URL} data-testid="termsOfService">
              {intl.formatMessage(messages.termsOfServiceLinkLabel)}
            </Hyperlink>
          )}{!_.isEmpty(config.PRIVACY_POLICY_URL) && (
            <Hyperlink destination={config.PRIVACY_POLICY_URL} data-testid="privacyPolicy">
              {intl.formatMessage(messages.privacyPolicyLinkLabel)}
            </Hyperlink>
          )}
          {config.SHOW_ACCESSIBILITY_PAGE === 'true' && (
            <Hyperlink
              destination={`${config.STUDIO_BASE_URL}/accessibility`}
              data-testid="accessibilityRequest"
            >
              {intl.formatMessage(messages.accessibilityRequestLinkLabel)}
            </Hyperlink>
          )}
        </ActionRow>
        <ActionRow className="pb-4 x-small">
          {/*
            Site operators: Please do not remove this paragraph! this attributes back to edX and
              makes your acknowledgement of edX's trademarks clear.
            Translators: 'edX' and 'Open edX' are trademarks of 'edX Inc.'. Please do not translate
              any of these trademarks and company names.
          */}
          <FormattedMessage {...messages.trademarkMessage} />
          <Hyperlink className="ml-1" destination="https://www.edx.org">edX Inc</Hyperlink>.
          <ActionRow.Spacer />
          <Hyperlink destination="https://open.edx.org" className="float-right">
            <Image
              width="120px"
              alt="Powered by Open edX"
              src="https://logos.openedx.org/open-edx-logo-tag.png"
            />
          </Hyperlink>
        </ActionRow>
      </Container>
    </>
  );
};

StudioFooter.propTypes = {
  // injected
  intl: intlShape.isRequired,
};

export default injectIntl(StudioFooter);
