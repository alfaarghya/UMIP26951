import { Status } from "@stba/types/client";
import StudentStatusPage from "@stba/ui/Pages/StudentStatusPage";


const Page = () => {
  return <>
    <StudentStatusPage status={Status.PENDING} />
  </>
};

export default Page;