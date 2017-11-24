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
      currentUser: props.account,
      events: [],
      inbox: []
    };
  }

  componentWillMount() {
    this.props.getInbox();
    this.props.getSession();
    this.props.getAllEventsByGrade();
    this.props.getEvents();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.account,
      events: nextProps.eventsByGrade.sort((a,b) => {return a.start - b.start}).slice(0,2),
      inbox: nextProps.inbox.sort((a,b) => {return a.createdDate - b.createdDate}).slice(0,2)
    });
  }

  getMoment =() => {
    let m = moment();
    m.locale('es');
    return m;
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


  getColor = (type) => {
    switch (type){
      case 'high':
        return 'danger';
      case 'medium':
        return  'warning';
      default:
        return 'success';
    }
  }

  getText = (type) => {
    switch (type){
      case 'high':
        return 'Urgente';
      case 'medium':
        return 'Alerta';
      default:
        return 'Common';
    }
  }


  getState = (event,eventDetail) => {
    let label;
    if(eventDetail){
      switch(eventDetail.state){
        case 'pending':
          label = <span className="label label-warning">Pendiente a authorizacion</span>
          break;
        case 'accepted':
          label = <span className="label label-success">Acceptado</span>
          break;
        case 'rejected':
          label = <span className="label label-danger">Rechazado</span>
          break;
      }
    }
    else {
      if(event.needsAuthorization)
        label = <span className="label label-warning">Pendiente a authorizacion</span>    
      else
         label = <span className="label label-success">No Requiere authorizacion</span>    
    }
    return label;
  }

  onSelectEvent = (event,eventDetail) => {
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
      <div>
            <div className="col-md-8 col-sm-8">
              <div className="table-responsive">
              <table className="table mail-list">
              <tbody>
              {this.state.inbox.map(message =>
              <tr>
                <td style={{borderTop:'none',padding:'0px'}}>
                  <div className="mail-item">
                    <table className="mail-container">
                      <tbody><tr>
                        <td className="mail-left">
                          <div className="avatar avatar-lg avatar-circle">
                            <img src={message.owner.imageUrl} alt="sender photo"/>
                          </div>
                        </td>
                        <td className="mail-center">
                          <div className="mail-item-header">
                            <h4 className="mail-item-title"><a className="title-color">{message.message.title}</a></h4>
                            <a><span className={`label label-${this.getColor(message.message.type)}`}>{this.getText(message.message.type)}</span></a>
                          </div>
                          <p className="mail-item-excerpt">{message.message.message}</p>
                        </td>
                        <td className="mail-right">
                          <p className="mail-item-date"></p>
                          <p className="mail-item-star starred">
                            <a href="#"><i className="zmdi zmdi-star"></i></a>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </td>
              </tr>)}
              </tbody>
            </table>
            </div>
     </div>
        <div className="col-md-4">
          <div className="widget">
            <header className="widget-header">
              <h4 className="widget-title">Asistencia</h4>
            </header>
            <hr className="widget-separator"/>
            {this.props.account.assitenceDTOS ?
            <div className="widget-body">             
                <PieChart data={this.getData()} width="224" height="112"/>
                <ul className="doughnut-legend" style={{position: 'absolute',top: '100px',right: '50px'}}>
                  <li><span style={{backgroundColor:'#46BFBD',display: 'inline-block',width: '12px', height: '12px',marginRight: '5px'}}></span>Presente</li>
                  <li><span style={{backgroundColor:'#F7464A',display: 'inline-block',width: '12px', height: '12px',marginRight: '5px'}}></span>Ausente</li>
                </ul>
            </div>
            : null}
          </div>
        </div>
           
        {this.state.events.map(event => {
        let eventDetail = this.props.eventsDetails.find(e => {return e.event.id == event.id});
        return(<div onClick={this.onSelectEvent.bind(this,event,eventDetail)} className="col-md-12 col-sm-12">
          <div className="widget p-md clearfix">
            <div className="pull-left">
            <h3 className="widget-title">{event.title}</h3>
              <small className="text-color">{this.getState(event,eventDetail)}</small>
            </div>
            <span className="pull-right fw-500 counter" data-plugin="counterUp">{moment(event.start).format('DD/MM/YYYY') + ' - ' + moment(event.end).format('DD/MM/YYYY')}</span>
          </div>
        </div>)
        }
        )}
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
    eventsDetails: store.events.events,
    eventsByGrade: store.events.eventsByGrade
  }),
  { getSession, getCourses , getInbox, getEvents , getAllEventsByGrade}
)(UserDashboard);
