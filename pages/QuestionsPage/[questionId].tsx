import {
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import AddAnswerForm from "../../Components/AddAnswerForm";
import PopUp from "../../Components/PopUp";
import UpVoteDownVote from "../../Components/UpVoteDownVote";
import InitialsAvatar from "react-initials-avatar";
import "react-initials-avatar/lib/ReactInitialsAvatar.css";
import { useSession } from "next-auth/react";

// this is the question details pages

const Question = (props: any) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [voted, setVoted] = useState(false);
  const router = useRouter();
  const { data } = useSession();
  const { questionId } = router.query;
  return (
    <>
      <Grid
        style={{
          margin: "0 auto",
          maxWidth: "1000px",
        }}
      >
        <Row>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "45px",
                fontWeight: "regular",
                marginLeft: "20px",
                marginTop: "10px",
                color: "black",
              }}
            >
              {props.questionData.content}
            </p>
          </div>
        </Row>

        <Row>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 100,
                }}
              >
                Asked at {" " + " "}
              </span>
              {props.questionData.createdAt}
            </p>
          </div>
        </Row>
        <Button
          style={{
            width: 100,
          }}
          variant="contained"
          onClick={() => setOpenPopUp(true)}
        >
          Add an Answer
        </Button>
        <List style={{ width: "100%" }}>
          {props.answerData.map((answer: any) => (
            <ListItem
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                boxShadow: " 0px 0px 2px #000000",
                borderRadius: "10px",
                marginTop: 20,
                backgroundColor: "#F5F5F5",
              }}
              key={answer.id}
            >
              <ListItemAvatar
                style={{
                  marginRight: "20px",
                }}
              >
                <InitialsAvatar name={answer.userEmail} />
              </ListItemAvatar>
              <ListItemText
                primary={answer.content}
                secondary={answer.createdAt}
              ></ListItemText>
              <UpVoteDownVote
                answerId={answer.id}
                UpVotes={answer.UpVotes}
                DownVotes={answer.DownVotes}
                questionId={questionId}
                userEmail={data?.user?.email}
                voted={voted}
                setVoted={setVoted}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
      <PopUp
        title="Answer Form"
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
      >
        <AddAnswerForm
          questionId={questionId}
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
        />
      </PopUp>
    </>
  );
};

export async function getServerSideProps(ctx: any) {
  const question = await fetch(
    `http://localhost:3000/api/question/${ctx.query.questionId}`
  );
  const questionData = await question.json();

  const answers = await fetch(
    `http://localhost:3000/api/answer/question/${ctx.query.questionId}`
  );
  const answerData = await answers.json();

  return {
    props: {
      questionData,
      answerData,
    },
  };
}

export default Question;
