import React, { useState, useMemo, useEffect, useContext, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import NewTable from 'commons/NewTable'
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
			const [response, headers] = await customFetch('admin/activity_logs', 'GET', { per_page: 10, page: 1, filters: '' }, { Authorization: `Bearer ${token}` })
			setData(response.activity_logs);
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

	const listItems = data.map((item) =>
		<Item>{item.message}</Item>
	);

	// if (loading) return <div>Loading...</div>
	return (
		<div style={{ width: '41.5%', background: '#fff', padding: '15px 20px' }}>
			<Title>{title}</Title>
			<List>{listItems}</List>
			{/* <NewTable
				header={false}
				columns={columns}
				data={data || []}
				fetchData={fetchData}
				loading={loading}
				pageCount={1}
				filters={{}}
				total={10}
				pagination={false}
			/> */}
		</div>
	)
}

const Title = styled.div`
	font-size: 20px
	padding-bottom: 10px
	font-weight: 600
`,
List=styled.ul`
	list-style: none
`,
Item=styled.li`
	border-bottom: 1px solid #dedede;
	padding: 10px 0
`

MiniLogs.propTypes = {
	history: PropTypes.object
}


export default MiniLogs

