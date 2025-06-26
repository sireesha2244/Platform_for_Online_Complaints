import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from './FooterC';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = () => {
   return (
      <div className="d-flex flex-column min-vh-100">
         <Navbar expand="lg" className="py-4 shadow-sm">
            <Container>
               <Navbar.Brand className="fw-bold fs-2 text-gradient">
                  ComplaintCare
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="navbar-nav" />
               <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                  <ul className="navbar-nav">
                     <li className="nav-item mx-2">
                        <Link to="/" className="nav-link">Home</Link>
                     </li>
                     <li className="nav-item mx-2">
                        <Link to="/signup" className="nav-link">Sign Up</Link>
                     </li>
                     <li className="nav-item mx-2">
                        <Link to="/login" className="nav-link">Login</Link>
                     </li>
                  </ul>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <main className="flex-grow-1">
            <Container className="py-5">
               <div className="row align-items-center min-vh-75">
                  <div className="col-lg-6 mb-5 mb-lg-0 animate-fade-in-up">
                     <div className="pe-lg-5">
                        <h1 className="display-3 fw-bold mb-4">
                           <span className="text-gradient">Simplify</span><br />
                           Complaint Management
                        </h1>
                        <p className="lead text-muted mb-5 fs-5" style={{ lineHeight: '1.6' }}>
                           Transform customer service with our intelligent complaint tracking system. 
                           Built for modern businesses that value efficiency and customer satisfaction.
                        </p>
                        <div className="d-flex flex-column flex-sm-row gap-3">
                           <Link to="/login">
                              <Button size="lg" className="px-5 py-3 hover-lift">
                                 <i className="bi bi-pencil-square me-2"></i>
                                 Submit Complaint
                              </Button>
                           </Link>
                           <Link to="/signup">
                              <Button variant="outline-primary" size="lg" className="px-5 py-3 hover-lift">
                                 <i className="bi bi-arrow-right me-2"></i>
                                 Get Started
                              </Button>
                           </Link>
                        </div>
                     </div>
                  </div>

                  <div className="col-lg-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                     <div className="glass-effect p-5 rounded-4 shadow-lg">
                        <div className="text-center mb-4">
                           <div className="bg-primary bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                style={{ width: '60px', height: '60px' }}>
                              <i className="bi bi-shield-check text-white fs-3"></i>
                           </div>
                           <h3 className="fw-bold text-primary mb-4">Why Choose ComplaintCare?</h3>
                        </div>
                        
                        <div className="row g-4">
                           <div className="col-12">
                              <div className="d-flex align-items-start">
                                 <div className="bg-success bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3" 
                                      style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                                    <i className="bi bi-lightning-charge text-white"></i>
                                 </div>
                                 <div>
                                    <h6 className="fw-semibold mb-1">Real-time Tracking</h6>
                                    <p className="text-muted small mb-0">Monitor complaint status instantly with live updates</p>
                                 </div>
                              </div>
                           </div>
                           
                           <div className="col-12">
                              <div className="d-flex align-items-start">
                                 <div className="bg-warning bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3" 
                                      style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                                    <i className="bi bi-gear text-white"></i>
                                 </div>
                                 <div>
                                    <h6 className="fw-semibold mb-1">Smart Automation</h6>
                                    <p className="text-muted small mb-0">Intelligent routing and priority management</p>
                                 </div>
                              </div>
                           </div>
                           
                           <div className="col-12">
                              <div className="d-flex align-items-start">
                                 <div className="bg-info bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3" 
                                      style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                                    <i className="bi bi-graph-up text-white"></i>
                                 </div>
                                 <div>
                                    <h6 className="fw-semibold mb-1">Analytics Dashboard</h6>
                                    <p className="text-muted small mb-0">Comprehensive insights and performance metrics</p>
                                 </div>
                              </div>
                           </div>
                           
                           <div className="col-12">
                              <div className="d-flex align-items-start">
                                 <div className="bg-primary bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3" 
                                      style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                                    <i className="bi bi-shield-lock text-white"></i>
                                 </div>
                                 <div>
                                    <h6 className="fw-semibold mb-1">Enterprise Security</h6>
                                    <p className="text-muted small mb-0">Bank-level security with data encryption</p>
                                 </div>
                              </div>
                           </div>
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

export default Home;