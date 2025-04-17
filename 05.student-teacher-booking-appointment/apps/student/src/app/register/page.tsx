import { Role } from "@stba/types/client";
import RegisterPage from "@stba/ui/Pages/Register"

const Register = () => {
  return <>
    <RegisterPage role={Role.STUDENT} />
  </>
};

export default Register