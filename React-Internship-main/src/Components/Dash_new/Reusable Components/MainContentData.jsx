import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import Phenotype from "../../Phenotype/Phenotype"; // Assuming Phenotype component is in a separate file
import { MdLocalHospital } from "react-icons/md";
import { TbDna2Off } from "react-icons/tb";
import { MdOutlineMood } from "react-icons/md";
import { TbMoodConfuzed } from "react-icons/tb";
import { TbMoodEmpty } from "react-icons/tb";
import { TbMoodSad } from "react-icons/tb";
import "./MainContentData.css";
import fullScreenIcon from "../fullscreen.svg";
import exitFullScreenIcon from "../fullscreen-exit.svg";
import FullScreenView from "./FullScreenExcel";
import AIscore from "./AIscore";

const MainContentData = ({
  selectedCondition,
  submittedData,
  setSubmittedData,
  handleSeverityClick,
  RenderTabViewContent,
  selectedPatient,
  aiScore,
  reason,
  setReason,
  setAiScore,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [patientConditionData, setPatientConditionData] = useState({});

  useEffect(() => {
    if (selectedPatient) {
      fetch(`http://127.0.0.1:5000/get_patient_json_data/${selectedPatient}`)
        .then((response) => response.json())
        .then((data) => setPatientConditionData(data))
        .catch((error) => console.error("Error fetching patient data:", error));

      // Reset submitted data when patient changes
      setSubmittedData([]);
    }
  }, [selectedPatient]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen); // Toggle fullscreen state
  };

  const getConcernButtonColor = () => {
    const conditionStatus = patientConditionData[selectedCondition];
    if (conditionStatus === "Yes") {
      return "green";
    } else if (conditionStatus === "No") {
      return "blue";
    }
    return "initial";
  };

  return (
    <div className="main-layout" style={{ overflowY: "hidden" }}>
      {/* Main Content Area */}
      <div className="main-content-container">
        <div className="main-heading-content">
          <div className="main-fullscreen">
            {/* Heading */}
            <h1 className="conditiontitle">
              {selectedCondition ? selectedCondition.replace(/_/g, " ") : " "}
            </h1>

            <AIscore
              selectedPatient={selectedPatient}
              selectedConditon={selectedCondition}
              severity={
                submittedData.find(
                  (entry) => entry.condition === selectedCondition
                )?.severity || ""
              }
              handleSeverityClick={handleSeverityClick}
              aiScore={aiScore}
              setAiScore={setAiScore}
              reason={reason}
              setReason={setReason}
            />

            <FullScreenView
              isFullScreen={isFullScreen}
              toggleFullScreen={toggleFullScreen}
              submittedData={submittedData}
              selectedCondition={selectedCondition}
              handleSeverityClick={handleSeverityClick}
              RenderTabViewContent={RenderTabViewContent}
              aiScore={aiScore}
              reason={reason}
            />
          </div>

          {/* Concern and No Mutation Buttons */}
          <div className="extra-buttons-style">
            <Button
              style={{
                fontSize: "0.8rem",
                padding: "0.3rem 0.5rem",
                color: "black",
                backgroundColor: getConcernButtonColor(),
              }}
              onClick={() => handleSeverityClick(null, "Concern")}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector("p").style.color =
                  getConcernButtonColor();
                e.currentTarget.querySelector("svg").style.color =
                  getConcernButtonColor();
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector("p").style.color = "initial";
                e.currentTarget.querySelector("svg").style.color = "initial";
              }}
            >
              <p style={{ margin: 0 }}>Concern</p>
              <MdLocalHospital />
            </Button>
            <Button
              style={{
                fontSize: "0.8rem",
                padding: "0.3rem 0.5rem",
                color: "black",
                backgroundColor: submittedData.find(
                  (entry) =>
                    entry.condition === selectedCondition &&
                    entry.NoMutation === "Y"
                )
                  ? "red"
                  : "initial",
              }}
              onClick={() => handleSeverityClick(null, "NoMutation")}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector("p").style.color = "red";
                e.currentTarget.querySelector("svg").style.color = "red";
                // const button = document.getElementById("concernButton");
                // button.style.backgroundColor = "initial";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector("p").style.color = "initial";
                e.currentTarget.querySelector("svg").style.color = "initial";
              }}
            >
              <p style={{ margin: 0 }}>No Mutation</p>
              <TbDna2Off />
            </Button>
          </div>
        </div>

        {/* Severity Buttons */}
        <div className="severity-buttons" style={{ margin: "1rem 0" }}>
          <Button
            style={{
              fontSize: "0.8rem",
              padding: "0.3rem 0.5rem",
              backgroundColor: submittedData.find(
                (entry) =>
                  entry.condition === selectedCondition &&
                  entry.severity === "Low"
              )
                ? "green"
                : "initial",
            }}
            onClick={() => handleSeverityClick("Low", "severity")}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector("p").style.color = "green";
              e.currentTarget.querySelector("svg").style.color = "green";
              // const button = document.getElementById("concernButton");
              // button.style.backgroundColor = "initial";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector("p").style.color = "initial";
              e.currentTarget.querySelector("svg").style.color = "initial";
            }}
          >
            <p style={{ margin: 0 }}>Low</p>
            <MdOutlineMood />
          </Button>
          <Button
            style={{
              fontSize: "0.8rem",
              padding: "0.3rem 0.5rem",
              backgroundColor: submittedData.find(
                (entry) =>
                  entry.condition === selectedCondition &&
                  entry.severity === "Mild"
              )
                ? "yellow"
                : "initial",
            }}
            onClick={() => handleSeverityClick("Mild", "severity")}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector("p").style.color = "#FFD700";
              e.currentTarget.querySelector("svg").style.color = "#FFD700";
              // const button = document.getElementById("concernButton");
              // button.style.backgroundColor = "initial";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector("p").style.color = "initial";
              e.currentTarget.querySelector("svg").style.color = "initial";
            }}
          >
            <p style={{ margin: 0 }}>Mild</p>
            <TbMoodConfuzed />
          </Button>
          <Button
            style={{
              fontSize: "0.8rem",
              padding: "0.3rem 0.5rem",
              backgroundColor: submittedData.find(
                (entry) =>
                  entry.condition === selectedCondition &&
                  entry.severity === "Moderate"
              )
                ? "orange"
                : "initial",
            }}
            onClick={() => handleSeverityClick("Moderate", "severity")}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector("p").style.color = "orange";
              e.currentTarget.querySelector("svg").style.color = "orange";
              // const button = document.getElementById("concernButton");
              // button.style.backgroundColor = "initial";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector("p").style.color = "initial";
              e.currentTarget.querySelector("svg").style.color = "initial";
            }}
          >
            <p style={{ margin: 0 }}>Moderate</p>
            <TbMoodEmpty />
          </Button>
          <Button
            style={{
              fontSize: "0.8rem",
              padding: "0.3rem 0.5rem",
              backgroundColor: submittedData.find(
                (entry) =>
                  entry.condition === selectedCondition &&
                  entry.severity === "Moderate to High"
              )
                ? "red"
                : "initial",
            }}
            onClick={() => handleSeverityClick("Moderate to High", "severity")}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector("p").style.color = "red";
              e.currentTarget.querySelector("svg").style.color = "red";
              // const button = document.getElementById("concernButton");
              // button.style.backgroundColor = "initial";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector("p").style.color = "initial";
              e.currentTarget.querySelector("svg").style.color = "initial";
            }}
          >
            <p style={{ margin: 0 }}>Moderate to High</p>
            <TbMoodSad />
          </Button>
        </div>

        {/* Render Tab View Content */}
        <div
          style={{ maxHeight: "400px", overflowY: "auto", fontSize: "0.9rem" }}
        >
          {RenderTabViewContent(selectedCondition)}
        </div>
      </div>
    </div>
  );
};

export default MainContentData;
