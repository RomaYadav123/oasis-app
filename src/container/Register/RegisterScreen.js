import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import headerLeftSec from "../../assets/header-left-section.png";
import "../Welcome/WelcomeScreen.css";
import "./RegisterScreen.css";
import GoogleIcon from "../../assets/google-icon-2.png";
import PasswordChecklist from "react-password-checklist";
import polygonIcon from "../../assets/polygon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBriefcase,
  faEye,
  faEyeSlash,
  faPerson,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import CustomCard from "../../components/Card/CustomCard";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import MainContainer from "../../components/MainContainer/MainContainer";
import CommonTitle from "../../components/Title/CommonTitle";
import CommonInputField from "../../components/InputField/InputField";
import InputField from "../../components/InputField/InputField";
import PasswordForm from "../../components/PasswordForm/PasswordForm";

const RegisterScreen = () => {
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState({
    message: "",
    success: false,
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [validatedFields, setValidatedFields] = useState({
    fullName: false,
    email: false,
    password: false,
  });

  const [fullName, setFullName] = useState("");

  const validateField = (name, value) => {
    const isValid = value.trim() !== "";

    setValidatedFields((prevValidatedFields) => ({
      ...prevValidatedFields,
      [name]: isValid,
    }));
  };

  const isStepValid = () => {
    return Object.values(validatedFields).every((field) => field);
  };

  //full name validation starts here

  const handleFullNameChange = (e) => {
    const fullNameInput = e.target.value;

    if (/^\D+$/.test(fullNameInput)) {
      setFormData({
        ...formData,
        fullName: fullNameInput,
      });
      e.target.setCustomValidity("");
    } else {
      e.target.setCustomValidity(
        "First name should only contain non-numeric characters."
      );
    }
  };

  //full name validation ends here

  //email validation goes here //
  const handleEmailChange = (e) => {
    const emailInput = e.target.value;

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(emailInput)) {
      setFormData({
        ...formData,
        email: emailInput,
      });
      e.target.setCustomValidity("");
    } else {
      e.target.setCustomValidity("Please enter a valid email address.");
    }
  };

  // email validation ends here

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    const isValid = isStepValid();

    if (!isValid) {
      console.log("isValid");
    }
    const requestData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    };
    console.log("request data", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setFormData({ ...formData, [name]: value });
  };

  const Navigate = useNavigate();
  const handleNextPage = () => {
    Navigate("/profile");
  };

  return (
    <MainContainer>
      <Header title="STEP 01/03" subTitle="Personal Info." />
      <div className="box-wrapper ">
        <CommonTitle
          title="Register Individual Account!"
          para="For the purpose of industry regulation, Your details are required."
        />
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          // className="box-wrapper"
        >
          <InputField
            name="fullName"
            label="Your fullname*"
            type="text"
            onChange={handleChange}
            placeholder="Enter your fullname"
            feedback="Looks great!"
          />

          <InputField
            name="email"
            label="Your Email Address*"
            type="email"
            onChange={handleChange}
            placeholder="Enter your email"
            feedback="Looks great!"
          />

          <PasswordForm
            name="password"
            label="Create your Password*"
            type="password"
            onChange={handleChange}
          />
          <Form.Check
            className="group-parent"
            required
            label="I Agree to terms & conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
          <div className="group-parent">
            <Button
              className="register-cta"
              type="submit"
              onClick={handleNextPage}
            >
              <span className="reg-cta-text">Register Account</span>
            </Button>
          </div>

          <div className="d-flex justify-content-center align-items-center or-box">
            <span className="or-styling"></span>Or
            <span className="or-styling"></span>
          </div>

          <div className="google-box">
            <Button variant="none" className="google-wrapper">
              <div>
                <a href="https://accounts.google.com/">
                  <img
                    src={GoogleIcon}
                    alt="Google Icon"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginRight: "8px",
                      marginTop: "2px",
                      borderStyle: "none",
                    }}
                    className="google-icon-tablet"
                  />
                </a>
              </div>
              <div className="google-reg-text">Register with Google</div>
            </Button>
          </div>
        </Form>
      </div>
    </MainContainer>
  );
};

export default RegisterScreen;
