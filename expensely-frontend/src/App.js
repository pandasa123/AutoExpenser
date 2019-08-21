import React from 'react'
import Layout from './Layout'
import CreateNewReport from './Cards/CreateNewReport'
import ReceiptCard from './Cards/ReceiptCard'

const App = ({ darkMode = false }) => {
	let bg = '#faf9f8'
	if (darkMode) {
		bg = '#282c34'
	}
	const ContainerStyle = {
		backgroundColor: bg,
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		color: 'white',
		justifyContent: 'space-between'
	}

	const StyleProps = {
		size: '160px',
		margin: '16px'
	}

	return (
		<Layout layoutStyle={ContainerStyle}>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<CreateNewReport
					title="Create New Report"
					styleProps={StyleProps}
				/>
				<ReceiptCard
					title="JFK"
					styleProps={StyleProps}
					status="Approved"
				/>
			</div>
		</Layout>
	)
}

export default App
