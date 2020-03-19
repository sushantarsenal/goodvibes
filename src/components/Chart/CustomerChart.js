import React, { useState, useMemo, useEffect, useContext, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'

import theme from 'constants/theme'
import cookie from 'utils/cookie'
import { isLogin, customFetch } from 'utils'
import styled from 'styled-components'
import { keys, values } from 'lodash'

import { Bar } from 'react-chartjs-2';



const CustomerChart = ({ history, title }) => {
	const [data, setData] = useState(),
		[loading, setLoading] = useState(false)
	let chartData;

	const staticData = {
		ios: { "2019 February": 14, "2019 March": 12, "2019 April": 24, "2019 May": 55, "2019 June": 13, "2019 July": 85, "2019 August": 25, "2019 September": 67, "2019 October": 27, "2019 November": 39, "2019 December": 204, "2019 January": 69 },
		android: { "2019 February": 34, "2019 March": 12, "2019 April": 24, "2019 May": 55, "2019 June": 2, "2019 July": 114, "2019 August": 25, "2019 September": 84, "2019 October": 78, "2019 November": 14, "2019 December": 54, "2019 January": 9 }
	}

	if(true){
		const months = keys(staticData['ios'])
		const iosValues = values(staticData['ios'])
		const androidValues = values(staticData['android'])

		chartData = {
			labels: months,
			datasets: [
				{
					label: 'Android Customers',
					backgroundColor: '#a3a1fb87',
					borderColor: '#a3a1fbb8',
					borderWidth: 1,
					hoverBackgroundColor: '#a3a1fbc7',
					hoverBorderColor: '#a3a1fbdb',
					data: androidValues
				},
				{
					label: 'iOS Customers',
					backgroundColor: '#ffd1cc',
					borderColor: '#f9cbc7',
					borderWidth: 1,
					hoverBackgroundColor: '#f9cbc7',
					hoverBorderColor: '#f9cbc7',
					data: iosValues
				}
			]
		};
	}


	const token = cookie.getToken()
	const fetchLogs = async () => {
		try {
			setLoading(true)
			const [response, headers] = await customFetch('admin/users/customers_growth', 'GET', { per_page: 10, page: 1, filters: '' }, { Authorization: `Bearer ${token}` })
			await setData(response.growth);
			setLoading(false)
		} catch (e) {
			console.log(e);
		}
	};

	const fetchData = useCallback(() => {
		fetchLogs();
	}, [])

	useEffect(() => {
		// fetchData()
		// updateLoadingState(false)
	}, [history.location.pathname])

	if (!chartData) return <div>Loading...</div>
	return (
		<div style={{ width: '55.5%', background: '#fff', padding: '15px 20px', overflowY: 'scroll' }}>
			<Title>{title}</Title>
			<Bar
				data={chartData}
				width={100}
				height={70}
				options={{
					maintainAspectRatio: true
				}}
			/>
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

