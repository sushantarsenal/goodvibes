import React from 'react'
import PropTypes from 'prop-types'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import cookie from 'utils/cookie'

import Dropdown from 'commons/Dropdown'
import Logo from 'assets/images/logo.png'
import avatar from 'assets/images/avatar.png'
import {
	HeaderWrapper,
	Header,
	CompanyLogo,
	LogoLink,
	Menu,
	MenuItem,
	Image,
	ProfileDropdown,
	Avatar,
} from './styled'



const CustomHeader = ({history}) => {
	const logoutActions = (history) => {
		cookie.clearAll()
		history.push('/auth')
	}
	console.log(history)
	return (
		<HeaderContainer>
			<Header>
				<Dropdown
					history={history}
					target={() => (
						<ProfileDropdown>
							<Avatar src={avatar} alt="profile" />
						</ProfileDropdown>
					)}
					isSearchable={false}
					options={[
						{
							id: 2,
							label: 'Settings',
							onClick: () => history.push('/settings'),
						},
						{
							id: 3,
							label: 'Logout',
							onClick: () => logoutActions(history),
						}
					]}
				/>
			</Header>
		</HeaderContainer>
	)

}

const HeaderContainer = styled.div `
	background: #ffffff;
	padding: 5px 36px 5px 40px;
	display: flex;
	justify-content: flex-end;
	`,
	Name=styled.div`
		font-size: 14px;
	`,
	Logout=styled.div`
		color: red;
		font-size: 14px;
	`



export default CustomHeader

