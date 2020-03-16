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
	const { currentUser } = useContext(UserContext)
	const locationPath = props.location.pathname.split('/')
	const [loading, setLoading] = useState(false)
	const [action] = useState(last(locationPath)),
		[id] = useState(locationPath[locationPath.length - 2]),
		[record, setRecord] = useState({})

	const token = cookie.getToken()
	const handleFormSubmit = async (values) => {
		try {
			const [response] = await customFetch('admin/users', 'POST', {
				...values
			})
			if (response.user) history.push('/customers')
		} catch (e) {

		}
	}
	const countries = getNames().map(item => ({ id: item, value: item }))

	const fetchCustomer = async (id) => {
		try {
			setLoading(true)
			const [response, headers] = await customFetch(`admin/users/${id}`, 'GET', {}, { Authorization: `Bearer ${token}` })
			setLoading(false)
			setRecord(response)
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (action === 'edit'){
			fetchCustomer(id)
		}
	}, [props.location.pathname])

	return (
		<Container>
			<Sidebar items={getSidebarItems()} history={history} />
			<RouteWithSidebar>
				<CustomHeader currentUser={currentUser} history={history} />
				<Breadcrumb name={capitalize(action)} settings={false} />
				<Gist>
					<NewForm history={history} initialValues={record} action = {action} id={id}/>
				</Gist>
			</RouteWithSidebar>
		</Container>
	)
}

Form.propTypes = {
	history: PropTypes.object
}

export default Profile;

