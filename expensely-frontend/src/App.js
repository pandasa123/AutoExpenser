import React from 'react'
import logo from './logo.svg'
import './App.css'
import { PrimaryButton } from 'office-ui-fabric-react'

const App = () => {
	return (
		<div className="App">
			<header
				className="App-header"
				style={{ backgroundColor: '#faf9f8' }}
			>
				<img src={logo} className="App-logo" alt="logo" />
				<p style={{ color: '#000000' }}>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<PrimaryButton>Microsoft Fabric Button</PrimaryButton>
			</header>
		</div>
	)
}

export default App
