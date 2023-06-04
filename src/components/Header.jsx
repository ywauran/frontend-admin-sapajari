import React from "react";
import PhotoProfile from "../assets/ic_default.jpg";

const Header = ({ name, role }) => {
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
            <h1>{name}</h1>
            <p className="font-thin text-right">{role}</p>
          </div>
          <img
            src={PhotoProfile}
            alt="Foto Profil"
            className="rounded-full w-14 h-14"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
