import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGet, fetchPost } from "../../apis/fetch";
import { FaChartColumn } from "react-icons/fa6";
import Datatable from "../../components/Datatable";
import { Column } from "primereact/column";
import Loading from "../../components/Loading";

const headerStyle = {
  backgroundColor: "#002865",
  color: "white",
  textAlign: "center",
};

const cellStyle = {
  border: "1px solid #dddddd",
  textAlign: "left",
  padding: "8px",
  width: "fit-content",
};

const ViewAllGrievance = () => {
  const [grievances, setGrievances] = useState([]);
  const role = localStorage.getItem("role").toLowerCase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const actionComponent = (
    <Column
      header="Action"
      key={"Action"}
      headerStyle={headerStyle}
      bodyStyle={cellStyle}
      body={(data) => {
        return (
          <div className="flex justify-evenly">
            <FaChartColumn
              onClick={() => {
                navigate("/employee/allgrievance/view/" + data.id);
              }}
              className="text-darkBlue"
            />
          </div>
        );
      }}
    />
  );

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        setLoading(true);
        const result = await fetchGet(
          `${role}/getGrievance`,
          localStorage.getItem("token"),
        );
        if (result.success) {
          const formattedGrievances = result.data.map(
            (grievance) => ({
              id: grievance._id,
              description: grievance.description,
              status: grievance.status,
              createdAt: new Date(grievance.createdAt).toLocaleString(),
            })
          );
          setGrievances(formattedGrievances);
          setLoading(false);
        } else {
          console.error("Failed to fetch grievances");
        }
      } catch (error) {
        console.error("Error fetching grievances:", error.message);
      }
    };

    fetchGrievances();
  }, []);

  const columns = [
    { field: "description", header: "Description" },
    { field: "status", header: "Status" },
    { field: "createdAt", header: "Created At" },
  ];

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto px-16 py-8">  
      <Datatable
        data={grievances}
        array={columns}
        extraComponent={actionComponent}
      />
    </div>
  );
};

export default ViewAllGrievance;
