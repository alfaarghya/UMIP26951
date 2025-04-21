'use client';

import { useEffect, useState } from 'react';
import api from '@stba/utils/api';
import { Teacher } from '@stba/types/client';
import { toast } from 'sonner';


const CreateAppointmentPage = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debounced fetch logic
  useEffect(() => {
    const controller = new AbortController();
    const fetchTeachers = async () => {
      if (!name && !subject && !department) {
        setTeachers([]);
        return;
      }

      try {
        const res = await api.get('/student/search', {
          params: { name, subject, department },
          signal: controller.signal,
        });
        setTeachers(res.data.teachers);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "can't fetch user details")
      }
    };

    const timeout = setTimeout(fetchTeachers, 300);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [name, subject, department]);

  const handleBook = async () => {
    if (!selectedTeacher || !date) return;
    setIsSubmitting(true);
    try {
      const res = await api.post('/student/appointment', {
        teacherId: selectedTeacher.id,
        date: new Date(date).toISOString(),
      });
      setSelectedTeacher(null);
      setDate('');
      toast.success(res.data.message || "Appointment booked successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Booking error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book Appointment</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          placeholder="Search by Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          placeholder="Search by Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          placeholder="Search by Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {teachers.length > 0 ? (
        <div className="space-y-4">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-gray-800">{teacher.name}</h2>
                <p className='font-semibold text-gray-800'>Email: {teacher.email}</p>
                <p className='text-gray-700'>Subject: {teacher.subject || 'N/A'}</p>
                <p className='text-gray-700'>Department: {teacher.department || 'N/A'}</p>
              </div>
              <button
                onClick={() => setSelectedTeacher(teacher)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className='space-y-4 flex justify-center'>
          <p className='text-gray-500'>Search with teacher name, department subject</p>
        </div>
      )}

      {/* Modal for selecting date */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">
              Book with {selectedTeacher.name}
            </h2>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setSelectedTeacher(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleBook}
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {isSubmitting ? 'Booking...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateAppointmentPage;