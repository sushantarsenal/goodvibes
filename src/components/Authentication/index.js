import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'

import { Wrapper, Header, ContentWrapper, RightContent, LeftContent } from 'components/commons/AuthAndWizard'

import Login from './Login'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import styled from 'styled-components'
import logo from 'assets/images/goodvibes.jpg'


const Authentication = ({ match, history, location }) => {
  const hideRobot = location.pathname === '/auth/signup'

  return (
    <Wrapper>
      <Header history={history} />
      <ContentWrapper>
        <LeftContent>
          <Switch>
            <Route
              exact
              path={`${match.url}`}
              render={() => <Redirect to={`${match.url}/login`} />}
            />
            <Route path={`${match.url}/login`} component={Login} />
            <Route path={`${match.url}/signup`} component={Signup} />
            <Route
              path={`${match.url}/forgot-password`}
              component={ForgotPassword}
            />
            <Route
              path={`${match.url}/reset-password`}
              component={ResetPassword}
            />
          </Switch>
        </LeftContent>
        <RightContent style={{ background: '#fcf4fd'}}>
          <Image src={logo} alt="GoodVibes" />
        </RightContent>
      </ContentWrapper>
    </Wrapper>
  )
}

Authentication.propTypes = {
  history : PropTypes.object,
  location: PropTypes.object,
  match   : PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

const Image = styled.img`
    width: 300px;
    border-radius: 30px
  `

export default withRouter(Authentication)
