import React from 'react';
import styled from 'styled-components'
import theme from 'constants/theme'

const Breadcrumb = ({name, createNew}) => {
	return (
		<>
			{ (name || createNew) &&
				<Container>
					<ActualBreadcrumb>{name}</ActualBreadcrumb>
					<RightSettings></RightSettings>
				</Container>
			}
		</>
	)
}

const Container = styled.div`
	display: flex;
	min-width: ${({ fluid }) => fluid ? '100%' : '991px'};
  color: ${theme.color.text.primary};
	margin-top: 20px;
	padding: 10px 20px 10px 0;
	margin: 20px 40px;
	justify-content: space-between;
	align-items: baseline;
	`,
	ActualBreadcrumb = styled.div`
		font-size: 30px;
		font-weight: bolder;
		display: block;
		width: 30%;
	`,
	RightSettings = styled.div`
		display: flex;
	`

export default Breadcrumb
