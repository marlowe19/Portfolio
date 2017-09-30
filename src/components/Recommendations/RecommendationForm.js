        import React, { Component } from 'react'
        import {Form,Divider } from 'semantic-ui-react'
        import FireStore from '../../FireStore';

        export default class RecommendationForm extends Component {
            handleNameInput = (e) => {
                var value = e.target.value
                console.log(value);
                this.setState({
                  name: value
                })
              }
              handleTextArea = (e) => {
                var value = e.target.value
            
                if (e.target.name === "recommendation") {
                  this.setState({
                    textArea: value
                  })
                } else {
                  this.setState({
                    tip: value
                  })
                }
            
              }
              handleSubmit = () => {
                const { name, textArea, tip } = this.state
                var newRecomendation = {
                  author: name,
                  content: textArea,
                  date: new Date().toString(),
                  tip
                }
            
                FireStore.put("/recommendations", newRecomendation,
                  value => {
                    console.log('status', value)
                  })
              }
          render() {
              
            return (
              <div>
                <Form onSubmit={this.props.handleSubmit(this.state.name,this.state.textArea,this.state.tip)} reply>
            <Form.Input onChange={this.handleNameInput} size="large" label="Naam" name="name" />
            <Form.TextArea name="recommendation" label="Recommendation" autoHeight onChange={this.handleTextArea} />
            <Form.TextArea name="tip" label="Tips" autoHeight onChange={this.handleTextArea} />
           
              <Divider/>
          </Form>
              </div>
            )
          }
        }
        
        
        