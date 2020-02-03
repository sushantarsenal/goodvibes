import React from 'react';
import styled from 'styled-components'
import theme from 'constants/theme'

const MiniCard = ({title, body}) => {
	return(
		<Container>
			<Title>{title}</Title>
			<Body>{body}</Body>
		</Container>
	)
}

const Container = styled.div`
	width: 23%;
	background: #fff
	padding: 25px 15px;
`,
Title = styled.div`
	color: ${theme.color.text.gray};
	font-size: 16px;
`,
Body = styled.div`
	color: ${theme.color.text.primary};
	font-size: 48px;
	font-weight: bolder;
`


export default MiniCard;
