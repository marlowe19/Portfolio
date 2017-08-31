import React from 'react';
import { Image } from 'semantic-ui-react'
import './style.css';
import avatar from './avatar.jpg'
import banner from './react_banner.PNG'


export default function Header(props){
    return(
        <div className="port-header">
            <div style={ {"backgroundImage":"url("+banner+")"}} className="banner">
                check
            </div>
            <div className="introduction">
                <div className="image">
                    
                    <Image src={avatar} size='small' shape='circular' />
                </div> 
                    <h1>Marlowe Antonius</h1>
            </div>
        </div>
        
    )
}