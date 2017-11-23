import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { getSession } from '../../../reducers/authentication';
import { getCourses } from '../../../reducers/course';
import { getInbox } from '../../../reducers/messages';
import { getEvents ,getAllEventsByGrade } from '../../../reducers/events';
import _ from 'lodash';
import {SocialSchool} from 'material-ui/svg-icons';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
var PieChart = require("react-chartjs").Doughnut;
import Calendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {history} from 'react-router';

moment.locale('es');
Calendar.setLocalizer(
  Calendar.momentLocalizer(moment)
);


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  gridList: {
    width: 500,
    overflowY: 'auto',
  },
};

export class UserEvents extends Component {
  static propTypes = {
    account: React.PropTypes.object.isRequired,
    getSession: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.account
    };
    this.onSelectEvent = this.onSelectEvent.bind(this);
    this.eventStyleGetter = this.eventStyleGetter.bind(this);
  }

  componentWillMount() {
    this.props.getSession();
    this.props.getAllEventsByGrade();
    this.props.getEvents();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.account
    });
  }

  eventStyleGetter(event){
    let eventDetail = this.props.eventsDetails.find(e => {return event.id == e.event.id});
    let style = {}
    if(eventDetail){
      switch(eventDetail.state){
        case 'pending':
          style = {backgroundColor:'yellow'};
          break;
        case 'accepted':
          style = {backgroundColor:'blue'};
          break;
        case 'rejected':
          style = {backgroundColor:'red'};
          break;
      }
    }
    else{
      if(event.needsAuthorization){
        style = {backgroundColor:'yellow'};
      }
      else{
        style = {backgroundColor:'blue'};
      }
    }
    return {
        style: style
    };

  }


  onSelectEvent = (event) => {
    let eventDetail = this.props.eventsDetails.find(e => {return event.id == e.event.id});
    if(eventDetail){
      this.props.router.push('/user/event/' + event.id + '/eventDetail/' + eventDetail.id);
    }
    else {
      this.props.router.push('/user/event/' + event.id + '/eventDetail');
    }
  }

  render() {
  const { currentUser } = this.state;
  const titleStyle = {textTransform: 'capitalize',top: '10px',position: 'absolute',margin: 'auto',left:'0px',right:'0px',textAlign: 'center'};
    
  return (
      <div style={{marginTop:'10px'}}>    
        <div className="row">
          <div className="col-md-12">
            <div className="widget" style={{height:'400px'}}>
              <Calendar
                views={['month']}
                selectable
                eventPropGetter={(this.eventStyleGetter)}
                events={this.props.eventsByGrade}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectEvent={this.onSelectEvent}
              />
              </div>
            </div>  
        </div>
    </div> 
    );
  }
}

export default connect(
  store => ({
    account: store.authentication.account,
    isAuthenticated: store.authentication.isAuthenticated,
    eventsByGrade: store.events.eventsByGrade,
    eventsDetails:store.events.events
  }),
  { getSession,getAllEventsByGrade,getEvents}
)(UserEvents);
