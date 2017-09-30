import React from 'react'
import { Header, Icon, Image } from 'semantic-ui-react'



export default function Paragraph(props) {
    const { data, position } = props
    return (<div className="row">
        <Header as='h1' icon textAlign='center' size="huge">
            <Icon name={data.icon} circular />
            <Header.Content>
                {data.header}
            </Header.Content>
        </Header>
        {position === "left" ? <ParagraphImage image={data.image} /> : null}

        <div className="col-xs-12 col-md-9">
            {data.content}
        </div>
        {position === "right" ? <ParagraphImage image={data.image} /> : null}
    </div>)
}

function ParagraphImage({ image }) {
    return (
        <div className="col-xs-12 col-md-3">
            <Image shape='circular' src={image.url} alt="paragraph image" />
        </div>
    )
}