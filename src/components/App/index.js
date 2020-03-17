import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { PublicRoute, PrivateRoute } from 'commons/Route'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, Slide } from 'react-toastify'
import Authentication from 'components/Authentication'
import { UserProvider } from 'contexts/UserContext'

import Sidebar, { RouteWithSidebar } from 'commons/Sidebar'
import getSidebarItems from '../commons/WrapperWithSidebar/sidebarItems'

import { DASHBOARD, CUSTOMERS, EMAIL_MARKETINGS, TRACKS, CATEGORIES, GENRES, SUBSCRIPTIONS, SLIDER, SETTINGS, LOGS } from 'constants/routes'

import Dashboard from '../../components/Dashboard'
import Customers from '../../components/Customers'
import EmailMarketings from '../../components/EmailMarketings'
import Tracks from '../../components/Tracks'
import Categories from '../../components/Categories'
import Genres from '../../components/Genres'
import Subscriptions from '../../components/Subscriptions'
import Slider from '../../components/Slider'
import Settings from '../../components/Settings'
import Logs from '../../components/Logs'

import CustomerForm from '../Customers/Form'
import TrackForm from '../Tracks/Form'
import GenreForm from '../Genres/Form'
import CategoryForm from '../Categories/Form'
import SubscriptionForm from '../Subscriptions/Form'


function App({ history }) {
  return (
    <UserProvider history={history}>
      <ToastContainer
        autoClose={3000}
        closeButton={false}
        transition={Slide}
        hideProgressBar
        draggable={false}
        position="top-right"
        toastClassName="toast-inner-container"
        className="toast-container"
      />
      {history.location.pathname !== "/auth/login" &&
        < Sidebar items={getSidebarItems()} history={history} />
      }

      <Switch>
        <Redirect
          exact
          from='/'
          to={DASHBOARD}
        />
        <Route exact path={CUSTOMERS.NEW} component={CustomerForm} />
        <Route exact path={CUSTOMERS.EDIT} component={CustomerForm} />
        <Route exact path={TRACKS.NEW} component={TrackForm} />
        <Route exact path={TRACKS.EDIT} component={TrackForm} />
        <Route exact path={CATEGORIES.NEW} component={CategoryForm} />
        <Route exact path={CATEGORIES.EDIT} component={CategoryForm} />
        <Route exact path={GENRES.NEW} component={GenreForm} />
        <Route exact path={GENRES.EDIT} component={GenreForm} />
        <Route exact path={SUBSCRIPTIONS.NEW} component={SubscriptionForm} />
        <Route exact path={SUBSCRIPTIONS.EDIT} component={SubscriptionForm} />

        <PrivateRoute path={DASHBOARD} component={Dashboard} />
        <PrivateRoute path={CUSTOMERS.INDEX} component={Customers} />
        <PrivateRoute path={EMAIL_MARKETINGS.INDEX} component={EmailMarketings} />
        <PrivateRoute path={TRACKS.INDEX} component={Tracks} />
        <PrivateRoute path={CATEGORIES.INDEX} component={Categories} />
        <PrivateRoute path={GENRES.INDEX} component={Genres} />
        <PrivateRoute path={SUBSCRIPTIONS.INDEX} component={Subscriptions} />
        <PrivateRoute path={SLIDER} component={Slider} />
        <PrivateRoute path={SETTINGS} component={Settings} />
        <PrivateRoute path={LOGS} component={Logs} />
        <PublicRoute restricted path="/auth" component={Authentication} />
      </Switch>
    </UserProvider>
  )
}

App.propTypes = {
  history: PropTypes.object
}

export default withRouter(App)
