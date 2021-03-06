import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import "bootstrap/dist/css/bootstrap.min.css";
//import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import { Route, Link } from "react-router-dom";
import Modal from "./Modal";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vphone = (value) => {
  if (value.match( /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/ ) === null) {
    return (
      <div className="alert alert-danger" role="alert">
        xxx-xxxx-xxxx
      </div>
    );
  }
}

const Profile = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const user_data = JSON.parse(localStorage.getItem('user'));
  const [username] = useState(user_data.name);
  const [id] = useState(user_data.id);
  const [address, setAddress] = useState(user_data.address);
  const [gender] = useState(user_data.gender);
  const [bdate] = useState(user_data.bdate);
  const [phone, setPhone] = useState(user_data.phone);
  const [role] = useState(user_data.role);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  }

  const handleUpdate = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.update(id, address, phone).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          props.history.push('/');
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="registercolumn">
      <div className="registercard">
        <Form onSubmit={handleUpdate} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  disabled = {true}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Id">Id</label>
                <Input
                  type="text"
                  className="form-control"
                  name="Id"
                  value={id}
                  disabled = {true}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <Input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={onChangeAddress}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <Input
                  type="text"
                  className="form-control"
                  name="gender"
                  value={gender ? 'Male' : 'Female'}
                  disabled = {true}
                />
              </div>

              <div className="form-group">
                <label htmlFor="bdate">Birthday</label>
                <Input
                  type="text"
                  className="form-control"
                  name="bdate"
                  value={bdate}
                  disabled={true}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <Input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder = "xxx-xxxx-xxxx"
                  value={phone}
                  onChange={onChangePhone}
                  validations={[required, vphone]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role<br/></label>
                <Input
                  type="text"
                  className="form-control"
                  name="role"
                  value={role}
                  disabled={true}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Update</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <div className='profilebottom'>
          <Link to="/password">
            <button className='btn btn-secondary'>Modify Password</button>
          </Link>
          <Link to={`${props.match.url}/modal`}>
          <button className='btn btn-secondary'>withdrawal</button>
          </Link>
        </div>
      </div>
      <Route
          path={`${props.match.url}/modal`}
          render={() => {
            return (
              <Modal
                onClick={() => {
                  props.history.push(props.match.url);
                }}
              />
            );
          }}
        />
    </div>
  );
};

export default Profile;