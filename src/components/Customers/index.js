import React, {useState, useMemo, useEffect, useContext, useCallback, useRef} from 'react'
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
import {isEmpty} from 'lodash'

const Customers = ({ history }) => {
	const {currentUser} = useContext(UserContext)

	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [pageCount, setPageCount] = useState(0)
	const fetchIdRef = useRef(0)
	const [filters, setFilters] = useState({})

	const columns = useMemo(
		() => [
			{
				Header: "Customers",
				columns: [
					{
						Header: "Customer's Name",
						accessor: "email",
						Filter: true,
						type: 'text'

					},
					{
						Header: "Created Date",
						accessor: "created_at",
						Filter: false
					},
					{
						Header: "Plan",
						accessor: "plan"
					},
					{
						Header: "Status",
						accessor: "status",
						Filter: SelectFilter,
						filter: 'includes'
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

	const handleOnInputChange = (pageSize, pageIndex, state, value, column) => {
		setFilters(prevState => ({ ...prevState, [column]: value }))
	};

	const token = cookie.getToken()
	const fetchCustomers = async ({ pageSize, pageIndex, state }) => {
		try {
			setLoading(true)
			const [response, headers] = await customFetch('v1/users', 'GET', {per_page: 5, page: pageIndex, filters: filters || ''}, { Authorization: `Bearer ${token}` })

			setData(response.users);
			setLoading(false)
			setPageCount(response.pages)
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		//fetchCustomers();
	}, [])

	const fetchData = useCallback(({ pageSize, pageIndex, state }) => {
		fetchCustomers({pageSize, pageIndex, state});
	}, [])


	//if (loading) return <div>Loading...</div>
	return (
		<Container>
			<Sidebar items={getSidebarItems()} history={history} />

			<RouteWithSidebar>
				<CustomHeader currentUser={currentUser} history={history}/>
				<Breadcrumb name='Customers' createNew={false} />
				<Gist>
					<NewTable
						columns={columns}
						data={data || []}
						fetchData={fetchData}
						loading={loading}
						pageCount={pageCount}
						filters={filters}
						handleOnInputChange={handleOnInputChange}
					/>
				</Gist>
			</RouteWithSidebar>
		</Container>
	)
}

Customers.propTypes = {
	history: PropTypes.object
}
export default Customers

