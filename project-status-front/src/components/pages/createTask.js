import React,{Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";


export default class CreateTask extends Component {
    constructor(props) {
        super(props);

        this.onChangeTaskname = this.onChangeTaskname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeProjectstatus = this.onChangeProjectstatus.bind(this);
        this.onChangeStartdate = this.onChangeStartdate.bind(this);
        this.onChangeEnddate = this.onChangeEnddate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            taskname:'',
            description: '',   
            username: '',      
            projectstatus:'',
            startdate: new Date(),
            enddate: new Date(),
            users: [],
            projects:[]
          }
        }

       componentDidMount() {
            axios.get('http://localhost:5000/users/')
              .then(response => {
                if (response.data.length > 0) {
                  this.setState({
                    users: response.data.map(user => user.username),
                    username: response.data[0].username
                  });
                 
                }
              })
              .catch((error) => {
                console.log(error);
              })
          }

        
          onChangeTaskname(e) {
            this.setState({
              taskname: e.target.value
            });
          }
        
          onChangeDescription(e) {
            this.setState({
              description: e.target.value
            });
          }

          onChangeUsername(e) {
            this.setState({
              username: e.target.value
            });
          }
        
          onChangeProjectstatus(e) {
            this.setState({      
              projectstatus: e.target.value
            });
          }
        
          onChangeStartdate(date) {
            this.setState({
              startdate: date
            });
          }
         
        
        
          onChangeEnddate(date) {
            this.setState({
              ensdate: date
            });
          }

          handleChange = (event) => {
            this.setState({
               // project: event.target.value
               users: Array.from(event.target.selectedOptions, (item) => item.value)
            });
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
        
    axios.post('http://localhost:5000/task/add', task)
        .then(res => console.log(res.data));
     window.location = '/';
          }
    
    
    render(){
        return (
            <div>
            <h3>Create New Task Log</h3>
            <form onSubmit={this.onSubmit}>

              <div className="form-group"> 
              <label>Task name: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.taskname}
                  onChange={this.onChangeTaskname}
                  />
              </div>
              <div className="form-group"> 
              <label>Description: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  />
               </div>
                <div className="form-group"> 
                    <label>Task assigned to: </label>
                   
                      <input type="text"  className="form-control" value={this.state.value} onChange={this.onChangeUsername}
                      />
                </div>

                <div className="form-group"> 
                    <label>Project Status: </label>
                    <select ref="userInput" required className="form-control"
                        value={this.state.projectstatus}
                        onChange={this.onChangeProjectstatus}>
                        <option value="Completed">Completed</option>
                        <option value="Not Completed">Not Completed</option>
                        <option value="Going On">Going on</option>
                        
                    </select>
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
                    <input type="submit" value="Create Task Log" className="btn btn-primary" />
                </div>
        </form>
    </div>
        )
    }
}

