import React from 'react'
import b2cauth from 'react-azure-adb2c'
import Layout from './Layout'
import Card from './Card'

const ContainerStyle = {
	backgroundColor: '#282c34',
	minHeight: '100vh',
	display: 'flex',
	flexDirection: 'column',
	color: 'white',
	justifyContent: 'space-between'
}

const App = () => {
	return (
		<Layout layoutStyle={ContainerStyle}>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<Card title="Create New Report" />
				<Card title="JFK" status="Approved" />
			</div>
		</Layout>
	)
}

export default App
