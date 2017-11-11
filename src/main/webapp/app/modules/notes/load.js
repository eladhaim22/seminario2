import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { getSession } from '../../reducers/authentication';
import { getCourseById } from '../../reducers/course'
import { getCourseDetails , saveAllCourseDetail} from '../../reducers/courseDetail'
import { _ } from 'lodash';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';


export class LoadNotes extends Component {
  
  constructor(props) {
    super(props);
    this.state = {coursesDetails:[]}
  }

  componentWillMount() {
    this.props.getCourseById(this.props.params.id);
    this.props.getCourseDetails(this.props.params.id);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.studentsCourseDetail !== nextProps.studentsCourseDetail){
      if(this.props.studentsCourseDetail.length !== this.state.coursesDetails.length){
        var newCoursesDetails =  this.props.studentsCourseDetail.slice();
        this.setState({coursesDetails:newCoursesDetails});
      }
      else{
         var newCoursesDetails =  this.state.coursesDetails.slice();
         newCoursesDetails.map((value,index) => value.note = nextProps.studentsCourseDetail[index].note);
         this.setState({coursesDetails:newCoursesDetails});
      }
    }
  };

  handleChange = (event, index, value) => {
    var newCoursesDetails = Object.assign([],this.state.coursesDetails);
    newCoursesDetails[value.split(';')[0]].note = value.split(';')[1];
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
        <div className="row">
           <Subheader style={{fontSize:'20px'}}> {this.props.course.course.name}</Subheader>
        </div>
        {this.state.coursesDetails.length > 0 ?  
        <div className="col-md-8 col-offset-md-2" >
          <div className="widget">
            <header className="widget-header">
              <h4 className="widget-title">Alumnos</h4>
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
                  {this.props.studentsCourseDetail.map((courseDetail,index) => 
                    <tr key={index}>
                      <td>{courseDetail.student.user.firstName}</td>
                      <td>{courseDetail.student.user.lastName}</td>
                      <td>{courseDetail.note}</td>
                      <td>
                      <select id="select2-demo-1" className="form-control form-control-sm" data-plugin="select2" tabindex="-1" aria-hidden="true"
                       value={index + ';' + this.state.coursesDetails[index].note} onChange={this.handleChange}>
                       {Array.from(Array(10), (_,x) => x + 1).map(x => <option key={x} value={index + ';' + x}>{x}</option> )}
                      </select>

                      
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
           <div style={{width:'100%'}}><FlatButton label="Guardar" style={{float:'right'}} primary={true} onClick={this.onSubmit}/></div>
        </div>
       
        : null}
        </div>
    );
  }
}

export default connect(
  store => ({
    studentsCourseDetail: store.courseDetail.coursesDetail,
    course: store.course
  }),
  { getCourseDetails , getCourseById , saveAllCourseDetail}
)(LoadNotes);
