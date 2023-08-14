import "./Auth.css";
import {  useEffect, Fragment } from "react";
import Success from "../../asset/Successfully.jpg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
function EmailVerify() {
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:8000/v1/auth/${param.id}/verify/${param.token}`;
        const {data} = await axios.get(url);
        console.log("url",url)
        console.log("data",data)
      } catch (error) {
        console.log(error)
      }
    };
    verifyEmailUrl()
  },[param]);
  return (
    <Fragment>
     
        <div className="container mt-80 ">
          <img src={Success} alt="success_img" className="success_img" />
          <h1>Email Verified successfullyy</h1>
          <Link to="/login">
            <button className="green_btn">Login</button>
          </Link>
        </div>
       
   
    </Fragment>
  );
}

export default EmailVerify;
