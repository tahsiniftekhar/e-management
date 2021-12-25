import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Events = () => {
  const [event, setEvent] = useState({
    name: "",
    location: "",
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleInputChange = (e) => {
    const newData = { ...event };
    newData[e.target.name] = e.target.value;
    setEvent(newData);
  };

  const handleSubmitEvent = async () => {
    const date = moment(selectedDate).format("YYYY-MM-DD hh:mm:ss");
    const eventData = { ...event, date };
    const response = await fetch(`/api/events`, {
      method: "POST",
      body: JSON.stringify(eventData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    const newData = {...event, message: data.message}
    setEvent(newData);
    setShow(true);
  };

  return (
    <div className="centerItems">
        {console.log(event)}
      <Card style={{ width: "80rem" }}>
        <Card.Header as="h5" className="py-3">
          Event
          <Card.Subtitle className="mt-2 text-muted">
            Create an event! - <Link href="/">Back</Link>
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          {show ? (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
              {event.message}
            </Alert>
          ) : null}
          <Form className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={event.name}
              onChange={handleInputChange}
              placeholder="event name.."
            />
            <Row className="g-2 mt-3">
              <Col md>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={event.location}
                  onChange={handleInputChange}
                  placeholder="ex: Dhaka"
                />
              </Col>
              <Col md>
                <Form.Label>Date</Form.Label>
                <DatePicker
                  className="form-control"
                  selected={selectedDate}
                  showTimeSelect
                  dateFormat="Pp"
                  onChange={(date) => setSelectedDate(date)}
                />
              </Col>
            </Row>
          </Form>
        </Card.Body>

        <Card.Footer className="d-flex justify-content-end py-3">
          <Button type="submit" variant="primary" onClick={handleSubmitEvent}>
            Create
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Events;
