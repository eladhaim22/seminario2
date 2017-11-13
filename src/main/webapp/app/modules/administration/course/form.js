import React, { Component } from 'react';
import { connect } from 'react-redux';

import Translate from 'react-translate-component';
import { getCourses } from '../../../reducers/course';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';

export default class AdminCourse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      course:{
        id:undefined,
        name:undefined
      }
    };
  }

  componentWillReceiveProps() {
    if(this.props.params.id){
      axios.get('/api/course/' + this.props.params.id).then(response => {
        this.setState({course:response.data})
      }
      ).catch();
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let newCourse = Object.assign({},this.state.course);
    newCourse[name] = value;

    this.setState({course:newCourse});
  }

  saveCourse = () => {
    if(this.state.course.name && this.state.course.name != ''){
      if(!this.props.params.id){ 
        axios.post('/api/course/',this.state.course)
        .then(response => {
          this.props.router.push('/admin/courses/')
        }
        ).catch();
      }
      else{
        axios.put('/api/course/',this.state.course)
        .then(response => {
          this.props.router.push('/admin/courses/')
        }
          ).catch();
      }
    } 
  }
  
  render() {
    return (
        <div className="col-md-8 col-offset-md-2" >
          <div className="widget">
            <header className="widget-header">
              <h4 className="widget-title">{!this.props.params.id ? 'Nuevo Curso' : 'Editar Curso' }</h4>
            </header>
            <hr className="widget-separator"/>
            <div className="widget-body">
              <form>
                <div className="form-group">
                  <label for="">Nombre de curso</label>
                  <input type="text" name="name" className="form-control" onChange={this.handleChange} 
                    value={this.state.course.name} placeholder="Nombre de curso"/>
                </div>
              </form>
             </div> 
          </div>
          <div style={{width:'100%'}}>
            <FlatButton label="Guardar" style={{float:'right'}} onClick={this.saveCourse} primary={true}/>
          </div>
        </div>  
    );
  }
}