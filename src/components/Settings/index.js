import React, {useEffect, useState, useContext} from 'react'
import PropTypes from 'prop-types'

import { last, capitalize } from 'lodash'
import Container from 'commons/Container'
import getSidebarItems from '../commons/WrapperWithSidebar/sidebarItems'
import Sidebar, { RouteWithSidebar } from 'commons/Sidebar'
import CustomHeader from 'commons/CustomHeader'
import Gist from 'commons/Style/Gist'
import Breadcrumb from 'commons/Style/Breadcrumb'

import { customFetch } from 'utils'
import { Form } from '../styled'
import { getNames } from 'country-list'
import cookie from 'utils/cookie'
import NewForm from './NewForm'
import { UserContext } from 'contexts/UserContext'

const Profile = ({ history, ...props}) => {
	const locationPath = props.location.pathname.split('/')
	const [loading, setLoading] = useState(false)
	const [action] = useState(last(locationPath)),
		[id] = useState(locationPath[locationPath.length - 2])
	const { currentUser } = useContext(UserContext)
	const token = cookie.getToken()

	return (
		<Container>
			<Sidebar items={getSidebarItems()} history={history} />
			<RouteWithSidebar>
				<CustomHeader />
				<Breadcrumb name={capitalize(action)} settings={false} />
				<Gist>
					<NewForm history={history} initialValues={currentUser} id={currentUser.id}/>
				</Gist>
			</RouteWithSidebar>
		</Container>
	)
}

Form.propTypes = {
	history: PropTypes.object
}

export default Profile;

