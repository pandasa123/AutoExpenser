import React from 'react'
import Layout from './Layout'
import VerticalCard from './Cards/VerticalCard'

const App = ({ darkMode = false }) => {
	let bg = '#faf9f8'
	if (darkMode) {
		bg = '#292827'
	}
	const ContainerStyle = {
		backgroundColor: bg,
		minHeight: '100vh',
		color: 'white'
	}

	return (
		<Layout layoutStyle={ContainerStyle}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					padding: '32px',
					flexWrap: 'wrap'
				}}
			>
				<div style={{ margin: '12px' }}>
					<VerticalCard
						month={'August 2019'}
						day={'31st'}
						title={
							'Flight to Boston Logan Airport for 2 Week Holiday'
						}
						backgroundImageURL={
							'https://images.unsplash.com/photo-1540888513280-fac1aa56c69f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=80'
						}
						subtitle={'August 31st'}
						airport={'AUS to BOS'}
						numItems={12}
						numAccepted={12}
					/>
				</div>
				<div style={{ margin: '12px' }}>
					<VerticalCard
						month={'August 2019'}
						day={'15th'}
						title={'Extreme Blue Presentation Trip in New York'}
						subtitle={'August 15th'}
						airport={'AUS to JFK'}
						numItems={9}
						numAccepted={4}
					/>
				</div>
				<div style={{ margin: '12px' }}>
					<VerticalCard
						month={'August 2019'}
						day={'8th'}
						title={
							'Flight to Austin for IBM Extreme Blue Internship'
						}
						backgroundImageURL={
							'https://images.unsplash.com/photo-1561958867-e77582c2dc39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2255&q=80'
						}
						subtitle={'August 8th - August 12th'}
						airport={'BOS to AUS'}
						numItems={3}
						numAccepted={0}
					/>
				</div>
			</div>
		</Layout>
	)
}

export default App
