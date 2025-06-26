import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';

import UserInfo from './UserInfo';
import AccordionAdmin from "./AccordionAdmin";
import AgentInfo from './AgentInfo';

const AdminHome = () => {
   const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState('dashboard');
   const [userName, setUserName] = useState('');

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { name } = user;
               setUserName(name);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };
      getData();
   }, [navigate]);

   const handleNavLinkClick = (componentName) => {
      setActiveComponent(componentName);
   };

   const LogOut = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <div className="d-flex flex-column min-vh-100">
         <Navbar expand="lg" className="shadow-sm py-4">
            <Container fluid>
               <div className="d-flex align-items-center">
                  <div className="bg-primary bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3" 
                       style={{ width: '50px', height: '50px' }}>
                     <i className="bi bi-shield-check text-white fs-4"></i>
                  </div>
                  <div>
                     <h4 className="navbar-brand mb-0 fw-bold text-primary">Admin Dashboard</h4>
                     <p className="text-muted small mb-0">Welcome back, {userName}</p>
                  </div>
               </div>
               
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="me-auto mx-auto" navbarScroll>
                     <NavLink
                        className={`nav-link px-4 py-2 mx-2 ${activeComponent === 'dashboard' ? 'active' : ''}`}
                        onClick={() => handleNavLinkClick('dashboard')}
                     >
                        <i className="bi bi-speedometer2 me-2"></i>
                        Dashboard
                     </NavLink>
                     <NavLink
                        className={`nav-link px-4 py-2 mx-2 ${activeComponent === 'UserInfo' ? 'active' : ''}`}
                        onClick={() => handleNavLinkClick('UserInfo')}
                     >
                        <i className="bi bi-people me-2"></i>
                        Users
                     </NavLink>
                     <NavLink
                        className={`nav-link px-4 py-2 mx-2 ${activeComponent === 'Agent' ? 'active' : ''}`}
                        onClick={() => handleNavLinkClick('Agent')}
                     >
                        <i className="bi bi-headset me-2"></i>
                        Agents
                     </NavLink>
                  </Nav>
                  <Button onClick={LogOut} variant="outline-danger" className="hover-lift">
                     <i className="bi bi-box-arrow-right me-2"></i>
                     Sign Out
                  </Button>
               </Navbar.Collapse>
            </Container>
         </Navbar>
         
         <main className="flex-grow-1 py-4">
            <div className="animate-fade-in-up">
               {activeComponent === 'Agent' ? <AgentInfo /> : null}
               {activeComponent === 'dashboard' ? <AccordionAdmin /> : null}
               {activeComponent === 'UserInfo' ? <UserInfo /> : null}
            </div>
         </main>
      </div>
   )
};

export default AdminHome;