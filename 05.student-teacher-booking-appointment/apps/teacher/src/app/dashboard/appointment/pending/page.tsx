import { AppointmentStatus } from "@stba/types/client";
import TeacherAppointmentPage from "@stba/ui/Pages/TeacherAppointmentPage";

const Page = () => {
  return <>
    <TeacherAppointmentPage status={AppointmentStatus.PENDING} />
  </>
};

export default Page;