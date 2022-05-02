import { Button, Icon } from "@mui/material";
import { green, red } from "@mui/material/colors";
import React, { useState } from "react";

// todo: 1- adding votes should be limited to be one Upvote for each question
// todo: 2- sorting the list of answer according to the Total Votes Value

const UpVoteDownVote = (props: any) => {
  const { TotalVotes, answerId } = props;
  console.log(TotalVotes);

  const handleAddingVote = async () => {
    try {
      const updatedVotes = await fetch(
        `http://localhost:3000/api/answer/${answerId}/votes`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            TotalVotes: TotalVotes + 1,
          }),
        }
      );
      const updatedVotesData = await updatedVotes.json();
      console.log(updatedVotesData);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const handleRemovingVote = async () => {
    try {
      const updatedVotes = await fetch(
        `http://localhost:3000/api/answer/${answerId}/votes`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            TotalVotes: TotalVotes - 1,
          }),
        }
      );
      const updatedVotesData = await updatedVotes.json();
      console.log(updatedVotesData);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p
        style={{
          fontSize: "30px",
          fontWeight: 400,
          marginRight: "50px",
          marginTop: "10px",
        }}
      >
        {TotalVotes}
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
          <Icon sx={{ color: green[500], marginBottom: "5px" }}>
            add_circle
          </Icon>
        </Button>
        <Button onClick={handleRemovingVote}>
          <Icon sx={{ color: red[500] }}>remove_circle</Icon>
        </Button>
      </div>
    </div>
  );
};

// here we solved the problem of variables values gone after reloading using this custom hook
//const [counter, setCounter] = useLocalStorage("counter", 0);
// Hook
// function useLocalStorage(key: string, initialValue: number) {
// State to store our value
// Pass initial state function to useState so logic is only executed once
//   const [storedValue, setStoredValue] = useState(() => {
//     if (typeof window === "undefined") {
//       return initialValue;
//     }
//     try {
// Get from local storage by key
//       const item = window.localStorage.getItem(key);
// Parse stored json or if none return initialValue
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
// If error also return initialValue
//       console.log(error);
//       return initialValue;
//     }
//   });
// Return a wrapped version of useState's setter function that ...
// ... persists the new value to localStorage.
//   const setValue = (value: (arg0: any) => any) => {
//     try {
// Allow value to be a function so we have same API as useState
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;
// Save state
//       setStoredValue(valueToStore);
// Save to local storage
//       if (typeof window !== "undefined") {
//         window.localStorage.setItem(key, JSON.stringify(valueToStore));
//       }
//     } catch (error) {
// A more advanced implementation would handle the error case
//       console.log(error);
//     }
//   };
//   return [storedValue, setValue];
//}
export default UpVoteDownVote;
