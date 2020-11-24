import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const token = localStorage.getItem("auth-token");

const Project = props => (
  <tr>
    <td>{props.project.projectname}</td>
    <td>{props.project.description}</td>
    <td>{props.project.teammembers}</td>
    <td>{props.project.startdate}</td>
    <td>{props.project.projectstatus}</td>

   
    <td>
      <Link to={"/edit/"+props.project._id}>edit</Link> | <a href="/#" onClick={() => { props.deleteProject(props.project._id) }}>delete</a>
    </td>
  </tr>
)



export default class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.deleteProject = this.deleteProject.bind(this)
        this.state = {projects: []};
      }

      componentDidMount() {
        this.setState({ isFetchingData: true });
        axios.get('http://localhost:5000/projects', {
          headers: { "x-auth-token": token }
        })
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                projects: response.data,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          })
      }
    
    
    
      deleteProject(id) {
        axios.delete('http://localhost:5000/projects/'+id, {
            headers: { "x-auth-token": token }
          })
          .then(response => { console.log(response.data)});

        this.setState({
          projects: this.state.projects.filter(el => el._id !== id)
        })
      }
    
    
    
      projectList() {
        return this.state.projects.map(currentproject => {
          return <Project project={currentproject} deleteProject={this.deleteProject} key={currentproject._id}/>;
        })
      }
    
    
    render(){
        return (
            
            <div>
            <h3>Logged Projects</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Project Name</th>
                    <th>Description</th>
                    <th>Team mambers</th>
                    <th>Start Date</th>
                    <th>Project Status</th>

                   
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.projectList() }
                </tbody>
            </table>
      </div>
        )
    }
}

