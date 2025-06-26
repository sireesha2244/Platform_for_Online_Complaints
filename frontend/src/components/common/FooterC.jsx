import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function FooterC() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
      <Container>
        <Row className="mb-5">
          <Col md={4} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center mb-4">
              <div className="bg-primary bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3" 
                   style={{ width: '50px', height: '50px' }}>
                <i className="bi bi-shield-check text-white fs-5"></i>
              </div>
              <h4 className="text-gradient fw-bold mb-0">ComplaintCare</h4>
            </div>
            <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
              Empowering businesses with intelligent, transparent, and reliable complaint management solutions 
              that prioritize customer satisfaction and operational excellence.
            </p>
            <div className="d-flex gap-3">
              <a href="javascript:void(0);" className="text-white hover-lift">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="javascript:void(0);" className="text-white hover-lift">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a href="javascript:void(0);" className="text-white hover-lift">
                <i className="bi bi-github fs-5"></i>
              </a>
            </div>
          </Col>

          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="text-primary fw-bold mb-4">Quick Navigation</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <Link to="/" className="text-white text-decoration-none d-flex align-items-center hover-lift">
                  <i className="bi bi-house-door me-3 text-primary"></i>
                  <span>Home</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/login" className="text-white text-decoration-none d-flex align-items-center hover-lift">
                  <i className="bi bi-box-arrow-in-right me-3 text-primary"></i>
                  <span>Login</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/signup" className="text-white text-decoration-none d-flex align-items-center hover-lift">
                  <i className="bi bi-person-plus me-3 text-primary"></i>
                  <span>Sign Up</span>
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h5 className="text-primary fw-bold mb-4">Get in Touch</h5>
            <div className="mb-3">
              <div className="d-flex align-items-start">
                <i className="bi bi-envelope me-3 text-primary mt-1"></i>
                <div>
                  <p className="text-white mb-1 fw-medium">Email Support</p>
                  <p className="text-muted small mb-0">support@complaintcare.com</p>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-start">
                <i className="bi bi-telephone me-3 text-primary mt-1"></i>
                <div>
                  <p className="text-white mb-1 fw-medium">Phone Support</p>
                  <p className="text-muted small mb-0">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-start">
                <i className="bi bi-geo-alt me-3 text-primary mt-1"></i>
                <div>
                  <p className="text-white mb-1 fw-medium">Office Address</p>
                  <p className="text-muted small mb-0">123 Business Avenue<br />Suite 100, Tech District</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary opacity-25 my-4" />

        <Row className="align-items-center">
          <Col md={6}>
            <p className="text-muted small mb-0">
              &copy; {new Date().getFullYear()} ComplaintCare. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <div className="d-flex justify-content-md-end gap-4 mt-3 mt-md-0">
              <a href="javascript:void(0);" className="text-muted text-decoration-none small hover-lift">Privacy Policy</a>
              <a href="javascript:void(0);" className="text-muted text-decoration-none small hover-lift">Terms of Service</a>
              <a href="javascript:void(0);" className="text-muted text-decoration-none small hover-lift">Cookie Policy</a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}