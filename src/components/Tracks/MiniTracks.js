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

const MiniTracks = ({ history, title }) => {
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
						accessor: "name",
						Filter: false
					},
					{
						Header: "Play Count",
						accessor: "play_count",
						Filter: false
					},
					{
						Header: "Duration",
						accessor: "duration",
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
		<div style={{ width: '48.5%', background: '#fff', padding: '15px 20px' }}>
			<Title>{title}</Title>
			<Table columns={columns} data={data} pagination={false} />
		</div>
	)
}

const Title = styled.div`
	font-size: 20px
	padding-bottom: 10px
	font-weight: 600
`

MiniTracks.propTypes = {
	history: PropTypes.object
}


export default MiniTracks

