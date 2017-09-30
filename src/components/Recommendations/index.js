//@ts-check

import { Comment, Icon, Divider, Header } from 'semantic-ui-react'

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
 
 toggleVisibility = () => this.setState({ formVisible: !this.state.formVisible })
  render() {
  const {recommendations} = this.state 
    return (
      <div>
         <Header>Reviews</Header>
           <Divider/>
        <Comment.Group size={this.props.size}>
         
          
           
            {recommendations.map((item,key) => <RecommendationComponent item={item} key={key}/>)}
            
        </Comment.Group>
      </div>
    )
  }
}

function RecommendationComponent({item}){
  const url = `https://api.adorable.io/avatars/285/${item.key}@adorable.png`
  return( <Comment>
            <Comment.Avatar as='a' src={url} />
            <Comment.Content>
              <Comment.Author as='a'>{item.author}</Comment.Author>
              <Comment.Metadata>
                <span>{timer(item.date)}</span>
              </Comment.Metadata>
              <Comment.Text> <Icon name='quote left' size='large' />Dude, this is awesome. Thanks so much <Icon name='quote right' size='large' /></Comment.Text>
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
        time = time.replace(/([+ -]\d\d):?(\d\d)/, " $1$2"); // -04:00 -> -0400
        time = new Date(time * 1000 || time);

        var now = new Date();
        var seconds = ((now.getTime() - time) * .001) >> 0;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        var years = days / 365;

        return templates.prefix + (
        (seconds < 45 && template('seconds', seconds)) || (seconds < 90 && template('minute', 1)) || (minutes < 45 && template('minutes', minutes)) || (minutes < 90 && template('hour', 1)) || (hours < 24 && template('hours', hours)) || (hours < 42 && template('day', 1)) || (days < 30 && template('days', days)) || (days < 45 && template('month', 1)) || (days < 365 && template('months', days / 30)) || (years < 1.5 && template('year', 1)) || template('years', years)) + templates.suffix;
    };

    var elements = document.getElementsByClassName('timeago');
    for (var i in elements) {
        var $this = elements[i];
        if (typeof $this === 'object') {
            $this.innerHTML = timer($this.getAttribute('title') || $this.getAttribute('datetime'));
        }
    }
    // update time every minute
 