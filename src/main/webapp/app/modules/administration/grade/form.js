import React, { Component } from 'react';
import { connect } from 'react-redux';

import Translate from 'react-translate-component';
import { getCourses } from '../../../reducers/course';
import FlatButton from 'material-ui/FlatButton';
import Select from 'react-select';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';

export class AdminGrade extends Component {

  constructor(props) {
    super(props);
    this.state = {
      grade:{},
      selectCourses:[],
      select: { 
        removeSelected: true,
        disabled: false,
        crazy: false,
        stayOpen: false,   
        rtl: false
      }
    };
  }

  componentWillMount(){
    this.props.getCourses();
  }

  componentWillReceiveProps() {
    if(this.props.params.id){
      axios.get('/api/grade/' + this.props.params.id).then(response => {
        let courses = response.data.courses.map(course => {return {'label':course.name,'value':course.id}});
        this.setState({grade:response.data,selectCourses:courses})
      }
      ).catch();
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let newGrade = Object.assign({},this.state.grade);
    newGrade[name] = value;

    this.setState({grade:newGrade});
  }

  getCourses = () => {
    return this.props.courses.map(course => {return {'label':course.name,'value':course.id}});
  }


  handleChangeCoursos = (val) => {
    this.setState({selectCourses:val});
  }

  saveGrade = () => {
    this.state.grade.courses = this.state.selectCourses.map(course => this.props.courses.find(c => c.id == course.value));
    if(!this.props.params.id){ 
      axios.post('/api/grade/',this.state.grade)
      .then(response => {
        this.props.router.push('/admin/grades/')
      }
      ).catch();
    }
    else{
      axios.put('/api/grade/',this.state.grade)
      .then(response => {
        this.props.router.push('/admin/grades/')
      }
        ).catch();
    }
   
  }
  
  render() {
    const { crazy, disabled, stayOpen} = this.state.select;
    return (
        <div className="col-md-8 col-offset-md-2" >
          <div className="widget">
            <header className="widget-header">
              <h4 className="widget-title">{!this.props.params.id ? 'Nuevo grado' : 'Editar grado' }</h4>
            </header>
            <hr className="widget-separator"/>
            <div className="widget-body">
              <form>
                <div className="form-group">
                  <label for="">Nombre de grado</label>
                  <input type="text" name="name" className="form-control" onChange={this.handleChange} 
                    value={this.state.grade.name}/>
                </div>
                <div className="form-group">
                      <label>Cursos</label>
                      <div>
                      <Select
                        closeOnSelect={!stayOpen}
                        disabled={disabled}
                        multi
                        onChange={this.handleChangeCoursos}
                        options={this.getCourses()}
                        removeSelected={this.state.select.removeSelected}
                        rtl={this.state.select.rtl}
                        value={this.state.selectCourses}
                      />
                      </div>
                </div>
              </form>
             </div> 
          </div>
          <div style={{width:'100%'}}>
            <FlatButton label="Guardar" style={{float:'right'}} onClick={this.saveGrade} primary={true}/>
          </div>
        </div>  
    );
  }
}

export default connect(
  (state => ({ courses: state.course.courses ,isFetching: state.grade.loading})),
  { getCourses }
)(AdminGrade);
