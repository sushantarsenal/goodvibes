import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Field } from 'redux-form'

import Row from 'commons/Forms/Row'
import Checkbox from 'commons/Forms/Checkbox'
import OverlaySpinner from 'commons/OverlaySpinner'
import { TextField, PasswordField } from 'commons/Forms/InputField'
import { HeaderText, LeftContentWrapper, Form } from 'components/commons/AuthAndWizard'

import { ForgotPassword, ForgotDiv } from './styled'
import { ButtonsWrapper, ChangePage, CustomButton, AccountInfo, StyledLink } from '../styled'

const Login = ({
  handleFormSubmit,
  handleSubmit,
  loading,
  disabled,
  message,
}) => {
  const infoMessage = 'Don\'t have an account with us?'

  return (
    <LeftContentWrapper>
      <HeaderText message={message} text="Login" subText="Please enter your credentials" />
      <OverlaySpinner loading={loading} />
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Row>
          <Field
            name="email"
            type="email"
            label="Email Address"
            component={TextField}
          />
        </Row>
        <Row>
          <Field name="password" label="Password" component={PasswordField} />
        </Row>
        <ForgotDiv>
          <Field name="remember_me" component={Checkbox} label="Remember me?" />
          <ForgotPassword>
            <Link to="/auth/forgot-password">Forgot Password?</Link>
          </ForgotPassword>
        </ForgotDiv>
        <ButtonsWrapper>
          <CustomButton primary type="submit" disabled={disabled} style={{ marginRight: 10 }}>
            Login
          </CustomButton>
          <ChangePage>
            <AccountInfo>{infoMessage}</AccountInfo>
            <StyledLink to="/auth/signup">Sign Up</StyledLink>
          </ChangePage>
        </ButtonsWrapper>
      </Form>

    </LeftContentWrapper>
  )
}

Login.propTypes = {
  disabled        : PropTypes.bool.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit    : PropTypes.func.isRequired,
  loading         : PropTypes.bool.isRequired,
  message         : PropTypes.object,
}

export default Login
