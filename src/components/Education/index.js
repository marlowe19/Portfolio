import React from 'react';


export default function Education({list}){
    if(!list){
        console.log("Opleiding", list)
        return <div>No Experiences probably loading...</div>
    }
    return(<div>
        {list.map(function(item,key){
            return (<div>
                <div className="companyName">
                    {item.naam}
                    </div>
                {/* <Project {...item.projecten}/> */}
                </div>)
        })}
        </div>);
}

