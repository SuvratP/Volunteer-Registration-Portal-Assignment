import React, { useEffect, useState } from 'react';
import ApplicantList from '../components/ApplicantList';
import { Container, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'animate.css';
  

const Admin = () => {
  const navigate = useNavigate();
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/admin-login");
    } else {
      fetchTotalApplicants();
    }
  }, [navigate]);

  const fetchTotalApplicants = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/applicants"); // Adjust your backend URL if needed
      setTotalApplicants(response.data.length);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading applications...</p>
        </div>
      ) : (
        <Card className="text-center mb-4 animate__animated animate__fadeIn">
          <Card.Body>
            <h4>Total Applications Received:</h4>
            <h2 className="text-primary">{totalApplicants}</h2>
          </Card.Body>
        </Card>
      )}

      <ApplicantList />
    </Container>
  );
};

export default Admin;
