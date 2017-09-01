//@ts-check
//@flow
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import Experience from '../Experience'
import { Divider,Icon } from 'semantic-ui-react'
//import Projects from '../Project'
//import Education from '../Education'
import TimeLine from '../Timeline'
import FireStore from '../../FireStore'
import Recommendations from '../Recommendations'
import StatisticsSection from "../Statistics"

class App extends Component {
  state={
    cv: null,
    introduction:null,
    werkervaring: {}
  }

  componentWillMount(){
  //introduction
   FireStore.subscribe("/introduction",e =>{
    
    this.setState({
      introduction: e
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
            <div className="col-md-3 col-xs-12">
                <ul className="personalia">
                  <li>
                    <span className="name"><Icon circular name="calendar"/></span><span className="value">27</span>
                  </li>
                  <li>
                    <span className="name"><Icon circular name="mail"/></span><span className="value">Zoetermeer</span>
                  </li>
                  <li>
                    <span className="name"><Icon circular name="at"/></span><span className="value">marlowe.antonius@gmail.com</span>
                  </li>
                  </ul>
            </div>
            <div className="col-md-9 col-xs-12">
               {this.state.introduction}
              
            </div>
             </div>
             </div>
        </section>
        
        <section className="experience">
           
          <div className="container">
            <Divider section horizontal>Werkervaring/ Opleiding</Divider>
            <TimeLine/>
            {/* <Experience {...this.state.werkervaring}/>
            <Education list={this.state.opleidingen}/> */}
          </div>
               
        </section>
       
        {/* <section className="projects">
              <div className="container"> <Projects projects={this.state.projects}/></div>
              
        </section> */}
        
       <section className="skills">
              
              <div className="container">
                <Divider section horizontal>Recommendations</Divider>
                  <Recommendations/>
              </div>
               
        </section>
        <section className="experience">
          <div className="container">
            <StatisticsSection/> 
            </div>
        </section>
      </div>
    );
  }
}

export default App;
