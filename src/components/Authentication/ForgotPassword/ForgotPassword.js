/* Copyright (C) Go9, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Bryan Starbuck <bryan@go9.com>, October 2019
 */
import React from 'react'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'

import OverlaySpinner from 'commons/OverlaySpinner'
import Row from 'commons/Forms/Row'
import { TextField } from 'commons/Forms/InputField'
import { HeaderText, LeftContentWrapper, Form } from 'components/commons/AuthAndWizard'

import { ButtonsWrapper, CustomButton, ChangePage, AccountInfo, StyledLink } from '../styled'

const ForgotPassword = ({
  handleFormSubmit,
  handleSubmit,
  loading,
  disabled,
  message,
}) => {
  const infoMessage = 'Go back to'
  return (
    <LeftContentWrapper>
      <HeaderText message={message} text="Forgot Password" subText="Enter your email to help us identify you." />
      <OverlaySpinner loading={loading} />
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Row>
          <Field
            name="email"
            type="email"
            label="Email"
            component={TextField}
          />
        </Row>
        <ButtonsWrapper>
          <CustomButton primary type="submit" disabled={disabled}>
            Next
          </CustomButton>
          <ChangePage>
            <AccountInfo>{infoMessage}</AccountInfo>
            <StyledLink to="/auth/login">Login</StyledLink>
          </ChangePage>
        </ButtonsWrapper>
      </Form>
    </LeftContentWrapper>
  )
}

ForgotPassword.propTypes = {
  disabled        : PropTypes.bool.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit    : PropTypes.func.isRequired,
  loading         : PropTypes.bool.isRequired,
  message         : PropTypes.object,
}

export default ForgotPassword
