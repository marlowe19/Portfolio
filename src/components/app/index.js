
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import Experience from '../Experience'
//import { Button } from 'semantic-ui-react'
//import Projects from '../Project'
//import Education from '../Education'
//import Paragraph from '../Paragraph'
import TimeLine from '../Timeline'
import FireStore from '../../FireStore'
import Recommendations from '../Recommendations'
import StatisticsSection from "../Statistics"
import Steps from "../Steps"
import { RIETextArea } from 'riek'
import _ from 'lodash'
import RecommendationModal from '../Recommendations/RecommendationModal'

class App extends Component {
  state = {
    cv: null,
    introduction: "",
    werkervaring: {},
    open: true,
    stepsData:[],
    feedback: {
      header: "Terug Blik",
      icon:"flag checkered",
      content: "content of  feedback",
      image: { url: "https://api.adorable.io/avatars/285/abott@adorable.png", alt: "meta" }
    },
    feedforward: {
      header:"Toekomst blik",
      icon:"rocket",
      content: "content of  feedforward",
      image: { url: "https://api.adorable.io/avatars/285/check@adorable.png", alt: "meta" }
    }
  }
 changeInlineEdit = (newState)=>{
   
    this.changeState(newState);
  }
  changeState = (newState) => {
    
    console.log("nieuw",Object.values(newState))
   
     FireStore.update("/introduction",newState.introduction ,value=>{
      this.setState(newState);
     })
   
  };
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
  show = size => () => this.setState({ open: true })
  componentWillMount() {
    //introduction
    FireStore.subscribe("/introduction", e => {

      this.setState({
        introduction: e
      })
    })

    FireStore.subscribe("/Steps", e => {
      
            this.setState({
              stepsData: e
            })
          })

  }

  render() {

    // if(!this.state.cv){
    //     return <div> Loading...</div>
    //   }
    return (

      <div className="App">
        <section className="aboutme">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-xs-12">
              
          <RecommendationModal open ={this.state.open}/>
              </div>
              <div className="col-md-6 col-xs-12">
              <RIETextArea
                    value={this.state.introduction}
                    change={this.changeInlineEdit}
                    lassName={this.state.highlight ? "editable" : ""}
                    propName='introduction'
                    classInvalid="invalid"
                    validate={_.isString} />
                {/* {this.state.introduction} */}

              </div>
            </div>
          </div>
        </section>
        <section className="stepsarea">
          <div className="container"> 
          <Steps data={this.state.stepsData}/>
          </div>
         
        </section>
       
        <section className="experience">

          <div className="container">
            
            <TimeLine />
            {/* <Experience {...this.state.werkervaring}/>
            <Education list={this.state.opleidingen}/> */}
          </div>

        </section>

        {/* <section className="projects">
              <div className="container"> <Projects projects={this.state.projects}/></div>
              
        </section> */}

        <section className="skills">

          <div className="container">
           
            <Recommendations size="massive"/>
          </div>

        </section>
        <section className="experience">
          <div className="container">
            <StatisticsSection />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
