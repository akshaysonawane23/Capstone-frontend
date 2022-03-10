
import React, { useState } from 'react';
import './LoginForm.css';
import loginFormValidation from './loginFormValidation';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


function SignupForm(props) {
      const [signupData, setsignupData] = useState({
            username: "",
            password: "",
            role: ""
      })
      const [errors, seterrors] = useState({})


      let changeData = (event) => {
            setsignupData({
                  ...signupData,
                  [event.target.name]: event.target.value
            })
      }


      let validateData = () => {
            seterrors(loginFormValidation(signupData))
      }


      let saveData = async (event) => {
            event.preventDefault()
            if (Object.keys(errors).length === 0) {
                  try {
                        let res = await axios.post("http://localhost:8080/admin/signupAuthentication", signupData)
                        console.log(res);
                        if (!res.data.error) {
                              localStorage.setItem("jwtToken", res.data.token);
                              localStorage.setItem("role", res.data.role)
                              props.login()
                              let role = localStorage.getItem("role");
                              if (role === "ROLE_SUPERADMIN") {
                                    props.history.push("/superadmin")
                              } else if (role === "ROLE_ADMIN") {
                                    props.history.push("/admin")
                              }
                        } else {
                              seterrors({ error: res.data.message })
                        }
                  } catch (error) {
                        console.log(error);
                  }
            }
      }

      let goToLogin = () => {
            props.history.push("/login")

      }

      return (
            <div className="global-container">
                  <div className="card login-form">
                        <div className="card-body">
                              <h3 className="card-title text-center">SignUp</h3>
                              <div className="card-text">
                                    {errors.error && <p className='alert alert-danger form-control-sm'>{errors.error}</p>}
                                    <form onSubmit={saveData}>

                                          <div className="form-group">
                                                <label className="move" htmlFor="username">Username</label>
                                                <input type="text" onChange={changeData} value={signupData.username} name="username" className="form-control form-control-sm" id="username" />
                                                {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}

                                          </div>
                                          <div className="form-group">
                                                <label className="move" htmlFor="password">Password</label>
                                                <input type="password" onChange={changeData} value={signupData.password} name="password" className="form-control form-control-sm" id="password" />
                                                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

                                          </div>
                                          <div className="form-group">
                                                <label className="move" htmlFor="role">Role</label>
                                                <select className="form-control form-control-sm" name="role" id="role" onChange={changeData} >
                                                      <option >Select_Role</option>
                                                      <option >ROLE_ADMIN</option>
                                                      <option >ROLE_SUPERADMIN</option>
                                                </select>
                                                {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
                                          </div>
                                          <button type="submit" onClick={validateData} className="btn btn-primary btn-block">SignUp</button>
                                    </form>
                                    <br></br>
                                    <div>
                                          <h6 style={{ cursor: "pointer" }} onClick={goToLogin}>  Already have an Account ? Login</h6>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default withRouter(SignupForm)