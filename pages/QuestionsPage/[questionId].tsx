import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { Row } from "react-bootstrap";

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
              boxShadow: "0px 0px 1px #000000",
              marginTop: 20,
              backgroundColor: "#F5F5F5",
            }}
            key={answer.id}
          >
            <ListItemText
              primary={">>  " + answer.content}
              secondary={answer.createdAt}
            ></ListItemText>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export async function getServerSideProps(ctx: any) {
  const question = await fetch(
    `http://localhost:3000/api/Questions/${ctx.query.questionId}`
  );
  const questionData = await question.json();

  const answers = await fetch(
    `http://localhost:3000/api/Answers/${ctx.query.questionId}`
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
