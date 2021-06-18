import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./Navbar";

function Students(props) {
  const context = useContext(UserContext);
  const [students, setStudents] = useState([]);
  const [newId, setNewId] = useState(0);

  const [student, setStudent] = useState({
    fullName: "",
    age: 0,
    phoneNumber: "",
    email: "",
    course: 1,
    gpa: 0,
  });

  const handleStudentDataChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setStudent((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  async function auth(data) {
    const response = await fetch("http://localhost:8000/api/authorization", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    if (response.status == 200) {
      let User = await response.json();
      context.setUser(User);
    } else {
      console.log("404 USER NOT FOUND");
    }
  }

  async function Students() {
    const response = await fetch("http://localhost:8000/api/allStudents", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    if (response.status == 200) {
      let Students = await response.json();
      setStudents(Students);
    } else {
      console.log("404 USER NOT FOUND");
    }
  }

  async function Delete(data) {
    const response = await fetch("http://localhost:8000/api/deleteStudent", {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    if (response.status == 200) {
      setNewId(newId + 1);
    } else {
      console.log("404 USER NOT FOUND");
    }
  }

  async function Add(data) {
    const response = await fetch("http://localhost:8000/api/saveStudent", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    if (response.status == 200) {
      setNewId(newId + 1);
      setStudent({
        fullName: "",
        age: 0,
        phoneNumber: "",
        email: "",
        course: 1,
        gpa: 0,
      });
    } else {
      console.log("404 USER NOT FOUND");
    }
  }

  useEffect(() => {
    console.log(localStorage.getItem("email"));
    console.log(localStorage.getItem("password"));
    auth({
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
    });
    Students();
  }, [newId]);

  return (
    <div className="row mt-3">
      <div className="container">
        <div className="col-8 offset-2">
          <div className="row mb-3">
            <div className="col-10">
              <h2>List of Students</h2>
            </div>
            <div className="col-2">
              <button
                type="button"
                class="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add new
              </button>

              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Add new Student
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div className="mb-3">
                          <label className="form-label">Fullname</label>
                          <input
                            value={student.fullName}
                            onChange={handleStudentDataChange}
                            className="form-control"
                            type="text"
                            name="fullName"
                            placeholder="Fullname"
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Age</label>
                          <input
                            value={student.age}
                            onChange={handleStudentDataChange}
                            className="form-control"
                            type="number"
                            name="age"
                            placeholder="Age"
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Phone Number</label>
                          <input
                            value={student.phoneNumber}
                            onChange={handleStudentDataChange}
                            className="form-control"
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            value={student.email}
                            onChange={handleStudentDataChange}
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="Email"
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Course</label>
                          <input
                            value={student.course}
                            onChange={handleStudentDataChange}
                            className="form-control"
                            type="number"
                            min="1"
                            max="4"
                            name="course"
                            placeholder="Course"
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">GPA</label>
                          <input
                            value={student.gpa}
                            onChange={handleStudentDataChange}
                            className="form-control"
                            type="number"
                            name="gpa"
                            placeholder="GPA"
                          />
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => Add(student)}
                        type="button"
                        class="btn btn-primary"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <th>Id</th>
              <th>Fullname</th>
              <th>Age</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Course</th>
              <th>GPA</th>
              <th></th>
            </thead>
            <tbody>
              {students.map((student) => {
                return (
                  <tr>
                    <td>{student.id}</td>
                    <td>{student.fullName}</td>
                    <td>{student.age}</td>
                    <td>{student.phoneNumber}</td>
                    <td>{student.email}</td>
                    <td>{student.course}</td>
                    <td>{student.gpa}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-small"
                        onClick={() => Delete(student)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Students;
