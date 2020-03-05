import React, {useState} from 'react'
import PropTypes from 'prop-types'

import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { TextField, FileField, SelectField, DateField } from 'commons/Forms/InputField'
import Button from 'commons/Buttons/NormalButton'
import validate from 'utils/validate'
import { compose } from 'redux'

import Row from 'commons/Forms/Row'
import { isSubmitButtonDisabled, customFetch } from 'utils'
import { Form, Avatar } from '../styled'
import cookie from 'utils/cookie'
import { pickBy, last } from 'lodash'
import Switch from 'commons/Forms/Switch'
import styled, { css } from 'styled-components'
import defaultCover from 'assets/images/goodvibes.jpg'

import axios from 'axios'
import { Progress } from 'reactstrap';
import { API_ENDPOINT } from 'constants/url'

const NewForm = ({ history, initialValues, action, id, categories, ...props}) => {
	const token = cookie.getToken()
	const associationFields = ['category_id'],
		[imgUrl, setImgUrl] = useState(''),
		[trackUrl, setTrackUrl] = useState(''),
		[imgName, setImgName] = useState(''),
		[trackName, setTrackName] = useState(''),
		[loaded, setLoaded] = useState(0),
		apiUrl = process.env.REACT_APP_API_ENDPOINT

	const handleImage = file => {
		const previewUrl = URL.createObjectURL(file)
		setImgUrl(previewUrl)
		setImgName(file.name)
	}

	const handleTrack = file => {
		const track = URL.createObjectURL(file)
		setTrackUrl(track)
		setTrackName(file.name)
	}

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
				// [response] = await customFetch(`admin/tracks`, 'POST', formData, { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' })

				[response] = await axios({
					method: 'post',
					url: `${API_ENDPOINT}/admin/tracks`,
					data: formData,
					headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
					onUploadProgress(progressEvent) {
						setLoaded(progressEvent.loaded / progressEvent.total * 100)
					}
				}).then(({data}) => {
					if (data.track) history.push('/tracks')
				})
			} else {
				// [response] = await customFetch(`admin/tracks/${id}`, 'PUT', formData, { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' })
				[response] = await axios({
					method: 'put',
					url: `${API_ENDPOINT}/admin/tracks/${id}`,
					data: formData,
					headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
					onUploadProgress(progressEvent) {
						setLoaded(progressEvent.loaded / progressEvent.total * 100)
					}
				}).then(({ data }) => {
					if (data.track) history.push('/tracks')
				})
			}
		} catch (e) {
			console.log(e)
		}
	}

	const categoryList = categories.map(item => ({ id: item.id, value: item.name }))
	const trackExt = ['.mp3', '.wav']
	const imgExt = ['.jpg', '.jpeg', '.png']
	console.log(initialValues)
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
				<Field
					name="published_at"
					label="Publish Date"
					component={DateField}
				/>
			</Row>
			<Row>
				<CustomDiv>
					<Field
						style={{ border: "none", paddingLeft: 0 }}
						name="track_file"
						label="Track File"
						component={FileField}
						accept={trackExt}
						onChange={event => handleTrack(event)}
					/>

					<Field
						style={{ border: "none", paddingLeft: 0}}
						name="image"
						label="Select Image"
						component={FileField}
						accept={imgExt}
						onChange={event => handleImage(event)}
					/>
				</CustomDiv>

			</Row>
			<Row>
				<div class="form-group" style={{ width: '49%', display: 'flex', flexDirection: 'column' }}>
					<FileName>{trackName || last(initialValues.track_url && initialValues.track_url.split('/'))}</FileName>
					<div style={{fontWeight: 'bolder'}}>{Math.round(loaded, 2)}%</div>
					<div style={{ background: '#49d7632b'}}><Bar style={{ width: `${loaded}%` }}></Bar></div>
				</div>

				<div class="form-group" style={{ width: '49%', display: 'flex', flexDirection: 'column' }}>
					<FileName>{imgName || last(initialValues.track_image && initialValues.track_image.split('/'))}</FileName>
					<Avatar src={imgUrl || (initialValues.track_image && `${apiUrl}/${initialValues.track_image}`) || defaultCover} />
				</div>
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
					Upload & Save
				</Button>
			</Row>
		</Form>
	)
}

Form.propTypes = {
	history: PropTypes.object
}

const fields = {
	name: { required: true, label: 'Track Title' }
}

const Bar=styled.div`
	background: #49d863;
	height: 6px;
`,
CustomDiv=styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	input[type='file'] {
  	color: transparent;
	}
`,
FileName=styled.div`
	display: block;
	padding: 5px 0;
	font-size: 14px;
	overflow: hidden;
	color: #444444
`

export default compose(
	connect((state, props) => {
		return {
			initialValues: props.initialValues
		}
	}),
	reduxForm({
		form: 'newTrackForm',
		fields: { ...fields },
		validate,
		enableReinitialize: true,
	}),
)(NewForm)

