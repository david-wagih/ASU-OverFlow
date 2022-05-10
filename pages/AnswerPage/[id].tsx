import { List, ListItem } from "@mui/material";
import React from "react";

const AnswerDetailPage = (props: any) => {
  return (
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
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        All Replies
      </h1>
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
    </div>
  );
};

export async function getServerSideProps(ctx: any) {
  try {
    const { id } = ctx.query;
    const AllReplies = await fetch(
      `https://asu-over-flow.vercel.app/api/answer/${id}/reply`,
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
    return {
      props: {
        AllRepliesJSON,
      },
    };
  } catch (e) {
    return {
      props: {
        AllRepliesJSON: [],
      },
    };
  }
}

export default AnswerDetailPage;
