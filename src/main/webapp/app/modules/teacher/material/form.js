import React, { Component } from 'react';
import { connect } from 'react-redux';

import Translate from 'react-translate-component';
import { getCourses } from '../../../reducers/course';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';

export default class TeacherMaterialForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      material:{}
    };
  }

  componentWillReceiveProps() {
    if(this.props.params.materialId){
      axios.get('/api/material/' + this.props.params.materialId).then(response => {
        this.setState({material:response.data})
      }
      ).catch();
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let newMaterial = Object.assign({},this.state.material);
    newMaterial[name] = value;

    this.setState({material:newMaterial});
  }

  saveMaterial = () => {
      if(!this.props.params.materialId){ 
        axios.post('/api/material/',this.state.material)
        .then(response => {
          this.props.router.push('/teacher/course/' + this.props.params.courseId + '/materials')
        }
        ).catch();
      }
      else{
        axios.put('/api/material/',this.state.material)
        .then(response => {
          this.props.router.push('/teacher/course/' + this.props.params.courseId + '/materials')
        }
          ).catch();
      }
  }
  
  render() {
    return (
        <div className="col-md-6 col-md-offset-3" >
          <div className="widget">
            <header className="widget-header">
              <h4 className="widget-title">{!this.props.params.materialId ? 'Nuevo Material' : 'Editar Material' }</h4>
            </header>
            <hr className="widget-separator"/>
            <div className="widget-body">
              <form>
                <div className="form-group">
                  <label for="">Titulo</label>
                  <input type="text" name="title" className="form-control" onChange={this.handleChange} 
                    value={this.state.material.title}/>
                </div>
                 <div className="form-group">
                  <label for="">Video id</label>
                  <input type="text" name="videoId" className="form-control" onChange={this.handleChange} 
                    value={this.state.material.videoId}/>
                </div>
              </form>
             </div> 
          </div>
          <div style={{width:'100%'}}>
            <FlatButton label="Guardar" style={{float:'right'}} onClick={this.saveMaterial} primary={true}/>
          </div>
        </div>  
    );
  }
}