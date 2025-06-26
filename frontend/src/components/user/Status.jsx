import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';
import Collapse from 'react-bootstrap/Collapse';

const Status = () => {
  const [toggle, setToggle] = useState({})
  const [statusCompliants, setStatusCompliants] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { _id } = user;

    axios.get(`http://localhost:8000/status/${_id}`)
      .then((res) => {
        setStatusCompliants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleToggle = (complaintId) => {
    setToggle((prevState) => ({
       ...prevState,
       [complaintId]: !prevState[complaintId],
    }));
  };

  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
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
    <div className="container">
      <div className="text-center mb-5">
        <div className="bg-primary bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
             style={{ width: '60px', height: '60px' }}>
          <i className="bi bi-list-check text-white fs-3"></i>
        </div>
        <h2 className="fw-bold text-primary mb-2">Complaint Status</h2>
        <p className="text-muted">Track the progress of your submitted complaints</p>
      </div>

      {statusCompliants.length > 0 ? (
        <div className="row g-4">
          {statusCompliants.map((complaint, index) => {
            const open = toggle[complaint._id] || false;
            return (
              <div key={index} className="col-lg-6 col-xl-4">
                <Card className="h-100 hover-lift">
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title fw-bold text-primary mb-0">
                        <i className="bi bi-person me-2"></i>
                        {complaint.name}
                      </h5>
                      {getStatusBadge(complaint.status)}
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
                    
                    <div className="d-grid">
                      <Button 
                        onClick={() => handleToggle(complaint._id)}
                        aria-controls={`collapse-${complaint._id}`}
                        aria-expanded={open} 
                        variant="outline-primary"
                        className="hover-lift"
                      >
                        <i className="bi bi-chat-dots me-2"></i>
                        {open ? 'Hide Messages' : 'View Messages'}
                      </Button>
                    </div>
                    
                    <Collapse in={open}>
                      <div className="mt-4">
                        <div className="border rounded-3 overflow-hidden">
                          <ChatWindow 
                            key={complaint._id} 
                            complaintId={complaint._id} 
                            name={complaint.name} 
                          />
                        </div>
                      </div>
                    </Collapse>
                  </Card.Body>
                </Card>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="glass-effect rounded-4 p-5 d-inline-block">
            <i className="bi bi-inbox display-1 text-muted mb-3"></i>
            <Alert variant="info" className="border-0 bg-transparent">
              <Alert.Heading className="h4">No Complaints Found</Alert.Heading>
              <p className="mb-0">You haven't submitted any complaints yet. Click "Submit Complaint" to get started.</p>
            </Alert>
          </div>
        </div>
      )}
    </div>
  )
}

export default Status;