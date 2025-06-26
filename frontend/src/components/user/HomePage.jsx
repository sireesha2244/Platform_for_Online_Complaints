import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../common/FooterC'
import Complaint from '../user/Complaint';
import Status from '../user/Status';

const HomePage = () => {
   const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState('Complaint');
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

   const Logout = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <div className="d-flex flex-column min-vh-100">
         <nav className="navbar navbar-expand-lg shadow-sm py-4">
            <div className="container-fluid">
               <div className="d-flex align-items-center">
                  <div className="bg-primary bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3" 
                       style={{ width: '45px', height: '45px' }}>
                     <i className="bi bi-person-circle text-white fs-5"></i>
                  </div>
                  <div>
                     <h5 className="navbar-brand mb-0 fw-bold text-primary">Welcome back,</h5>
                     <p className="text-muted small mb-0">{userName}</p>
                  </div>
               </div>
               
               <div className="navbar-collapse justify-content-center" id="navbarSupportedContent">
                  <ul className="navbar-nav">
                     <li className="nav-item mx-2">
                        <NavLink
                           className={`nav-link px-4 py-2 ${activeComponent === 'Complaint' ? 'active' : ''}`}
                           onClick={() => handleNavLinkClick('Complaint')}
                        >
                           <i className="bi bi-plus-circle me-2"></i>
                           Submit Complaint
                        </NavLink>
                     </li>
                     <li className="nav-item mx-2">
                        <NavLink
                           className={`nav-link px-4 py-2 ${activeComponent === 'Status' ? 'active' : ''}`}
                           onClick={() => handleNavLinkClick('Status')}
                        >
                           <i className="bi bi-list-check me-2"></i>
                           Track Status
                        </NavLink>
                     </li>
                  </ul>
               </div>
               
               <button className="btn btn-outline-danger hover-lift" onClick={Logout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Sign Out
               </button>
            </div>
         </nav>

         <main className="flex-grow-1 py-5">
            <div className="container">
               <div className="animate-fade-in-up">
                  {activeComponent === 'Complaint' ? <Complaint /> : null}
                  {activeComponent === 'Status' ? <Status /> : null}
               </div>
            </div>
         </main>

         <Footer />
      </div>
   );
};

export default HomePage;