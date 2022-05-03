import { Button, Icon } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const UpVoteDownVote = (props: any) => {
  const { UpVotes, DownVotes, answerId, questionId, userEmail } = props;

  // todo: 1- need to limit the voting for each user for specifically one vote either up or down
  // todo: 2- need to change the GUI to save the Upvotes in one box and the down votes in another box to give clear indication of the vote
  const handleAddingVote = async () => {
    try {
      // check if user has voted on that answer before or not

      try {
        const hasVoted = await fetch(
          `http://localhost:3000/api/answer/${answerId}/votes/check`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: userEmail,
              questionId: questionId,
              answerId: answerId,
            }),
          }
        );
        if (hasVoted.status === 200) {
          alert("You have already voted on this answer");
        } else if (hasVoted.status === 400) {
          // add new vote then
          const addVote = await fetch(
            `http://localhost:3000/api/answer/${answerId}/votes`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userEmail: userEmail,
                questionId: questionId,
                answerId: answerId,
                upVoted: true,
                downVoted: false,
              }),
            }
          );
          const addVoteData = await addVote.json();
          console.log(addVoteData);

          // update the votes in the database
          const updateAnswerUpVotes = await fetch(
            `http://localhost:3000/api/answer/${answerId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                answerId,
                UpVotes: UpVotes + 1,
                DownVotes: DownVotes,
              }),
            }
          );
          const updateAnswerUpVotesData = await updateAnswerUpVotes.json();
          console.log(updateAnswerUpVotesData);
        }
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleRemovingVote = async () => {
    try {
      // check if user has voted on that answer before or not
    } catch (e) {}
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
        {UpVotes}
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
        {DownVotes}
      </p>
    </div>
  );
};

export default UpVoteDownVote;
