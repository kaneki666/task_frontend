import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  CardImg,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { MdDeleteForever } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { IconContext } from "react-icons";
import axios from "axios";

import { deleteBasket } from "../actions/deleteAction";
import { addBasket } from "../actions/addAction";
import { deleteItems } from "../actions/deleteItems";

import Navbar from "./Navbar";

const Cart = () => {
  const states = useSelector((state) => state.basketState);
  const dispatch = useDispatch();

  let [products, setProducts] = useState(states.products);
  const [cartupdate, setCartupdate] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  let price;

  useEffect(
    (e) => {
      setProducts(states.products);
      setCartupdate(false);
    },
    [cartupdate]
  );

  const total_price = products.reduce((gettotal, item) => {
    let val = Number(item.price) * item.qty;
    price = val += gettotal;
    return price;
  }, 0);
  const Order = {
    products: products,
    totalprice: total_price,
    time: new Date(),
  };

  const handleOrder = (e) => {
    e.preventDefault();
    toggle();
    axios
      .post("https://taskbackend098.herokuapp.com/order", {
        data: Order,
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (products != "") {
    return (
      <div className="box">
        <Navbar />
        <Col>
          {products &&
            products.map((item, index) => (
              <Row className="productsmargin" key={item._id}>
                <Col sm={{ size: 4 }}>
                  <CardImg
                    className="cartimage"
                    src={item.productimages[2].url}
                    alt="Card image cap"
                  />
                </Col>
                <Col className="center" sm={{ size: 2 }}>
                  <h4>{item.name}</h4>
                </Col>
                <Col className="center" sm={{ size: 2 }}>
                  <h6>${item.price}</h6>
                </Col>
                <Col className="center" sm={{ size: 2 }}>
                  <IconContext.Provider
                    value={{
                      color: "red",
                      className: "global-class-name",
                      size: "1em",
                    }}
                  >
                    <FiMinusCircle
                      onClick={() => {
                        if (products !== undefined) {
                          products = products.forEach((pro, ind) => {
                            if (index === ind && item.qty > 1) {
                              item.qty = item.qty - 1;
                              dispatch(deleteBasket(item));
                              setCartupdate(true);

                              return pro;
                            }
                          });
                        }
                      }}
                    />
                  </IconContext.Provider>
                  <h6>0{item.qty}</h6>
                  <IconContext.Provider
                    value={{
                      color: "green",
                      className: "global-class-name",
                      size: "1em",
                    }}
                  >
                    <FiPlusCircle onClick={() => dispatch(addBasket(item))} />
                  </IconContext.Provider>
                </Col>

                <Col className="center" sm={{ size: 2 }}>
                  <IconContext.Provider
                    value={{
                      color: "red",
                      className: "global-class-name",
                      size: "2em",
                    }}
                  >
                    <Button
                      color="link"
                      onClick={() => {
                        dispatch(deleteItems(item));
                        setCartupdate(true);
                      }}
                    >
                      <MdDeleteForever />
                    </Button>
                  </IconContext.Provider>
                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                    <ModalBody>
                      Your order has been placed succesfully.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" onClick={toggle}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                </Col>
              </Row>
            ))}
        </Col>
        <Col>
          <Row className="productsmargin">
            <Col className="center" sm={{ size: 3, offset: 1 }}>
              <h2>Total Price</h2>
            </Col>
            <Col className="center" sm={{ size: 3, offset: 1 }}>
              <h2>${total_price.toFixed(2)}</h2>
            </Col>
            <Col className="center" sm={{ size: 3, offset: 1 }}>
              <IconContext.Provider
                value={{
                  color: "black",
                  className: "global-class-name",
                  size: "3em",
                }}
              >
                <Button outline color="primary" onClick={handleOrder}>
                  <RiMoneyDollarCircleLine /> BUY NOW
                </Button>
              </IconContext.Provider>
            </Col>
          </Row>
        </Col>
      </div>
    );
  } else {
    return (
      <div className="box">
        <Navbar />
        <div className="emptycart">
          <h2>YOUR CART IS EMPTY</h2>
        </div>
      </div>
    );
  }
};

export default Cart;
