import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import Container from 'commons/Container'
import getSidebarItems from '../commons/WrapperWithSidebar/sidebarItems'
import Sidebar, { RouteWithSidebar } from 'commons/Sidebar'
import CustomHeader from 'commons/CustomHeader'
import Gist from 'commons/Style/Gist'
import Breadcrumb from 'commons/Style/Breadcrumb'

const Settings = ({ history }) => {
	return (
		<Container>
			<Sidebar items={getSidebarItems()} history={history} />

			<RouteWithSidebar>
				<CustomHeader />
				<Breadcrumb name='Settings' settings={false} />
				<Gist>Coming very very soon.</Gist>
			</RouteWithSidebar>
		</Container>
	)
}

Settings.propTypes = {
	history: PropTypes.object
}
export default Settings

