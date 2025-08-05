import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col } from 'react-bootstrap';

const AdminView = () => {
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    fetchApplicants();
  }, []);

  useEffect(() => {
    filterApplicants();
  }, [searchTerm, roleFilter, applicants]);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/applicants');
      setApplicants(res.data);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };

  const filterApplicants = () => {
    let filtered = applicants;

    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.name?.toLowerCase().includes(lower) ||
          a.email?.toLowerCase().includes(lower)
      );
    }

    if (roleFilter) {
      filtered = filtered.filter((a) => a.role === roleFilter);
    }

    setFilteredApplicants(filtered);
  };

  const uniqueRoles = [...new Set(applicants.map((a) => a.role).filter(Boolean))];

  return (
    <div className="container py-5">
      <h2 className="text-center text-success fw-bold mb-4">Admin Dashboard</h2>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {filteredApplicants.length > 0 ? (
        <div className="table-responsive shadow rounded bg-white p-4">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Skills</th>
                <th>Availability</th>
                <th>Applied On</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {filteredApplicants.map((applicant, index) => (
                <tr key={applicant._id}>
                  <td>{index + 1}</td>
                  <td>{applicant.name}</td>
                  <td>{applicant.email}</td>
                  <td>{applicant.phone}</td>
                  <td>{applicant.role}</td>
                  <td>{applicant.skills || '—'}</td>
                  <td>{applicant.availability || '—'}</td>
                  <td>{new Date(applicant.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info text-center">No applicants found.</div>
      )}
    </div>
  );
};

export default AdminView;
