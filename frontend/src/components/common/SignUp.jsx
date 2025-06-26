import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC'

const SignUp = () => {
   const [title, setTitle] = useState("Select User Type")
   const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      userType: ""
   })
   
   const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
   }

   const handleTitle = (select) => {
      setTitle(select)
      setUser({ ...user, userType: select });
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      const updatedUser = { ...user, userType: title };
      axios.post("http://localhost:8000/SignUp", updatedUser)
         .then((res) => {
            alert("Account created successfully!")
            JSON.stringify(res.data.user)
         })
         .catch((err) => {
            console.log(err)
            alert("Something went wrong. Please try again.")
         })
      setUser({
         name: "",
         email: "",
         password: "",
         phone: "",
         userType: ""
      })
      setTitle("Select User Type")
   }

   return (
      <div className="d-flex flex-column min-vh-100">
         <Navbar expand="lg" className="shadow-sm py-4">
            <Container>
               <Navbar.Brand className="fw-bold fs-3 text-gradient">ComplaintCare</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                  <ul className="navbar-nav">
                     <li className="nav-item mx-2">
                        <Link to={'/'} className="nav-link">Home</Link>
                     </li>
                     <li className="nav-item mx-2">
                        <Link to={'/signup'} className="nav-link active">Sign Up</Link>
                     </li>
                     <li className="nav-item mx-2">
                        <Link to={'/login'} className="nav-link">Login</Link>
                     </li>
                  </ul>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <main className="flex-grow-1 d-flex align-items-center py-5">
            <Container>
               <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-6">
                     <div className="glass-effect rounded-4 p-5 shadow-xl animate-fade-in-up">
                        <div className="text-center mb-5">
                           <div className="bg-primary bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                style={{ width: '60px', height: '60px' }}>
                              <i className="bi bi-person-plus text-white fs-3"></i>
                           </div>
                           <h2 className="fw-bold text-primary mb-2">Create Account</h2>
                           <p className="text-muted">Join ComplaintCare to manage complaints efficiently</p>
                        </div>

                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                           <div className="row">
                              <div className="col-md-6 mb-4">
                                 <label className="form-label">
                                    <i className="bi bi-person me-2"></i>Full Name
                                 </label>
                                 <input 
                                    type="text" 
                                    name="name" 
                                    value={user.name} 
                                    onChange={handleChange} 
                                    className="form-control form-control-lg" 
                                    placeholder="Enter your full name"
                                    required 
                                 />
                              </div>
                              
                              <div className="col-md-6 mb-4">
                                 <label className="form-label">
                                    <i className="bi bi-envelope me-2"></i>Email Address
                                 </label>
                                 <input 
                                    type="email" 
                                    name="email" 
                                    value={user.email} 
                                    onChange={handleChange} 
                                    className="form-control form-control-lg" 
                                    placeholder="Enter your email"
                                    required 
                                 />
                              </div>
                           </div>

                           <div className="row">
                              <div className="col-md-6 mb-4">
                                 <label className="form-label">
                                    <i className="bi bi-lock me-2"></i>Password
                                 </label>
                                 <input 
                                    type="password" 
                                    name="password" 
                                    value={user.password} 
                                    onChange={handleChange} 
                                    className="form-control form-control-lg" 
                                    placeholder="Create a password"
                                    required 
                                 />
                              </div>
                              
                              <div className="col-md-6 mb-4">
                                 <label className="form-label">
                                    <i className="bi bi-phone me-2"></i>Phone Number
                                 </label>
                                 <input 
                                    type="tel" 
                                    name="phone" 
                                    value={user.phone} 
                                    onChange={handleChange} 
                                    className="form-control form-control-lg" 
                                    placeholder="Enter your phone number"
                                    required 
                                 />
                              </div>
                           </div>

                           <div className="mb-5">
                              <label className="form-label">
                                 <i className="bi bi-person-badge me-2"></i>User Type
                              </label>
                              <Dropdown className="w-100">
                                 <Dropdown.Toggle 
                                    variant="outline-primary" 
                                    className="w-100 form-control-lg text-start d-flex justify-content-between align-items-center"
                                    style={{ height: '50px' }}
                                 >
                                    {title}
                                 </Dropdown.Toggle>
                                 <Dropdown.Menu className="w-100">
                                    <Dropdown.Item onClick={() => handleTitle("Ordinary")}>
                                       <i className="bi bi-person me-2"></i>Customer
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleTitle("Admin")}>
                                       <i className="bi bi-shield-check me-2"></i>Administrator
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleTitle("Agent")}>
                                       <i className="bi bi-headset me-2"></i>Support Agent
                                    </Dropdown.Item>
                                 </Dropdown.Menu>
                              </Dropdown>
                           </div>

                           <div className="d-grid mb-4">
                              <button type="submit" className="btn btn-primary btn-lg py-3 hover-lift">
                                 <i className="bi bi-check-circle me-2"></i>
                                 Create Account
                              </button>
                           </div>
                        </form>

                        <div className="text-center">
                           <p className="text-muted mb-0">
                              Already have an account? 
                              <Link to="/login" className="text-primary text-decoration-none fw-medium ms-1">
                                 Sign In
                              </Link>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </Container>
         </main>

         <Footer />
      </div>
   )
}

export default SignUp