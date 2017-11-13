import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { getSession } from '../../../reducers/authentication';
import { getCourseById } from '../../../reducers/course'
import { getCourseDetails , saveAllCourseDetail} from '../../../reducers/courseDetail'
import { _ } from 'lodash';
import Select from 'react-select';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';


export class LoadNotes extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      coursesDetails:[],
      changed:false
    }
  }

  componentWillMount() {
    this.props.getCourseById(this.props.params.id);
    this.props.getCourseDetails(this.props.params.id);
  }

  componentWillReceiveProps(nextProps){
    /*if(this.props.studentsCourseDetail !== nextProps.studentsCourseDetail){
      if(nextProps.studentsCourseDetail.length !== this.state.coursesDetails.length){
        var newCoursesDetails =  nextProps.studentsCourseDetail.slice();
        this.setState({coursesDetails:newCoursesDetails});
      }
      else{
         var newCoursesDetails =  this.state.coursesDetails.slice();
         newCoursesDetails.map((value,index) => value.note = nextProps.studentsCourseDetail[index].note);
         this.setState({coursesDetails:newCoursesDetails});
      }
    }*/
    var newCoursesDetails =  [];
    nextProps.studentsCourseDetail.map(e => newCoursesDetails.push(e));
    this.setState({coursesDetails:newCoursesDetails});
    console.log(this.state.coursesDetails === this.props.studentsCourseDetail)
  
  };

  handleChange = (target,index) => {
    var newCoursesDetails =  this.state.coursesDetails.map(e => e);
    newCoursesDetails[index].note = target.value;
    this.setState({coursesDetails:newCoursesDetails});
  }

  onSubmit = () => {
    this.props.saveAllCourseDetail(this.state.coursesDetails)
  }

  render() {
    const titleStyle = {textTransform: 'capitalize',top: '10px',position: 'absolute',margin: 'auto',left:'0px',right:'0px',textAlign: 'center'};
    const noteStyle = {position: 'absolute',fontSize: '60px',left: '0px',right: '0px',textAlign: 'center',top: 'calc(50% - 30px)'}
    return (
      <div>
        <div className="col-md-8 col-offset-md-2" >
          <div className="widget">
            <header className="widget-header">
              <h4 className="widget-title">{this.props.course.name}</h4>
            </header>
            <hr className="widget-separator"/>
            <div className="widget-body">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Nota</th>
                    <th>Modificar</th>
                  </tr>
                  {this.props.studentsCourseDetail.map((detail,index) => 
                    <tr key={index}>
                      <td>{detail.student.firstName}</td>
                      <td>{detail.student.lastName}</td>
                      <td>{detail.note}</td>
                      <td>
                      <Select name="form-field-name" style={{zIndex:'100'}} value={this.state.coursesDetails[index].note}
                       options={Array.from(Array(10), (_,x) => x + 1).map(x => { return {label:x,value:x}})} 
                       onChange={(e) => this.handleChange(e,index)}
                       clearable={false} clearable={false}/>                      
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
           <div style={{width:'100%'}}><FlatButton label="Guardar" style={{float:'right'}} primary={true} onClick={this.onSubmit}/></div>
        </div>
      </div>
    );
  }
}

export default connect(
  store => ({
    studentsCourseDetail: store.courseDetail.coursesDetail,
    course: store.course.course
  }),
  { getCourseDetails , getCourseById , saveAllCourseDetail}
)(LoadNotes);
