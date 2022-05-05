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
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditQuestionForm from "../../Components/EditQuestionForm";

// this is the question details pages

const Question = (props: any) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const router = useRouter();
  const { data } = useSession();
  const { questionId } = router.query;
  const [openQuestionPopUp, setOpenQuestionPopUp] = useState(false);

  // todo : those functions for handling updating and deleting questions
  const handleDeleteQuestion = async () => {
    const deleteQuestion = await fetch(
      `http://localhost:3000/api/question/${questionId}`,
      {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: questionId,
        }),
      }
    );
    const deleteQuestionJSON = await deleteQuestion.json();
    console.log(deleteQuestionJSON);
    router.push("/QuestionsPage");
  };
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Button onClick={() => setOpenQuestionPopUp(true)}>
            <EditIcon color="success" />
          </Button>
          <Button onClick={handleDeleteQuestion}>
            <DeleteForeverIcon color="error" />
          </Button>
        </div>
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
      <PopUp
        title="Edit Question"
        openPopUp={openQuestionPopUp}
        setOpenPopUp={setOpenQuestionPopUp}
      >
        <EditQuestionForm
          questionId={questionId}
          openPopUp={openQuestionPopUp}
          setOpenPopUp={setOpenQuestionPopUp}
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
