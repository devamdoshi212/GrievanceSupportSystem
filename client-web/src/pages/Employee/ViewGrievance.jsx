import React, { useState, useEffect } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { fetchGet } from "../../apis/fetch";
import Loading from "../../components/Loading";

const ViewGrievance = () => {
  const [hrData, setHrData] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role").toLowerCase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHRData = async () => {
      try {
        setLoading(true);
        const response = await fetchGet(
          `${role}/getHrWithGrievance`,
          localStorage.getItem("token")
        );
        if (response.success) {
          setHrData(response.data.hr);
          console.log(response.data.hr);
          setLoading(false);
        } else {
          console.error("Failed to fetch HR data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching HR data:", error.message);
      }
    };

    fetchHRData();
  }, [role]);

  const handleViewAllGrievances = (hrId) => {
    navigate(`/admin/allgrievance/${hrId}`);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto px-16 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Accordion>
          {hrData.map((hr) => (
            <AccordionTab
              key={hr._id}
              header={
                <>
                  <span className="text-lg font-semibold text-gray-800">
                    {hr.grievanceTypeId.name}
                  </span>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex-1">
                      <span className="text-lg font-semibold text-gray-800">
                        HR {hr.fullname}
                      </span>
                      <div className="text-sm text-gray-600">
                        Pending: {hr.pending} | Resolved: {hr.resolved} |
                        Rejected: {hr.rejected}
                      </div>
                    </div>
                    <div>
                      <Button
                        label="View All Grievances"
                        onClick={() =>
                          handleViewAllGrievances(hr.grievanceTypeId._id)
                        }
                        className="p-button-secondary"
                      />
                    </div>
                  </div>
                </>
              }
            >
              <div className="px-4 py-2">
                <h4 className="text-lg font-semibold mb-4">
                  Last 3 Grievances:
                </h4>
                <ul className="divide-y divide-gray-300">
                  {hr.grievances.map((grievance) => (
                    <li key={grievance.id} className="py-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-semibold min-w-52">
                            {grievance.userId.fullname}
                          </span>
                          <span className="text-gray-600 ml-2">
                            {grievance.description}
                          </span>
                        </div>
                        <div className="text-gray-600 text-sm">
                          {grievance.createdAt}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionTab>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ViewGrievance;
