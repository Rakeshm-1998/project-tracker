import React,{Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditTask extends Component {
    constructor(props) {
        super(props);

        this.onChangeTaskname = this.onChangeTaskname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeUsername = this.onchangeUsername.bind(this);
        this.onChangeProjectstatus = this.onChangeProjectstatus.bind(this);
        this.onChangeStartdate   = this.onChangeStartdate.bind(this);
        this.onChangeEnddate     = this.onChangeEnddate.bind(this);
    
        this.state = {
            taskname: '',      
            description: '',    
            username: 0,
            startdate: new Date(),
            enddate: new Date(),
            users:[],
          }
      }
    
    
    
      componentDidMount() {
        axios.get('http://localhost:5000/tasks/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              taskname: response.data.taskname,
              description: response.data.description,
              projectstatus: response.data.projectstatus,
              startdate: new Date(response.data.startdate),
              enddate: new Date(response.data.enddate),
            })   
          })
          .catch(function (error) {
            console.log(error);
          })
    

    
    
        axios.get('http://localhost:5000/users/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                users: response.data.map(user => user.username),
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
      }
    
    
    
      onChangeTaskname(e) {
        this.setState({
          taskname: e.target.value
        })
      }
    
      onChangeDescription(e) {
        this.setState({
          description: e.target.value
        })
      }
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        })
      }
    
    
    
      onChangeProjectstatus(e) {
        this.setState({
          projectstatus: e.target.value
        })
      }
    
    
    
      onChangeStartdate(date) {
        this.setState({
          startdate: date
        })
      }

      onChangeEnddate(date) {
        this.setState({
          enddate: date
        })
      }
    
    
    
      onSubmit(e) {
        e.preventDefault();
        const task = {
          taskname: this.state.taskname,
          description: this.state.description,
          username: this.state.username,
          projectstatus: this.state.projectstatus,
          startdate: this.state.startdate,
          enddate: this.state.enddate,
        }
        console.log(task);
        axios.post('http://localhost:5000/tasks/update/' + this.props.match.params.id, task)
        .then(res => console.log(res.data));
        window.location = '/';
      }


    render(){
        return (
            <div>
            <h3>Edit Task Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Task Name: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.projectname}
                        onChange={this.onChangeTaskname}
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
                        <label>Task assigned to: </label>
                       
                    <input type="text"  className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}/>
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
                    <label>End Date: </label>
                    <div>
                    <DatePicker
                        selected={this.state.enddate}
                        onChange={this.onChangeEnddate}
                    />
                    </div>
        
                </div>
            
            
            
                    <div className="form-group">
                        <input type="submit" value="Edit Task Log" className="btn btn-primary" />
                    </div>
                </form>
          </div>
        )
    }
}

