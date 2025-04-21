'use client';

import { useEffect, useState } from 'react';
import api from '@stba/utils/api';
import { Appointment, AppointmentStatus, Message, TeacherAppointmentProps } from '@stba/types/client';
import { toast } from 'sonner';


const TeacherAppointmentPage = ({ status }: TeacherAppointmentProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalId, setModalId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      const res = await api.get(`/teacher/appointment/${status}`);
      toast.success(res.data.message)
      setAppointments(res.data.appointments);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "error while fetching appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, action: AppointmentStatus) => {
    try {
      const res = await api.put(`/teacher/appointment/${id}`, { action });
      toast.success(res.data.message)
      fetchAppointments();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "error while update the appointment");
    }
  };

  const openMessageModal = async (appointmentId: string, studentId: string) => {
    try {
      const res = await api.get(`/teacher/messages/${appointmentId}`);
      setMessages(res.data.content);
      setModalId(appointmentId);
      setSelectedStudentId(studentId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async () => {
    if (!modalId || !selectedStudentId || !messageContent.trim()) return;
    try {
      await api.post(`/teacher/messages/${modalId}`, {
        studentId: selectedStudentId,
        content: messageContent,
      });
      const res = await api.get(`/teacher/messages/${modalId}`);
      setMessages(res.data.content);
      setMessageContent('');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [status]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold capitalize">{status.toLowerCase()} Appointments</h1>

      {appointments.length === 0 ? (
        <p>No {status.toLowerCase()} appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="border p-4 rounded-lg shadow bg-white hover:shadow-md transition"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <p className="font-semibold text-gray-700"><strong>Student:</strong> {appt.student.name}</p>
                <p className="font-semibold text-gray-700"><strong>Email:</strong> {appt.student.email}</p>
                <p className="font-semibold text-gray-600"><strong>Date:</strong> {new Date(appt.date).toLocaleString()}</p>
              </div>

              <div className="mt-4 flex gap-3 flex-wrap">
                {status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(appt.id, AppointmentStatus.APPROVED)}
                      className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(appt.id, AppointmentStatus.CANCELLED)}
                      className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {status === 'APPROVED' && (
                  <>
                    <button
                      onClick={() => openMessageModal(appt.id, appt.studentId)}
                      className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Message
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(appt.id, AppointmentStatus.CANCELLED)}
                      className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Modal */}
      {modalId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow space-y-4">
            <h2 className="text-xl font-semibold">Messages</h2>

            <div className="h-60 overflow-y-auto border rounded p-3 bg-gray-50 space-y-2">
              {messages.map((msg) => (
                <div key={msg.id} className="text-sm">
                  <p>{msg.content}</p>
                  <p className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border px-3 py-2 rounded"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Send
              </button>
              <button
                onClick={() => setModalId(null)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAppointmentPage;
