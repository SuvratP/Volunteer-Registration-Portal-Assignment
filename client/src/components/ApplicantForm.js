import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ApplicantForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    skills: '',
    availability: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://volunteer-registration-portal-assignment.onrender.com/api/applicants', formData);
      alert('Application submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        skills: '',
        availability: '',
      });
    } catch (err) {
      alert('Submission failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="container py-5">
      <div className="mx-auto p-5 bg-white shadow rounded" style={{ maxWidth: '600px' }}>
        <h2 className="text-center text-primary mb-4 fw-bold">Apply Now</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone Number</label>
            <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Role</label>
            <select className="form-select" name="role" value={formData.role} onChange={handleChange} required>
              <option value="">-- Select Role --</option>
              <option value="Intern">Intern</option>
              <option value="Volunteer">Volunteer</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Skills</label>
            <input type="text" className="form-control" name="skills" value={formData.skills} onChange={handleChange} />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Availability</label>
            <input type="text" className="form-control" name="availability" value={formData.availability} onChange={handleChange} />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary fw-semibold shadow-sm">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicantForm;
