import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";

const Instruction = () => {
  return (
    <div>
      <Popup
        trigger={
          <button className="hover:text-black px-4 transition-transform transform hover:scale-105">
            Instructions
          </button>
        }
        contentStyle={{
          borderRadius: "1rem",
          padding: 0,
          maxHeight: "90vh",
          overflowY: "auto",
          width: "90vw",
          position: "relative",
        }}
        modal
        nested
      >
        {(close) => (
          <main className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen font-sans text-gray-700 transition-opacity duration-300 ease-in-out opacity-100">
            <h1 className="text-center text-4xl font-extrabold text-blue-800 mb-12 animate-fade-in">
              🚀 Dashboard Usage Instructions
            </h1>

            <section className="bg-white rounded-lg shadow-md p-8 mb-8 animate-slide-in">
              <h2 className="flex items-center text-2xl font-bold text-blue-700 mb-4">
                <span className="mr-3 text-3xl select-none">🧭</span>
                1. Sidebar Navigation
              </h2>
              <p className="mb-2">
                On the left side of the platform, you will find the{" "}
                <strong>sidebar navigation</strong>. Here you can quickly move
                between the main sections of the application.
              </p>
              <p>
                <strong>Dashboard:</strong> Clicking this option brings you to
                the main home page where you can view all candidate details and
                monitor recruitment progress.
              </p>
            </section>

            {/* Other sections remain unchanged */}

            <section className="bg-white rounded-lg shadow-md p-8 mb-8 animate-slide-in">
              <h2 className="flex items-center text-2xl font-bold text-blue-700 mb-4">
                <span className="mr-3 text-3xl select-none">👤</span>
                8. Candidate Data Display
              </h2>
              <p className="mb-2">
                The dashboard shows a paginated list (10 candidates per page)
                with the following data columns:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>Name</li>
                <li>Email</li>
                <li>Status</li>
                <li>Score</li>
                <li>Applied Date</li>
                <li>Tags</li>
                <li>Action buttons for:</li>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>
                    <strong>View CV:</strong> Opens a popup modal displaying the
                    candidate’s CV.
                  </li>
                  <li>
                    <strong>Popup View:</strong> Clicking any row opens a
                    detailed popup with full candidate information, including:
                  </li>
                  <ul className="list-disc pl-6 text-gray-600 space-y-1">
                    <li>
                      Question Review section showing options, correct answers,
                      and user-selected answers.
                    </li>
                    <li>Edit button to update candidate information.</li>
                    <li>
                      Delete button to remove the candidate from the system.
                    </li>
                  </ul>
                </ul>
              </ul>
            </section>
          </main>
        )}
      </Popup>
    </div>
  );
};

export default Instruction;
