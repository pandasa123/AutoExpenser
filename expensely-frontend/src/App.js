import React from 'react'
import './App.css'
import { PrimaryButton } from 'office-ui-fabric-react'
import b2cauth from 'react-azure-adb2c'
import Layout from './Layout'

const ContainerStyle = {
	backgroundColor: '#282c34',
	minHeight: '100vh',
	display: 'flex',
	flexDirection: 'column',
	color: 'white',
	justifyContent: 'space-between'
}

const CardStyle = {
	backgroundColor: '#C5E2F9',
	color: 'black',
	width: '128px',
	height: '128px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	textAlign: 'center'
}

const App = () => {
	return (
		<Layout layoutStyle={ContainerStyle}>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<div style={CardStyle}>Create New Report</div>
			</div>
		</Layout>
	)
}

export default App
