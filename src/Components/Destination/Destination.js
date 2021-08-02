import React from "react";
import { Card, Form } from "react-bootstrap";
import { Map } from "react-bootstrap-icons";
import { useParams } from "react-router";
import fakeData from "../FakeData/FakeData";
import '../GoogleMap/GoogleMap'
const Destination = () => {
  const { name } = useParams();
  const found = fakeData.find((element) => element.name === name);

  const { image } = found;
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 text-left">
          <Card>
            <Card.Body>
              <span className="fromTo">Pick From</span>
              <Form.Group>
                <Form.Control type="text" placeholder="Mirpur-1" required />
              </Form.Group>
              <span className="fromTo">Pick TO</span>
              <Form.Group>
                <Form.Control type="text" placeholder="Dhanmondi" required />
              </Form.Group>
              <button className="searchBtn">
                Search
              </button>
            </Card.Body>
            <img src={image} alt="" />
          </Card>
        </div>
        <div className="col-md-8">{<Map></Map>}</div>
      </div>
    </div>
  );
};

export default Destination;
