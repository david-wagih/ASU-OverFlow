import { Button, Icon } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const UpVoteDownVote = (props: any) => {
  const { UpVotes, DownVotes, answerId, questionId, userEmail } = props;

  // todo: 1- need to limit the voting for each user for specifically one vote either up or down
  // todo: 2- need to change the GUI to save the Upvotes in one box and the down votes in another box to give clear indication of the vote
  const handleAddingVote = async () => {
    // we need first to check if user has already voted to the answer or not
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
    const hasVotedData = await hasVoted.json();
    console.log(hasVotedData);
    if (hasVotedData.voted === true && hasVotedData.upVoted === true) {
      alert("You have already voted to this answer");
    } else if (hasVotedData.voted === true && hasVotedData.downVoted === true) {
      // here we should handle the case that user pressed up vote after pressing down vote before
      const updateUserVote = await fetch(
        `http://localhost:3000/api/answer/${answerId}/votes`,
        {
          method: "PUT",
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
      const updateUserVoteData = await updateUserVote.json();
      console.log(updateUserVoteData);
      const updateVote = await fetch(
        `http://localhost:3000/api/answer/${answerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answerId: answerId,
            UpVotes: UpVotes + 1,
            DownVotes: DownVotes - 1,
          }),
        }
      );
      const updateVoteData = await updateVote.json();
      console.log(updateVoteData);
      window.location.reload();
    } else {
      // user will vote for the first time for this answer
      // voted variable is false i mean

      const newVote = await fetch(
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
      const newVoteData = await newVote.json();
      console.log(newVoteData);
      // then add this vote to the UpVotes counter of this answer then refresh the page for the change to take place

      const updateVote = await fetch(
        `http://localhost:3000/api/answer/${answerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answerId: answerId,
            UpVotes: UpVotes + 1,
            DownVotes: DownVotes,
          }),
        }
      );
      const updateVoteData = await updateVote.json();
      console.log(updateVoteData);
      window.location.reload();
    }
  };
  const handleRemovingVote = async () => {
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
      const hasVotedData = await hasVoted.json();
      console.log(hasVotedData);
      if (hasVotedData.voted === true && hasVotedData.downVoted === true) {
        alert("You have already voted to this answer");
      } else if (hasVotedData.voted === true && hasVotedData.upVoted === true) {
        // here we should handle the case that user pressed up vote after pressing down vote before
        const updateUserVote = await fetch(
          `http://localhost:3000/api/answer/${answerId}/votes`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: userEmail,
              questionId: questionId,
              answerId: answerId,
              upVoted: false,
              downVoted: true,
            }),
          }
        );
        const updateUserVoteData = await updateUserVote.json();
        console.log(updateUserVoteData);
        const updateVote = await fetch(
          `http://localhost:3000/api/answer/${answerId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              answerId: answerId,
              UpVotes: UpVotes - 1,
              DownVotes: DownVotes + 1,
            }),
          }
        );
        const updateVoteData = await updateVote.json();
        console.log(updateVoteData);
        window.location.reload();
      } else {
        // user will vote for the first time for this answer
        // didn't vote before

        const newVote = await fetch(
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
              upVoted: false,
              downVoted: true,
            }),
          }
        );
        const newVoteData = await newVote.json();
        console.log(newVoteData);
        // then add this vote to the UpVotes counter of this answer then refresh the page for the change to take place

        const updateVote = await fetch(
          `http://localhost:3000/api/answer/${answerId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              answerId: answerId,
              UpVotes: UpVotes,
              DownVotes: DownVotes + 1,
            }),
          }
        );
        const updateVoteData = await updateVote.json();
        console.log(updateVoteData);
        window.location.reload();
      }
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
