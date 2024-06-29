import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { fetchPost, fetchGet } from "../../apis/fetch";

const AddPerson = () => {
  const [role, setRole] = useState("EMPLOYEE");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [grievanceTypeId, setGrievanceTypeId] = useState(null);
  const [grievanceTypes, setGrievanceTypes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const roleapi = localStorage.getItem("role").toLowerCase();
  const navigate = useNavigate();

  const roles = [
    { label: "HR", value: "HR" },
    { label: "Employee", value: "EMPLOYEE" },
  ];

  useEffect(() => {
    const getGrievanceTypes = async () => {
      try {
        const result = await fetchGet(`${roleapi}/getAllGrievanceType`, localStorage.getItem("token"));
        if (result.success) {
          setGrievanceTypes(result.data.map(type => ({ label: type.name, value: type._id })));
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Failed to fetch grievance types.");
      }
    };

    if (role === "HR") {
      getGrievanceTypes();
    }
  }, [role, roleapi]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!fullname || !email || (role === "HR" && !grievanceTypeId)) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }

    try {
      console.log(grievanceTypeId);
      const result = await fetchPost(
        `${roleapi}/addEmployeeAndHr`,
        localStorage.getItem("token"),
        JSON.stringify({
          role,
          fullname,
          email,
          grievanceTypeId: role === "HR" ? grievanceTypeId : null,
        })
      );

      if (result.success) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Person added successfully",
          life: 3000,
        });
        setFullName("");
        setEmail("");
        setGrievanceTypeId(null);
      } else {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: result.message,
          life: 3000,
        });
        setError(result.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-full px-80">
      <Toast ref={toast} />
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select Role
          </label>
          <Dropdown
            id="role"
            value={role}
            onChange={(e) => setRole(e.value)}
            options={roles}
            placeholder="Select a role"
            className="w-full"
          />
        </div>

        <div>
          <label
            htmlFor="fullname"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Full Name
          </label>
          <InputText
            id="fullname"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
            className="w-full"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full"
          />
        </div>

        {role === "HR" && (
          <div>
            <label
              htmlFor="grievanceType"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Grievance Type
            </label>
            <Dropdown
              id="grievanceType"
              value={grievanceTypeId}
              onChange={(e) => setGrievanceTypeId(e.value)}
              options={grievanceTypes}
              placeholder="Select a grievance type"
              className="w-full"
            />
          </div>
        )}

        <Button
          type="submit"
          label={loading ? "Submitting..." : "Submit"}
          className="w-full"
          disabled={loading}
        />
        {error && <div className="text-red-600 text-center">{error}</div>}
      </form>
    </div>
  );
};

export default AddPerson;
