import React from "react";
import { Card, Form } from "react-bootstrap";
import { useParams } from "react-router";
import fakeData from "../FakeData/FakeData";
import '../Destination/Destination.css'
// import '../GoogleMap/GoogleMap'
const Destination = () => {
  const { name } = useParams();
  const found = fakeData.find((element) => element.name === name);

  const { image } = found;
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 text-left ">
          <Card className="card">
            <Card.Body>
              <span className="fromTo"><b>Pick From</b></span>
              <br />
              <Form.Group>
                <Form.Control type="text" placeholder="Mirpur-1" required />
              </Form.Group>
              <br />
              <span className="fromTo"><b>Pick TO</b></span>
              <br />
              <Form.Group>
                <Form.Control type="text" placeholder="Dhanmondi" required />
              </Form.Group>
              <br />
              <button className="searchBtn btn-primary btn-block text-center">
                Search
              </button>
            </Card.Body>
            <img src={image} alt="" />
          </Card>
        </div>
        {/* <div className="col-md-8">{<Map></Map>}</div> */}
      </div>
    </div>
  );
};

export default Destination;
