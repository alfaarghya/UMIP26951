import { Role } from "@stba/types/client";
import UpdatePasswordPage from "@stba/ui/Pages/UpdatePassword";

const UpdatePassword = () => {
  return <>
    <UpdatePasswordPage role={Role.TEACHER} />
  </>
};

export default UpdatePassword;