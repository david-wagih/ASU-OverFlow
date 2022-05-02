import { Button, Icon } from "@mui/material";
import { green, red } from "@mui/material/colors";
import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const UpVoteDownVote = (props: any) => {
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  const { TotalVotes, answerId } = props;

  const handleAddingVote = async () => {
    try {
      if (upVoted === false) {
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
        setUpVoted(true);
        console.log(updatedVotesData);
        window.location.reload();
      } else {
        console.log("already voted");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleRemovingVote = async () => {
    try {
      if (downVoted === false) {
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
        setDownVoted(true);
        console.log(updatedVotesData);
        window.location.reload();
      } else {
        console.log("already voted");
      }
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
        <p
          style={{
            fontSize: "20px",
            fontWeight: 400,
          }}
        >
          {TotalVotes}
        </p>
        <Button onClick={handleRemovingVote}>
          <KeyboardArrowDownIcon color="error" />
        </Button>
      </div>
    </div>
  );
};

// here we solved the problem of variables values gone after reloading using this custom hook
//Hook
function useLocalStorage(key: string, initialValue: Boolean) {
  //State to store our value
  //Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      //Get from local storage by key
      const item = window.localStorage.getItem(key);
      //Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      //If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  //Return a wrapped version of useState's setter function that ...
  //... persists the new value to localStorage.
  const setValue = (value: (arg0: any) => any) => {
    try {
      //Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      //Save state
      setStoredValue(valueToStore);
      //Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      //A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
export default UpVoteDownVote;
