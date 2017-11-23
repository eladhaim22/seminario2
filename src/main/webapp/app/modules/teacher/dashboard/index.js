import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { getSession } from '../../../reducers/authentication';
import { getCourses } from '../../../reducers/course';
import { getInbox } from '../../../reducers/messages';
import _ from 'lodash';
import {SocialSchool} from 'material-ui/svg-icons';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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

export class TeacherDashboard extends Component {
  static propTypes = {
    account: React.PropTypes.object.isRequired,
    getSession: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.account
    };
  }

  componentWillMount() {
    this.props.getCourses();
    this.props.getInbox();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.account
    });
  }

  getColor = (id) => {
    let messages = this.props.inbox.filter(
      message => message.course.id == id && message.new && message.active).map(message => message.message.type);
    if(messages.includes('high')) 
      return 'danger';
    else if(messages.includes('medium'))
      return 'warning';
    else 
      return 'primary';
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
            <div className="col-md-4 col-sm-6">
              <Link to={'/teacher/course/' + course.id} key={course.id}>
                <div className="widget stats-widget">
                  <div className="widget-body clearfix">
                    <div className="pull-left">
                      <h3 className="widget-title text-primary"><span className="counter" data-plugin="counterUp">{course.name}</span></h3>
                      <small className="text-color">{course.name}</small>
                    </div>
                    <span className="pull-right big-icon watermark"><i className="fa fa-file-text-o"></i></span>
                  </div>
                  <footer className={`widget-footer bg-${this.getColor(course.id)}`}>
                    <small class="text-color">{`${this.props.inbox.filter(message => message.course.id == course.id && message.new && message.active).length} Mensajes nuevos`}</small>
                    <span className="small-chart pull-right" data-plugin="sparkline" data-options="[4,3,5,2,1], { type: 'bar', barColor: '#ffffff', barWidth: 5, barSpacing: 2 }"><canvas width="33" height="16" style={{display: 'inline-block', width: '33px', height: '16px', verticalAlign: 'top'}}></canvas></span>
                  </footer>
                </div>
              </Link>
            </div>
          )
        })}
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
    inbox: store.messages.inbox
  }),
  { getSession, getCourses , getInbox}
)(TeacherDashboard);
