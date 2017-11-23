import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { getSession } from '../../../reducers/authentication';
import { getMaterial } from '../../../reducers/material';
import { getCourseById } from '../../../reducers/course';
import { setDropDownValue } from '../../../reducers/messages';
import { _ } from 'lodash';
import YouTube from 'react-youtube';

export class Material extends Component {
  
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getMaterial();
    this.props.getCourseById(this.props.params.courseId);
  }

  render() {
    const opts = {
      height: '350',
      width: '450',
    }
    return (
      <div>
        <div className="col-md-12" style={{marginBottom:'15px'}}>
          <h2>
            {this.props.course.name}
          </h2>
        </div>
        {this.props.material.filter(m => m.course == this.props.course.id).map(m => 
          <div>
            <YouTube className="col-md-4" style={{marginBottom:'20px'}} videoId={m.videoId} opts={opts} />
          </div>
        )}
        
      </div>
    );
  }
}

export default connect(
  store => ({
    material: store.material.materials,
    course: store.course.course
  }),
  {getMaterial,getCourseById}
)(Material);

