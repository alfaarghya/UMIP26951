import { AppointmentStatus } from "@stba/types/client";
import TeacherAppointmentPage from "@stba/ui/Pages/TeacherAppointmentPage";

const Page = () => {
  return <>
    <TeacherAppointmentPage status={AppointmentStatus.CANCELLED} />
  </>
};

export default Page;