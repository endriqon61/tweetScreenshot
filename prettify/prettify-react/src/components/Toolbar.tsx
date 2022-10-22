import './Toolbar.css'
import {useState} from 'react'

export default function Toolbar() {

		return <>
				<div className='toolbar'>
					<button className='mode-select'>Tweet</button>
					<ul>
						<li>1</li>
						<li>2</li>
						<li>3</li>
						<li>4</li>
					</ul>
				</div>
		</>
}
