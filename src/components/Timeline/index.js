import React, { Component } from 'react';
import './timeline.css'
import FireStore from '../../FireStore'
import { Label } from 'semantic-ui-react'

export default class TimeLine extends Component {

	state = {
		items: []
	}

	componentWillMount() {
		// /projects/
		FireStore.subscribe("projecten", value => {

			this.setState({
				items: value
			})
		})

	}

	render() {
		const { items } = this.state
		return (<div>

			<section id="cd-timeline" className="cd-container">
				{items.map((item, key) => <TimeLineItem key={key} item={item} />)}

			</section>
		</div>);
	}
}

function TimeLineItem({ item }) {
	return (<div className="cd-timeline-block">
		<div className="cd-timeline-img cd-picture">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-picture.svg" alt="icon of company" />
		</div>

		<div className="cd-timeline-content">
			<h2>{item.companyName}</h2>
			<p>{item.description}</p>
			{item.skills.map((skill, key) => <Label key={key}>{skill}</Label>)}
			{/* <span className="cd-date">{item.date}</span> */}
		</div>
	</div>)

}

