import "../styles/login.scss";
import logo from "../static/img/logo2.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";

import { login, BASE_AUTH_URL, useAuth } from "../auth";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const [toggle, setToggleVerifyCode] = useState(false);

  let navigate = useNavigate();

  const [logged] = useAuth();

  const onSubmit = (data) => {
    fetch(`${BASE_AUTH_URL}/login`, {
      method: "POST",
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const isJson = res.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson ? await res.json() : null;
        if (res.ok) return data;
        res.data = data;
        return Promise.reject(res);
      })
      .then((res) => {
        if (res?.detail == "TOKEN_GENERATED") {
          setToggleVerifyCode(true);
          toast.info("Su codigo de verificacion ha sido enviado");
        } else {
          login(res);
          navigate("/encuesta", { replace: true });
        }
      })
      .catch((res) => {
        console.log(res);
        if (res.status == 503) {
          toast.error(
            "360Control está fuera de servicio por mantenimiento. Vuelva pronto 😊",
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
        } else if (res.status == 403) {
          toast.info("Su codigo de verificacion ha sido enviado");
          setToggleVerifyCode(true);
        } else {
          toast.error("Usuario o contraseña incorrecto", {
            position: toast.POSITION.TOP_RIGHT,
          });
          if (res?.data?.detail == "TELEGRAM_NEED") {
            toast.error(
              "Su usuario ha sido bloqueado. Por favor comuniquese con Duan",
              {
                position: toast.POSITION.TOP_RIGHT,
              }
            );
          }
        }
      });
  };

  if (logged) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="login-container login-page">
      {/* <ToastContainer /> */}
      <div className="limiter">
        <section className="wave-wrapper">
          <div
            className="container-login100"
            // style="background-image: url('images/bg-01.jpg');"
          >
            <div
              className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33"
              style={{ zIndex: "9999" }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="login100-form validate-form flex-sb flex-w"
              >
                <span className="login100-form-title p-b-20">
                  <img src={logo} style={{ maxWidth: "40%" }} />
                </span>
                {/* <a href="#" className="btn-face m-b-20">
                  <i className="fa fa-facebook-official"></i>
                  Facebook
                </a>
                <a href="#" className="btn-google m-b-20">
                  <img src="images/icons/icon-google.png" alt="GOOGLE" />
                  Google
                </a> */}
                <div className="p-t-31 p-b-9">
                  <span className="txt1">Usuario</span>
                </div>
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Username is required"
                >
                  <input
                    {...register("username")}
                    className="input100"
                    type="text"
                    required
                    disabled={toggle}
                  />
                  <span className="focus-input100"></span>
                </div>
                <div className="p-t-13 p-b-9">
                  <span className="txt1">Contraseña</span>
                </div>
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Password is required"
                >
                  <input
                    {...register("password")}
                    className="input100"
                    type="password"
                    required
                    disabled={toggle}
                  />
                  <span className="focus-input100"></span>
                </div>
                {toggle && (
                  <>
                    <div className="p-t-13 p-b-9">
                      <span className="txt1">Código de verificación</span>
                    </div>
                    <div
                      className="wrap-input100 validate-input"
                      data-validate="Password is required"
                    >
                      <input
                        {...register("token_auth")}
                        className="input100"
                        type="text"
                        required
                      />
                      <span className="focus-input100"></span>
                    </div>
                  </>
                )}
                <div className="container-login100-form-btn m-t-17">
                  <button className="login100-form-btn">Ingresar</button>
                </div>
              </form>
            </div>
          </div>
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
          <div className="wave wave4"></div>
        </section>
      </div>
    </div>
  );
};

export default Login;
