/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { fetchGet } from "../apis/fetch";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

import { PrimeIcons } from "primereact/api";
import CountCard from "../components/Dashboard/CountCard";
import ChartComponent from "../components/Dashboard/Charts";

function Dashboard() {
  const role = localStorage.getItem("role").toLowerCase();
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const getData = async () => {
    const result = await fetchGet(
      role + "/dashboard",
      localStorage.getItem("token")
    );
    console.log(result);
    if (result.success) {
      let data = {
        ADMIN: [
          {
            label: "Resolved Grievance",
            count: result.data.resolvedCount,
            iconClass: (
              <i className={PrimeIcons.BUILDING} style={{ fontSize: "25px" }} />
            ),
          },
          {
            label: "Penging Grievance",
            count: result.data.pendingCount,
            iconClass: (
              <i className={PrimeIcons.BUILDING} style={{ fontSize: "25px" }} />
            ),
          },
          {
            label: "Rejected Grievance",
            count: result.data.rejectedCount,
            iconClass: (
              <i className={PrimeIcons.BUILDING} style={{ fontSize: "25px" }} />
            ),
          },
        ],
        HR: [
          {
            label: "Resolved Grievance",
            count: result.data.resolvedCount,
            iconClass: (
              <i className={PrimeIcons.BUILDING} style={{ fontSize: "25px" }} />
            ),
          },
          {
            label: "Pending Grievance",
            count: result.data.pendingCount,
            iconClass: (
              <i className={PrimeIcons.BUILDING} style={{ fontSize: "25px" }} />
            ),
          },
          {
            label: "Rejected Grievance",
            count: result.data.rejectedCount,
            iconClass: (
              <i className={PrimeIcons.BUILDING} style={{ fontSize: "25px" }} />
            ),
          },
        ],
        EMPLOYEE: [
          {
            label: "Resolved Grievance",
            count: result.data.resolvedCount,
            iconClass: (
              <i className={PrimeIcons.BUILDING} style={{ fontSize: "25px" }} />
            ),
          },
          {
            label: "Pending Grievance",
            count: result.data.pendingCount,
            iconClass: (
              <i className={PrimeIcons.BUILDING} style={{ fontSize: "25px" }} />
            ),
          },
          {
            label: "Rejected Grievance",
            count: result.data.rejectedCount,
            iconClass: (
              <i className={PrimeIcons.BUILDING} style={{ fontSize: "25px" }} />
            ),
          },
        ],
      };
      setCount(data);
      console.log(count);
    } else {
      navigate("/");
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    <Loading />;
  }
  return (
    <>
      <div className="text-4xl px-10 font-bold py-1">Dashboard</div>

      <div className="flex overflow-hidden flex-wrap justify-evenly">
        {count &&
          count[localStorage.getItem("role")].map((ele, ind) => {
            return (
              <CountCard
                key={ind}
                label={ele.label}
                iconClass={ele.iconClass}
                count={ele.count}
              />
            );
          })}
      </div>
      {!loading && <ChartComponent data={count} />}
    </>
  );
}

export default Dashboard;
