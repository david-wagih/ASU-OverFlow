import { Button, List, ListItem, ListItemText } from "@mui/material";
import React from "react";

const adminPage = (props: any) => {
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
        {props.allRequestsJson.map((request: any) => {
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
                onClick={async () => {
                  await fetch("http://localhost:3000/api/user/requests", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      id: request.id,
                      status: "accepted",
                    }),
                  });
                  await fetch(
                    `http://localhost:3000/api/user/${request.userEmail}`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        hasPrivilege: true,
                      }),
                    }
                  );
                  window.location.reload();
                }}
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
                onClick={async () => {
                  await fetch("http://localhost:3000/api/user/requests", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      id: request.id,
                      status: "rejected",
                    }),
                  });
                  window.location.reload();
                }}
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
        {props.allUsersJson.map((user: any) => {
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
                onClick={async () => {
                  await fetch("http://localhost:3000/api/admin", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      userEmail: user.email,
                      isRestricted: false,
                    }),
                  });
                  window.location.reload();
                }}
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
                onClick={async () => {
                  await fetch("http://localhost:3000/api/admin", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      userEmail: user.email,
                      isRestricted: true,
                    }),
                  });
                  window.location.reload();
                }}
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
  const allRequests = await fetch("http://localhost:3000/api/user/requests", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const allRequestsJson = await allRequests.json();

  const allUsers = await fetch("http://localhost:3000/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const allUsersJson = await allUsers.json();
  return {
    props: {
      allRequestsJson,
      allUsersJson,
    },
  };
}

export default adminPage;
