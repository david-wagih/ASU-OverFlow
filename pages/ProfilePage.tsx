/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Container, Row } from "react-bootstrap";
import { useSession } from "next-auth/react";
import Image from "next/image";

// want to use user data from next-auth
// @ts-ignore
// we here could get all the user data needed from the session

const ProfilePage = () => {
  const { data, status } = useSession();

  return (
    <Container className="d-flex justify-content-center mt-5">
      <div className="d-flex flex-column align-items-center justify-content-space-between">
        <Row>
          <img
            // @ts-ignore
            src={data.user.image}
            // @ts-ignore
            alt={data.user.name}
            width={300}
            height={300}
          />
        </Row>
        <br />
        <Row>
          <p
            className="text-center"
            style={{ fontSize: "1.5rem", fontWeight: "bold" }}
          >
            {status === "authenticated"
              ? //@ts-ignore
                data.user.name
              : "You are not logged in"}
          </p>
        </Row>
        <br />

        <Row>
          <p className="text-center" style={{ fontSize: "1.1rem" }}>
            {status === "authenticated"
              ? //@ts-ignore
                data.user.email
              : "You are not logged in"}
          </p>
        </Row>
      </div>
    </Container>
  );
};

export default ProfilePage;
