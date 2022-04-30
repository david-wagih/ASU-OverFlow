import { Grid, Icon, Input } from "@mui/material";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import Select from "react-select";
import { CategoryOptions } from "../utils/categoryOptions";

const QuestionsPage = () => {
  const [value, setValue] = useState("");

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
            isMulti
            name="categories"
            options={CategoryOptions}
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
    </Grid>
  );
};

export default QuestionsPage;
