
import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import './Navbar.css'
import { Nav } from 'react-bootstrap'
function NavBar(props) {
      const [tokenPresent, settokenPresent] = useState(false)
      const [isAdmin, setisAdmin] = useState(false)
      const [isSuperAdmin, setisSuperAdmin] = useState(false)

      useEffect(() => {
            let role = localStorage.getItem("role");
            if (role === "ROLE_SUPERADMIN") {
                  props.setisUser(false);
                  settokenPresent(true)
                  setisSuperAdmin(true)
                  props.history.push("/superadmin")
            } else if (role === "ROLE_ADMIN") {
                  props.setisUser(false);
                  settokenPresent(true)
                  setisAdmin(true)
                  props.history.push("/admin")
            }

      }, [props.isUser])


      let getSearchCarsInfo = async (event) => {
            event.preventDefault();
            let search = document.getElementById("search")
            let searchData = search.value;

            try {
                  let res = await axios.get("http://localhost:8080/user/car/search", { params: { searchData: searchData } })
                  if (!res.data.error) {
                        props.setsearchCarInfo(res.data.searchCarDetails)
                        props.setsearchError(false)
                        props.history.push("/search")
                  } else {
                        props.setsearchError(true)
                        props.setsearchCarInfo([])
                        props.history.push("/search")
                  }
            } catch (error) {
                  console.log(error)
            }

      }

      let logout = () => {
            localStorage.removeItem("jwtToken")
            localStorage.removeItem("role")
            props.setisUser(true)
            settokenPresent(false)
            setisSuperAdmin(false)
            setisAdmin(false)
            alert("Loggedout successfully")
      }


      return (

            <div className="navbar1">
                  <nav className="navbar navbar-expand-lg navbar-light bg-info ">
                        {!tokenPresent ?
                              <Nav className="me-auto" >
                                    <Link className="navbar-brand" to="/">Cars</Link>
                              </Nav> : null

                        }


                        {tokenPresent && isAdmin ?
                              <Nav className="me-auto" >
                                    <Link className="navbar-brand" style={{ color: "black", fontWeight: "bold" }} to="/admin">Admin</Link>
                              </Nav> : null

                        }

                        {tokenPresent && isSuperAdmin ?
                              <Link style={{ color: "black", fontWeight: "bold" }} className="navbar-brand" to="/superadmin">Super Admin</Link> : null
                        }

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                              <span className="navbar-toggler-icon"></span>
                        </button>
                        {
                              !tokenPresent ?
                                    <div className="collapse navbar-collapse" id="navbarScroll">
                                          <ul className="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll" style={{ maxHeight: "100px" }}>
                                                <li className="nav-item">
                                                      <Link className="nav-link" to="/signup">Signup</Link>
                                                </li>
                                                <li className="nav-item">
                                                      <Link className="nav-link" to="/login">Login</Link>
                                                </li>
                                          </ul>
                                          <form onSubmit={getSearchCarsInfo} style={{ position: "relative", top: "-8px" }} className="d-flex">
                                                <input placeholder="Type to Search" className="form-control mr-2" type="search" name="search" id="search" aria-label="Search" />
                                                <button onClick={(event) => { getSearchCarsInfo(event) }} style={{ position: "relative", top: "-19px" }} className="btn btn-outline-success" type="submit">Search</button>
                                          </form>
                                    </div> : null
                        }


                        {tokenPresent ?
                              <div className="collapse navbar-collapse" id="navbarScroll">
                                    <ul className="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll" style={{ maxHeight: "100px" }}>
                                          <li className="nav-item active">
                                                <Link className="nav-link" style={{ color: "white" }} to="/admin"><span className="sr-only">(current)</span></Link>
                                          </li>

                                    </ul>


                                    <ul className="d-flex">
                                          <li className="nav-item navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll">
                                                <Link onClick={() => { logout() }} style={{ color: "black", fontWeight: "bold" }} className="nav-link" to="/">Logout</Link>
                                          </li>
                                    </ul>
                              </div> : null
                        }

                  </nav>
            </div>
      )
}

export default withRouter(NavBar)