import {
  Avatar,
  Button,
  Grid,
  Icon,
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
import { getSession, useSession } from "next-auth/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditQuestionForm from "../../Components/EditQuestionForm";
import EditAnswerForm from "../../Components/EditAnswerForm";
import AddReplyForm from "../../Components/AddReplyForm";
import { Typography } from "@material-ui/core";

// this is the question details pages

const Question = (props: any) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const router = useRouter();
  const { data } = useSession();
  const { questionId } = router.query;
  const [openQuestionPopUp, setOpenQuestionPopUp] = useState(false);
  const [openAnswerPopUp, setOpenAnswerPopUp] = useState(false);
  const [openReplyPopUp, setOpenReplyPopUp] = useState(false);

  const handleDeleteQuestion = async () => {
    const deleteQuestion = await fetch(
      `https://asu-over-flow.vercel.app/api/question/${questionId}`,
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

  const handleEditAnswer = async () => {
    setOpenAnswerPopUp(true);
  };
  const handleDeleteAnswer = async (props: any) => {
    const { answerId } = props;
    try {
      const deleteAnswer = await fetch(
        `https://asu-over-flow.vercel.app/api/answer/${answerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: answerId,
          }),
        }
      );
      const deleteAnswerJSON = await deleteAnswer.json();
      console.log(deleteAnswerJSON);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Grid
        style={{
          margin: "20px",
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
              {props?.questionData?.content}
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
          <Button
            disabled={
              props?.questionData?.userEmail !== data?.user?.email
                ? true
                : false
            }
            onClick={() => setOpenQuestionPopUp(true)}
          >
            <EditIcon color="success" />
          </Button>
          <Button
            disabled={
              props?.questionData?.userEmail !== data?.user?.email
                ? true
                : false
            }
            onClick={handleDeleteQuestion}
          >
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
              {props?.questionData?.createdAt}
            </p>
          </div>
        </Row>
        <Button
          style={{
            width: 100,
          }}
          variant="contained"
          onClick={() => setOpenPopUp(true)}
          disabled={
            props?.userData?.isRestricted ||
            props?.userData?.hasPrivilege === false
              ? true
              : false
          }
        >
          Add an Answer
        </Button>

        <List style={{ width: "100%" }}>
          {props?.answerData?.map((answer: any) => (
            <ListItem
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                boxShadow: " 0px 0px 2px #000000",
                borderRadius: "10px",
                marginTop: 20,
                backgroundColor: answer.isSolution ? "#FFEE00" : "white",
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
              <PopUp
                title="Edit Answer"
                openPopUp={openAnswerPopUp}
                setOpenPopUp={setOpenAnswerPopUp}
              >
                <EditAnswerForm
                  answerId={answer.id}
                  openPopUp={openAnswerPopUp}
                  setOpenPopUp={setOpenAnswerPopUp}
                  questionId={questionId}
                  userEmail={data?.user?.email}
                />
              </PopUp>
              <PopUp
                title="Add a Reply"
                openPopUp={openReplyPopUp}
                setOpenPopUp={setOpenReplyPopUp}
                questionId={questionId}
              >
                <AddReplyForm
                  answerId={answer.id}
                  openPopUp={openReplyPopUp}
                  setOpenPopUp={setOpenReplyPopUp}
                  questionId={questionId}
                  userEmail={data?.user?.email}
                />
              </PopUp>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "80px",
                }}
              >
                <Button
                  disabled={
                    answer.userEmail !== data?.user?.email ? true : false
                  }
                  onClick={handleEditAnswer}
                >
                  <EditIcon color="success" />
                </Button>
                <Button
                  disabled={
                    answer.userEmail !== data?.user?.email ? true : false
                  }
                  onClick={() => handleDeleteAnswer({ answerId: answer.id })}
                >
                  <DeleteForeverIcon color="error" />
                </Button>
                <Button
                  variant="contained"
                  style={{
                    marginLeft: "20px",
                  }}
                  onClick={() => setOpenReplyPopUp(true)}
                >
                  <Typography
                    style={{
                      fontSize: "15px",
                      fontWeight: "regular",
                    }}
                  >
                    new Reply
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  style={{
                    marginLeft: "20px",
                  }}
                  onClick={() => router.push(`/AnswerPage/${answer.id}`)}
                >
                  <Typography
                    style={{
                      fontSize: "15px",
                      fontWeight: "regular",
                    }}
                  >
                    View All Replies
                  </Typography>
                </Button>
                <Button
                  disabled={
                    props?.questionData?.userEmail !== data?.user?.email
                      ? true
                      : false
                  }
                  onClick={async () => {
                    await fetch(
                      `https://asu-over-flow.vercel.app/api/answer/${answer.id}/solution`,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          answerId: answer.id,
                          isSolution: true,
                        }),
                      }
                    );
                    window.location.reload();
                  }}
                  variant="contained"
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: "15px",
                      fontWeight: "regular",
                    }}
                  >
                    Select as Solution
                  </Typography>
                </Button>
                <Button
                  disabled={
                    props?.questionData?.userEmail !== data?.user?.email
                      ? true
                      : false
                  }
                  onClick={async () => {
                    await fetch(
                      `https://asu-over-flow.vercel.app/api/answer/${answer.id}/solution`,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          answerId: answer.id,
                          isSolution: false,
                        }),
                      }
                    );
                    window.location.reload();
                  }}
                  variant="contained"
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: "15px",
                      fontWeight: "regular",
                    }}
                  >
                    Not a Solution
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
      `https://asu-over-flow.vercel.app/api/question/${ctx.query.questionId}`
    );
    const questionData = question ? await question.json() : null;

    const answers = await fetch(
      `https://asu-over-flow.vercel.app/api/answer/question/${ctx.query.questionId}`
    );
    const answerData = answers ? await answers.json() : null;

    const user = await fetch(
      `https://asu-over-flow.vercel.app/api/user/${session?.user?.email}`
    );
    const userData = user ? await user?.json() : null;

    return {
      props: {
        questionData,
        answerData,
        userData,
      },
    };
  } catch (e) {
    return {
      props: {
        questionData: null,
        answerData: null,
        userData: null,
      },
    };
  }
}

export default Question;
