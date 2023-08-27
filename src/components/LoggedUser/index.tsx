import "./styles.css";
import * as authService from "../../services/auth-service";
import { Link } from "react-router-dom";
import { ContextToken } from "../../utils/context-token";
import { useContext } from "react";

export default function LoggedUser() {
  const { contextTokenPayload, setContextTokenPayload } =
    useContext(ContextToken);

  function handleClickLogout() {
    authService.logout();
    setContextTokenPayload(undefined);
  }

  return contextTokenPayload && authService.isAuthenticated() ? (
    <div className="dsc-logged-user">
      <p>{contextTokenPayload.user_name}</p>
      <span onClick={handleClickLogout}>Sair</span>
    </div>
  ) : (
    <Link to="/login">Entrar</Link>
  );
}
