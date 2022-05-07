/* eslint-disable react-hooks/rules-of-hooks */
import {
  Avatar,
  Button,
  Grid,
  Icon,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import Select from "react-select";
import { CategoryOptions } from "../../utils/categoryOptions";
import { useRouter } from "next/router";
import { CategoriesIcons } from "../../utils/CategoriesIcons";
import PopUp from "../../Components/PopUp";
import AddQuestionForm from "../../Components/AddQuestionForm";
import { getSession, useSession } from "next-auth/react";

const QuestionsPage = (props: any) => {
  const [value, setValue] = useState("");
  const [categoryfield, setCategoryfield] = useState("");
  const router = useRouter();
  const { data } = useSession();

  const handleSearchField = (e: any) => {
    setValue(e.target.value);
    console.log(value);
  };
  const handleCategoryFilter = (categoryfield: any) => {
    setCategoryfield(categoryfield);
    console.log(categoryfield);
  };

  const handleRequestPrivilege = async () => {
    const newRequest = await fetch("http://localhost:3000/api/user/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: data?.user?.email,
      }),
    });
    const newRequestData = await newRequest.json();
    console.log(newRequestData);
  };

  // this is for the Modal state
  const [openPopUp, setOpenPopUp] = useState(false);

  return (
    <>
      <Grid
        style={{
          margin: "0 auto",
          maxWidth: "1000px",
        }}
      >
        <Row
          style={{
            margin: "auto",
            marginTop: 80,
            marginLeft: 20,
            justifyContent: "left",
            alignContent: "left",
            display: "flex",
          }}
        >
          <div style={{ width: 500 }}>
            <p
              style={{
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Choose Your favorite Category and search for a question:
            </p>
            <Select
              onChange={handleCategoryFilter}
              value={categoryfield}
              // @ts-ignore
              options={CategoryOptions}
              name="categories"
              className="basic-select"
              classNamePrefix="select"
            ></Select>
          </div>
        </Row>
        <Row
          style={{
            margin: "auto",
            marginTop: 50,
            marginLeft: 20,
            justifyContent: "left",
            alignContent: "left",
            display: "flex",
          }}
        >
          <div
            style={{
              width: 500,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              style={{
                marginTop: "5px",
                marginBottom: "5px",
              }}
              placeholder="Search"
              onChange={handleSearchField}
              value={value}
              helperText="make the Search Keyword not more than 54 characters"
            ></TextField>
            <Icon
              style={{
                marginLeft: "20px",
                marginTop: "20px",
                marginBottom: "5px",
              }}
            >
              search
            </Icon>
          </div>
          <Button
            style={{
              width: 150,
              borderRadius: "10px",
            }}
            variant="contained"
            onClick={() => setOpenPopUp(true)}
            disabled={props.userData.isRestricted ? true : false}
          >
            Ask Question
          </Button>
          <Button
            style={{
              width: 300,
              marginLeft: "20px",
              borderRadius: "10px",
              display:
                props.userData.hasPrivilege === false ? "inline-block" : "none",
            }}
            variant="contained"
            color="warning"
            onClick={handleRequestPrivilege}
          >
            Request Answer Privilege
          </Button>
        </Row>
        <List style={{ width: "100%" }}>
          {props.questions
            .filter((val: { category: any; content: string }) => {
              if (value === "" && categoryfield === "") {
                return val;
              } else if (
                val.category ===
                // @ts-ignore
                categoryfield.label
              ) {
                if (val.content.toLowerCase().includes(value.toLowerCase()))
                  return val;
              }
            })
            .map((question: any) => (
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
                <ListItemText primary={question.userEmail}></ListItemText>
              </ListItem>
            ))}
        </List>
      </Grid>
      <PopUp title="Ask Form" openPopUp={openPopUp} setOpenPopUp={setOpenPopUp}>
        <AddQuestionForm openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} />
      </PopUp>
    </>
  );
};

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);
  const data1 = await fetch("http://localhost:3000/api/question/");
  const questions = await data1.json();

  const user = await fetch(
    `http://localhost:3000/api/user/${session?.user?.email}`
  );
  const userData = await user.json();

  return {
    props: {
      questions,
      userData,
    },
  };
}

export default QuestionsPage;
