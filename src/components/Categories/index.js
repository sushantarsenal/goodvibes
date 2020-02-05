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

const Categories = ({ history }) => {
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
				Header: "Categories",
				columns: [
					{
						Header: "Name",
						accessor: "name",
						Filter: true,
						type: 'text'
					},
					{
						Header: "Genre",
						accessor: "genre.name",
					},
					{
						Header: "Track Count",
						accessor: "track_count"
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
	const fetchCategories = async ({ pageSize, pageIndex, state, hotFilters }) => {
		try {
			setLoading(true)
			const [response, headers] = await customFetch('v1/categories', 'GET', { per_page: 20, page: pageIndex+1, filters: hotFilters || '' }, { Authorization: `Bearer ${token}` })
			setData(response.categories);
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
		fetchCategories({ pageSize, pageIndex, state, hotFilters });
	}, [])


	//if (loading) return <div>Loading...</div>
	return (
		<Container>
			<Sidebar items={getSidebarItems()} history={history} />

			<RouteWithSidebar>
				<CustomHeader currentUser={currentUser} history={history} />
				<Breadcrumb name='Categories' createNew={true} path={`/categories/new`} title='Add New Categories' />
				<Gist>
					<NewTable
						columns={columns}
						data={data || []}
						fetchData={fetchData}
						loading={loading}
						pageCount={pageCount}
						filters={filters}
						total={total}
						handleOnInputChange={handleOnInputChange}
					/>
				</Gist>
			</RouteWithSidebar>
		</Container>
	)

}

Categories.propTypes = {
	history: PropTypes.object
}
export default Categories

