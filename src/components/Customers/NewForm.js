import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { get, omit, last, capitalize } from 'lodash'
import { TextField, FileField, SelectField } from 'commons/Forms/InputField'
import Button from 'commons/Buttons/NormalButton'
import validate from 'utils/validate'
import { compose } from 'redux'

import Container from 'commons/Container'
import getSidebarItems from '../commons/WrapperWithSidebar/sidebarItems'
import Sidebar, { RouteWithSidebar } from 'commons/Sidebar'
import CustomHeader from 'commons/CustomHeader'
import Gist from 'commons/Style/Gist'
import Breadcrumb from 'commons/Style/Breadcrumb'

import Row from 'commons/Forms/Row'
import { isSubmitButtonDisabled, normalizeName, customFetch } from 'utils'
import { Wrapper, UserNameText, Avatar, Form } from '../styled'
import { getNames } from 'country-list'
import cookie from 'utils/cookie'

const NewForm = ({ history, initialize, ...props}) => {

	const token = cookie.getToken()
	const handleFormSubmit = async (values) => {
		try {
			const [response] = await customFetch('admin/users', 'POST', {
				...values
			})
			if (response.user) history.push('/customers')
		} catch (e) {

		}
	}
	const countries = getNames().map(item => ({ id: item, value: item }))

	console.log(props.initialValues)
	return (
		<Form
			onSubmit={props.handleSubmit(values =>
				handleFormSubmit(values),
			)}
		>
			<Row>
				<Field
					name="full_name"
					label="Full Name *"
					component={TextField}
					normalize={normalizeName}
				/>
			</Row>
			<Row>
				<Field
					name="email"
					label="Email *"
					component={TextField}
				/>
				<Field
					name="country"
					label="Country"
					component={SelectField}
					isSearchable
					options={countries}
				/>
			</Row>
			<Row>
				<Field
					name="city"
					label="Address"
					component={TextField}
				/>
				<Field
					name="state"
					label="State"
					component={TextField}
				/>
			</Row>
			<Row>
				<Button
					type="submit"
					disabled={isSubmitButtonDisabled(props)}
				>
					Save
				</Button>
			</Row>
		</Form>
	)
}

Form.propTypes = {
	history: PropTypes.object
}

const fields = {
	full_name: { required: true, label: 'Full Name' },
	email: { required: true, label: 'Email' },
}

export default compose(
	connect((state, props) => {

	}),
	reduxForm({
		form: 'newNewForm',
		fields: { ...fields },
		validate,
		enableReinitialize: true,
	}),
)(NewForm)

