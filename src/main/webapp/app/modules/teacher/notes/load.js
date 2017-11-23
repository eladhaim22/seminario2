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
      changed:false,
       select: { 
        removeSelected: true,
        disabled: false,
        crazy: false,
        stayOpen: false,   
        rtl: false
      }
    }
  }

  componentWillMount() {
    this.props.getCourseById(this.props.params.id);
    this.props.getCourseDetails(this.props.params.id);
  }

  componentWillReceiveProps(nextProps){
    this.setState({coursesDetails:nextProps.studentsCourseDetail});
  };

  handleChangeNote = (name,studentId,value) => {
    let newCoursesDetails = this.state.coursesDetails.slice();
    newCoursesDetails.find(courseDetail => courseDetail.student.id == studentId)[name] = value.value;
    this.setState({coursesDetails:newCoursesDetails});
  }

  onSubmit = () => {
    this.props.saveAllCourseDetail(this.state.coursesDetails);
    this.props.router.push('/teacher/course/' + this.props.params.id);
  }

  render() {
    const titleStyle = {textTransform: 'capitalize',top: '10px',position: 'absolute',margin: 'auto',left:'0px',right:'0px',textAlign: 'center'};
    const noteStyle = {position: 'absolute',fontSize: '60px',left: '0px',right: '0px',textAlign: 'center',top: 'calc(50% - 30px)'}
    const { crazy, disabled, stayOpen} = this.state.select;
    return (
      <div className="widget">
        <header className="widget-header">
          <h4 className="widget-title">{this.props.course.name}</h4>
        </header>
        <hr className="widget-separator"/>
        <div className="widget-body">
          <div>              
            <table className="table no-cellborder">
              <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Nota parcial</th>
                    <th>Nota final</th>                
                </tr>
              </thead>
              <tbody>
                  {this.state.coursesDetails.map((detail,index) => 
                    <tr key={index}>
                      <td>{detail.student.firstName}</td>
                      <td>{detail.student.lastName}</td>
                      <td>
                        <Select
                            style={{zIndex:100}}
                            closeOnSelect={!stayOpen}
                            disabled={disabled}
                            multi={false}
                            onChange={this.handleChangeNote.bind(this,'note',detail.student.id)}
                            options={Array.from(Array(10), (_,x) => x + 1).map(x => { return {label:x,value:x}})} 
                            removeSelected={this.state.select.removeSelected}
                            rtl={this.state.select.rtl}
                            value={detail.note}
                          /> 
                      </td>
                      <td>
                        <Select
                            style={{zIndex:100}}
                            closeOnSelect={!stayOpen}
                            disabled={disabled}
                            multi={false}
                            onChange={this.handleChangeNote.bind(this,'finalNote',detail.student.id)}
                            options={Array.from(Array(10), (_,x) => x + 1).map(x => { return {label:x,value:x}})} 
                            removeSelected={this.state.select.removeSelected}
                            rtl={this.state.select.rtl}
                            value={detail.finalNote}
                          /> 
                      </td>
                    </tr>
                  )}
                </tbody>
            </table>
          </div>
        </div> 
        <div style={{width:'100%'}}><FlatButton label="Guardar" style={{float:'right'}} primary={true} onClick={this.onSubmit}/></div>
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
