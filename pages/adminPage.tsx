import { Button, List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect } from "react";
import { InferGetServerSidePropsType } from "next";
import {
  getAllUsers,
  getAllUsersRequests,
  updateUserAccess,
  updateUserRequest
} from "../services/adminServices";
import styles from "./adminPage.module.css";

const adminPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [AllUsers, setAllUsers] = React.useState([]);
  const [AllRequests, setAllRequests] = React.useState([]);
  useEffect(() => {
    const getAllUsersMethod = async () => {
      const res = await getAllUsers();
      console.log(res);
      setAllUsers(res);
    };
    getAllUsersMethod();
  }, []);
  useEffect(() => {
    const getAllRequestsMethod = async () => {
      const res = await getAllUsersRequests();
      console.log(res);
      setAllRequests(res);
    };
    getAllRequestsMethod();
  }, []);

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
      <h1 className={styles.title}>
        All Pending Requests for Answering Privilege
      </h1>
      <ul className={styles.list}>
        {AllRequests.length > 0 &&
          AllRequests.map((request: any) => {
            return (
              <li className={styles.listItem} key={request.id}>
                <div className={styles.listItemContent}>
                  <p>{request.userEmail}</p>
                  <p>{request.status}</p>
                </div>
                <div className={styles.listItemActions}>
                  <button
                    className={styles.acceptButton}
                    onClick={() =>
                      handleRequestButton(request.id, "accepted", request.email)
                    }
                  >
                    Accept
                  </button>
                  <button
                    className={styles.rejectButton}
                    onClick={() =>
                      handleRequestButton(request.id, "rejected", request.email)
                    }
                  >
                    Reject
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
      <h1 className={styles.title}>All Users</h1>
      <ul className={styles.list}>
        {AllUsers.length > 0 &&
          AllUsers.map((user: any) => {
            return (
              <li className={styles.listItem} key={user.id}>
                <div className={styles.listItemContent}>
                  <p>{user.email}</p>
                  <p>{user.isRestricted ? "is Restricted" : "normal User"}</p>
                </div>
                <div className={styles.listItemActions}>
                  <button
                    className={styles.giveAccessButton}
                    onClick={() => handleAccessButton(user.email, false)}
                  >
                    Give Access
                  </button>
                  <button
                    className={styles.restrictAccessButton}
                    onClick={() => handleAccessButton(user.email, true)}
                  >
                    Restrict Access
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
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
        allUsers
      }
    };
  } catch (e) {
    return {
      props: {
        allRequests: [],
        allUsers: []
      }
    };
  }
}

export default adminPage;
