import React from 'react';


export default function Experience(props){
    if(!props.ervaringsLijst){
        console.log("werkervaring", props.ervaringsLijst)
        return <div>No Experiences probably loading...</div>
    }
    return(<div>
        {props.ervaringsLijst.map(function(item,key){
            return (<div>
                <div className="companyName">
                    {item.bedrijfsnaam}
                    </div>
                {/* <Project {...item.projecten}/> */}
                </div>)
        })}
        </div>);
}

