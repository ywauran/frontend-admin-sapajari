import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe, LogOut, reset } from "../features/authSlice";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { AiOutlineUser, AiFillBook } from "react-icons/ai";
import { FiFolder } from "react-icons/fi";
import { SiGoogleclassroom } from "react-icons/si";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const Logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const menus = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: MdOutlineDashboard,
      isAdmin: true,
    },
    { name: "Data Nomor", link: "/data-numbers", icon: GiTeacher },
    { name: "Data Huruf", link: "/data-letters", icon: FiFolder },
    {
      name: "Data Kategori Tantangan",
      link: "/data-category-challenge",
      icon: FiFolder,
    },
    { name: "Data Tantangan", link: "/data-challenges", icon: FiFolder },
  ];
  const [open, setOpen] = useState(true);
  const [openModalLogout, setOpenModalLogout] = useState(false);
  return (
    <div className="flex overflow-y-hidden">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="flex justify-end py-3">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="flex flex-col justify-between h-[90%]">
          <div className="relative flex flex-col gap-4 mt-4">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute z-50 left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
          </div>
          <button
            onClick={() => setOpenModalLogout(true)}
            className="text-sm  gap-3.5 font-medium p-2 bg-gray-800 rounded-md"
          >
            Keluar
          </button>
        </div>
      </div>
      <div className="w-full overflow-x-hidden font-semibold text-gray-900">
        <Header />
        <div className="w-full h-full bg-[#F5F5F9] p-4">
          <Routes></Routes>
        </div>
      </div>

      {/* Modal Logout */}
      <div
        id="modalLogout"
        tabIndex="-1"
        aria-hidden="true"
        className={`flex items-center fixed top-0 left-0 right-0 z-50 ${
          openModalLogout ? "block" : "hidden"
        } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}
      >
        <div className="relative flex items-center justify-center w-full h-max">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-center p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
                Keluar
              </h3>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-center text-gray-500 dark:text-gray-400">
                Anda yakin ingin keluar ?
              </p>
            </div>

            <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="defaultModal"
                type="button"
                className="w-24 button__primary"
                onClick={() => Logout()}
              >
                Ya
              </button>
              <button
                data-modal-hide="defaultModal"
                type="button"
                onClick={() => setOpenModalLogout(false)}
                className="w-24 button__warn"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
