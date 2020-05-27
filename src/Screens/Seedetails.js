import React from "react";
import { Row, Col, CardImg, Button } from "reactstrap";
import Rating from "react-rating";
import { IconContext } from "react-icons";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { addBasket } from "../actions/addAction";
import Navbar from "./Navbar";

const Seemore = (props) => {
  const { item } = props.location.state;
  const dispatch = useDispatch();

  return (
    <div className="box">
      <Navbar />
      <Row>
        <Col sm={{ size: 3 }}>
          <h4 className="card-title">{item.name}</h4>
          <div>
            <Rating
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={item.reviews}
              onClick={(e) => e}
              readonly={true}
            />
            <h6 className="price">${item.price}</h6>
          </div>
          <p className="details">{item.details}</p>
          <IconContext.Provider
            value={{
              color: "black",
              className: "global-class-name",
              size: "4em",
            }}
          >
            <div className="cartdetails">
              <Button
                color="link"
                onClick={() => {
                  dispatch(addBasket(item));
                }}
              >
                <FaCartPlus />
              </Button>
            </div>
          </IconContext.Provider>
        </Col>
        <Col>
          <Row>
            {item.productimages.map((urlimg) => (
              <Col
                sm={{ size: 4 }}
                style={{ marginTop: "20px", marginBottom: "15px" }}
              >
                <CardImg width="100%" src={urlimg.url} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Seemore;
