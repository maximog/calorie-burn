"use client";

import React, { useState } from "react";

const Home = () => {
  const [activity, setActivity] = useState("running");
  const [speed, setSpeed] = useState("");
  const [distance, setDistance] = useState("");
  const [weight, setWeight] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);

  const calculateCalories = () => {
    // Convert speed, distance, and weight to numbers
    const speedValue = parseFloat(speed);
    const distanceValue = parseFloat(distance);
    const weightValue = parseFloat(weight);

    // Check if inputs are valid numbers
    if (isNaN(speedValue) || isNaN(distanceValue) || isNaN(weightValue)) {
      alert("Please enter valid numbers for speed, distance, and weight.");
      return;
    }

    // Convert speed to mph
    const speedMph = speedValue / 1.60934;

    // Use the provided formulas for calorie calculation
    let caloriesFormula;
    switch (activity) {
      case "walking":
        caloriesFormula = 0.06 * Math.pow(speedMph, 2) - 0.29 * speedMph + 0.73;
        break;
      case "running":
        caloriesFormula = 0.001 * speedMph + 0.656;
        break;
      case "swimming":
        caloriesFormula = 0.28 * Math.pow(speedMph, 2) - 0.97 * speedMph + 2.73;
        break;
      case "biking":
        caloriesFormula = 0.0003 * Math.pow(speedMph, 2) + 0.0331;
        break;
      default:
        alert(
          "Invalid activity. Supported activities: walking, running, swimming, biking."
        );
        return;
    }

    // Calculate calories burned
    const caloriesBurnedValue =
      (caloriesFormula * weightValue * 2.2 * distanceValue) / 1.60934;

    setCaloriesBurned(caloriesBurnedValue);
  };

  const handleActivityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setActivity(event.target.value);
    setCaloriesBurned(0);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Calorie Calculator</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Activity:
        </label>
        <select
          value={activity}
          onChange={(e) => handleActivityChange(e)}
          className="mt-1 p-2 border rounded-md w-full"
        >
          <option value="running">Running</option>
          <option value="walking">Walking</option>
          <option value="biking">Biking</option>
          <option value="swimming">Swimming</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Speed (kph):
        </label>
        <input
          type="text"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Distance (km):
        </label>
        <input
          type="text"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Weight (kg):
        </label>
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <button
        onClick={calculateCalories}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Calculate
      </button>
      <div className="mt-4">
        {!!caloriesBurned && (
          <p className="text-green-600">
            Calories burned for {activity}: {caloriesBurned.toFixed(0)} kcal
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
