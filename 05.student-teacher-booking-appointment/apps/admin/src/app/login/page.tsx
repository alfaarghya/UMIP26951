import { Role } from "@stba/types/client";
import LoginPage from "@stba/ui/Pages/Login";

const Login = () => {
  return <>
    <LoginPage role={Role.ADMIN} />
  </>
};

export default Login;