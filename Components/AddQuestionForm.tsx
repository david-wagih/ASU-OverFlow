/* eslint-disable react/jsx-key */
import { FormGroup, Select } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import React, { useState } from "react";
import { CategoryOptions } from "../utils/categoryOptions";

// todo : this method will handle the post request to add new question to the database
const handleSubmit = () => {};

const AddQuestionForm = (props: any) => {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(props.userData);
      }}
    >
      <label
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Question
      </label>
      <input
        style={{
          width: "100%",
          height: "2rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
          padding: "1rem",
          marginBottom: "1rem",
        }}
        type="text"
      />
      <select
        style={{
          width: "50%",
          borderRadius: "5px",
          border: "1px solid #ccc",
          padding: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <option value="">Select Category</option>
        {CategoryOptions.map((category: any) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      <button
        style={{
          width: "100px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          padding: "0.5rem",
          marginBottom: "1rem",
          backgroundColor: "#FFE600",
          color: "black",
        }}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);
  const user = await fetch("http://localhost:3000/api/User/", {
    body: JSON.stringify({
      email: session?.user?.email,
    }),
  });
  const userData = await user.json();
  console.log(userData);

  return {
    props: {
      userData,
    },
  };
}

export default AddQuestionForm;
