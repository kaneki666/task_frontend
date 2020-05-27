import React, { useState, useEffect } from "react";
import { Row, Col, CardImg, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaCartPlus } from "react-icons/fa";
import RingLoader from "react-spinners/RingLoader";
import { useDispatch } from "react-redux";

import { addBasket } from "../actions/addAction";
import Navbar from "./Navbar";

const Products = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get_data = async () => {
      const response = await fetch(
        `https://taskbackend098.herokuapp.com/products`
      );
      const json = await response.json();
      setData(json);
      setLoading(false);
    };
    get_data();
  }, []);

  if (data) {
    return (
      <div className="box">
        <Navbar />
        <Row>
          {data &&
            data.map((item) => (
              <Col sm={{ size: 3 }} className="card" key={item._id}>
                <CardImg
                  width="100%"
                  src={item.productimages[0].url}
                  alt="Card image cap"
                />
                <h4 className="card-title">{item.name}</h4>
                <div>
                  <h6 className="price">${item.price}</h6>
                  <IconContext.Provider
                    value={{ color: "black", className: "global-class-name" }}
                  >
                    <Button
                      color="link"
                      onClick={() => dispatch(addBasket(item))}
                    >
                      <FaCartPlus />
                    </Button>
                  </IconContext.Provider>
                </div>
                <Link
                  className="detailslink"
                  to={{
                    pathname: "/details",
                    state: { item: item },
                  }}
                >
                  SEE DETAILS
                </Link>
              </Col>
            ))}
        </Row>
      </div>
    );
  } else {
    return (
      <div className="loader">
        <RingLoader
          lassName="ringloader"
          size={200}
          color={"black"}
          loading={loading}
        />
      </div>
    );
  }
};

export default Products;
