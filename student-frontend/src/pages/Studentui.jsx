import React, { useState } from "react";

const StudentUI = () => {
  
  //THIS IS SAMPLE DATA
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "Madrid", "Rome"],
    },
    {
      question: "Which language is used for web development?",
      options: ["Python", "Java", "JavaScript", "C++"],
    },
    {
      question: "What is the result of 5 + 3?",
      options: ["5", "8", "10", "15"],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    const updatedOptions = [...(selectedOptions[currentQuestion] || [])];
    if (updatedOptions.includes(option)) {
      updatedOptions.splice(updatedOptions.indexOf(option), 1);
    } else {
      updatedOptions.push(option);
    }
    const allSelections = [...selectedOptions];
    allSelections[currentQuestion] = updatedOptions;
    setSelectedOptions(allSelections);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSave = () => {
    alert("Your answers have been saved!");
    console.log("Selected Options:", selectedOptions);
  };

  return (
    <div className="flex justify-start items-start min-h-screen p-10 bg-gray-100">
      <div className="w-1/2 p-6 border border-gray-300 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold mb-6">
          {questions[currentQuestion]?.question}
        </h2>
        <div>
          {questions[currentQuestion].options.map((option, index) => (
            <label key={index} className="block text-2xl mb-4">
              <input
                type="checkbox"
                className="mr-3 w-6 h-6"
                checked={
                  (selectedOptions[currentQuestion] || []).includes(option)
                }
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <div className="flex space-x-4 mt-8">
          <button
            onClick={handlePrevious}
            className="px-6 py-3 bg-gray-300 rounded-lg text-lg font-medium"
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-green-500 text-white rounded-lg text-lg font-medium"
          >
            Save
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-medium"
            disabled={currentQuestion === questions.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentUI;
