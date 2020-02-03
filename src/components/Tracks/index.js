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

const Tracks = ({ history }) => {
	const [loading, updateLoading] = useState(true)
	const [data, setData] = useState([])
	const { currentUser } = useContext(UserContext)

	const columns = useMemo(
		() => [
			{
				Header: "Tracks",
				columns: [
					{
						Header: "Title",
						accessor: "name"
					},
					{
						Header: "Play Count",
						accessor: "play_count",
					},
					{
						Header: "Duration",
						accessor: "duration"
					},
					{
						Header: "Artist",
						accessor: "composer_name",
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

	const fetchTracks = async () => {
		const token = cookie.getToken()
		const fetchData = async () => {
			const [response, headers] = await customFetch('v1/tracks', 'GET', {}, { Authorization: `Bearer ${token}` })
			setData(response)
		};
		await fetchData();
		updateLoading(false)
	}

	useEffect(() => {
		fetchTracks()
		// updateLoadingState(false)
	}, [history.location.pathname])

	// if (loading) return <div>Loading...</div>
	return (
		<Container>
			<Sidebar items={getSidebarItems()} history={history} />

			<RouteWithSidebar>
				<CustomHeader currentUser={currentUser} history={history} />
				<Breadcrumb name='Tracks' createNew={false} />
				<Gist>
					<Table columns={columns} data={data} />
				</Gist>
			</RouteWithSidebar>
		</Container>
	)
}

Tracks.propTypes = {
	history: PropTypes.object
}
export default Tracks

