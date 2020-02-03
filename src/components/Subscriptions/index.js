import React, { useState, useMemo, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import cookie from 'utils/cookie'
import { isLogin, customFetch } from 'utils'

import Container from 'commons/Container'
import getSidebarItems from '../commons/WrapperWithSidebar/sidebarItems'
import Sidebar, { RouteWithSidebar } from 'commons/Sidebar'
import CustomHeader from 'commons/CustomHeader'
import Gist from 'commons/Style/Gist'
import Breadcrumb from 'commons/Style/Breadcrumb'
import Table from 'commons/NewTable'
import { UserContext } from 'contexts/UserContext'
import SelectFilter from '../commons/Filter/SelectColumnFilter'

const Subscriptions = ({ history }) => {
	const [loading, updateLoading] = useState(true)
	const [data, setData] = useState([])
	const { currentUser } = useContext(UserContext)

	const columns = useMemo(
		() => [
			{
				Header: "Subscriptions",
				columns: [
					{
						Header: "Full Name",
						accessor: "user.full_name"
					},
					{
						Header: "Created Date",
						accessor: "purchase_time",
						Filter: false
					},
					{
						Header: "Plan",
						accessor: "package_name"
					},
					{
						Header: "Status",
						accessor: "status",
						Filter: SelectFilter,
						filter: 'includes'
					},
					{
						Header: "Options",
						accessor: "",
						Filter: false
					}
				]
			}
		],
		[]
	);

	const fetchSubscriptions = async () => {
		const token = cookie.getToken()
		const fetchData = async () => {
			const [response, headers] = await customFetch('v1/subscriptions', 'GET', {}, { Authorization: `Bearer ${token}` })
			setData(response)
		};
		await fetchData();
		updateLoading(false)
	}

	useEffect(() => {
		fetchSubscriptions()
		// updateLoadingState(false)
	}, [history.location.pathname])

	// if (loading) return <div>Loading...</div>
	return (
		<Container>
			<Sidebar items={getSidebarItems()} history={history} />

			<RouteWithSidebar>
				<CustomHeader currentUser={currentUser} history={history} />
				<Breadcrumb name='Subscriptions' createNew={false} />
				<Gist>
					<Table columns={columns} data={data} pagination={true}/>
				</Gist>
			</RouteWithSidebar>
		</Container>
	)
}

Subscriptions.propTypes = {
	history: PropTypes.object
}
export default Subscriptions

