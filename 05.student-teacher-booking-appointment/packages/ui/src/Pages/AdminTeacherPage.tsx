'use client';

import { useEffect, useState } from 'react';
import { AddTeacherSchema, UpdateTeacherSchema } from '@stba/types/serverTypes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AddTeacherType, Teacher, UpdateTeacherType } from '@stba/types/client';
import api from '@stba/utils/api';


export default function AdminTeacherPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);

  const {
    register: addRegister,
    handleSubmit: handleAddSubmit,
    formState: { errors: addErrors },
    reset: resetAddForm,
  } = useForm<AddTeacherType>({
    resolver: zodResolver(AddTeacherSchema),
  });

  const {
    register: updateRegister,
    handleSubmit: handleUpdateSubmit,
    formState: { errors: updateErrors },
    reset: resetUpdateForm,
    setValue: setUpdateValue,
  } = useForm<UpdateTeacherType>({
    resolver: zodResolver(UpdateTeacherSchema),
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  //get teachers data
  const fetchTeachers = async () => {
    try {
      const res = await api.get('/admin/teacher');
      toast.success('Teachers Load Successfully');
      setTeachers(res.data.teachers);
    } catch (err) {
      toast.error('Failed to load teachers');
    }
  };

  //add a teacher
  const onAddSubmit = async (data: AddTeacherType) => {
    try {
      await api.post('/admin/teacher', data);
      toast.success('Teacher added');
      fetchTeachers();
      resetAddForm();
      setShowForm(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error adding teacher');
    }
  };

  //update teacher data
  const onUpdateSubmit = async (data: UpdateTeacherType) => {
    try {
      await api.put(`/admin/teacher/${editTeacher?.id}`, data);
      toast.success('Teacher updated');
      fetchTeachers();
      resetUpdateForm();
      setEditTeacher(null);
      setShowForm(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error updating teacher');
    }
  };

  //remove teacher
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/admin/teacher/${id}`);
      toast.success('Teacher removed');
      fetchTeachers();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error removing teacher');
    }
  };

  const openUpdateModal = (teacher: Teacher) => {
    setEditTeacher(teacher);
    setShowForm(true);
    resetUpdateForm();
    setUpdateValue('teacherId', teacher.id);
    setUpdateValue('teacherName', teacher.name);
    setUpdateValue('subject', teacher.subject || '');
    setUpdateValue('department', teacher.department || '');
  };

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Teachers</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            setShowForm(true);
            setEditTeacher(null);
            resetAddForm();
          }}
        >
          Add Teacher
        </button>
      </div>

      <div className="space-y-3">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="border p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition"
          >
            <div className="grid lg:grid-cols-2 grid-cols-1 pb-1 text-lg">
              <p className="font-semibold text-gray-700">
                <strong>Name:</strong> {teacher.name}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Email:</strong> {teacher.email}
              </p>
              <p className="text-gray-600">
                <strong>Department:</strong> {teacher.department || '—'}
              </p>
              <p className="text-gray-600">
                <strong>Subject:</strong> {teacher.subject || '—'}
              </p>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <strong>Set Password:</strong>{' '}
              <a
                href={`http://localhost:3001/update/password/${teacher.id}`}
                className="underline text-blue-500 hover:text-blue-600"
              >
                localhost:3001/update/password/{teacher.id}
              </a>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => openUpdateModal(teacher)}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(teacher.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL for Add / Update */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold mb-2">
              {editTeacher ? 'Update Teacher' : 'Add New Teacher'}
            </h2>

            <form
              onSubmit={
                editTeacher
                  ? handleUpdateSubmit(onUpdateSubmit)
                  : handleAddSubmit(onAddSubmit)
              }
              className="space-y-4"
            >
              {/* Name */}
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  {...(editTeacher ? updateRegister('teacherName') : addRegister('teacherName'))}
                  className="w-full border p-2 rounded"
                />
                <p className="text-red-500 text-sm mt-1">
                  {editTeacher
                    ? updateErrors.teacherName?.message
                    : addErrors.teacherName?.message}
                </p>
              </div>

              {/* Email */}
              {!editTeacher && (
                <div>
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    {...addRegister('teacherEmail')}
                    className="w-full border p-2 rounded"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {addErrors.teacherEmail?.message}
                  </p>
                </div>
              )}

              {/* Subject */}
              <div>
                <label className="block mb-1">Subject</label>
                <input
                  type="text"
                  {...(editTeacher ? updateRegister('subject') : addRegister('subject'))}
                  className="w-full border p-2 rounded"
                />
                <p className="text-red-500 text-sm mt-1">
                  {editTeacher
                    ? updateErrors.subject?.message
                    : addErrors.subject?.message}
                </p>
              </div>

              {/* Department */}
              <div>
                <label className="block mb-1">Department</label>
                <input
                  type="text"
                  {...(editTeacher ? updateRegister('department') : addRegister('department'))}
                  className="w-full border p-2 rounded"
                />
                <p className="text-red-500 text-sm mt-1">
                  {editTeacher
                    ? updateErrors.department?.message
                    : addErrors.department?.message}
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditTeacher(null);
                    resetAddForm();
                    resetUpdateForm();
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editTeacher ? 'Update' : 'Add Teacher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
