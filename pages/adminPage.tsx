import { Button, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { InferGetServerSidePropsType } from "next";
import {
  getAllUsers,
  getAllUsersRequests,
  updateUserAccess,
  updateUserRequest,
} from "../services/adminServices";

const adminPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const handleRequestButton = async (
    id: number,
    status: string,
    email: string
  ) => {
    const res = await updateUserRequest(id, status, email);
    if (res) {
      window.location.reload();
    }
  };

  const handleAccessButton = async (email: string, isRestricted: boolean) => {
    const res = await updateUserAccess(email, isRestricted);
    if (res) {
      window.location.reload();
    }
  };
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "bold",
          margin: "20px",
        }}
      >
        All Pending Requests for Answering Privilege
      </h1>
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          overflow: "auto",
          padding: "0px",
          margin: "0px",
          border: "none",
          borderRadius: "0px",
        }}
      >
        {props?.allRequests?.map((request: any) => {
          return (
            <ListItem
              style={{
                width: "1000px",
                height: "100%",
                border: " 1px solid black",
                borderRadius: "10px",
                boxShadow: "0px 0px 3px #000000",
                margin: "15px",
              }}
              key={request.id}
            >
              <ListItemText primary={request.userEmail} />
              <ListItemText primary={request.status} />
              <Button
                style={{
                  width: "100px",
                  height: "50px",
                  margin: "10px",
                }}
                variant="contained"
                color="success"
                onClick={() =>
                  handleRequestButton(request.id, "accepted", request.email)
                }
              >
                Accept
              </Button>
              <Button
                style={{
                  width: "100px",
                  height: "50px",
                  margin: "10px",
                }}
                variant="contained"
                color="error"
                onClick={() =>
                  handleRequestButton(request.id, "rejected", request.email)
                }
              >
                Reject
              </Button>
            </ListItem>
          );
        })}
      </List>
      <h1
        style={{
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "bold",
          margin: "20px",
        }}
      >
        All Users
      </h1>
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          overflow: "auto",
          padding: "0px",
          margin: "0px",
          border: "none",
          borderRadius: "0px",
        }}
      >
        {props?.allUsers?.map((user: any) => {
          return (
            <ListItem
              style={{
                width: "1000px",
                height: "100%",
                border: " 1px solid black",
                borderRadius: "10px",
                boxShadow: "0px 0px 3px #000000",
                margin: "15px",
              }}
              key={user.id}
            >
              <ListItemText primary={user.email} />
              <ListItemText
                primary={user.isRestricted ? "is Restricted" : "normal User"}
              />

              <Button
                style={{
                  width: "100px",
                  height: "50px",
                  margin: "10px",
                }}
                variant="contained"
                color="success"
                onClick={() => handleAccessButton(user.email, false)}
              >
                Give Access
              </Button>
              <Button
                style={{
                  width: "100px",
                  height: "50px",
                  margin: "10px",
                }}
                variant="contained"
                color="error"
                onClick={() => handleAccessButton(user.email, true)}
              >
                Restrict Access
              </Button>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export async function getServerSideProps(ctx: any) {
  try {
    const allRequests = await getAllUsersRequests();

    const allUsers = await getAllUsers();
    return {
      props: {
        allRequests,
        allUsers,
      },
    };
  } catch (e) {
    return {
      props: {
        allRequests: [],
        allUsers: [],
      },
    };
  }
}

export default adminPage;
