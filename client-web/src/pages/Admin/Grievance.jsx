import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { fetchPost } from "../../apis/fetch";
import Loading from '../../components/Loading'

const GrievanceDetail = () => {
  const { id } = useParams();
  const role = localStorage.getItem("role").toLowerCase();
  const navigate = useNavigate();
  const [chatVisible, setChatVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [grievance,setGrievance] = useState({});
  const [messages, setMessages] = useState([
    { sender: "HR", content: "We have received your grievance." },
    { sender: "Employee", content: "Thank you for the update." },
  ]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchHRData = async () => {
      try {
        setLoading(true);
        const response = await fetchPost(
          `${role}/getGrievanceById`,
          localStorage.getItem("token"),
            JSON.stringify({
                grievanceId: id
            })
        );
        if (response.success) {
          setLoading(false);
            setGrievance(response.data.grievance[0]);
        } else {
          console.error("Failed to fetch HR data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching HR data:", error.message);
      }
    };

    fetchHRData();
  }, [role]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, { sender: "You", content: message }]);
      setMessage("");
    }
  };


if(loading){
  return <Loading />
}

  return (
    <div className="w-full h-full px-40 md:px-80">
      <div className="flex justify-between items-center mb-4">
        <Button
          label="Go Back"
          icon="pi pi-arrow-left"
          onClick={() => navigate(-1)}
          className="p-button-text transition-transform transform hover:scale-105 hover:bg-gray-200"
        />
        <Button
          label="Discussion"
          icon="pi pi-comments"
          onClick={() => setChatVisible(true)}
          className="p-button-outlined p-button-secondary transition-transform transform hover:scale-105 hover:bg-gray-200"
        />
      </div>
      <Card>

        <h1 className="text-xl font-bold mb-2">{grievance.userId.fullname}</h1>
        <h2 className="text-xl font-bold mb-2">{grievance.type}</h2>
        <div className="mb-4">
          <strong>Issue Date:</strong>{" "}
          {new Date(grievance.createdAt).toLocaleDateString()}
        </div>
        <div className="mb-4">
          <strong>Description:</strong> {grievance.description}
        </div>
        <div className="mb-4">
          <strong>Status:</strong> {grievance.status}
        </div>
        {grievance.attachments && grievance.attachments.length > 0 && (
          <Accordion>
            {grievance.attachments.map((attachment, index) => (
              <AccordionTab key={index} header={`Attachment ${index + 1}`}>
                <img
                  src={attachment.public_url}
                  alt={`Attachment ${index + 1}`}
                  className="w-full h-auto transition-transform transform hover:scale-105"
                />
              </AccordionTab>
            ))}
          </Accordion>
        )}
      </Card>
      <Dialog
        header="Discussion"
        visible={chatVisible}
        style={{ width: "50vw" }}
        onHide={() => setChatVisible(false)}
      >
        <div className="p-4 flex flex-col h-96">
          <div className="flex-grow overflow-y-auto mb-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-2 ${
                  msg.sender === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    msg.sender === "You"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <strong>{msg.sender}: </strong>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex">
            <InputTextarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={1}
              placeholder="Enter your message here..."
              className="flex-grow mr-2"
            />
            <Button
              label="Send"
              icon="pi pi-send"
              onClick={handleSendMessage}
              className="flex-none"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default GrievanceDetail;
