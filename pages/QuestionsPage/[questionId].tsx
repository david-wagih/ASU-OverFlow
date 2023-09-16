import {
  Avatar,
  Button,
  Grid,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import AddAnswerForm from "../../Components/AddAnswerForm";
import PopUp from "../../Components/PopUp";
import UpVoteDownVote from "../../Components/UpVoteDownVote";
import InitialsAvatar from "react-initials-avatar";
import "react-initials-avatar/lib/ReactInitialsAvatar.css";
import { getSession, useSession } from "next-auth/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditQuestionForm from "../../Components/EditQuestionForm";

import { Typography } from "@material-ui/core";
import { InferGetServerSidePropsType } from "next";

// this is the question details pages

const Question = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const router = useRouter();
  const { data } = useSession();
  const { questionId } = router.query;
  const [openQuestionPopUp, setOpenQuestionPopUp] = useState(false);
  const [question, setQuestion] = useState(null);
  const [questionAnswers, setQuestionAnswers] = useState([]);

  useEffect(() => {
    const getQuestion = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/question/${questionId}`
      );
      const question = await res.json();
      setQuestion(question);
    };
    getQuestion();
  }, []);

  useEffect(() => {
    const getQuestionAnswers = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/answer/question/${questionId}`
      );
      const answers = await res.json();
      setQuestionAnswers(answers);
      console.log(answers);
    };
    getQuestionAnswers();
  }, []);

  const handleDeleteQuestion = async () => {
    const deleteQuestion = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/question/${questionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: questionId
        })
      }
    );
    const deleteQuestionJSON = await deleteQuestion.json();
    router.push("/QuestionsPage");
  };

  return (
    <>
      <Grid
        style={{
          margin: "20px"
        }}
      >
        <Row style={{ justifyContent: "center", alignItems: "center" }}>
          <p
            style={{
              fontSize: "28px", // Adjust font size
              fontWeight: "normal",
              marginLeft: "20px",
              marginTop: "10px",
              color: "black"
            }}
          >
            {/* @ts-ignore */}
            {question?.content}
          </p>
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px"
          }}
        >
          <Button
            disabled={
              // @ts-ignore
              question?.userEmail !== data?.user?.email
            }
            onClick={() => setOpenQuestionPopUp(true)}
            style={{
              marginRight: "10px",
              backgroundColor: "transparent", // Make the background transparent
              border: "none" // Remove the button border
            }}
          >
            <EditIcon style={{ color: "green", fontSize: "20px" }} />{" "}
            {/* Adjust icon size */}
          </Button>
          <Button
            disabled={
              // @ts-ignore
              question?.userEmail !== data?.user?.email
            }
            onClick={handleDeleteQuestion}
            style={{
              backgroundColor: "transparent", // Make the background transparent
              border: "none" // Remove the button border
            }}
          >
            <DeleteForeverIcon style={{ color: "red", fontSize: "20px" }} />{" "}
            {/* Adjust icon size */}
          </Button>
        </div>

        <Row style={{ justifyContent: "center", alignItems: "center" }}>
          <p style={{ fontSize: "15px", fontWeight: "lighter" }}>
            {" "}
            {/* Adjust font weight */}
            Asked at {/* @ts-ignore */}
            {question?.createdAt}
          </p>
        </Row>

        <Button
          style={{
            width: "fit-content",
            marginTop: "10px",
            fontSize: "16px", // Adjust font size
            fontWeight: "bold", // Make the font bold
            backgroundColor: "#3f51b5",
            color: "#ffffff",
            padding: "10px 20px",
            textTransform: "uppercase",
            borderRadius: "10px"
          }}
          variant="contained"
          color="primary"
          onClick={() => setOpenPopUp(true)}
          disabled={
            props?.userData?.isRestricted ||
            props?.userData?.hasPrivilege === false
          }
        >
          Add an Answer
        </Button>

        <List style={{ width: "100%" }}>
          {questionAnswers.length > 0 &&
            questionAnswers.map((answer: any) => (
              <ListItem
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  boxShadow: "0px 0px 2px #000000",
                  borderRadius: "10px",
                  marginTop: 20,
                  backgroundColor: answer.isSolution ? "#FFEE00" : "white",
                  padding: "10px" // Add padding for better spacing
                }}
                key={answer.id}
              >
                <ListItemAvatar
                  style={{
                    marginRight: "20px",
                    flex: "none" // Prevent avatar from growing
                  }}
                >
                  <InitialsAvatar name={answer.userEmail} />
                </ListItemAvatar>
                <ListItemText
                  primary={answer.content}
                  secondary={answer.createdAt}
                  style={{
                    flex: "1" // Allow text to grow and fill available space
                  }}
                ></ListItemText>
                <UpVoteDownVote
                  answerId={answer.id}
                  UpVotes={answer.UpVotes}
                  DownVotes={answer.DownVotes}
                  questionId={questionId}
                  userEmail={data?.user?.email}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: "20px",
                    flex: "none" // Prevent button group from growing
                  }}
                >
                  <Button
                    disabled={
                      props?.questionData?.userEmail !== data?.user?.email
                    }
                    onClick={async () => {
                      await fetch(
                        `${process.env.NEXT_PUBLIC_HOST}/api/answer/${answer.id}/solution`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify({
                            answerId: answer.id,
                            isSolution: true
                          })
                        }
                      );
                      window.location.reload();
                    }}
                    variant="contained"
                    style={{
                      marginLeft: "10px", // Adjust spacing between buttons
                      backgroundColor: "#4CAF50", // Green color for "Select as Solution" button
                      color: "#fff", // White text color
                      padding: "5px 10px" // Adjust padding
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold" // Make the text bold
                      }}
                    >
                      Select as Solution
                    </Typography>
                  </Button>
                  <Button
                    disabled={
                      props?.questionData?.userEmail !== data?.user?.email
                    }
                    onClick={async () => {
                      await fetch(
                        `${process.env.NEXT_PUBLIC_HOST}/api/answer/${answer.id}/solution`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify({
                            answerId: answer.id,
                            isSolution: false
                          })
                        }
                      );
                      window.location.reload();
                    }}
                    variant="contained"
                    style={{
                      marginLeft: "10px", // Adjust spacing between buttons
                      backgroundColor: "#F44336", // Red color for "Not a Solution" button
                      color: "#fff", // White text color
                      padding: "5px 10px" // Adjust padding
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold" // Make the text bold
                      }}
                    >
                      Not a Solution
                    </Typography>
                  </Button>
                  <Button
                    style={{
                      marginLeft: "10px", // Adjust spacing between buttons
                      padding: "5px 10px" // Adjust padding
                    }}
                    variant="contained"
                    onClick={() => router.push(`/AnswerPage/${answer.id}`)}
                  >
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold" // Make the text bold
                      }}
                    >
                      View Details
                    </Typography>
                  </Button>
                </div>
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
  try {
    const session = await getSession(ctx);
    const question = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/question/${ctx.query.questionId}`
    );
    const questionData = question ? await question.json() : null;

    const answers = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/answer/question/${ctx.query.questionId}`
    );
    const answerData = answers ? await answers.json() : null;

    const user = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/user/${session?.user?.email}`
    );
    const userData = user ? await user?.json() : null;

    return {
      props: {
        questionData,
        answerData,
        userData
      }
    };
  } catch (e) {
    return {
      props: {
        questionData: null,
        answerData: null,
        userData: null
      }
    };
  }
}

export default Question;
