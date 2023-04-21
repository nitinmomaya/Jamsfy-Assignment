import React, { useState } from "react";
import records from "../JSON/data.json";
const App = () => {
  // Convert the object keys to remove the \u200b character
  const newData = JSON.parse(JSON.stringify(records).replace(/\u200b/g, ""));

  const fees = [];
  const applicationNationality = [];
  const examNationality = [];
  const applevel = [];
  const examLevel = ["UG", "PG", "DIPLOMA", "Ph.D"];
  const course = ["Medical", "Dental", "Ayurveda"];

  const [nationality, setNationality] = useState(false);
  const [courses, setCourses] = useState(false);
  const [feeValue, setFeeValue] = useState(false);
  const [nationalValue, setNationalValue] = useState("");
  const [level, setLevel] = useState(false);
  const [previous, setPrevious] = useState("UG");
  const [show, setShow] = useState(false);

  Object.keys(newData).forEach((key) => {
    fees.push(key);
  });
  Object.keys(newData.ApplicationFee).forEach((key) => {
    applicationNationality.push(key);
  });
  Object.keys(newData.ExamFee).forEach((key) => {
    examNationality.push(key);
  });

  Object.keys(
    newData.ApplicationFee?.[nationalValue]?.ALL_COURSES || []
  ).forEach((key) => {
    applevel.push(key);
  });

  const handleFees = (e) => {
    if (e.target.value === "ApplicationFee") {
      setFeeValue(true);
    } else {
      setFeeValue(false);
    }
    setNationality(true);
  };

  const handleNationality = (e) => {
    setNationalValue(e.target.value);
    setCourses(true);
  };

  const handleCourses = (e) => {
    setLevel(true);
  };
  const handlelevel = (e) => {
    setLevel(e.target.value);
    setPrevious(e.target.value);
    setShow(true);
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center font-display">
        <div className="w-full flex flex-col items-center  ">
          <div className="w-full flex flex-col items-center justify-center py-5 gap-1">
            <h1 className="text-xl font-semibold text-slate-900">
              Hi Recruiter, Welcome to Fees Calculator
            </h1>
            <p className="  text-slate-700">
              Please Select the Fees Dropdown to proceed with
            </p>
          </div>
          <div className="w-full h-full  flex py-5 gap-10 items-center justify-center">
            <div className="flex flex-col w-40 ">
              <label className="text-slate-700 font-medium text-sm">Fee:</label>
              <select
                className="px-4 py-2 my-2 active:border-blue-500 active:border-2 enabled:border-blue-700 enabled:border-2 border-neutral-100 border-[1px] rounded-lg focus:border-blue-500 focus:border-2"
                onChange={(e) => {
                  handleFees(e);
                }}
                name="fee"
                id="fees"
              >
                <option value="">Select Fee</option>
                {fees.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            {nationality && (
              <div className="flex flex-col w-40 ">
                <label className="text-slate-700 font-medium text-sm">
                  Nationality:
                </label>
                <select
                  className="px-4 py-2 active:border-blue-500 active:border-2 enabled:border-blue-700 enabled:border-2 my-2 border-neutral-100 border-[1px] rounded-lg focus:border-blue-500 focus:border-2"
                  onChange={(e) => {
                    handleNationality(e);
                  }}
                  name="nationality"
                  id="nationalitys"
                >
                  <option value="">Select Nationality</option>
                  {feeValue
                    ? applicationNationality.map((item, index) => {
                        return (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        );
                      })
                    : examNationality.map((item, index) => {
                        return (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        );
                      })}
                </select>
              </div>
            )}

            {courses && (
              <div className="flex flex-col w-40 ">
                <label className="text-slate-700 font-medium text-sm">
                  All Course
                </label>
                <select
                  className="px-4 py-2 active:border-blue-500 active:border-2 enabled:border-blue-700 enabled:border-2 my-2 border-neutral-100 border-[1px] rounded-lg focus:border-blue-500 focus:border-2"
                  onChange={(e) => {
                    handleCourses(e);
                  }}
                  name="course"
                  id="courses"
                >
                  <option value="">Select Course</option>
                  {course.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            {level && (
              <div className="flex flex-col w-40 ">
                <label className="text-slate-700 font-medium text-sm">
                  All Level
                </label>
                <select
                  className="px-4 py-2 active:border-blue-500 active:border-2 enabled:border-blue-700 enabled:border-2 my-2 border-neutral-100 border-[1px] rounded-lg focus:border-blue-500 focus:border-2"
                  onChange={(e) => {
                    handlelevel(e);
                  }}
                  name="course"
                  id="courses"
                  value={previous}
                >
                  <option value="">Select Level</option>
                  {feeValue
                    ? applevel.map((item, index) => {
                        return (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        );
                      })
                    : examLevel.map((item, index) => {
                        return (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        );
                      })}
                </select>
              </div>
            )}
          </div>

          {show && (
            <div className=" w-fit flex items-center justify-center font-display px-10 py-5 border-neutral-200 border-[1px] rounded-lg">
              <h1 className="text-slate-700 text-lg font-medium">
                Total Fees is&nbsp;
                <span className="text-slate-900 font-semibold text-lg">
                  ₹
                  {feeValue
                    ? newData?.ApplicationFee?.[nationalValue]?.ALL_COURSES?.[
                        previous
                      ]?.amount
                    : newData?.ExamFee?.[nationalValue]?.ALL_COURSES?.ALL_LEVEL
                        ?.amount}
                </span>
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
