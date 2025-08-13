// LoginSuccess.jsx
import { useEffect, useContext } from "react";
import React from "react";
import axios from "axios";
import { MyContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import PulseLoading from "./Loading";

export default function LoginSuccess() {
  const { setLoggedIn, setUser,authStatus } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    authStatus();

  }, []);

  return <>

<PulseLoading />

            </>;
}
