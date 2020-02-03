import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import Row from 'commons/Forms/Row'
import OverlaySpinner from 'commons/OverlaySpinner'
import { TextField, PasswordField } from 'commons/Forms/InputField'
import { LeftContentWrapper, HeaderText, Form } from 'components/commons/AuthAndWizard'
import { ButtonsWrapper, ChangePage, CustomButton, AccountInfo, StyledLink } from '../styled'

import Checkbox from './Checkbox'

const Signup = ({
  handleFormSubmit,
  handleSubmit,
  loading,
  disabled,
  message,
}) => {
  const infoMessage = 'Already have an account with us?'
  return (
    <LeftContentWrapper>
      <HeaderText message={message} text="Sign Up" subText="Please fill up the form to sign up." />
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
        <Row>
          <Field name="password" label="Password" component={PasswordField} />
        </Row>
        <Row>
          <Field
            name="agreement"
            component={Checkbox}
          />
        </Row>
        <ButtonsWrapper>
          <CustomButton primary type="submit" disabled={disabled}>
            Create Account
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

Signup.propTypes = {
  disabled        : PropTypes.bool.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit    : PropTypes.func.isRequired,
  loading         : PropTypes.bool.isRequired,
  message         : PropTypes.object,
}

export default Signup
