import React,{Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

let token = localStorage.getItem("auth-token");
//const [selectedDate,setSelectedDate]=useState(null);
// const Showteam = (props) => (
//   <option value={props.member}>{props.member}</option>
// );


export default class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.onChangeProjectname = this.onChangeProjectname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTeammembers = this.onChangeTeammembers.bind(this);
        this.onChangeStartdate   = this.onChangeStartdate.bind(this);
        this.onChangeProjectstatus   = this.onChangeProjectstatus.bind(this);

       
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            projectname: '',      
            description: '',    
            teammembers: '',
            startdate: new Date(),
            projectstatus:'',
            projects:[],
            members: [],
            
          }
          
        }
        

     
          componentDidMount() {
            
            this.setState({ isFetchingData: true });
            axios.get('http://localhost:5000/engineers', {
              headers: { "x-auth-token": token }
            })
              .then(response => {
                if (response.data.length > 0) {
                  this.setState({
                    members: response.data,
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
            });
            
          }

          onChangeDescription(e) {
            this.setState({      
              description: e.target.value
            });
          }

        
          onChangeTeammembers(e) {
            this.setState({
              teammembers: e.target.value
            });
          }
        
        
        
          onChangeStartdate(e) {
            this.setState({
              startdate:e.target.value
            });
          }
        
        
          
        
          onChangeProjectstatus(e) {
            this.setState({
              projectstatus:e.target.value
            });
          }

        

    
        
    onSubmit(e) {
        e.preventDefault();
        const project = {
              projectname: this.state.projectname,
              description: this.state.description,
              teammembers:this.state.teammembers,
              startdate: this.state.startdate,
              projectstatus: this.state.projectstatus,
              
            }
               
        axios.post('http://localhost:5000/projects/add', project)
                  .then(res => console.log(res.data));
        alert("Project Added!!!");
        window.location = '/';
          }

         

          render() {
            return (
              
              <div>
                <h3>Create New Project</h3>
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
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
                  </div>


                  <div className="form-group">
                    <label >Team members</label>
                    <input  type="text"
                    className="form-control"
                    value={this.state.teammembers}
                    onChange={this.onChangeTeammembers}
                    />
                </div>

                

                  <div className="form-group">
                      <label>Start Date: </label>
                      <div>

                      <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={this.state.startdate}
                      onChange={this.onChangeStartdate}
                      />
                      </div>

                  </div>
                  <div className="form-group">
                    <label >Project Status</label>
                    <input  type="text"
                    className="form-control"
                    value={this.state.projectstatus}
                    onChange={this.onChangeProjectstatus}
                    />
                </div>

                  

                  <div className="form-group">
                      <input type="submit" value="Create Project Log" className="btn btn-primary" />
                  </div>
  </form>

</div>
            )
          }
}

