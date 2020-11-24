import React,{Component} from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class CreateEngineer extends Component {

  
    constructor(props) {
        super(props);

        this.onChangePID = this.onChangePID.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            PID: '',      
            name: '',    
            phone: '',
            email:'',
            engineers: [],
          }
            

        }

       componentDidMount() {
        let token = localStorage.getItem("auth-token");
            axios.get('http://localhost:5000/users/', {
              headers: { "x-auth-token": token }
            })
              .then(response => {
                if (response.data.length > 0) {
                  this.setState({
                    members: response.data.map(user => user.email),
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              })
          }
          

          onChangePID(e) {
            this.setState({      
              PID: e.target.value
            });
          }

          onChangeName(e) {
            this.setState({      
              name: e.target.value
            });
          }

          onChangePhone(e) {
            this.setState({
              phone: e.target.value
            });
          }

          onChangeEmail(e) {
            this.setState({
              email: e.target.value
            });
          }
        
        
        
        
    onSubmit(e) {
        e.preventDefault();
        const engineer = {
              PID: this.state.PID,
              name: this.state.name,
              phone:this.state.phone,
              email:this.state.email, 
              
            }
               
        axios.post('http://localhost:5000/engineers/add', engineer)
                  .then(res => console.log(res.data));
        alert("Engineer Added!!!");
        window.location = '/';
          }

         
          
          render() {
            return (
              <div>
                <h3>Create New Engineer</h3>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group"> 
                   <label>PID: </label>
                   <input  type="text"
                      required
                      className="form-control"
                      value={this.state.PID}
                      onChange={this.onChangePID}
                     />
                  </div>

                  <div className="form-group"> 
                    <label> Engineer's Name: </label>
                    <input  type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    />
                  </div>
                  
                  <div className="form-group"> 
                    <label> Phone Number: </label>
                    <input  type="text"
                    className="form-control"
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    />
                  </div>

                  <div className="form-group"> 
                  <label> Email: </label>
                  <input  type="text"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  />
                </div>
                
                  <div className="form-group">
                      <input type="submit" value="Add User" className="btn btn-primary" />
                  </div>
  </form>
</div>
            )
          }
}

