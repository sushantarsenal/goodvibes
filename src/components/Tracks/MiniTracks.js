import React, { useState, useMemo, useEffect, useContext, useCallback, useRef } from 'react'
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
import NewTable from 'commons/NewTable'
import { UserContext } from 'contexts/UserContext'
import SelectFilter from '../commons/Filter/SelectColumnFilter'
import styled from 'styled-components'

const MiniTracks = ({ history, title }) => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
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

	const token = cookie.getToken()
	const fetchTracks = async () => {
		try {
			setLoading(true)
			const [response, headers] = await customFetch('v1/tracks', 'GET', { per_page: 10, page: 1, filters: '' }, { Authorization: `Bearer ${token}` })
			setData(response.tracks);
			setLoading(false)
		} catch (e) {
			console.log(e);
		}
	};

	const fetchData = useCallback(() => {
		fetchTracks();
	}, [])

	useEffect(() => {
		fetchData()
		// updateLoadingState(false)
	}, [history.location.pathname])

	// if (loading) return <div>Loading...</div>
	return (
		<div style={{ width: '48.5%', background: '#fff', padding: '15px 20px' }}>
			<Title>{title}</Title>
			<NewTable
				columns={columns}
				data={data || []}
				fetchData={fetchData}
				loading={loading}
				pageCount={1}
				filters={{}}
				total={10}
				pagination={false}
			/>
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

