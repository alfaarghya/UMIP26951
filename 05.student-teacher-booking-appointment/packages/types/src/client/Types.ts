import { AppointmentStatus, Status } from "./enum";

export type Student = {
  id: string;
  name: string;
  email: string;
  status: Status
};

export interface Appointment {
  id: string;
  teacherId: string;
  status: AppointmentStatus;
  date: Date;
  studentId: string;
  student: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Message {
  id: string;
  createdAt: string;
  content: string;
  senderId: string;
  receiverId: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  department: string | null;
}