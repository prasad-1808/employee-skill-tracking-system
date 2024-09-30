import React, { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegCircleUser } from "react-icons/fa6";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  let [formData, setFormData] = useState({
    userid: "",
    name: "",
    mobileNo: "",
    age: "",
    monthlyRevenue: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/users/${userId}`);
        setUser(response.data);
        setFormData(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      formData.monthlyRevenue = parseFloat(formData.monthlyRevenue);
      formData.age = parseInt(formData.age);
      await api.put(`/users/${userId}`, formData);
      toast.success("Profile updated successfully");
      setEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container-fluid profile p-4" style={{ marginTop: "7rem" }}>
      <h2 className="text-center mb-4 text-white">User Profile</h2>
      <div className="card">
        <div className="card-body">
          {editing ? (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobileNo">Mobile No:</label>
                <input
                  type="text"
                  id="mobileNo"
                  name="mobileNo"
                  autoComplete="off"
                  className="form-control"
                  value={formData.mobileNo}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="form-control"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="monthlyRevenue">Monthly Revenue:</label>
                <input
                  type="number"
                  id="monthlyRevenue"
                  name="monthlyRevenue"
                  className="form-control"
                  value={formData.monthlyRevenue}
                  onChange={handleChange}
                />
              </div>
              <center>
                <button className="btn btn-primary mt-3" onClick={handleSave}>
                  Save
                </button>
              </center>
            </div>
          ) : (
            <div>
              <center>
                <FaRegCircleUser className="profile-pic-icon" />
              </center>
              <div className="card-body rounded">
                <table className="table table-bordered rounded">
                  <tbody>
                    <tr>
                      <td className="fw-bold">UserID</td>
                      <td>{user.userid}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Name</td>
                      <td>{user.name}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Mobile No</td>
                      <td>{user.mobileNo}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Age</td>
                      <td>{user.age}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Monthly Revenue</td>
                      <td>${user.monthlyRevenue.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <center>
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              </center>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
