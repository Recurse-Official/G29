import React, { useState } from "react";

const Questions = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handlePrevious = () => {
    alert("Navigating to the previous question...");
  };

  const handleSave = () => {
    alert("Question saved!");
    console.log({ question, options });
  };

  const handleNext = () => {
    alert("Navigating to the next question...");
  };

  return (
    //THIS IS SAMPLE ONLY
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Set Question</h1>
        <input
          type="text"
          placeholder="Enter your question"
          className="w-full mb-4 p-3 border rounded text-lg"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            className="w-full mb-4 p-3 border rounded text-lg"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevious}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 text-lg"
          >
            Previous
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 text-lg"
          >
            Save
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 text-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
