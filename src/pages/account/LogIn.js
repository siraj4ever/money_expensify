import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";

function LogIn() {
  const navigate = useNavigate();
  const [logInForm, setLogInForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [emailRequiredError, setEmailRequiredError] = useState(false);
  const [passwordRequiredError, setPasswordRequiredError] = useState(false);

  function onInputChange(event) {
    let targetName = event.target.name;
    let targetValue = event.target.value;
    setLogInForm({ ...logInForm, [targetName]: targetValue });
  }

  function logIn() {
    fetch(
      "http://localhost:3000/users?email=" +
        logInForm.email +
        "&password" +
        logInForm.password
    )
      .then((response) => {
        return response.json();
      })
      .then((userData) => {
        debugger;
        if (userData.length > 0) {
          let userDetails = { id: userData[0].id, email: userData[0].email };
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          navigate("/");
        } else {
          toast("email or password incorrect");
          return;
        }
      });
  }

  return (
    <>
      <section className="vh-100 background-color: #eee">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black border-radius: 25px">
                <div className="card-body p-md">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      {/* <img
                        src="images/Hearthstone-logo.png"
                        className="img-fluid"
                        alt="Heartstone Academy"
                      /> */}
                      <p className="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Money Expensify
                      </p>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <InputBox
                            onChange={(event) => onInputChange(event)}
                            name="email"
                            type="text"
                            value={logInForm.email}
                            placeholder="Email"
                          />
                          {emailRequiredError == true && (
                            <p>email is required</p>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <InputBox
                            onChange={(event) => onInputChange(event)}
                            name="password"
                            type="password"
                            value={logInForm.password}
                            placeholder="Password"
                          />
                          {passwordRequiredError == true && (
                            <p>password is required</p>
                          )}
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center">
                        <p>
                          Doesn't have an account yet ?{" "}
                          <Link to="/signup">Register</Link>
                        </p>
                        {/* <label for="form2Example3"
                          className="form-check-label"
                        ></label> */}
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <Button className="form-control btn btn-info btn-sm" onClick={() => logIn()} btnText="Log In" />
                      </div>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="images/student-vector.jpg"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

export default LogIn;
