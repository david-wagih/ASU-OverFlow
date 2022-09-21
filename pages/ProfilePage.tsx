/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Container, Row } from "react-bootstrap";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { CategoriesIcons } from "../utils/CategoriesIcons";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";

// want to use user data from next-auth
// @ts-ignore
// we here could get all the user data needed from the session

const ProfilePage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, status } = useSession();
  const router = useRouter();

  return (
    <Container className="d-flex justify-content-center mt-5">
      <div className="d-flex flex-column align-items-center justify-content-space-between">
        <Row>
          <img
            src={String(data?.user?.image)}
            alt={String(data?.user?.name)}
            width={200}
            height={200}
          />
        </Row>
        <br />
        <Row>
          <p
            className="text-center"
            style={{ fontSize: "1.5rem", fontWeight: "bold" }}
          >
            {status === "authenticated"
              ? data?.user?.name
              : "You are not logged in"}
          </p>
        </Row>
        <br />

        <Row>
          <p className="text-center" style={{ fontSize: "1.1rem" }}>
            {status === "authenticated"
              ? data?.user?.email
              : "You are not logged in"}
          </p>
        </Row>
        <div>
          <List>
            {props.questions.map((question: any) => (
              <ListItem
                style={{
                  cursor: "pointer",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 2px #000000",
                  marginTop: 20,
                  backgroundColor: "#F5F5F5",
                }}
                onClick={() => {
                  router.push("/QuestionsPage/" + question.id);
                }}
                key={question.id}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    sx={{ width: 50, height: 50, marginRight: 5 }}
                    src={
                      question.category === "WebDevelopment"
                        ? CategoriesIcons[0]
                        : question.category === "MobileDevelopment"
                        ? CategoriesIcons[1]
                        : question.category === "DataScience"
                        ? CategoriesIcons[2]
                        : CategoriesIcons[3]
                    }
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={question.content}
                  secondary={question.createdAt}
                ></ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </Container>
  );
};
export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);
  const myQuestions = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/question/user/${session?.user?.email}`
  );
  const questions = await myQuestions.json();

  return {
    props: {
      questions,
    },
  };
}

export default ProfilePage;
