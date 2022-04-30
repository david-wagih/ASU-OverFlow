import { Button, Icon } from "@mui/material";
import { green, red } from "@mui/material/colors";
import React, { useState } from "react";

const UpVoteDownVote = () => {
  // todo: there is here the problem of when refreshing the counter value is reseted back to 0
  const [counter, setCounter] = useState(0);

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

export default UpVoteDownVote;
