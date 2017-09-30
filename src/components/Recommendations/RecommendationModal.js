import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import FireStore from '../../FireStore'
import RecommendationForm from './RecommendationForm'
import Recommendations from './'


const RecommendationModal = (props) => (
    <Modal trigger={  
        <Button.Group size="massive">
        <Button positive onClick={props.show} color="green" size="massive" content='review plaatsen' icon='plus' labelPosition='left' />
      <Button.Or text="Of" />
      <Button onClick={FireStore.login} size="massive" content='inloggen' icon='plus' labelPosition='right' />
    </Button.Group>} closeIcon>
      <Modal.Header>Review</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <Header>Plaats een review</Header>
         
          <div className="col-md-7 col-xs-12">
          <RecommendationForm/>
          </div>
          <div className="col-md-5 col-xs-12">
          <Recommendations size="small"/>
          </div>
         
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      <Button content='Plaatsen' labelPosition='left' icon='edit' primary />
      </Modal.Actions>
    </Modal>
  )
  
  export default RecommendationModal