import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { getSession } from '../../../reducers/authentication';
import { getCourses } from '../../../reducers/course';
import { getInbox } from '../../../reducers/messages';
import { getEvents } from '../../../reducers/events';
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

export class UserDashboard extends Component {
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
  }

  componentWillMount() {
    this.props.getInbox();
    this.props.getCourses();
    this.props.getSession();
    this.props.getEvents(this.state.currentUser.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.account
    });
  }

  getColor = () => {
    if(this.props.inbox.filter(m => 
    {
      if(m.message.type == 'high'){
        return m;
      }
    }).length > 0) {
      return 'danger';
    }
    else if(this.props.inbox.filter(m => {
      if(m.message.type == 'medium'){
        return m;
      }
    }).length > 0) {
      return 'warning';
    }
    else {
      return 'primary';
    }
  }

  getData = () => {
    let present = this.props.account.assitenceDTOS.filter(assistence => {
      if(assistence.present == true){
        return assistence;
      }
    }).length;
    let ausent = this.props.account.assitenceDTOS.filter(assistence => {
      if(assistence.present == false){
        return assistence;
      } 
    }).length;
    return [
          {
            color:"#F7464A",
            label:"Ausente",
            value:ausent
          },
          {
            color:"#46BFBD",
            label:"Presente",
            value:present
          }  
        ]
  }

  eventStyleGetter = (event, start, end, isSelected) => {
    let color;
    let eventDetail = this.props.events.find(e => {return event.eventDetailId == e.id} )
    switch(eventDetail.state){
      case 'pending':
        color = '#f9c851';
        break;
      case 'accepted':
        color = '#3174ad';
        break;
      case 'rejected':
        color = '#ff5b5b';
        break;  
    }
    
    var style = {
        backgroundColor: color
    };
    return {
        style: style
    };
  }

  onSelectEvent = (id) => {
    this.props.router.push('/user/event/' + id)
  }

  render() {
    const { currentUser } = this.state;
    const titleStyle = {textTransform: 'capitalize',top: '10px',position: 'absolute',margin: 'auto',left:'0px',right:'0px',textAlign: 'center'};
    return (
      this.props.courses.length > 0 ?
      <div style={{marginTop:'10px'}}>
        <div className="row">
        {this.props.courses.map((course,index) => {
          return(
            <div className="col-md-3 col-sm-6">
              <Link to={'/user/course/' + course.id} key={course.id}>
                <div className="widget stats-widget">
                  <div className="widget-body clearfix">
                    <div className="pull-left">
                      <h3 className="widget-title text-primary"><span className="counter" data-plugin="counterUp">{course.name}</span></h3>
                      <small className="text-color">{course.name}</small>
                    </div>
                    <span className="pull-right big-icon watermark"><i className="fa fa-file-text-o"></i></span>
                  </div>
                  <footer className={`widget-footer bg-${this.getColor()}`}>
                    <small class="text-color">{`${this.props.inbox.filter(message => message.course.id == course.id).length} Mensajes`}</small>
                    <span className="small-chart pull-right" data-plugin="sparkline" data-options="[4,3,5,2,1], { type: 'bar', barColor: '#ffffff', barWidth: 5, barSpacing: 2 }"><canvas width="33" height="16" style={{display: 'inline-block', width: '33px', height: '16px', verticalAlign: 'top'}}></canvas></span>
                  </footer>
                </div>
              </Link>
            </div>
          )
        })}
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="widget">
              <header className="widget-header">
                <h4 className="widget-title">Asistencia</h4>
              </header>
              <hr className="widget-separator"/>
              <div className="widget-body">
                 <PieChart data={this.getData()}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10">
            <div className="widget" style={{height:'300px'}}>
              <Calendar
                views={['month']}
                selectable
                eventPropGetter={(this.eventStyleGetter)}
                events={this.props.events.map(event => {event.event.eventDetailId = event.id; return event.event})}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectEvent={(event) => this.onSelectEvent(event.eventDetailId)}
              />
              </div>
            </div>  
        </div>
    </div> 
    : null
    );
  }
}

export default connect(
  store => ({
    account: store.authentication.account,
    isAuthenticated: store.authentication.isAuthenticated,
    courses: store.course.courses,
    inbox: store.messages.inbox,
    events: store.events.events
  }),
  { getSession, getCourses , getInbox, getEvents}
)(UserDashboard);
