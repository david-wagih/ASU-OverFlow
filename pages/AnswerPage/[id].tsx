import { Button, Grid, List, ListItem } from "@mui/material";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSession } from "next-auth/react";
import PopUp from "../../Components/PopUp";
import EditAnswerForm from "../../Components/EditAnswerForm";
import AddReplyForm from "../../Components/AddReplyForm";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";

const AnswerDetailPage = (props: any) => {
  const [openAnswerPopUp, setOpenAnswerPopUp] = useState(false);
  const [openReplyPopUp, setOpenReplyPopUp] = useState(false);
  const router = useRouter();
  const answerId = props.id;
  console.log(answerId);

  const handleDeleteAnswer = async () => {
    try {
      const deleteAnswer = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/answer/${answerId}`,
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
      // console.log(deleteAnswerJSON);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const { data } = useSession();
  return (
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
            {props?.AnswerDataJSON?.content}
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
            props?.AnswerDataJSON?.userEmail !== data?.user?.email
              ? true
              : false
          }
          onClick={() => setOpenAnswerPopUp(true)}
        >
          <EditIcon color="success" />
        </Button>
        <Button
          disabled={
            props?.AnswerDataJSON?.userEmail !== data?.user?.email
              ? true
              : false
          }
          onClick={handleDeleteAnswer}
        >
          <DeleteForeverIcon color="error" />
        </Button>
        <Button
          style={{
            width: 100,
          }}
          variant="contained"
          onClick={() => setOpenReplyPopUp(true)}
        >
          Add a Reply
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          width: "100%",
          height: "100%",
          padding: "1rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          All Replies
        </h2>
        <List>
          {props?.AllRepliesJSON?.map((reply: any) => (
            <ListItem
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                margin: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#fff",
                boxShadow: "0px 0px 10px #ccc",
              }}
              key={reply.id}
            >
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
                    fontSize: "1.01rem",
                    fontWeight: "bold",
                    margin: "0",
                  }}
                >
                  {reply.content}
                </p>
                <p
                  style={{
                    fontSize: "0.8rem",
                    margin: " 0 200px",
                  }}
                >
                  {reply.userEmail}
                </p>
              </div>
            </ListItem>
          ))}
        </List>
        <PopUp
          title="Edit Answer"
          openPopUp={openAnswerPopUp}
          setOpenPopUp={setOpenAnswerPopUp}
        >
          <EditAnswerForm
            answerId={answerId}
            setOpenPopUp={setOpenAnswerPopUp}
            userEmail={data?.user?.email}
          />
        </PopUp>
        <PopUp
          title="Add a Reply"
          openPopUp={openReplyPopUp}
          setOpenPopUp={setOpenReplyPopUp}
        >
          <AddReplyForm
            answerId={answerId}
            setOpenPopUp={setOpenReplyPopUp}
            userEmail={data?.user?.email}
          />
        </PopUp>
      </div>
    </Grid>
  );
};

export async function getServerSideProps(ctx: any) {
  try {
    const { id } = ctx.query;
    const AllReplies = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/answer/${id}/reply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answerId: id,
        }),
      }
    );
    const AllRepliesJSON = AllReplies ? await AllReplies.json() : null;

    const AnswerData = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/answer/${id}`
    );
    const AnswerDataJSON = AnswerData ? await AnswerData.json() : null;
    return {
      props: {
        AllRepliesJSON,
        AnswerDataJSON,
        id,
      },
    };
  } catch (e) {
    return {
      props: {
        AllRepliesJSON: [],
        AnswerDataJSON: {},
        id: "",
      },
    };
  }
}

export default AnswerDetailPage;
