import React, { useState } from "react";

function AttendanceDashboard() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("Batch A");

  const [students, setStudents] = useState([
    { id: 1, name: "John", batch: "Batch A", attendance: {} },
    { id: 2, name: "Emma", batch: "Batch A", attendance: {} },
    { id: 3, name: "David", batch: "Batch B", attendance: {} },
    { id: 4, name: "Sophia", batch: "Batch B", attendance: {} },
  ]);

  // Mark attendance
  const markAttendance = (id, status) => {
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    setStudents(
      students.map((student) =>
        student.id === id
          ? {
              ...student,
              attendance: {
                ...student.attendance,
                [selectedDate]: status,
              },
            }
          : student
      )
    );
  };

  // Filter students batch-wise
  const filteredStudents = students.filter(
    (student) => student.batch === selectedBatch
  );

  // Calculate attendance percentage
  const getPercentage = (attendance) => {
    const totalDays = Object.keys(attendance).length;

    if (totalDays === 0) return 0;

    const presentDays = Object.values(attendance).filter(
      (value) => value === "Present"
    ).length;

    return ((presentDays / totalDays) * 100).toFixed(2);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Trainer Session Attendance Dashboard</h1>

      {/* Date Filter */}
      <div>
        <label>Select Date: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <br />

      {/* Batch Filter */}
      <div>
        <label>Select Batch: </label>
        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          <option>Batch A</option>
          <option>Batch B</option>
        </select>
      </div>

      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Status ({selectedDate})</th>
            <th>Attendance %</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.batch}</td>

              <td>
                {student.attendance[selectedDate]
                  ? student.attendance[selectedDate]
                  : "-"}
              </td>

              <td>{getPercentage(student.attendance)}%</td>

              <td>
                <button
                  onClick={() => markAttendance(student.id, "Present")}
                >
                  Present
                </button>

                <button
                  onClick={() => markAttendance(student.id, "Absent")}
                  style={{ marginLeft: "10px" }}
                >
                  Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceDashboard;