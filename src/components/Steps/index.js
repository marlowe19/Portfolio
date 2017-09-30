import React from 'react'
import './steps.css'
import {Icon } from 'semantic-ui-react'
 function Step(props) {
     const  linePosition = props.position && props.position ==="left" ? "left line":"right line"
     const arrowName =  props.position && props.position ==="left" ? "arrow right":"arrow left"
    return (
            <div className="step step-1 right-line row">
                <div className="round-direction"><Icon size="big" name={arrowName}/>
                </div>
                {/* <img data-orig="/img/technical-task-icon.png" className="col-md-2 col-xs-12" alt="wat gozert" src="/img/technical-task-icon.png"/> */}
                    {props.position === "left"? <div><StepGoals/><StepCount number={props.number}/> <StepContent data={props.item}/></div>:<div><StepContent/><StepCount  number={props.number}/><StepGoals/></div> }
                    <div className={linePosition}></div>
                   
                    
            </div>
           
            );
}
export default function Steps({data}){
    return(<div className="steps">
           {console.log("from steps",data)}
            {data.map( (value,key) =>{
                return <Step item={value} position="left" number={key +1}/>
            })}
            

            {/* <Step number="2"/>

            <Step position="left" number="3"/> */}
    </div>)
}

function StepCount(props){
    return ( <div className="step-about-in-list col-md-2">
    <div className="step-round">{props.number}</div>
</div>)
}
 function StepGoals(){
     return (<div className="step__list col-md-4">
     <ul>
        <li >Solution Archtitect</li>
        <li >Project leider geworden</li>
         <li>Gecertificeerd scrum master</li>
         <li>Eigen inzet geregeld</li>
         
     </ul>
 </div>)
 }
function StepContent(props){
    return(<div>
                    <div className="step-about-task col-md-6">
                        <h3>{props.data.title}</h3>
                        <p className="step-content">
                            {props.data.content}
                        </p>
                    </div>
    </div>)
}