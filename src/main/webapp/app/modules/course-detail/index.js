import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { getSession } from '../../reducers/authentication';
import { getCourseDetail } from '../../reducers/courseDetail'
import { _ } from 'lodash';



export class CourseDetail extends Component {
  
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getCourseDetail(this.props.params.id);
  }
  render() {
    const titleStyle = {textTransform: 'capitalize',top: '10px',position: 'absolute',margin: 'auto',left:'0px',right:'0px',textAlign: 'center'};
    const noteStyle = {position: 'absolute',fontSize: '60px',left: '0px',right: '0px',textAlign: 'center',top: 'calc(50% - 30px)'}
    return (
      this.props.courseDetail && this.props.courseDetail.course ?
      <div>
        <div className="row">
          <h2>
            {this.props.courseDetail.course.name}
          </h2>
        </div>
        <div className="row">
          <div className="col-md-2">
            <Paper style={{paddingBottom: '100%',position:'relative'}} zDepth={5} >
              <div style={titleStyle}>Nota</div>
              <div style={noteStyle}>{this.props.courseDetail.note}</div>
            </Paper>
          </div>
        </div>
        
      </div>
      : null
    );
  }
}

export default connect(
  store => ({
    courseDetail: store.courseDetail.courseDetail
  }),
  { getCourseDetail }
)(CourseDetail);
