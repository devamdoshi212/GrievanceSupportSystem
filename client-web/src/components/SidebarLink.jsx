/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { classNames } from "primereact/utils";

function SideBarLink({
  name,
  iconClass,
  to,
  end = true,
  toggleSidebarClick = () => {},
}) {
  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <>
      {name === "Logout" ? (
        <NavLink
          to={to}
          end={end}
          onClick={handleLogout}
          draggable={false}
          className={(props) =>
            classNames(
              "select-none w-full h-16 flex flex-row items-center ps-5 font-semibold text-xl cursor-pointer transition-all",
              {
                "bg-blue-500 text-white": props.isActive, 
                "text-black hover:bg-white hover:text-darkBlue":
                  !props.isActive,
              }
            )
          }
        >
          <i
            className={`pi ${iconClass} me-2`}
            style={{ fontSize: "1.5rem" }}
          ></i>
          <div>{name}</div>
        </NavLink>
      ) : (
        <NavLink
          to={to}
          end={end}
          onClick={toggleSidebarClick}
          draggable={false}
          className={(props) =>
            classNames(
              "select-none w-full h-16 flex flex-row items-center ps-5 font-semibold text-xl cursor-pointer transition-all",
              {
                "bg-blue-500 text-white": props.isActive, 
                "bg-white text-black": props.isActive,
                "text-black hover:bg-white hover:text-black": !props.isActive,
              }
            )
          }
        >
          <i
            className={`pi ${iconClass} me-2`}
            style={{ fontSize: "1.5rem" }}
          ></i>
          <div>{name}</div>
        </NavLink>
      )}
    </>
  );
}

export default SideBarLink;
