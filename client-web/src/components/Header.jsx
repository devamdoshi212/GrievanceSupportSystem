import { ConfirmDialog } from "primereact/confirmdialog";
import { Menu } from "primereact/menu";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";
import { PrimeIcons } from "primereact/api";

function Header({ toggleSidebar, width }) {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const menuLeft = useRef(null);
  const items = [
    {
      label: localStorage.getItem("role"),
      items: [
        {
          label: "Logout",
          icon: "pi pi-power-off",
          command: () => {
            localStorage.clear();
            navigate("/");
          },
        },
      ],
    },
  ];

  return (
    <div className="w-screen h-[10vh] border-b shadow-lg flex items-center justify-between md:justify-start relative bg-white">
      {width < 768 ? (
        <button
          className="text-3xl text-black font-bold md:mx-5 cursor-pointer"
          onClick={() => toggleSidebar(true)}
        >
          <i className={PrimeIcons.BARS}></i>
        </button>
      ) : (
        <div className="text-3xl text-black font-bold md:mx-5 cursor-pointer">
          Oddo Hackathon
        </div>
      )}
      <div className="absolute right-5 flex items-center">
        <a
          className="flex items-center cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            menuLeft.current.toggle(e);
          }}
        >
          <i className="pi pi-user me-2 md:text-xl"></i>
          <span className="md:block hidden text-gray-800">{username}</span>
        </a>
        <Menu
          model={items}
          popup
          ref={menuLeft}
          id="popup_menu_right"
          popupClassName="bg-white shadow-lg"
        />
      </div>
    </div>
  );
}

export default Header;
