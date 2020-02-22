import React from 'react'
import PropTypes from 'prop-types'

import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { TextField, FileField, SelectField, DateField } from 'commons/Forms/InputField'
import Button from 'commons/Buttons/NormalButton'
import validate from 'utils/validate'
import { compose } from 'redux'

import Row from 'commons/Forms/Row'
import { isSubmitButtonDisabled, customFetch } from 'utils'
import { Form } from '../styled'
import cookie from 'utils/cookie'
import { omitBy, isNil, isEmpty } from 'lodash'
import Switch from 'commons/Forms/Switch'

const NewForm = ({ history, initialValues, action, id, ...props}) => {
	const token = cookie.getToken()
	const associationFields = ['category']

	const handleFormSubmit = async (values) => {
		const formData = new FormData();
		const newValues = omitBy(omitBy(values, isEmpty), isNil)
		const keys = Object.keys(newValues)

		keys.map(key => {
			formData.append(key, associationFields.includes(key) ? values[key]['id'] : values[key])
		})

		try {
			let response
			if (action === 'new') {
				[response] = await customFetch(`admin/tracks`, 'POST', formData, { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' })
			} else {
				[response] = await customFetch(`admin/tracks/${id}`, 'PUT', formData, { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' })
			}
			if (response.track) history.push('/tracks')
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<Form
			onSubmit={props.handleSubmit(values =>
				handleFormSubmit(values),
			)}
		>
			<Row>
				<Field
					name="name"
					label="Category Name *"
					component={TextField}
				/>
				<Field
					name="genre"
					label="Genre"
					component={TextField}
				/>
			</Row>
			<Row>
				<Field
					name="description"
					label="Description"
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
	name: { required: true, label: 'Category Name' }
}

export default compose(
	connect((state, props) => {
		return {
			initialValues: props.initialValues
		}
	}),
	reduxForm({
		form: 'newNewForm',
		fields: { ...fields },
		validate,
		enableReinitialize: true,
	}),
)(NewForm)

