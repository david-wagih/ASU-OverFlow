/* eslint-disable react-hooks/rules-of-hooks */
import {
  Avatar,
  Button,
  Grid,
  Icon,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Select from "react-select";
import { CategoryOptions } from "../../utils/categoryOptions";
import { useRouter } from "next/router";
import { CategoriesIcons } from "../../utils/CategoriesIcons";
import PopUp from "../../Components/PopUp";
import AddQuestionForm from "../../Components/AddQuestionForm";
import { getSession, useSession } from "next-auth/react";
import { InferGetServerSidePropsType } from "next";
import { createAnswerPriviledgeRequest } from "../../services/userServices";
import SearchIcon from "@mui/icons-material/Search";

const QuestionsPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [value, setValue] = useState("");
  const [categoryfield, setCategoryfield] = useState("");
  const router = useRouter();
  const { data } = useSession();
  const [hover, setHover] = useState(false);
  const [questions, setQuestions] = useState([]);
  console.log(props);

  const handleSearchField = (e: any) => {
    setValue(e.target.value);
    console.log(value);
  };
  const handleCategoryFilter = (categoryfield: any) => {
    setCategoryfield(categoryfield);
    console.log(categoryfield);
  };

  const handleRequestPrivilege = async () => {
    const res = await createAnswerPriviledgeRequest(data?.user?.email!);
    if (res) {
      window.location.reload();
    }
  };

  // this is for the Modal state
  const [openPopUp, setOpenPopUp] = useState(false);

  useEffect(() => {
    const getAllQuestions = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/question/`);
      const data = await res.json();
      console.log(data);
      setQuestions(data);
    };
    getAllQuestions();
  }, []);

  return (
    <>
      <Grid
        style={{
          margin: "0 auto",
          maxWidth: "1000px"
        }}
      >
        <Row
          style={{
            margin: "auto",
            marginTop: 80,
            marginLeft: 20,
            justifyContent: "left",
            alignContent: "left",
            display: "flex"
          }}
        >
          <div style={{ width: 500 }}>
            <p
              style={{
                fontSize: 15,
                fontWeight: "bold"
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
            display: "flex"
          }}
        >
          <div
            style={{
              width: 500,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TextField
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                width: "100%" // Set the width to occupy the available space
              }}
              placeholder="Search"
              onChange={handleSearchField}
              value={value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />{" "}
                  </InputAdornment>
                )
              }}
              helperText="Make the Search Keyword not more than 54 characters"
              variant="outlined" // Add an outline to the TextField
              size="small" // Adjust the size as needed
            />
          </div>
          <Button
            style={{
              width: "150px",
              borderRadius: "10px",
              backgroundColor: "#3f51b5",
              color: "#ffffff",
              padding: "10px 20px",
              fontWeight: "bold",
              textTransform: "uppercase",
              transition: "all 0.3s",
              marginLeft: "20px" // Add some left margin to separate it from other elements
            }}
            variant="contained"
            onClick={() => setOpenPopUp(true)}
            disabled={props?.userData?.isRestricted ? true : false}
          >
            Ask Question
          </Button>

          <Button
            style={{
              width: 300,
              marginLeft: "20px",
              borderRadius: "10px",
              display:
                props?.userData?.hasPrivilege === false &&
                props?.myRequestData === null
                  ? "inline-block"
                  : "none"
            }}
            variant="contained"
            color="warning"
            onClick={handleRequestPrivilege}
          >
            Request Answer Privilege
          </Button>
        </Row>
        <List style={{ width: "100%" }}>
          {questions.length > 0 &&
            questions
              .filter((question: any) => {
                if (value === "" && categoryfield === "") {
                  return true; // Show all questions if no search or category filter applied
                } else if (
                  (categoryfield === "" ||
                    // @ts-ignore
                    question.category === categoryfield.label) &&
                  question.content.toLowerCase().includes(value.toLowerCase())
                ) {
                  return true; // Show questions that match search and category filters
                }
                return false; // Hide questions that don't match filters
              })
              .map((question: any) => (
                <ListItem
                  style={{
                    borderRadius: "10px",
                    boxShadow: hover
                      ? "0px 0px 5px #555555"
                      : "0px 0px 2px #000000",
                    backgroundColor: hover ? "#EFEFEF" : "#F5F5F5",
                    marginTop: "20px",
                    padding: "20px",
                    transition: "all 0.3s",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    router.push("/QuestionsPage/" + question.id);
                  }}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  key={question.id}
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      sx={{ width: 50, height: 50, marginRight: 5 }}
                      src={
                        question.category === "Web"
                          ? CategoriesIcons[0]
                          : question.category === "Mobile"
                          ? CategoriesIcons[1]
                          : question.category === "AI"
                          ? CategoriesIcons[2]
                          : CategoriesIcons[3]
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={question.content}
                    secondary={
                      question.userEmail == props?.userData?.email
                        ? "You"
                        : question.userEmail
                    }
                    style={{ marginLeft: "20px" }}
                  />
                  <Typography variant="caption" style={{ marginLeft: "auto" }}>
                    {question.createdAt}
                  </Typography>
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
  try {
    const session = await getSession(ctx);

    const data1 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/question/`);

    const questions = data1 ? await data1.json() : null;

    const user = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/user/${session?.user?.email}`
    );
    const userData = user ? await user?.json() : null;

    const myRequest = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/user/requests/${session?.user?.email}`
    );
    const myRequestData = myRequest ? await myRequest.json() : null;

    return {
      props: {
        questions,
        userData,
        myRequestData
      }
    };
  } catch (e) {
    return {
      props: {
        questions: [],
        userData: null,
        myRequestData: null
      }
    };
  }
}

export default QuestionsPage;
