import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';

export default class SharedTable extends Component {
  
	constructor(props) {
		super(props);
		this.state = {open: false,id:undefined};
	}

	handleOpen = (id) => {
    	this.setState({open: true,id:id});
  	};

  	handleClose = (answer) => {
    	if(answer){
	      	this.props.handleClose(this.state.id);        
    	}
    	this.setState({open: false});
  	};

  	buildProps = (col,data) => {
		var props = Object.assign({},col);
		props.value = {}
		this.props.config.map((col) => {
			if(typeof col.accessor === 'string'){
				props.value[col.accessor] = data[col.accessor];
			}
			else{
				col.accessor.map((value) => props.value[value] = data[value]);
			}
		});
		return props;
	}

	render(){
		const actions = [
	      	<FlatButton
	        	label="No"
	        	primary={true}
	        	onClick={this.handleClose.bind(this,false)}
	     	/>,
	      	<FlatButton
	        	label="Si"
	        	primary={true}
	        	onClick={this.handleClose.bind(this,true)}
	      	/>
    	];
		return(
			<div className="widget">
				<header className="widget-header">
					<h4 className="widget-title">{this.props.title}</h4>
				</header>
				<hr className="widget-separator"/>
				<div className="widget-body">
					<div className="table-responsive">							
						<table className="table no-cellborder">
							<thead>
								<tr>
									{this.props.config.map((config,index) =>
										<th key={index}>{config.header}</th>
									)}
									{this.modifyLink ? <th></th> : null}								
								</tr>
							</thead>
							<tbody>
								{this.props.rows.map((row,indexRow) =>
									<tr key={indexRow}>
										{this.props.config.map((config,indexCol) => 
											<td key={indexRow + '-' + indexCol}>
												{config.Cell ? config.Cell(this.buildProps(config,row)) : row[config.accessor]}
											</td>
										)}
											<td>
                        					<div className="btn-group flex-btn-group-container">
                          						{this.props.modifyLink ? 
                          							<Link to={this.props.modifyLink + row.id}>
                          								<FlatButton label="Modificar"/>
                          							</Link> : null
                          						}
                          						{this.props.deleteTitle ? 
                          							<FlatButton label="Borrar" onClick={this.handleOpen.bind(this,row[this.props.deleteField])} /> 
                          							: null
                          						}    
                        					</div>
                      					</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div> 
				<Dialog
                	title={this.props.deleteTitle}
                	actions={actions}
                	modal={false}
                	open={this.state.open}
                	onRequestClose={this.handleClose}
              	>
                	{this.props.deleteText}
              </Dialog>
			</div>
			);
		}
}