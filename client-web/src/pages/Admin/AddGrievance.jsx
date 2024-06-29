import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { fetchPost } from "../../apis/fetch";

const AddGrievance = () => {
  const [grievanceName, setGrievanceName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const role = localStorage.getItem("role").toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!grievanceName) {
      setError("Grievance name is required.");
      setLoading(false);
      return;
    }

    try {
      const result = await fetchPost(
        `${role}/addGrievanceType`,
        localStorage.getItem("token"),
        JSON.stringify({
          name: grievanceName,
        })
      );

      if (result.success) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Grievance type added successfully",
          life: 3000,
        });
        setGrievanceName("");
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
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
            htmlFor="grievanceName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name of Grievance
          </label>
          <InputText
            id="grievanceName"
            value={grievanceName}
            onChange={(e) => setGrievanceName(e.target.value)}
            placeholder="Enter name of grievance"
            className="w-full"
          />
        </div>

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

export default AddGrievance;
