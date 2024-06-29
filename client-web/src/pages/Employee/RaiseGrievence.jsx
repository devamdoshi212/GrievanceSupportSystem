import React, { useState, useEffect, useRef } from "react";
import { fetchPost, fetchGet, fetchUpload } from "../../apis/fetch";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

function GrievanceForm() {
  const [grievanceTypes, setGrievanceTypes] = useState([]);
  const [grievanceType, setGrievanceType] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useRef(null);

  const role = localStorage.getItem("role").toLowerCase();

  useEffect(() => {
    const fetchGrievanceTypes = async () => {
      try {
        const result = await fetchGet(
          `${role}/getAllGrievanceType`,
          localStorage.getItem("token")
        );
        if (result.success) {
          setGrievanceTypes(
            result.data.map((type) => ({ label: type.name, value: type._id }))
          );
        } else {
          setError(result.message);
        }
      } catch (error) {
        console.error("Error fetching grievance types:", error);
        setError("Failed to fetch grievance types.");
      }
    };

    fetchGrievanceTypes();
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("grievanceId", grievanceType);
      formData.append("description", description);
      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      const result = await fetchUpload(
        `${role}/addGrievance`,
        localStorage.getItem("token"),
        formData
      );

      setLoading(false);
      if (result.success) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Grievance raised successfully",
          life: 3000,
        });
        setError("");
        setGrievanceType("");
        setDescription("");
        setAttachments([]);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          Grievance Form
        </a>
              <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-2xl xl:max-w-4xl">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Submit a Grievance
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="grievanceType"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select Grievance Type
                </label>
                <Dropdown
                  id="grievanceType"
                  value={grievanceType}
                  onChange={(e) => setGrievanceType(e.value)}
                  options={grievanceTypes}
                  placeholder="Select a grievance type"
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="attachments"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Attachments
                </label>
                <input
                  id="attachments"
                  type="file"
                  multiple
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-0 focus:border-blue-300"
                  aria-describedby="attachments_help"
                  onChange={(e) => setAttachments(Array.from(e.target.files))}
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full md:w-auto text-white bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
              {error && <div className="text-red-600 text-center">{error}</div>}
            </form>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </section>
  );
}

export default GrievanceForm;
