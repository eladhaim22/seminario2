import React, { Component } from 'react';
import { connect } from 'react-redux';

import Translate from 'react-translate-component';
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
        grade:undefined
      },
      selectAuthorities:[],
      selectGrade:undefined,
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
    let promise = [axios.get('/api/users/authorities')];
    if(this.props.params.id){
      promise.push(axios.get('/api/users/getById/' + this.props.params.id));
    }
    axios.all(promise)
    .then(response => {
      if(this.props.params.id){
        let selectAuthorities = response[2].data.authorities.map(authority => {
          let data = {};
          data.label = authority;
          data.value = authority;
          return data;
        }); 
        let selectGrade = {};
        selectGrade.label = response[1].data.grade.name;
        selectGrade.value = response[1].data.grade.id;
        this.setState({authorities:response[0].data,user:response[1].data,
        selectAuthorities:selectAuthorities,selectGrade:selectGrade})
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

  saveUser = () => {
    this.state.user.courses = this.state.selectCourses.map(course => {
      return this.state.courses.find(c => {return c.id == course.value});
    });
    this.state.user.authorities = this.state.selectAuthorities.map(authority => authority.value);
    this.state.user.grade = this.state.selectGrade.value;
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

  getGrades = () => {
    return [
      {label:'Primer Grado',value:'Primer Grado'},
      {label:'Segundo Grado',value:'Segundo Grado'},
      {label:'Tercer Grado',value:'Tercer Grado'},
      {label:'Cuarto Grado',value:'Cuarto Grado'},
      {label:'Quinto Grado',value:'Quinto Grado'}
    ]
  }

  handleChangeAuthorities = (val) => {
    this.setState({selectAuthorities:val});
  }

  handleChangeGrade = (val) => {
    this.setState({selectGrade:val});
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
                <div className="row">
                  <div className="col-md-6">   
                    <div className="form-group">
                      <label for="">Email</label>
                      <input type="email" name="email" className="form-control" onChange={this.handleChange} 
                        value={this.state.user.email} placeholder="Email"/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Grado</label>
                      <Select
                            closeOnSelect={!stayOpen}
                            disabled={disabled}
                            multi={false}
                            onChange={this.handleChangeGrade}
                            options={this.getGrades()}
                            removeSelected={this.state.select.removeSelected}
                            rtl={this.state.select.rtl}
                            value={this.state.selectGrade}
                          /> 
                    </div>
                  </div>
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
            <FlatButton label="Guardar" style={{float:'right'}} onClick={this.saveUser} primary={true}/>
          </div>
        </div>  
    );
  }
}