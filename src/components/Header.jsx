import React from "react";
import PhotoProfile from "../assets/ic_default.jpg";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div
        className="flex items-center justify-between h-20 px-10"
        style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
      >
        <div>
          <h1 className="text-2xl">{}</h1>
        </div>
        <div className="flex items-center space-x-6 ">
          <div className="flex flex-col">
            <h1>{user && user.firstName}</h1>
          </div>
          <img
            src={user && user.url}
            alt="Foto Profil"
            className="w-12 h-12 rounded-full"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
