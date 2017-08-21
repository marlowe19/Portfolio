import React from 'react';
import { Image } from 'semantic-ui-react'
import './style.css';
import avatar from './avatar.png'

export default function Header(props){
    return(
        <div className="header">
            <div className="intro">
                <div className="image">
                    <Image src={avatar} size='small' shape='circular' />
                </div>
                 
                 <div className="name">
                     Marlowe Antonius
                 </div>
            </div>
        </div>
    )
}