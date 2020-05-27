import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { TiHome, TiShoppingCart } from "react-icons/ti";
import { Badge } from "reactstrap";
import { useSelector } from "react-redux";

const Navbar = () => {
  const st = useSelector((state) => state.basketState);

  return (
    <div className="navroot">
      <div>
        <Link
          to={{
            pathname: "/",
          }}
        >
          <IconContext.Provider
            value={{
              color: "black",
              className: "global-class-name",
              size: "3em",
            }}
          >
            <TiHome />
          </IconContext.Provider>
        </Link>
      </div>
      <div>
        <Link
          to={{
            pathname: "/cart",
          }}
        >
          <IconContext.Provider
            value={{
              color: "black",
              className: "global-class-name",
              size: "3em",
            }}
          >
            <TiShoppingCart />
            <Badge color="danger">{st.basketNumbers}</Badge>
          </IconContext.Provider>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
