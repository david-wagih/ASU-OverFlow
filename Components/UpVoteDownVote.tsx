import { Button, Icon } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// todo: 1- need to limit the voting for each user for specifically one vote either up or down
// todo: 2- need to change the GUI to save the Upvotes in one box and the down votes in another box to give clear indication of the vote

const UpVoteDownVote = (props: any) => {
  const { UpVotes, DownVotes, answerId, questionId, userEmail } = props;

  const handleAddingVote = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/answer/${answerId}/votes/check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail,
            answerId,
            questionId,
          }),
        }
      );
      const response = await res.json();
      if (!response) {
        const createVote = await fetch(
          `http://localhost:3000/api/answer/${answerId}/votes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: userEmail,
              answerId: Number(answerId),
              questionId: Number(questionId),
              upVoted: true,
              downVoted: false,
            }),
          }
        );
        const createVoteData = await createVote.json();
        console.log(createVoteData);
      } else {
        const updateVote = await fetch(
          `http://localhost:3000/api/answer/${answerId}/votes`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: userEmail,
              answerId: Number(answerId),
              questionId: Number(questionId),
              upVoted: true,
              downVoted: false,
            }),
          }
        );
        const updateVoteData = await updateVote.json();
        console.log(updateVoteData);
      }
      const addUpVote = await fetch(
        `http://localhost:3000/api/answer/${answerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UpVotes: UpVotes + 1,
            DownVotes: DownVotes,
          }),
        }
      );
      const addUpVoteJson = await addUpVote.json();
      window.location.reload();
      console.log(addUpVoteJson);
    } catch (e) {
      console.log(e);
    }
  };
  const handleRemovingVote = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/answer/${answerId}/votes/check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail,
            answerId,
            questionId,
          }),
        }
      );
      const response = await res.json();
      if (!response) {
        const createVote = await fetch(
          `http://localhost:3000/api/answer/${answerId}/votes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: userEmail,
              answerId: Number(answerId),
              questionId: Number(questionId),
              upVoted: false,
              downVoted: true,
            }),
          }
        );
        const createVoteData = await createVote.json();
        console.log(createVoteData);
      } else {
        const updateVote = await fetch(
          `http://localhost:3000/api/answer/${answerId}/votes`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: userEmail,
              answerId: Number(answerId),
              questionId: Number(questionId),
              upVoted: false,
              downVoted: true,
            }),
          }
        );
      }
      const addDownVote = await fetch(
        `http://localhost:3000/api/answer/${answerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UpVotes: UpVotes,
            DownVotes: DownVotes + 1,
          }),
        }
      );
      const addDownVoteJson = await addDownVote.json();
      window.location.reload();
      console.log(addDownVoteJson);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "green",
          marginRight: "1rem",
          padding: "1rem",
        }}
      >
        [{UpVotes}]
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginRight: "20px",
        }}
      >
        <Button onClick={handleAddingVote}>
          <KeyboardArrowUpIcon color="success" />
        </Button>
        <Button onClick={handleRemovingVote}>
          <KeyboardArrowDownIcon color="error" />
        </Button>
      </div>
      <p
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#FF0000",
          marginRight: "1rem",
        }}
      >
        [{DownVotes}]
      </p>
    </div>
  );
};

export default UpVoteDownVote;

// // here we solved the problem of variables values gone after reloading using this custom hook
// //Hook
// function useLocalStorage(key: string, initialValue: Boolean) {
//   //State to store our value
//   //Pass initial state function to useState so logic is only executed once
//   const [storedValue, setStoredValue] = useState(() => {
//     if (typeof window === "undefined") {
//       return initialValue;
//     }
//     try {
//       //Get from local storage by key
//       const item = window.localStorage.getItem(key);
//       //Parse stored json or if none return initialValue
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       //If error also return initialValue
//       console.log(error);
//       return initialValue;
//     }
//   });
//   //Return a wrapped version of useState's setter function that ...
//   //... persists the new value to localStorage.
//   const setValue = (value: (arg0: any) => any) => {
//     try {
//       //Allow value to be a function so we have same API as useState
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;
//       //Save state
//       setStoredValue(valueToStore);
//       //Save to local storage
//       if (typeof window !== "undefined") {
//         window.localStorage.setItem(key, JSON.stringify(valueToStore));
//       }
//     } catch (error) {
//       //A more advanced implementation would handle the error case
//       console.log(error);
//     }
//   };
//   return [storedValue, setValue];
//}
