import React, { Component } from 'react';
import './timeline.css'
import FireStore from '../../FireStore'
import { Label, Modal, Button, Header, Form, TextArea, Dropdown } from 'semantic-ui-react'

export default class TimeLine extends Component {

	state = {
		items: [],
		options: [],
		title: '',
		form_value_companyName: '',
		form_value_projectTitle: '',
		form_value_challenge: '',
		form_value_role: '',
		form_value_result: '',
		form_value_endDate: '',
		form_value_startDate:'',
		year: '',
		skills: [],
		saved:false,
		projectId:"",
		modalOpen:false,
		currentItem:null
	}
	handleformInput = (e, { name, value }) => this.setState({ [name]: value })
	submitForm = () => {
		const { companyName, description, skills, title } = this.state
		const newProject = {
			key: this.state.projectId,
			companyName: this.state.form_value_companyName,
			projectTitle: this.state.form_value_projectTitle,
			challenge: this.state.form_value_challenge,
			role: this.state.form_value_role,
			result: this.state.form_value_result,
			skills,
			startDate: this.state.form_value_startDate,
			endDate: this.state.form_value_endDate,
			title
		}
		console.log("object", newProject)
		console.log("project id", this.state.projectId)
		if(this.state.projectId){
			FireStore.update("projects/"+this.state.projectId,newProject,value=>{

			})
		}else{
			FireStore.put("projects", newProject, value => {
				console.log("callback",value);
				value ? this.setState({projectId:value, saved:true}): null
	
				}
			 )
		}
		
	}
	handleOpen = (item) => {
		
		if(item){
			this.setState({
				projectId: item.key,
				form_value_companyName: item.companyName,
				form_value_projectTitle: item.projectTitle,
				form_value_challenge: item.challenge,
				form_value_role: item.role,
				form_value_result: item.result,
				form_value_endDate: item.endDate,
				form_value_startDate:item.startDate,
				skills: item.skills,
				modalOpen: true

			 })
		}else{
			this.setState({ modalOpen: true,currentItem:item })
		}
		
	}
	handleDate=(e)=>{
		this.setState({ [e.target.name]: e.target.value })
	}
	handleAddition = (e, { value }) => {
		const option = {
			key: Math.random(),
			value,
			text: value
		};
		FireStore.put("skills", option, value => {
			this.setState({
				options: [option, ...this.state.options],
			})
		});

	}
	handleClose = () => this.setState({ modalOpen: false })
	handleChange = (e, { value }) => this.setState({ skills: value })
	componentWillMount() {
		// /projects/
		FireStore.subscribe("skills", value => {
			console.log("skills", value)
			this.setState({
				options: value
			})
		});
		FireStore.subscribe("projects", value => {
			value.sort(function(a,b) { 
				return new Date(b.startDate).getTime() - new Date(a.startDate).getTime() 
			});
			this.setState({
				items: value
			})
		});

	}

	render() {
		const { items, projectId, skills, form_value_endDate,form_value_startDate, form_value_companyName, form_value_projectTitle, form_value_result, form_value_role, form_value_challenge } = this.state
		return (<div>
			{window.user ? <Button size="massive" onClick={this.handleOpen} content='Nieuw project toevoegen' icon='plus' color="green" labelPosition='left' /> : null}
			<Modal  onClose={this.handleClose} open={this.state.modalOpen} 
				 closeIcon>
				<Modal.Header>{projectId?"project bewerken":"Nieuw project toevoegen" }</Modal.Header>
				<Modal.Content image scrolling>
					<Modal.Description>
						<Header>Project</Header>

						<div className="col-md-7 col-xs-12">
							<Form size='huge' onSubmit={this.onSubmit}>
								<Form.Field>
									<label>Gebruikte technieken</label>
									<Dropdown
										options={this.state.options}
										placeholder='Technieken'
										search
										selection
										fluid
										multiple
										allowAdditions
										value={skills}
										onAddItem={this.handleAddition}
										onChange={this.handleChange}
									/>
								</Form.Field>
								<Form.Group widths='equal'>
									<Form.Input onChange={this.handleformInput} name="form_value_projectTitle" value={form_value_projectTitle} size="huge" label="Titel" />
									<Form.Input onChange={this.handleformInput} name="form_value_companyName" value={form_value_companyName} size="huge" label="Bedrijfsnaam" />
								</Form.Group>


								<Form.Field>
									<label>Uitdaging</label>
									<TextArea  onChange={this.handleformInput} name="form_value_challenge" value={form_value_challenge} label="beschrijving" autoHeight placeholder='Try adding multiple lines' />
								</Form.Field>
								<Form.Field>
									<label>Bijdrage</label>
									<TextArea  onChange={this.handleformInput} name="form_value_role" value={form_value_role} label="bijdrage" autoHeight placeholder='bijdrage' />
								</Form.Field>
								<Form.Field>
									<label>Resultaat</label>
									<TextArea  onChange={this.handleformInput} name="form_value_result" value={form_value_result} label="beschrijving" autoHeight placeholder='wat was het resultaat van het project' />
								</Form.Field>
								<Form.Group widths='equal'>
									<Form.Field>
										<label>Start datum</label>

										<input defaultValue={form_value_startDate} name="form_value_startDate" onChange={this.handleDate} type="date" />
									</Form.Field>
									<Form.Field>
										<label>Eind datum</label>

										<input defaultValue={form_value_endDate} name="form_value_endDate" onChange={this.handleDate}  type="date" />


									</Form.Field>


								</Form.Group>


							</Form>
						</div>
						<div className="col-md-5 col-xs-12">

						</div>

					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button size="massive" onClick={this.submitForm} content='Plaatsen' labelPosition='left' icon='edit' primary />
				</Modal.Actions>
			</Modal>
			<section id="cd-timeline" className="cd-container">
				{items.map((item, key) => <TimeLineItem edit={this.handleOpen} id={item.key} key={key} item={item} />)}

			</section>
		</div>);
	}
}

function TimeLineItem({ item, edit }) {
	return (<div onClick={()=> edit(item)} className="cd-timeline-block">
		<div className="cd-timeline-img cd-picture">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-picture.svg" alt="icon of company" />
		</div>

		<div className="cd-timeline-content">
			<h2>{item.projectTitle}</h2>
			<h3>{item.companyName} {Till(item.startDate,item.endDate)}</h3>
			<p><div>Uitdaging:</div> {item.challenge}</p>
			<p><div>Bijdrage:</div> {item.role}</p>
			<p><div>Resultaat:</div> {item.result}</p>
			
			{item.skill? item.skills.map((skill, key) => <Label key={key}>{skill}</Label>): null}
			{/* <span className="cd-date">{item.date}</span> */}
		</div>
	</div>)

}

function Till(startDate, endDate){
	if (!startDate && !endDate){
		return "Geen termijn ingesteld"
	}
	if(startDate && !endDate){
		console.log(new Date(startDate).getFullYear().toString())
		return new Date(startDate).getFullYear().toString()+" - heden"
	}
	if(startDate && endDate){
		console.log(new Date(startDate).getFullYear().toString())
		return new Date(startDate).getFullYear().toString()+" - " + new Date(endDate).getFullYear().toString()
	}
}