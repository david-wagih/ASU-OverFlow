import { Button, Icon } from "@mui/material";
import { green, red } from "@mui/material/colors";
import React, { useState } from "react";

// todo : needs to limit that for user to only be able to vote once
const UpVoteDownVote = () => {
  // here we solved the problem of variables values gone after reloading using this custom hook
  const [counter, setCounter] = useLocalStorage("counter", 0);

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
        {counter}
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
        <Button onClick={() => setCounter(counter + 1)}>
          <Icon sx={{ color: green[500], marginBottom: "5px" }}>
            add_circle
          </Icon>
        </Button>
        <Button onClick={() => setCounter(counter - 1)}>
          <Icon sx={{ color: red[500] }}>remove_circle</Icon>
        </Button>
      </div>
    </div>
  );
};

// Hook
function useLocalStorage(key: string, initialValue: number) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: (arg0: any) => any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
export default UpVoteDownVote;
