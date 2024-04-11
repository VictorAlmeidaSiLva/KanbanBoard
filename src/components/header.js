import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div className="bg-gradient-to-b from-green-400 to-blue-600 p-4 text-white text-center flex-shrink-0 font-sans">
      <h1 className="text-xl flex items-center justify-center">
        <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
        Kanban Board
      </h1>
    </div>
  );
}

export default Header;
