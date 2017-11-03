import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { getSession } from '../../reducers/authentication';
import { getCourses } from '../../reducers/dashboard';
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

export class Dashboard extends Component {
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
    this.props.getSession();
    this.props.getCourses();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.account
    });
  }

  render() {
    const { currentUser } = this.state;
    const titleStyle = {textTransform: 'capitalize',top: '10px',position: 'absolute',margin: 'auto',left:'0px',right:'0px',textAlign: 'center'};
    return (
      this.props.courses.length > 0 ?
      <div style={{marginTop:'10px'}}>
        <Paper style={{width:'100%',padding:'10px'}} zDepth={5}>
          <div style={styles.root}>
              <GridList
                cellHeight={180}
                style={styles.gridList}
              >
                <Subheader style={{fontSize:'20px'}}>Cursos</Subheader>
                {this.props.courses.map((course,index) => {
                  let link;
                  if(this.state.currentUser.authorities){
                    link = _.includes(this.state.currentUser.authorities,'ROLE_USER') ? `/course-detail/${course.id}` : `/course/${course.id}`
                  }
                  return (<GridTile
                    key={course.id}
                    title={course.name.toUpperCase()}
                  >
                   <Link to={link}><div style={{height:'100%',backgroundColor:'#117bf3'}}/></Link>
                  </GridTile>
                )})}
              </GridList>  
          </div>
        </Paper>
      </div> 
    : null
    );
  }
}

export default connect(
  store => ({
    account: store.authentication.account,
    isAuthenticated: store.authentication.isAuthenticated,
    courses: store.dashboard.courses
  }),
  { getSession, getCourses }
)(Dashboard);
