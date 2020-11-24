import React,{Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
const token = localStorage.getItem("auth-token");


export default class EditProjects extends Component {
    constructor(props) {
        super(props);
        this.onChangeProjectname = this.onChangeProjectname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTeammembers = this.onChangeTeammembers.bind(this);
       // this.onChangeStartdate   = this.onChangeStartdate.bind(this);
       this.onChangestartdate = this.onChangestartdate.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          projectname: '',      
            description: '',    
            teammembers: 0,
            startdate: new Date(),
            team:[],
        }
      }
    
    
    
      componentDidMount() {
        // axios.get('http://localhost:5000/projects/'+this.props.match.params.id)
        //   .then(response => {
        //     this.setState({
        //       projectname: response.data.projectname,
        //       description: response.data.description,
        //       teammembers: response.data.teammembers,
        //       startdate: new Date(response.data.startdate),
        //     }) ; 
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   })

        this.setState({ isFetchingData: true });
        axios.get('http://localhost:5000/projects', {
          headers: { "x-auth-token": token }
        })
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                projects: response.data,
                projectname: response.data.projectname,
               description: response.data.description,
                teammembers: response.data.teammembers,
               startdate: new Date(response.data.startdate),
              });
            }
          })
          .catch((error) => {
            console.log(error);
          })
       }
    
    
    
       onChangeProjectname(e) {
        this.setState({
          projectname: e.target.value
        })
      }
    
      onChangeDescription(e) {
        this.setState({
          description: e.target.value
        })
      }
    
    
    
      onChangeTeammembers(e) {
        this.setState({
          teammembers: e.target.value
        })
      }
    
    
    
      onChangestartdate(date) {
        this.setState({
          startdate: date
        })
      }
      
    
    
      onSubmit(e) {
        e.preventDefault();
        const project = {
          projectname: this.state.projectname,
          description: this.state.description,
          teammembers:this.state.teammembers,
          startdate: this.state.startdate,
         
        }
        console.log(project);
        axios.post('http://localhost:5000/projects/update/' + this.props.match.params.id, project)
        .then(res => console.log(res.data));
        window.location = '/';
      }


      render(){
        return (
            <div>
            <h3>Edit Project Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Project Name: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.projectname}
                        onChange={this.onChangeProjectname}
                        />
                    </div>
                    <div className="form-group"> 
                        <label>Project Description: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>

                    <div className="form-group"> 
                        <label>Team Members: </label>
                        <input ref="userInput"
                            required
                            className="form-control"
                            value={this.state.teammembers}
                            onChange={this.onChangeTeammembers}
                        />
                      
                    </div>
            
                    <div className="form-group">
                        <label>Start Date: </label>
                        <div>
                        <DatePicker
                        
                            selected={this.state.startdate}
                            onChange={this.onChangeStartdate}
                        />
                        </div>
            
                    </div>

                   
                    <div className="form-group">
                        <input type="submit" value="Edit Project Log" className="btn btn-primary" />
                    </div>
                </form>
          </div>
        )
    }
}

