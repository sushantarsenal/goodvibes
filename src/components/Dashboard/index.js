import React, { useState, useMemo, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import cookie from 'utils/cookie'
import { isLogin, customFetch } from 'utils'
import { UserContext } from 'contexts/UserContext'

import Container from 'commons/Container'
import getSidebarItems from '../commons/WrapperWithSidebar/sidebarItems'
import Sidebar, { RouteWithSidebar } from 'commons/Sidebar'
import CustomHeader from 'commons/CustomHeader'
import Gist from 'commons/Style/Gist'
import Breadcrumb from 'commons/Style/Breadcrumb'
import styled from 'styled-components'
import MiniCard from 'commons/MiniCard'
import MiniCustomers from '../Customers/MiniCustomers'
import MiniTracks from '../Tracks/MiniTracks'

const Dashboard = ({ history }) => {
	const [loading, updateLoading] = useState(true),
		[data, setData] = useState([]),
		{ currentUser, metrics } = useContext(UserContext)

	// if (loading) return <div>Loading...</div>
	return (
		<Container>
			<Sidebar items={getSidebarItems()} history={history} />

			<RouteWithSidebar>
				<CustomHeader currentUser={currentUser} history={history} />
				<Breadcrumb name='Overview' settings={false} />
				<Gist style={{background: 'none', padding: 0}}>
					<CardsContainer>
						<MiniCard title='Total Tracks' body={metrics.tracks_count}></MiniCard>
						<MiniCard title='Total Customers' body={metrics.customers_count}></MiniCard>
						<MiniCard title='Total Subscribers' body={metrics.subscribers_count}></MiniCard>
						<MiniCard title='Total Active Users' body={metrics.active_users_count}></MiniCard>
					</CardsContainer>
					<MiniTablesContainer>
						<MiniCustomers title={'Customers'} history={history} />
						<MiniTracks title={'Trending Tracks'} history={history} />
					</MiniTablesContainer>

				</Gist>
			</RouteWithSidebar>
		</Container>
	)
}

Dashboard.propTypes = {
	history: PropTypes.object
}

const CardsContainer = styled.div`
	display: flex;
	justify-content: space-between;
`,
MiniTablesContainer = styled.div`
	display: flex;
	margin-top: 30px;
	min-height: 500px;
	max-height: 500px;
	overflow: hidden;
	justify-content: space-between;
`

export default Dashboard

