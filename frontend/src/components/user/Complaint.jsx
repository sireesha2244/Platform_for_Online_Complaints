import axios from 'axios'
import React, { useState } from 'react'

const Complaint = () => {
   const user = JSON.parse(localStorage.getItem('user'))
   const [userComplaint, setUserComplaint] = useState({
      userId: user._id,
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: '',
      comment: ''
   })

   const handleChange = (e) => {
      const { name, value } = e.target
      setUserComplaint({ ...userComplaint, [name]: value })
   }

   const handleClear = () => {
      setUserComplaint({
         userId: user._id,
         name: '',
         address: '',
         city: '',
         state: '',
         pincode: '',
         status: '',
         comment: ''
      })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      const user = JSON.parse(localStorage.getItem('user'))
      const { _id } = user
      axios.post(`http://localhost:8000/Complaint/${_id}`, userComplaint)
         .then(res => {
            JSON.stringify(res.data.userComplaint)
            alert("Your complaint has been submitted successfully!")
            handleClear()
         })
         .catch(err => {
            console.log(err)
            alert("Something went wrong. Please try again.")
         })
   }

   return (
      <div className="container">
         <div className="row justify-content-center">
            <div className="col-lg-8">
               <div className="glass-effect rounded-4 p-5 shadow-xl">
                  <div className="text-center mb-5">
                     <div className="bg-primary bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                          style={{ width: '60px', height: '60px' }}>
                        <i className="bi bi-exclamation-triangle text-white fs-3"></i>
                     </div>
                     <h2 className="fw-bold text-primary mb-2">Submit Your Complaint</h2>
                     <p className="text-muted">Please provide detailed information about your complaint</p>
                  </div>

                  <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                     <div className="row">
                        <div className="col-md-6 mb-4">
                           <label htmlFor="name" className="form-label">
                              <i className="bi bi-person me-2"></i>Full Name
                           </label>
                           <input 
                              name="name" 
                              id="name"
                              onChange={handleChange} 
                              value={userComplaint.name} 
                              type="text" 
                              className="form-control form-control-lg" 
                              placeholder="Enter your full name"
                              required 
                           />
                        </div>
                        
                        <div className="col-md-6 mb-4">
                           <label htmlFor="address" className="form-label">
                              <i className="bi bi-house me-2"></i>Address
                           </label>
                           <input 
                              name="address" 
                              id="address"
                              onChange={handleChange} 
                              value={userComplaint.address} 
                              type="text" 
                              className="form-control form-control-lg" 
                              placeholder="Enter your address"
                              required 
                           />
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-md-4 mb-4">
                           <label htmlFor="city" className="form-label">
                              <i className="bi bi-building me-2"></i>City
                           </label>
                           <input 
                              name="city" 
                              id="city"
                              onChange={handleChange} 
                              value={userComplaint.city} 
                              type="text" 
                              className="form-control form-control-lg" 
                              placeholder="Enter city"
                              required 
                           />
                        </div>
                        
                        <div className="col-md-4 mb-4">
                           <label htmlFor="state" className="form-label">
                              <i className="bi bi-map me-2"></i>State
                           </label>
                           <input 
                              name="state" 
                              id="state"
                              onChange={handleChange} 
                              value={userComplaint.state} 
                              type="text" 
                              className="form-control form-control-lg" 
                              placeholder="Enter state"
                              required 
                           />
                        </div>
                        
                        <div className="col-md-4 mb-4">
                           <label htmlFor="pincode" className="form-label">
                              <i className="bi bi-mailbox me-2"></i>Pincode
                           </label>
                           <input 
                              name="pincode" 
                              id="pincode"
                              onChange={handleChange} 
                              value={userComplaint.pincode} 
                              type="text" 
                              className="form-control form-control-lg" 
                              placeholder="Enter pincode"
                              required 
                           />
                        </div>
                     </div>

                     <div className="mb-4">
                        <label htmlFor="status" className="form-label">
                           <i className="bi bi-flag me-2"></i>Initial Status
                        </label>
                        <input 
                           placeholder='Enter "pending" as initial status' 
                           name="status" 
                           id="status"
                           onChange={handleChange} 
                           value={userComplaint.status} 
                           type="text" 
                           className="form-control form-control-lg" 
                           required 
                        />
                     </div>

                     <div className="mb-5">
                        <label className="form-label" htmlFor="comment">
                           <i className="bi bi-chat-text me-2"></i>Complaint Description
                        </label>
                        <textarea 
                           name="comment" 
                           id="comment"
                           onChange={handleChange} 
                           value={userComplaint.comment} 
                           className="form-control form-control-lg" 
                           rows="5"
                           placeholder="Please describe your complaint in detail..."
                           style={{ resize: 'vertical' }}
                           required
                        />
                     </div>

                     <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-lg py-3 hover-lift">
                           <i className="bi bi-send me-2"></i>
                           Submit Complaint
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Complaint