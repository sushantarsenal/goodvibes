import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import Container from 'commons/Container'
import getSidebarItems from '../commons/WrapperWithSidebar/sidebarItems'
import Sidebar, { RouteWithSidebar } from 'commons/Sidebar'
import CustomHeader from 'commons/CustomHeader'
import Gist from 'commons/Style/Gist'
import Breadcrumb from 'commons/Style/Breadcrumb'

const EmailMarketings = ({ history }) => {
	return (
		<Container>
			<Sidebar items={getSidebarItems()} history={history} />

			<RouteWithSidebar>
				<CustomHeader />
				<Breadcrumb name='Email Marketings' settings={false} />
				<Gist>This is it.</Gist>
			</RouteWithSidebar>
		</Container>
	)
}

EmailMarketings.propTypes = {
	history: PropTypes.object
}
export default EmailMarketings

