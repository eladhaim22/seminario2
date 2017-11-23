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

export class TeacherAssitence extends Component {
  static propTypes = {
    account: React.PropTypes.object.isRequired,
    getSession: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.account
    };
    this.onSelectDay = this.onSelectDay.bind(this);
  }

  componentWillMount() {
    this.props.getSession();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.account
    });
  }

  onSelectDay = (day) => {
    this.props.router.push('/teacher/assitence/load?date=' + moment(day.start).format("YYYY-MM-DD"));
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
                events={[]}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectSlot={this.onSelectDay}
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
    isAuthenticated: store.authentication.isAuthenticated
  }),
  { getSession}
)(TeacherAssitence);
