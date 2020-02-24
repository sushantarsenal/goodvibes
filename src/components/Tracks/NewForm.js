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
import { pickBy } from 'lodash'
import Switch from 'commons/Forms/Switch'

const NewForm = ({ history, initialValues, action, id, categories, ...props}) => {
	const token = cookie.getToken()
	const associationFields = ['category_id']

	const handleFormSubmit = async (values) => {
		const formData = new FormData();
		const newValues = pickBy(values, v => v !== undefined && v !== null)
		// pick not null values here so that null values don't have to be stringified
		// do json.stringify for every values here and JSON.parse on every value son server
		const keys = Object.keys(newValues)
		keys.map(key => {
			formData.append(key, associationFields.includes(key) ? values[key]['id'] || "" : values[key] || "")
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

	const categoryList = categories.map(item => ({ id: item.id, value: item.name }))
	const trackExt = ['.mp3', '.wav']
	const imgExt = ['.jpg', '.jpeg', '.png']

	return (
		<Form
			onSubmit={props.handleSubmit(values =>
				handleFormSubmit(values),
			)}
		>
			<Row>
				<Field
					name="name"
					label="Track Title *"
					component={TextField}
				/>
			</Row>
			<Row>
				<Field
					name="category_id"
					label="Category"
					component={SelectField}
					isSearchable
					options={categoryList}
				/>
				<Field
					name="track_code"
					label="Track Code"
					component={TextField}
				/>
			</Row>
			<Row>
				<Field
					name="composer_name"
					label="Composer Name"
					component={TextField}
				/>
			</Row>
			<Row>
				<Field
					style={{ border: "none", paddingLeft: 0 }}
					name="track_file"
					label="Track File"
					component={FileField}
					accept={trackExt}
				/>
				<Field
					style={{ border: "none", paddingLeft: 0 }}
					name="image"
					label="Select Image"
					component={FileField}
					accept={imgExt}
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
				<Field
					name="active"
					component={Switch}
					rightLabel="Active?"
				/>
				<Field
					name="paid"
					component={Switch}
					rightLabel="Paid?"
				/>
				<Field
					name="push_notification"
					component={Switch}
					rightLabel="Send Push Notification?"
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
	name: { required: true, label: 'Full Name' }
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

