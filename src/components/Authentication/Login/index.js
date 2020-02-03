import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import { get } from 'lodash'
import { connect } from 'react-redux'

import { isEmpty, isSubmitButtonDisabled, customFetch } from 'utils'
import validate from 'utils/validate'
import { UserContext } from 'contexts/UserContext'
import { isAdmin } from 'utils/role'
import { CUSTOMERS } from 'constants/routes'
import setSession from '../commons/setSession'
import { ResendDiv } from './styled'
import Login from './Login'

const App = ({ handleSubmit, history, location, ...props }) => {
  const [loading, setLoading] = useState(false)
  const [loginPop, changeLoginPop] = useState('')
  const [message, changeMessage] = useState(get(location, 'state.message'))
  // const { refetchUser } = useContext(UserContext)

  const handleResendSubmit = async email => {
    if (email) {
      const [response] = await customFetch('auth/confirmation', 'POST', {
        email,
      })
      if (response.message) {
        changeMessage({ type: 'success', text: response.message })
      }
    }
  }
  const handleFormSubmit = async values => {
    if (!isEmpty(values)) {
      setLoading(true)
      const [response, headers] = await customFetch('login', 'POST', {
        ...values,
      })
      if (response.user) {
        setSession({access_token: response.auth_token, uid: response.uid})

        // await refetchUser()
        setLoading(false)
        history.push('/')
      } else {
        setLoading(false)
        if (response.unconfirmed) {
          changeMessage({
            type: 'error',
            text: (
              <div>
                {response.errors[0]}.{' '}
                <ResendDiv onClick={() => handleResendSubmit(values.email)}>
                  Resend Link
                </ResendDiv>{' '}
                incase you did not receive your email.
              </div>
            ),
          })
          return
        }
        changeMessage({ type: 'error', text: response.errors[0] })
      }
    }
  }

  return (
    <Login
      handleFormSubmit={handleFormSubmit}
      handleSubmit={handleSubmit}
      disabled={isSubmitButtonDisabled(props)}
      loading={loading}
      message={message}
    />
  )
}

App.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  history     : PropTypes.object.isRequired,
  location    : PropTypes.object
}

const validateFields = {
  email   : { required: true, label: 'Email', email: true },
  password: { required: true, label: 'Password', password: true },
}

export default compose(
  connect(() => {
    return {
      initialValues: { remember_me: true },
    }
  }),
  reduxForm({
    form  : 'login',
    fields: validateFields,
    validate,
  }),
)(App)
