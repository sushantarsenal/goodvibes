import React, { useState, useMemo, useEffect, useContext, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import theme from 'constants/theme'
import cookie from 'utils/cookie'
import { isLogin, customFetch } from 'utils'
import styled from 'styled-components'
// import Legend from '../Home/commons/Legend/index'
// import LineChart from '../Home/commons/LineChart/index'

const CustomerChart = ({ history, title }) => {
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
			<>Here will be the charts.</>
			{/* <Legend data={{}} />
			<ChartWrapper>
				<LineChart data={{}} />
			</ChartWrapper> */}
		</div>
	)
}

const Title = styled.div`
	font-size: 20px
	padding-bottom: 10px
	font-weight: 600
`,
	ChartWrapper = styled.div`
  padding: 10px 20px;
  margin-top: 20px;
`,
	Text = styled.div`
    text-align: right;
    margin: 10px 0 20px;
    font-weight: 600;
    color: ${theme.color.text.primaryFade};
  `

CustomerChart.propTypes = {
	history: PropTypes.object
}


export default CustomerChart

