import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { getSession } from '../../reducers/authentication';
import { getCourseById } from '../../reducers/course'
import { _ } from 'lodash';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    overflowY: 'auto',
  },
};



export class Course extends Component {
  
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getCourseById(this.props.params.id);
  }

  render() {
    const titleStyle = {textTransform: 'capitalize',top: '10px',position: 'absolute',margin: 'auto',left:'0px',right:'0px',textAlign: 'center'};
    const noteStyle = {position: 'absolute',fontSize: '60px',left: '0px',right: '0px',textAlign: 'center',top: 'calc(50% - 30px)'}
    return (
      this.props.course ? 
       <div style={styles.root}>
        <GridList
          cellHeight={180}
          style={styles.gridList}
        >
          <Subheader style={{fontSize:'20px'}}>{this.props.course.name}</Subheader>
          <GridTile
              title='Cargar Notas'
            >
             <Link to={'/course/' + this.props.course.id + '/notes'}><div style={{height:'100%',backgroundColor:'#117bf3'}}/></Link>
          </GridTile>
          <GridTile
              title='Cargar Novedades'
            >
             <Link to={'/course/' + this.props.course.id + '/notifications'}><div style={{height:'100%',backgroundColor:'#117bf3'}}/></Link>
          </GridTile>
        </GridList>
      </div>
      : null 
    );
  }
}

export default connect(
  store => ({
    course: store.course.course
  }),
  { getCourseById }
)(Course);
