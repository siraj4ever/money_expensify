import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";

function SignUp() {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isActive: true,
  });
  const [firstNameRequiredError, setFirstNameRequiredError] = useState(false);
  const [lastNameRequiredError, setLastNameRequiredError] = useState(false);
  const [emailRequiredError, setEmailRequiredError] = useState(false);
  const [existEmailError, setExistEmailError] = useState(false);
  const [invalidEmailError, setInvalidEmailError] = useState(false);
  const [passwordRequiredError, setPasswordRequiredError] = useState(false);

  function onInputChange(event) {
    let targetName = event.target.name;
    let targetValue = event.target.value;
    setSignUpForm({ ...signUpForm, [targetName]: targetValue });
  }

  function signUp() {
    let re = /\S+@\S+\.\S+/;

    if (signUpForm.firstName) {
      setFirstNameRequiredError(false);
    } else {
      setFirstNameRequiredError(true);
      return;
    }

    if (signUpForm.lastName) {
      setLastNameRequiredError(false);
    } else {
      setLastNameRequiredError(true);
      return;
    }

    if (re.test(signUpForm.email)) {
      setEmailRequiredError(false);
    } else {
      setEmailRequiredError(true);
      return;
    }

    if (signUpForm.password) {
      setPasswordRequiredError(false);
    } else {
      setPasswordRequiredError(true);
      return;
    }

    fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(signUpForm),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/login");
      });
  }

  function onInputBlurChange(event) {
    debugger;
    let targetValue = event.target.value;
    let re = /\S+@\S+\.\S+/;

    setExistEmailError(false);
    setInvalidEmailError(false);
    setEmailRequiredError(false);

    if (signUpForm.email == "") {
      setEmailRequiredError(true);
    } else {
      if (re.test(signUpForm.email) == false) {
        setInvalidEmailError(true);
        return;
      }
    }

    fetch("http://localhost:3000/users?email=" + targetValue)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        debugger;
        if (data.length > 0) {
          //if greater then 0 then show error message
          setExistEmailError(true);
        } else {
          setExistEmailError(false);
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
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            className="form-control"
                            onChange={(event) => onInputChange(event)}
                            name="firstName"
                            type="text"
                            value={signUpForm.firstName}
                            placeholder="Firstname"
                          />
                          {firstNameRequiredError == true && (
                            <p>firstName is required</p>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <InputBox
                            onChange={(event) => onInputChange(event)}
                            name="lastName"
                            type="text"
                            value={signUpForm.lastName}
                            placeholder="Lastname"
                          />
                          {lastNameRequiredError == true && (
                            <p>lastName is required</p>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <InputBox
                            onChange={(event) => onInputChange(event)}
                            name="email"
                            type="text"
                            value={signUpForm.email}
                            placeholder="Email"
                            onBlur={(event) => onInputBlurChange(event)}
                          />
                          {emailRequiredError === true && (
                            <p>email is required</p>
                          )}
                          {existEmailError === true && (
                            <p>email already exist</p>
                          )}
                          {invalidEmailError === true && <p>invalid email</p>}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <InputBox
                            onChange={(event) => onInputChange(event)}
                            name="password"
                            type="password"
                            value={signUpForm.password}
                            placeholder="Password"
                          />
                          {passwordRequiredError == true && (
                            <p>password is required</p>
                          )}
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center">
                        <p>
                          {" "}
                          Already have an account ?{" "}
                          <Link to="/login">Log In</Link>
                        </p>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <Button
                          className="form-control btn btn-info btn-sm"
                          onClick={() => signUp()}
                          btnText="Register"
                        />
                      </div>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="images/draw1.webp"
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
    </>
  );
}

export default SignUp;
