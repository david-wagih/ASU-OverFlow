import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Row } from "react-bootstrap";
import UpVoteDownVote from "../../Components/UpVoteDownVote";

// this is the question details pages

const Question = (props: any) => {
  return (
    <Grid>
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
      <List style={{ width: "100%" }}>
        {props.answerData.map((answer: any) => (
          <ListItem
            style={{
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "0px 0px 1px #000000",
              marginTop: 20,
              backgroundColor: "#F5F5F5",
            }}
            key={answer.id}
          >
            <ListItemAvatar>
              <Avatar
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "20px",
                  marginTop: "10px",
                }}
                // this src should be the avatar of the user who answered the question
                src="https://i.imgur.com/7jHX3Yb.png"
              />
            </ListItemAvatar>
            <ListItemText
              primary={answer.content}
              secondary={answer.createdAt}
            ></ListItemText>
            <UpVoteDownVote />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export async function getServerSideProps(ctx: any) {
  const question = await fetch(
    `http://localhost:3000/api/questions/${ctx.query.questionId}`
  );
  const questionData = await question.json();

  const answers = await fetch(
    `http://localhost:3000/api/answers/${ctx.query.questionId}`
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
