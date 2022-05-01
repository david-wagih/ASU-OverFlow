import React, { useState } from "react";
import { CategoryOptions } from "../utils/categoryOptions";

// todo : this method will handle the post request to add new question to the database

const AddQuestionForm = (props: any) => {
  const [value, setValue] = useState();
  const [categoryfield, setCategoryfield] = useState();

  const handleInputField = (e: any) => {
    setValue(e.target.value);
    console.log(value);
  };
  const handleCategoryChosing = (e: any) => {
    setCategoryfield(e.target.value);
    console.log(categoryfield);
  };

  const handleSubmit = async (
    e: { preventDefault: () => void } | undefined
  ) => {
    // @ts-ignore
    e.preventDefault();
    try {
      const newQuestion = await fetch(
        "http://localhost:3000/api/Questions/create",
        {
          method: "POST",
          body: JSON.stringify({
            question: value,
            category: categoryfield,
            userId: 1,
          }),
        }
      );
      const newQuestionData = await newQuestion.json();
      console.log(newQuestionData);
    } catch (e) {}
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onSubmit={handleSubmit}
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
        value={value}
        onChange={handleInputField}
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
        value={categoryfield}
        onChange={handleCategoryChosing}
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
          <option key={category.value} value={category.label}>
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

export default AddQuestionForm;
