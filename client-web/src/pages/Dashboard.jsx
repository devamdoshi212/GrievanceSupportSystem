/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { fetchGet } from "../apis/fetch";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

import { PrimeIcons } from "primereact/api";
import CountCard from "../components/Dashboard/CountCard";

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
    if (result.success) {
      let data = {
        ADMIN: [
          {
            label: "Institutes",
            count: result.data.instituteCount,
            iconClass: (
              <i className={PrimeIcons.BUILDING} style={{ fontSize: "25px" }} />
            ),
          },
        ],
        HR: [
          {
            label: "Departments",
            count: result.data.departmentCount,
            iconClass: (
              <i
                className={PrimeIcons.BUILDING}
                style={{ fontSize: "25px" }}
              ></i>
            ),
          },
          {
            label: "Teachers",
            count: result.data.teacherCount,
            iconClass: (
              <i className={PrimeIcons.USERS} style={{ fontSize: "25px" }}></i>
            ),
          },
          {
            label: "Subjects",
            count: result.data.subjectCount,
            iconClass: (
              <i className={PrimeIcons.BOOK} style={{ fontSize: "25px" }}></i>
            ),
          },
        ],
        EMPLOYEE: [
          {
            label: "Students",
            count: result.data.students,
            iconClass: (
              <i
                className={PrimeIcons.USER_GRADUATE}
                style={{ fontSize: "25px" }}
              ></i>
            ),
          },
        ],
      };
      setCount(data);
    } else {
      navigate("/");
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading && <Loading />}
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
      {count && <div>{count.instituteCount}</div>}
    </>
  );
}

export default Dashboard;
