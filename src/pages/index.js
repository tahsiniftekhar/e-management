import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form, Pagination, Stack, Table } from "react-bootstrap";

const Events = () => {
  const [isLoading, setLoading] = useState(true);
  const [eventData, setEventData] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [size, page]);

  const fetchEvents = async () => {
    const response = await fetch(`/api/events?page=${page}&size=${size}`);
    const data = await response.json();

    setEventData(data);
    setLoading(false);
  };

  const handleSizeChange = async (e) => {
    const value = Number(e.target.value);
    setSize(value);
    console.log(size);
  };

  const handlePageChange = async (index) => {
    const value = Number(index);
    setPage(value);
    console.log(size);
  };

  const handleDelete = async (eventId) => {
    const response = await fetch(`/api/events/${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMessage(data.message);
    fetchEvents();
    setShow(true);
  };

  if (isLoading) {
    return <h2>Loading</h2>;
  }

  return (
    <div className="centerItems">
      <Card style={{ width: "80rem" }}>
        <Card.Header as="h5" className="py-3">
          Event
          <Card.Subtitle className="mt-2 text-muted">
            List of events! - <Link href="/create">Create</Link>
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          {show ? (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
              {message}
            </Alert>
          ) : null}
          <div>
            <Stack direction="horizontal" gap={2}>
              Show{" "}
              <Form.Select
                style={{ width: "70px" }}
                onChange={handleSizeChange}
                value={size}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </Form.Select>{" "}
              entries
            </Stack>
          </div>
          <Table responsive hover>
            <thead>
              <tr>
                <th className="pt-4">NAME</th>
                <th className="pt-4">LOCATION</th>
                <th className="pt-4">TIME</th>
                <th className="pt-4">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {eventData.events?.map((event) => (
                <tr key={event.id}>
                  <td className="py-2">{event.name} </td>
                  <td className="py-2">{event.location} </td>
                  <td className="py-2">
                    {moment(event.date).format("ll - h:mm a")}{" "}
                  </td>
                  <td className="py-2">
                    <Link type="button" className="warning" href={`edit/${event.id}`}>Edit</Link>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      className="py-0 ms-2"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>

        <Card.Footer>
          <Stack direction="horizontal">
            <p className="mb-0">
              Showing 1 to{" "}
              {size > eventData.totalItems ? eventData.totalItems : size} of{" "}
              {eventData.totalItems}
            </p>
            <Pagination className="ms-auto mb-0 py-1">
            <Pagination.Item onClick={() => handlePageChange(eventData.currentPage-1)}> {"<"} Previous</Pagination.Item>
              {Array.from({ length: eventData.totalPages }).map((_, index) => (
                <Pagination.Item
                  key={index}
                  onClick={() => handlePageChange(index)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Item onClick={() => handlePageChange(eventData.currentPage+1)}>Next {">"} </Pagination.Item>
            </Pagination>
          </Stack>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Events;
