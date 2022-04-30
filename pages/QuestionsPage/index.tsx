import {
  Avatar,
  Grid,
  Icon,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import Select from "react-select";
import { CategoryOptions } from "../../utils/categoryOptions";
import { useRouter } from "next/router";
import { CategoriesIcons } from "../../utils/CategoriesIcons";

export async function getServerSideProps(ctx: any) {
  const data = await fetch("http://localhost:3000/api/Questions/");
  const questions = await data.json();
  return {
    props: {
      questions,
    },
  };
}

const QuestionsPage = (props: { questions: any[] }) => {
  const [value, setValue] = useState("");
  const [categoryfield, setCategoryfield] = useState("");
  const router = useRouter();

  const handleSearchField = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <Grid>
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
          <Select
            options={CategoryOptions}
            isMulti
            name="categories"
            className="basic-multi-select"
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
          <Input
            onChange={handleSearchField}
            placeholder="Search"
            type="text"
            value={value}
          ></Input>
          <Icon>search</Icon>
        </div>
      </Row>
      <List style={{ width: "100%" }}>
        {props.questions
          .filter((val) => {
            if (value === "") {
              return val;
            } else if (
              val.content.toLowerCase().includes(value.toLowerCase())
            ) {
              return val;
            }
          })
          .map((question: any) => (
            <ListItem
              style={{
                cursor: "pointer",
                boxShadow: "0px 0px 2px #000000",
                marginTop: 20,
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
    </Grid>
  );
};

export default QuestionsPage;
