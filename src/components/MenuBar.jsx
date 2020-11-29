import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

let setActiveLink;

const MenuBar = (props) => {
  const { user, logout } = useContext(AuthContext);

  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);
  
  setActiveLink = (newPath) => {
    props.history.push('/login');
    setActiveItem(newPath);
  };

  const handleItemClick = (e, { name }) => setActiveItem(name);
  return (
    <Menu pointing secondary size="massive" color="teal">
      {user ? (
        <>
          <Menu.Item name={user.username} onClick={handleItemClick} active={activeItem === user.username} as={Link} to={"/users/"+user.username} />
          <Menu.Item name='main' onClick={handleItemClick} active={activeItem === "home" || activeItem === "main"} as={Link} to="/" />
          <Menu.Item name='subscribes' onClick={handleItemClick} active={activeItem === "subscribes"} as={Link} to="/subscribes" />
          <Menu.Item
          position='right'
            name="logout"
            onClick={logout}
            as={Link}
            to="/login"
          />
        </>
      ) : (
        <>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Menu position="right">
            <Menu.Item
              name="login"
              active={activeItem === "login"}
              onClick={handleItemClick}
              as={Link}
              to="/login"
            />
            <Menu.Item
              name="register"
              active={activeItem === "register"}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            />
          </Menu.Menu>
        </>
      )}
    </Menu>
  );
};

export  {setActiveLink};
export default MenuBar;
