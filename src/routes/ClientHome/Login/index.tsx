/* eslint-disable @typescript-eslint/no-unused-vars */
import "./styles.css";
import * as authService from "../../../services/auth-service";
import { useState } from "react";
import { CredentialsDTO } from "../../../models/auth";

export default function Login() {
  const [formData, setFormData] = useState<CredentialsDTO>({
    username: "",
    password: "",
  });

  function handleInputChange(event: any) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    authService
      .loginRequest(formData)
      .then((response) => {
        authService.saveAccessToken(response.data.access_token);
        console.log(authService.getAccessTokenPayLoad());
      })
      .catch((error) => {
        console.log("Erro no login", error);
      });
  }

  return (
    <main>
      <section id="login-section" className="dsc-container">
        <div className="dsc-login-form-container">
          <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="dsc-form-controls-container">
              <div>
                <input
                  className="dsc-form-control"
                  type="text"
                  placeholder="Email"
                  value={formData.username}
                  name="username"
                  onChange={handleInputChange}
                />
                <div className="dsc-form-error"></div>
              </div>
              <div>
                <input
                  className="dsc-form-control"
                  type="password"
                  placeholder="Senha"
                  value={formData.password}
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="dsc-login-form-buttons dsc-mt20">
              <button type="submit" className="dsc-btn dsc-btn-blue">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
