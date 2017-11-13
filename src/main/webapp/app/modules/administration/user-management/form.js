import React, { Component } from 'react';
import { connect } from 'react-redux';

import Translate from 'react-translate-component';
import { getCourses } from '../../../reducers/course';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Select from 'react-select';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';

export default class UserManagementForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authorities:[],
      user:{
        id:undefined,
        login:undefined,
        firstName:undefined,
        lastName:undefined,
        email:undefined,
        password:undefined,
        activated:true,
        authorities:[],
        courses:[]
      },
      courses:[],
      selectCourses:[],
      selectAuthorities:[],
      select: { 
        removeSelected: true,
        disabled: false,
        crazy: false,
        stayOpen: false,   
        rtl: false
      }
    };
  }

  componentWillReceiveProps() {
    let promise = [axios.get('/api/users/authorities'),axios.get('/api/course/')];
    if(this.props.params.id){
      promise.push(axios.get('/api/users/getById/' + this.props.params.id));
    }
    axios.all(promise)
    .then(response => {
      if(this.props.params.id){
        let selectCourses = response[2].data.courses.map(course => {
          let data = {};
          data.label = course.name;
          data.value = course.id;
          return data;
        });
        let selectAuthorities = response[2].data.authorities.map(authority => {
          let data = {};
          data.label = authority;
          data.value = authority;
          return data;
        }); 
        this.setState({authorities:response[0].data,courses:response[1].data,user:response[2].data,
          selectCourses:selectCourses,selectAuthorities:selectAuthorities})
      }
      else {
        this.setState({authorities:response[0].data,courses:response[1].data}) 
      }
    }).catch();
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let newUser = Object.assign({},this.state.user);
    newUser[name] = value;
    this.setState({user:newUser});
  }

  saveCourse = () => {
    this.state.user.courses = this.state.selectCourses.map(course => {
      return this.state.courses.find(c => {return c.id == course.value});
    });
    this.state.user.authorities = this.state.selectAuthorities.map(authority => authority.value);
    if(!this.props.params.id){ 
      axios.post('/api/register/',this.state.user)
      .then(response => {
        this.props.router.push('/admin/user-management')
      }
      ).catch();
    }
    else{
      axios.put('/api/users/',this.state.user)
      .then(response => {
        this.props.router.push('/admin/user-management')
      }
        ).catch();
    }
  }

  getCourses = () => {
    return this.state.courses.map(course => {
      let data = {};
      data.label = course.name;
      data.value = course.id;
      return data;
    }); 
  }

  getAuthorities = () => {
    return this.state.authorities.map(authority => {
      let data = {};
      data.label = authority;
      data.value = authority;
      return data;
    }); 
  }


  handleChangeCoursos = (val) => {
    this.setState({selectCourses:val});
  }

  handleChangeAuthorities = (val) => {
    this.setState({selectAuthorities:val});
  }
  
  render() {
    const { crazy, disabled, stayOpen} = this.state.select;
    return (
        <div className="col-md-8 col-offset-md-2" >
          <div className="widget">
            <header className="widget-header">
              <h4 className="widget-title">{!this.props.params.id ? 'Nuevo Usuario' : 'Editar Usuario' }</h4>
            </header>
            <hr className="widget-separator"/>
            <div className="widget-body">
              <form>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <label for="">Nombre</label>
                      <input type="text" name="firstName" className="form-control" onChange={this.handleChange} 
                        value={this.state.user.firstName} placeholder="Nombre"/>
                    </div>
                    <div className="col-md-6">
                      <label for="">Apellido</label>
                      <input type="text" name="lastName" className="form-control" onChange={this.handleChange} 
                        value={this.state.user.lastName} placeholder="Apellido"/>
                    </div>
                    </div>
                </div>
                <div className="form-group">
                  <label for="">Email</label>
                  <input type="email" name="email" className="form-control" onChange={this.handleChange} 
                    value={this.state.user.email} placeholder="Email"/>
                </div>
                {!this.props.params ?
                <div className="form-group">
                  <div className="row">
                     <div className="col-md-6">
                      <label for="">Usuario</label>
                      <input type="text" name="login" className="form-control" onChange={this.handleChange} 
                        value={this.state.user.login} placeholder="Usuario"/>
                    </div>
                    
                    <div className={this.props.parmas ? 'col-md-6' : 'col-md-12'}>
                      <label for="">Password</label>
                      <input type="password" name="password" className="form-control" onChange={this.handleChange} 
                        value={this.state.user.password} placeholder="Contraseña"/>
                    </div>
                  </div>
                </div>
                :null }
                <div className="form-group">
                  <label>Roles</label>
                  <Select
                        closeOnSelect={!stayOpen}
                        disabled={disabled}
                        multi
                        onChange={this.handleChangeAuthorities}
                        options={this.getAuthorities()}
                        removeSelected={this.state.select.removeSelected}
                        rtl={this.state.select.rtl}
                        value={this.state.selectAuthorities}
                      /> 
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
                <div className="form-group">
                  <div className="checkbox checkbox-primary">
                    <input type="checkbox" name="activated" checked={this.state.user.activated}
                    onChange={this.handleChange}/>
                    <label for="checkbox-demo-1">Activo</label>
                  </div>
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