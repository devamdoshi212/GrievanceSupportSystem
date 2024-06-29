import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const ViewGrievance = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role').toLowerCase();


  const handleViewAllGrievances = (hrId) => {
    navigate(`/viewAllGrievances/${hrId}`);
  };

  return (
    <div className="container mx-auto px-16 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Accordion>
          {hrData.map((hr) => (
            <AccordionTab
              key={hr.id}
              header={
                <div className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <span className="text-lg font-semibold text-gray-800">{hr.name}</span>
                    <div className="text-sm text-gray-600">
                      Pending: {hr.pendingCount} | Resolved: {hr.resolvedCount} | Rejected: {hr.rejectedCount}
                    </div>
                  </div>
                  <div>
                    <Button
                      label="View All Grievances"
                      onClick={() => handleViewAllGrievances(hr.id)}
                      className="p-button-secondary"
                    />
                  </div>
                </div>
              }
            >
              <div className="px-4 py-2">
                <h4 className="text-lg font-semibold mb-4">Last 3 Grievances:</h4>
                <ul className="divide-y divide-gray-300">
                  {hr.lastThreeGrievances.map((grievance) => (
                    <li key={grievance.id} className="py-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-semibold min-w-52">{grievance.employeeName}</span>
                          <span className="text-gray-600 ml-2">{grievance.grievanceTypeName}</span>
                        </div>
                        <div className="text-gray-600 text-sm">{grievance.createdDate}</div>
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
