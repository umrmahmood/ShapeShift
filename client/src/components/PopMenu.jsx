// PopoverMenu
import React from "react";

const PopoverMenu = ({ menuType, isOpen }) => {
  let menuContent;

  switch (menuType) {
    case "myProfilePop":
      menuContent = (
        <div className={`popover-menu ${isOpen ? "open" : "closed"}`}>
          {/* Content for cartPop menu */}
          <ul>
            <li>Profile</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </div>
      );
      break;
    case "cartPop":
      menuContent = <div></div>;
      break;
    case "languagePop":
      menuContent = <div></div>;
      break;
    case "shopPop":
      menuContent = <div></div>;
      break;
    case "notificationPop":
      menuContent = <div></div>;
      break;
    case "profileInfoPop":
      menuContent = <div></div>;
      break;
    default:
      menuContent = null;
  }
  return menuContent;
};

export default PopoverMenu;
