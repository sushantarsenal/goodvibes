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
import { debounce } from 'lodash'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Subscriptions = ({ history }) => {
	const { currentUser } = useContext(UserContext)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [pageCount, setPageCount] = useState(0)
	const [filters, setFilters] = useState({})
	const [total, setTotal] = useState(0)

	const optionsLinks = () => {
		return (<>
			<span>Edit</span>
			<span> | </span>
			<span>Delete</span>
		</>)
	}

	const columns = useMemo(
		() => [
			{
				Header: "Subscriptions",
				columns: [
					{
						Header: "Subscriber",
						accessor: "user",
						Filter: true,
						type: 'association'
					},
					{
						Header: "Purchase Date",
						accessor: "purchase_time",
						Filter: false
					},
					{
						Header: "Plan",
						accessor: "subs"
					},
					{
						Header: "Options",
						accessor: "",
						type: 'options',
						Options: optionsLinks
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
		fetchData({ pageSize, pageIndex, state, hotFilters })
	};

	const token = cookie.getToken()
	const fetchSubscriptions = async ({ pageSize, pageIndex, state, hotFilters }) => {
		try {
			setLoading(true)
			const [response, headers] = await customFetch('admin/subscriptions', 'GET', { per_page: 20, page: pageIndex+1, filters: hotFilters || '' }, { Authorization: `Bearer ${token}` })
			setData(response.subscriptions);
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
		fetchSubscriptions({ pageSize, pageIndex, state, hotFilters });
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
							history.push('/subscriptions')
						}
					},
					{
						label: 'No',
						onClick: () => history.push('/subscriptions')
					}
				]
			});
		} catch (e) {
			console.log(e)
		}
	}

	//if (loading) return <div>Loading...</div>
	return (
		<Container>
			<Sidebar items={getSidebarItems()} history={history} />

			<RouteWithSidebar>
				<CustomHeader currentUser={currentUser} history={history} />
				<Breadcrumb name='Subscriptions' createNew={true} path={`/subscriptions/new`} title='Add New Subscription' />
				<Gist>
					<NewTable
						columns={columns}
						data={data || []}
						fetchData={fetchData}
						loading={loading}
						pageCount={pageCount}
						filters={filters}
						total={total}
						deleteRecord={deleteRecord}
						handleOnInputChange={debounce(handleOnInputChange, 150)}
					/>
				</Gist>
			</RouteWithSidebar>
		</Container>
	)
}

Subscriptions.propTypes = {
	history: PropTypes.object
}
export default Subscriptions

