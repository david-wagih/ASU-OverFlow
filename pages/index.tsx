/* eslint-disable @next/next/no-img-element */
import { FormControl, TextField, Button } from "@mui/material";
import { width } from "@mui/system";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

// needed to be implemented to send an the message as an email to davidwagih62@gmail.com

const handleMessageInput = (value: any) => {
  window.open(`mailto:davidwagih62@gmail.com?subject=&body=${value}`);
};

const Home: NextPage = () => {
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  const { status } = useSession();

  return (
    <Container className="d-flex flex-column mt-5">
      <Row
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Col className="xs={9}">
          <div style={{ justifyContent: "center" }}>
            <h1 style={{ lineHeight: "1.5" }}>
              We Have built for you {<br />}ASU-OverFlow {<br />}using these
              Technologies...
            </h1>
          </div>
        </Col>
        <Col className="xs={3}">
          <img
            style={{ marginRight: 20 }}
            width="140"
            height="140"
            src="https://seeklogo.com/images/N/next-js-logo-8FCFF51DD2-seeklogo.com.png"
            alt="Next JS Logo"
          />
          <img
            style={{ marginRight: 20 }}
            width="140"
            height="140"
            src="http://assets.stickpng.com/images/584815fdcef1014c0b5e497a.png"
            alt="PostgreSQL Logo"
          />
          <img
            width="180"
            height="120"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png"
            alt="Node Logo"
          />
          <img
            width="180"
            height="140"
            src="https://static.cdnlogo.com/logos/p/25/prisma.svg"
            alt="Prisma Logo"
          />
        </Col>
      </Row>

      {status === "authenticated" ? (
        <>
          <Row className="mt-5" style={{ marginTop: "auto", width: 500 }}>
            <h3
              style={{ fontSize: "1.5rem", fontWeight: 200, marginBottom: 20 }}
            >
              Contact US
            </h3>
            <FormControl>
              <TextField
                id="outlined-basic"
                label="Enter your message"
                variant="outlined"
                multiline
                value={value}
                onChange={handleChange}
              />
              <Button
                style={{ marginTop: 20, width: 100 }}
                variant="contained"
                type="submit"
                onClick={() => handleMessageInput(value)}
              >
                Send
              </Button>
            </FormControl>
          </Row>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Home;
