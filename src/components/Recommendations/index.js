
import { Button, Comment, Form, Transition,Divider } from 'semantic-ui-react'

import React, { Component } from 'react';
import FireStore from '../../FireStore';

export default class Recommendations extends Component {
  state = {
    name: "",
    textArea: "",
    tip: "",
    recommendations: [],
    formVisible: false
  }
  componentWillMount() {
    // /projects/
    FireStore.subscribe("recommendations", value => {

      this.setState({
        recommendations: value
      })
    })

  }
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
 toggleVisibility = () => this.setState({ formVisible: !this.state.formVisible })
  render() {
  const {recommendations} = this.state 
    return (
      <div>
        <Button onClick={this.toggleVisibility} color="green" size="huge" content='review plaatsen' icon='plus' labelPosition='left' />
           <Divider/>
         <Transition visible={this.state.formVisible} animation='scale' duration={500}>
          <Form onSubmit={this.handleSubmit} reply>
            <Form.Input onChange={this.handleNameInput} size="large" label="Naam" name="name" />
            <Form.TextArea name="recommendation" label="Recommendation" autoHeight onChange={this.handleTextArea} />
            <Form.TextArea name="tip" label="Tips" autoHeight onChange={this.handleTextArea} />
            <Button content='Plaatsen' labelPosition='left' icon='edit' primary />
              <Divider/>
          </Form>
          </Transition>
        <Comment.Group size="massive">
         
          
           
            {recommendations.map((item,key) => <RecommendationComponent item={item} key={key}/>)}
            
        </Comment.Group>
      </div>
    )
  }
}

function RecommendationComponent({item}){
  return( <Comment>
            <Comment.Avatar as='a' src='/assets/images/avatar/small/joe.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>{item.author}</Comment.Author>
              <Comment.Metadata>
                <span>{timer(item.date)}</span>
              </Comment.Metadata>
              <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
              <Comment.Actions>
                <a>Reply</a>
              </Comment.Actions>
            </Comment.Content>
          </Comment>)
}

  var templates = {
        prefix: "",
        suffix: " ago",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years"
    };
    var template = function (t, n) {
        return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
    };

    var timer = function (time) {
        if (!time) return;
        time = time.replace(/\.\d+/, ""); // remove milliseconds
        time = time.replace(/-/, "/").replace(/-/, "/");
        time = time.replace(/T/, " ").replace(/Z/, " UTC");
        time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
        time = new Date(time * 1000 || time);

        var now = new Date();
        var seconds = ((now.getTime() - time) * .001) >> 0;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        var years = days / 365;

        return templates.prefix + (
        seconds < 45 && template('seconds', seconds) || seconds < 90 && template('minute', 1) || minutes < 45 && template('minutes', minutes) || minutes < 90 && template('hour', 1) || hours < 24 && template('hours', hours) || hours < 42 && template('day', 1) || days < 30 && template('days', days) || days < 45 && template('month', 1) || days < 365 && template('months', days / 30) || years < 1.5 && template('year', 1) || template('years', years)) + templates.suffix;
    };

    var elements = document.getElementsByClassName('timeago');
    for (var i in elements) {
        var $this = elements[i];
        if (typeof $this === 'object') {
            $this.innerHTML = timer($this.getAttribute('title') || $this.getAttribute('datetime'));
        }
    }
    // update time every minute
 