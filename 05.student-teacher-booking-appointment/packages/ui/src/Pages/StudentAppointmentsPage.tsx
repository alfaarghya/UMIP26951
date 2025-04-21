'use client';

import { useEffect, useState } from 'react';
import api from '@stba/utils/api';
import { AppointmentStatus, Message, StudentAppointment } from '@stba/types/client';


const StudentAppointments = () => {
  const [appointments, setAppointments] = useState<StudentAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageModal, setMessageModal] = useState<null | string>(null); // appointmentId
  const [messages, setMessages] = useState<Message[]>([]);

  //fetch all appointments at beginning
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get('/student/appointment');
        setAppointments(res.data.appointments || []);
      } catch (err) {
        console.error('Error fetching appointments', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  //cancel an appointment by student
  const handleCancel = async (id: string) => {
    try {
      await api.delete(`/student/appointment/${id}`);
      setAppointments(prev =>
        prev.map(app => (app.id === id ? { ...app, status: AppointmentStatus.CANCELLED } : app))
      );
    } catch (err) {
      console.error('Cancel failed', err);
    }
  };

  //load messages for a APPROVED appointment
  const loadMessages = async (appointmentId: string) => {
    try {
      const res = await api.get(`/student/messages/${appointmentId}`);
      setMessages(res.data.content || []);
      setMessageModal(appointmentId);
    } catch (err) {
      console.error('Error fetching messages', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  if (loading) return <p className="p-4">Loading appointments...</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Your Appointments</h1>

      {appointments.length === 0 && <p>No appointments found.</p>}

      {appointments.map(app => (
        <div
          key={app.id}
          className="border p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div className="space-y-1">
            <p className="font-bold">{app.teacher.name}</p>
            <p className="text-sm text-gray-600">
              {app.teacher.subject} • {app.teacher.department}
            </p>
            <p className="text-sm text-gray-500">
              Appointment on {formatDate(app.date)}
            </p>
            <p className="text-sm font-semibold">Status: {app.status}</p>
          </div>

          <div className="flex gap-3">
            {app.status === 'PENDING' && (
              <button
                onClick={() => handleCancel(app.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Cancel
              </button>
            )}
            {app.status === 'APPROVED' && (
              <button
                onClick={() => loadMessages(app.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Messages
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Message Modal */}
      {messageModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Messages</h2>

            <div className="max-h-64 overflow-y-auto space-y-2 border p-2 rounded">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-sm">No messages yet.</p>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className="border-b pb-2">
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs text-gray-400">
                      {formatDate(msg.createdAt)}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setMessageModal(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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

export default StudentAppointments;
