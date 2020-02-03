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

const Genres = ({ history }) => {
	const [loading, updateLoading] = useState(true)
	const [data, setData] = useState([])
	const { currentUser } = useContext(UserContext)

	const columns = useMemo(
		() => [
			{
				Header: "Genres",
				columns: [
					{
						Header: "Genre Name",
						accessor: "name"
					},
					{
						Header: "Created Date",
						accessor: "purchase_time",
						Filter: false
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

	const fetchGenres = async () => {
		const token = cookie.getToken()
		const fetchData = async () => {
			const [response, headers] = await customFetch('v1/genres', 'GET', {}, { Authorization: `Bearer ${token}` })
			setData(response)
			debugger;
		};
		await fetchData();
		updateLoading(false)
	}

	useEffect(() => {
		fetchGenres()
		// updateLoadingState(false)
	}, [history.location.pathname])

	// if (loading) return <div>Loading...</div>
	return (
		<Container>
			<Sidebar items={getSidebarItems()} history={history} />

			<RouteWithSidebar>
				<CustomHeader currentUser={currentUser} history={history} />
				<Breadcrumb name='Genres' createNew={false} />
				<Gist>
					<Table columns={columns} data={data} pagination={true}/>
				</Gist>
			</RouteWithSidebar>
		</Container>
	)
}

Genres.propTypes = {
	history: PropTypes.object
}
export default Genres

