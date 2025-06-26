import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC';

const Login = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState({
      email: "",
      password: ""
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:8000/Login", user)
         .then((res) => {
            alert("Successfully logged in");
            localStorage.setItem("user", JSON.stringify(res.data));
            const isLoggedIn = JSON.parse(localStorage.getItem("user"));
            const { userType } = isLoggedIn;
            switch (userType) {
               case "Admin":
                  navigate("/AdminHome");
                  break;
               case "Ordinary":
                  navigate("/HomePage");
                  break;
               case "Agent":
                  navigate("/AgentHome");
                  break;
               default:
                  navigate("/Login");
                  break;
            }
         })
         .catch((err) => {
            if (err.response && err.response.status === 401) {
               alert("User doesn't exist");
            }
            navigate("/Login");
         });
   };

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
                        <Link to={'/signup'} className="nav-link">Sign Up</Link>
                     </li>
                     <li className="nav-item mx-2">
                        <Link to={'/login'} className="nav-link active">Login</Link>
                     </li>
                  </ul>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <main className="flex-grow-1 d-flex align-items-center py-5">
            <Container>
               <div className="row justify-content-center">
                  <div className="col-md-6 col-lg-5">
                     <div className="glass-effect rounded-4 p-5 shadow-xl animate-fade-in-up">
                        <div className="text-center mb-5">
                           <div className="bg-primary bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                style={{ width: '60px', height: '60px' }}>
                              <i className="bi bi-person-circle text-white fs-3"></i>
                           </div>
                           <h2 className="fw-bold text-primary mb-2">Welcome Back</h2>
                           <p className="text-muted">Sign in to access your complaint dashboard</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                           <div className="mb-4">
                              <label htmlFor="email" className="form-label">
                                 <i className="bi bi-envelope me-2"></i>Email Address
                              </label>
                              <input 
                                 type="email" 
                                 name="email" 
                                 id="email"
                                 value={user.email} 
                                 onChange={handleChange} 
                                 className="form-control form-control-lg" 
                                 placeholder="Enter your email"
                                 required 
                              />
                           </div>
                           
                           <div className="mb-5">
                              <label htmlFor="password" className="form-label">
                                 <i className="bi bi-lock me-2"></i>Password
                              </label>
                              <input 
                                 type="password" 
                                 name="password" 
                                 id="password"
                                 value={user.password} 
                                 onChange={handleChange} 
                                 className="form-control form-control-lg" 
                                 placeholder="Enter your password"
                                 required 
                              />
                           </div>
                           
                           <div className="d-grid mb-4">
                              <button type="submit" className="btn btn-primary btn-lg py-3 hover-lift">
                                 <i className="bi bi-box-arrow-in-right me-2"></i>
                                 Sign In
                              </button>
                           </div>
                        </form>
                        
                        <div className="text-center">
                           <p className="text-muted mb-0">
                              Don't have an account? 
                              <Link to="/signup" className="text-primary text-decoration-none fw-medium ms-1">
                                 Create Account
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
   );
};

export default Login;