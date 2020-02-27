import React, {useState, useMemo, useEffect, useContext, useCallback, useRef} from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import cookie from 'utils/cookie'
import { customFetch } from 'utils'

import Container from 'commons/Container'
import getSidebarItems from '../commons/WrapperWithSidebar/sidebarItems'
import Sidebar, { RouteWithSidebar } from 'commons/Sidebar'
import CustomHeader from 'commons/CustomHeader'
import Gist from 'commons/Style/Gist'
import Breadcrumb from 'commons/Style/Breadcrumb'
import NewTable from 'commons/NewTable'
import { UserContext } from 'contexts/UserContext'
import { debounce } from 'lodash'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Customers = ({ history }) => {
	const {currentUser} = useContext(UserContext)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [pageCount, setPageCount] = useState(0)
	const [filters, setFilters] = useState({})
	const [total, setTotal] = useState(0)

	const columns = useMemo(
		() => [
			{
				Header: "customers",
				columns: [
					{
						Header: "Email",
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
						Header: "Country",
						accessor: "country",
						type: 'association'
					},
					{
						Header: "Status",
						accessor: "status",
						Filter: false
					},
					{
						Header: "Options",
						accessor: "",
						type: 'options',
						table: 'users',
						disable: true
					}
				]
			}
		],
		[]
	);

	const handleOnInputChange = async (pageSize, pageIndex, state, value, column) => {
		await setFilters(prevState => ({ ...prevState, [column]: value }))
		const hotFilters = filters
		hotFilters[column] = value
		console.log(hotFilters)
		fetchData({ pageSize, pageIndex, state, hotFilters})
	};

	const token = cookie.getToken()
	const fetchCustomers = async ({ pageSize, pageIndex, state, hotFilters }) => {
		try {
			setLoading(true)
			const [response] = await customFetch('admin/users', 'GET', { per_page: 20, page: pageIndex+1, filters: hotFilters || ''}, { Authorization: `Bearer ${token}` })
			setData(response.users);
			setTotal(response.total);
			setLoading(false)
			setPageCount(response.pages)
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		//fetchCustomers();
	}, [])

	const fetchData = useCallback(({ pageSize, pageIndex, state, hotFilters }) => {
		fetchCustomers({pageSize, pageIndex, state, hotFilters});
	}, [])

	const deleteRecord = async (url) => {
		try {
			confirmAlert({
				title: 'Confirm to delete',
				message: 'Are you sure, you want to delete this record?',
				buttons: [
					{
						label: 'Yes',
						onClick: () => {
							customFetch(url, 'DELETE', {}, { Authorization: `Bearer ${token}` })
							history.push('/customers')
						}
					},
					{
						label: 'No',
						onClick: () => history.push('/customers')
					}
				]
			});
		} catch (e) {
			console.log(e)
		}
	}

	const disableEnable = async (url, val) => {
		const [response] = await customFetch(url, 'PUT', val, { Authorization: `Bearer ${token}` })
		window.location.reload()
	}

	//if (loading) return <div>Loading...</div>
	return (
		<Container>
			<Sidebar items={getSidebarItems()} history={history} />

			<RouteWithSidebar>
				<CustomHeader currentUser={currentUser} history={history}/>
				<Breadcrumb name='Customers' createNew={true} path={`/customers/new`} title='Add New Customer' />
				<Gist>
					<NewTable
						columns={columns}
						data={data || []}
						fetchData={fetchData}
						loading={loading}
						pageCount={pageCount}
						filters={filters}
						total={total}
						handleOnInputChange={debounce(handleOnInputChange, 150)}
						deleteRecord={deleteRecord}
						disableEnable={disableEnable}
						pagination={true}
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

