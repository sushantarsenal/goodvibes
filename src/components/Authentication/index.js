/* Copyright (C) Go9, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Bryan Starbuck <bryan@go9.com>, October 2019
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'

import Branding from 'commons/Branding'
import { Wrapper, Header, ContentWrapper, RightContent, LeftContent } from 'components/commons/AuthAndWizard'

import Login from './Login'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'


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
        <RightContent>
          {/* <Branding hideImage={hideRobot} /> */}
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

export default withRouter(Authentication)
