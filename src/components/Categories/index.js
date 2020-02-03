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

const Categories = ({ history }) => {
	const [loading, updateLoading] = useState(true)
	const [data, setData] = useState([])
	const { currentUser } = useContext(UserContext)

	const columns = useMemo(
		() => [
			{
				Header: "Categories",
				columns: [
					{
						Header: "Name",
						accessor: "name"
					},
					{
						Header: "Genre",
						accessor: "genre.name",
					},
					{
						Header: "Track Count",
						accessor: "track_count"
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

	const fetchCategories = async () => {
		const token = cookie.getToken()
		const fetchData = async () => {
			const [response, headers] = await customFetch('v1/categories/all_categories', 'GET', {}, { Authorization: `Bearer ${token}` })
			setData(response)
			debugger
		};
		await fetchData();
		updateLoading(false)
	}

	useEffect(() => {
		fetchCategories()
		// updateLoadingState(false)
	}, [history.location.pathname])

	// if (loading) return <div>Loading...</div>
	return (
		<Container>
			<Sidebar items={getSidebarItems()} history={history} />

			<RouteWithSidebar>
				<CustomHeader currentUser={currentUser} history={history} />
				<Breadcrumb name='Categories' createNew={false} />
				<Gist>
					<Table columns={columns} data={data} pagination={true}/>
				</Gist>
			</RouteWithSidebar>
		</Container>
	)
}

Categories.propTypes = {
	history: PropTypes.object
}
export default Categories

