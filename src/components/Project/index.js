import React from 'react';
import { Button, Card, Image, Label } from 'semantic-ui-react'
import steve from "./steve.jpg"


 
function Project (props){

    return( <Card>
      <Card.Content>
        <Image floated='right' size='mini' src={steve} />
        <Card.Header>
          {props.rol}
        </Card.Header>
        <Card.Meta>
          {props.bedrijf}
        </Card.Meta>
        <Card.Description>
          {props.titel}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
          {props.technieken ? <Tags tags={props.technieken}/> : null}
      </Card.Content>
    </Card>)
}
function Tags(props){
    return (<div>
        {props.tags.map((item)=>{

            return <Label>{item}</Label>
        })

        }
    </div>)
}

export default function Projects(props){
    if(!props.projects){
        return "geen projecten gevonden"
    }
    return(
       
         <Card.Group divided>
             {props.projects.map((item)=>{
                 return <Project {...item}/>   
             }
            )}
         </Card.Group>
    )
}