import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import ChatWindow from '../common/ChatWindow';
import Footer from '../common/FooterC';

const AgentHome = () => {
   const navigate = useNavigate();
   const [userName, setUserName] = useState('');
   const [toggle, setToggle] = useState({});
   const [agentComplaintList, setAgentComplaintList] = useState([]);

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { _id, name } = user;
               setUserName(name);
               const response = await axios.get(`http://localhost:8000/allcomplaints/${_id}`);
               const complaints = response.data;
               console.log("Agent complaints:", complaints); // helpful for debugging
               setAgentComplaintList(complaints);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };

      getData();
   }, [navigate]);

   const handleStatusChange = async (complaintId) => {
      try {
         await axios.put(`http://localhost:8000/complaint/${complaintId}`, { status: 'completed' });
         setAgentComplaintList((prevComplaints) =>
            prevComplaints.map((complaint) => {
               const id = complaint._doc?.complaintId || complaint.complaintId;
               if (id === complaintId) {
                  const updated = { ...complaint };
                  if (updated._doc) updated._doc.status = 'completed';
                  else updated.status = 'completed';
                  return updated;
               }
               return complaint;
            })
         );
      } catch (error) {
         console.log(error);
      }
   };

   const handleToggle = (complaintId) => {
      setToggle((prevState) => ({
         ...prevState,
         [complaintId]: !prevState[complaintId],
      }));
   };

   const LogOut = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   const getStatusBadge = (status) => {
      switch (status?.toLowerCase()) {
         case 'completed':
            return <span className="badge bg-success px-3 py-2 rounded-pill">
               <i className="bi bi-check-circle me-1"></i>Completed
            </span>;
         case 'pending':
            return <span className="badge bg-warning px-3 py-2 rounded-pill">
               <i className="bi bi-clock me-1"></i>Pending
            </span>;
         case 'in progress':
            return <span className="badge bg-info px-3 py-2 rounded-pill">
               <i className="bi bi-arrow-repeat me-1"></i>In Progress
            </span>;
         default:
            return <span className="badge bg-secondary px-3 py-2 rounded-pill">
               <i className="bi bi-question-circle me-1"></i>{status}
            </span>;
      }
   };

   return (
      <div className="d-flex flex-column min-vh-100">
         <Navbar expand="lg" className="shadow-sm py-4">
            <Container fluid>
               <div className="d-flex align-items-center">
                  <div className="bg-primary bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3"
                       style={{ width: '50px', height: '50px' }}>
                     <i className="bi bi-headset text-white fs-4"></i>
                  </div>
                  <div>
                     <h4 className="navbar-brand mb-0 fw-bold text-primary">Agent Dashboard</h4>
                     <p className="text-muted small mb-0">Welcome back, {userName}</p>
                  </div>
               </div>

               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="me-auto mx-auto" navbarScroll>
                     <NavLink className="nav-link px-4 py-2 active">
                        <i className="bi bi-list-task me-2"></i>
                        Assigned Complaints
                     </NavLink>
                  </Nav>
                  <Button onClick={LogOut} variant="outline-danger" className="hover-lift">
                     <i className="bi bi-box-arrow-right me-2"></i>
                     Sign Out
                  </Button>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <main className="flex-grow-1 py-5">
            <Container>
               <div className="text-center mb-5">
                  <h2 className="fw-bold text-primary mb-2">Assigned Complaints</h2>
                  <p className="text-muted">Manage and resolve customer complaints efficiently</p>
               </div>

               {agentComplaintList && agentComplaintList.length > 0 ? (
                  <div className="row g-4">
                     {agentComplaintList.map((complaint, index) => {
                        const id = complaint._doc?.complaintId || complaint.complaintId;
                        const status = complaint._doc?.status || complaint.status;
                        const open = toggle[id] || false;

                        return (
                           <div key={index} className="col-lg-6 col-xl-4">
                              <Card className="h-100 hover-lift">
                                 <Card.Body className="p-4">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                       <h5 className="card-title fw-bold text-primary mb-0">
                                          <i className="bi bi-person me-2"></i>
                                          {complaint.name}
                                       </h5>
                                       {getStatusBadge(status)}
                                    </div>

                                    <div className="mb-3">
                                       <div className="row g-2 text-sm">
                                          <div className="col-12">
                                             <p className="card-text mb-2">
                                                <i className="bi bi-geo-alt text-muted me-2"></i>
                                                <strong>Address:</strong> {complaint.address}
                                             </p>
                                          </div>
                                          <div className="col-6">
                                             <p className="card-text mb-2">
                                                <i className="bi bi-building text-muted me-2"></i>
                                                <strong>City:</strong> {complaint.city}
                                             </p>
                                          </div>
                                          <div className="col-6">
                                             <p className="card-text mb-2">
                                                <i className="bi bi-map text-muted me-2"></i>
                                                <strong>State:</strong> {complaint.state}
                                             </p>
                                          </div>
                                          <div className="col-12">
                                             <p className="card-text mb-2">
                                                <i className="bi bi-mailbox text-muted me-2"></i>
                                                <strong>Pincode:</strong> {complaint.pincode}
                                             </p>
                                          </div>
                                       </div>
                                    </div>

                                    <div className="mb-4">
                                       <p className="card-text">
                                          <i className="bi bi-chat-text text-muted me-2"></i>
                                          <strong>Description:</strong>
                                       </p>
                                       <p className="text-muted small bg-light p-3 rounded">
                                          {complaint.comment}
                                       </p>
                                    </div>

                                    <div className="d-flex gap-2 mb-3">
                                       {status !== 'completed' && (
                                          <Button
                                             onClick={() => handleStatusChange(id)}
                                             variant="success"
                                             size="sm"
                                             className="hover-lift flex-fill"
                                          >
                                             <i className="bi bi-check-circle me-1"></i>
                                             Mark Complete
                                          </Button>
                                       )}
                                       <Button
                                          onClick={() => handleToggle(id)}
                                          aria-controls={`collapse-${id}`}
                                          aria-expanded={open}
                                          variant="outline-primary"
                                          size="sm"
                                          className="hover-lift flex-fill"
                                       >
                                          <i className="bi bi-chat-dots me-1"></i>
                                          {open ? 'Hide Chat' : 'Open Chat'}
                                       </Button>
                                    </div>

                                    <Collapse in={open}>
                                       <div className="border rounded-3 overflow-hidden">
                                          <ChatWindow
                                             key={id}
                                             complaintId={id}
                                             name={userName}
                                          />
                                       </div>
                                    </Collapse>
                                 </Card.Body>
                              </Card>
                           </div>
                        );
                     })}
                  </div>
               ) : (
                  <div className="text-center py-5">
                     <div className="glass-effect rounded-4 p-5 d-inline-block">
                        <i className="bi bi-inbox display-1 text-muted mb-3"></i>
                        <Alert variant="info" className="border-0 bg-transparent">
                           <Alert.Heading className="h4">No Complaints Assigned</Alert.Heading>
                           <p className="mb-0">You don't have any complaints assigned to you at the moment.</p>
                        </Alert>
                     </div>
                  </div>
               )}
            </Container>
         </main>

         <Footer />
      </div>
   );
};

export default AgentHome;
