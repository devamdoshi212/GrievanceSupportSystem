import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import SideBarLink from "../components/SidebarLink";
import { Outlet } from "react-router-dom";
import { PrimeIcons } from "primereact/api";
import { Toast } from "primereact/toast";

function Home() {
  const toast = useRef(null);
  const [sideBar, setSideBar] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const sideBarLinks = useMemo(() => {
    return {
      ADMIN: [
        {
          to: "/admin",
          iconClass: PrimeIcons.HOME,
          name: "Dashboard",
        },
        {
          to: "/admin/hr",
          iconClass: PrimeIcons.USER,
          name: "Add Person",
        },
        {
          to: "/admin/grievance",
          iconClass: PrimeIcons.USER,
          name: "Add Grievance",
        },
        {
          to: "/admin/allgrievance",
          iconClass: PrimeIcons.USER,
          name: "View Grievance",
        },
        {
          to: "/",
          iconClass: PrimeIcons.SIGN_OUT,
          name: "Logout",
        },
      ],
      HR: [
        {
          to: "/hr",
          iconClass: PrimeIcons.HOME,
          name: "Dashboard",
        },
        {
          to: "/hr/allgrievance",
          iconClass: PrimeIcons.USER,
          name: "View Grievance",
        },
        {
          to: "/",
          iconClass: PrimeIcons.SIGN_OUT,
          name: "Logout",
        },
      ],
      EMPLOYEE: [
        {
          to: "/",
          iconClass: PrimeIcons.HOME,
          name: "Dashboard",
        },
        {
          to: "/employee/grievance",
          iconClass: PrimeIcons.HOME,
          name: "Raise Grievances",
        },
        {
          to: "/employee/allgrievance",
          iconClass: PrimeIcons.HOME,
          name: "View Grievances",
        },
        {
          to: "/",
          iconClass: PrimeIcons.SIGN_OUT,
          name: "Logout",
        },
      ],
    };
  }, []);

  const toggleSidebar = (value) => {
    setSideBar(value);
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <Header />
      <div className="w-full h-full overflow-x-hidden">
        <div className="flex flex-row h-[90vh] w-full overflow-x-hidden">
          <div
            className="absolute md:static top-15 left-0 md:top-auto h-screen md:h-full overflow-y-auto transition-all z-20 shadow-xl"
            style={{ left: sideBar ? 0 : -300, minWidth: 224 }}
          >
            {localStorage.getItem("role") &&
              sideBarLinks[localStorage.getItem("role")].map((ele) => (
                <SideBarLink
                  to={ele.to}
                  name={ele.name}
                  iconClass={ele.iconClass}
                  key={ele.name}
                  end={ele.end}
                  toggleSidebarClick={
                    width < 768
                      ? () => {
                          toggleSidebar(false);
                        }
                      : undefined
                  }
                />
              ))}
          </div>
          <div
            className={
              "overflow-y-auto w-full h-full p-2 pl-48 md:p-7 pb-20 md:pb-5"
            }
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
