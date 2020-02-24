import React, { useState, useMemo, useEffect, useContext, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import cookie from 'utils/cookie'
import { isLogin, customFetch } from 'utils'
import styled from 'styled-components'

const MiniLogs = ({ history, title }) => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)

	const token = cookie.getToken()
	const fetchLogs = async () => {
		try {
			setLoading(true)
			const [response, headers] = await customFetch('admin/tracks', 'GET', { per_page: 10, page: 1, filters: '' }, { Authorization: `Bearer ${token}` })
			setData(response.tracks);
			setLoading(false)
		} catch (e) {
			console.log(e);
		}
	};

	const fetchData = useCallback(() => {
		fetchLogs();
	}, [])

	useEffect(() => {
		fetchData()
		// updateLoadingState(false)
	}, [history.location.pathname])

	// if (loading) return <div>Loading...</div>
	return (
		<div style={{ width: '48.5%', background: '#fff', padding: '15px 20px' }}>
			<Title>{title}</Title>
			<>Here will be the logs.</>
		</div>
	)
}

const Title = styled.div`
	font-size: 20px
	padding-bottom: 10px
	font-weight: 600
`

MiniLogs.propTypes = {
	history: PropTypes.object
}


export default MiniLogs

