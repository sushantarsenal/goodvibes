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
import styled from 'styled-components'

const MiniCustomers = ({ history, title }) => {
	const [loading, updateLoading] = useState(true)
	const [data, setData] = useState([])
	const { currentUser } = useContext(UserContext)

	const columns = useMemo(
		() => [
			{
				Header: "Customers",
				columns: [
					{
						Header: "Customer's Name",
						accessor: "full_name",
						Filter: false
					},
					{
						Header: "Created Date",
						accessor: "created_at",
						Filter: false
					},
					{
						Header: "Status",
						accessor: "status",
						Filter: false,
					}
				]
			}
		],
		[]
	);

	const fetchCustomers = async () => {
		const token = cookie.getToken()
		const fetchData = async () => {
			const [response, headers] = await customFetch('v1/users', 'GET', {}, { Authorization: `Bearer ${token}` })
			setData(response)
		};
		await fetchData();
		updateLoading(false)
	}

	useEffect(() => {
		fetchCustomers()
		// updateLoadingState(false)
	}, [history.location.pathname])

	// if (loading) return <div>Loading...</div>
	return (
		<div style={{ width: '48.5%', background: '#fff', padding: '15px 20px' }}>
			<Title>{title}</Title>
			<Table columns={columns} data={data} pagination={false}/>
		</div>
	)
}

const Title=styled.div`
	font-size: 20px
	padding-bottom: 10px
	font-weight: 600
`

MiniCustomers.propTypes = {
	history: PropTypes.object
}
export default MiniCustomers

