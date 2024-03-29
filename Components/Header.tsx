/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { adminEmails } from "../utils/adminEmails";

const Header = () => {
  const { data, status } = useSession();
  console.log(data, status);

  const handleSignIn = async () => {
    await signIn("github", {
      callbackUrl: "https://asu-over-flow.vercel.app/",
    });
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "https://asu-over-flow.vercel.app/",
    });
  };

  return (
    <Navbar
      style={{
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
      }}
      bg="light"
      variant="light"
    >
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>ASU-OverFlow</Navbar.Brand>
        </Link>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            {status === "authenticated" ? (
              <>
                {data.user?.image && data.user.name ? (
                  <img
                    src={data.user.image}
                    alt={data.user.name}
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                  />
                ) : null}
                {adminEmails.includes(String(data.user?.email)) ? (
                  <Nav.Link as="div">
                    <Link href="/adminPage" passHref>
                      <Button variant="outline-warning">Admin Page</Button>
                    </Link>
                  </Nav.Link>
                ) : null}
                <Nav.Link as="div">
                  <Link href="/QuestionsPage" passHref>
                    <Button variant="outline-success">Browse Questions</Button>
                  </Link>
                </Nav.Link>
                <Nav.Link as="div">
                  <Link href="/ProfilePage" passHref>
                    <Button variant="outline-primary">My Profile</Button>
                  </Link>
                </Nav.Link>
                <Nav.Link as="div">
                  <Button variant="outline-danger" onClick={handleLogout}>
                    Log out
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as="div">
                <Button variant="outline-primary" onClick={handleSignIn}>
                  Sign In
                </Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
