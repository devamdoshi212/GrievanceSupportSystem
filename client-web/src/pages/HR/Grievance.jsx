import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { fetchPost } from "../../apis/fetch";
import Loading from "../../components/Loading";

const GrievanceDetail = () => {
  const { id } = useParams();
  const role = localStorage.getItem("role").toLowerCase();
  const navigate = useNavigate();
  const [chatVisible, setChatVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [grievance, setGrievance] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHRData = async () => {
      try {
        setLoading(true);
        const response = await fetchPost(
          `${role}/getGrievanceById`,
          localStorage.getItem("token"),
          JSON.stringify({
            grievanceId: id,
          })
        );
        if (response.success) {
          setLoading(false);
          setMessages(response.data.grievance[0].discussion);
          setGrievance(response.data.grievance[0]);
        } else {
          console.error("Failed to fetch HR data:", response.message);
        }
      } catch (error) {
        console.error("Error fetching HR data:", error.message);
      }
    };

    fetchHRData();
  }, [role]);

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      setMessages([
        ...messages,
        {
          label: localStorage.getItem("role").toUpperCase(),
          message: message,
        },
      ]);
      await fetchPost(
        `${role}/discussion`,
        localStorage.getItem("token"),
        JSON.stringify({
          grievanceId: id,
          message: message,
        })
      );
      setMessage("");
    }
  };
  const handleReject = async () => {
    try {
      setLoading(true);
      const response = await fetchPost(
        `${role}/grievanceRejected`,
        localStorage.getItem("token"),
        JSON.stringify({
          id: id,
        })
      );
      if (response.success) {
        setLoading(false);
        setGrievance({ ...grievance, status: "rejected" });
      } else {
        console.error("Failed to update grievance status:", response.message);
      }
    } catch (error) {
      console.error("Error updating grievance status:", error.message);
    }
  };

  if (loading) {
    return <Loading />;
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
        {grievance.status === "resolved" && (
          <div className="mb-4">
            <strong>Resolved Date:</strong>{" "}
            {new Date(grievance.updatedAt).toLocaleDateString()}
          </div>
        )}
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

        {grievance.status === "pending" && (
          <button
            className="w-full mt-5 bg-red-700 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-600"
            onClick={() => handleReject()}
          >
            Reject
          </button>
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
                  msg.label === localStorage.getItem("role").toUpperCase()
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    msg.label === localStorage.getItem("role").toUpperCase()
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <strong>{msg.label}: </strong>
                  {msg.message}
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
