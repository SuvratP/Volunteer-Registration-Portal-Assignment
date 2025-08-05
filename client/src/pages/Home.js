import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">
      <div className="p-5 bg-white rounded shadow" style={{ maxWidth: '700px', width: '90%' }}>
        <h1 className="display-4 mb-3 text-primary fw-bold">Welcome to Intern & Volunteer Portal</h1>
        <p className="lead text-muted">
          Register now to join our growing community of interns and volunteers. Help us make a difference while gaining real-world experience!
        </p>

        <div className="mt-4 d-flex justify-content-center gap-3">
          <Link to="/apply" className="btn btn-primary btn-lg px-4 shadow">
            Apply Now
          </Link>
          <Link to="/admin" className="btn btn-outline-secondary btn-lg px-4 shadow">
            Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
