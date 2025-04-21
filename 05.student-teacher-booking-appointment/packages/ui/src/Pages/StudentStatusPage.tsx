"use client";

import { useEffect, useState } from "react";
import api from "@stba/utils/api";
import { toast } from "sonner";
import { StudentApprovalSchema } from "@stba/types/serverTypes";
import { Status, Student, StudentStatusProps } from "@stba/types/client";


const StudentStatusPage = ({ status }: StudentStatusProps) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  //fetch student list based on STATUS
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/student/${status}`);
      setStudents(res.data.students || []);
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  //change the status of student
  const handleStatusChange = async (studentId: string, action: Status) => {
    try {
      const payload = StudentApprovalSchema.parse({ studentId, action });
      const res = await api.put(`/admin/student/register/${studentId}`, payload);
      toast.success(res.data.message);
      fetchStudents();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update student.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold capitalize">{status.toLowerCase()} Students</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : students.length === 0 ? (
        <p className="text-gray-500">No students found.</p>
      ) : (
        <div className="space-y-3">
          {students.map((student) => (
            <div key={student.id} className="bg-white border p-4 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
                <p className="font-semibold text-gray-700"><strong>Name:</strong> {student.name}</p>
                <p className="font-semibold text-gray-700"><strong>Email:</strong> {student.email}</p>
              </div>
              <div className="mt-3 flex gap-2">
                {status === "APPROVED" && (
                  <button
                    onClick={() => handleStatusChange(student.id, Status.DENIED)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Deny
                  </button>
                )}
                {status === "PENDING" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(student.id, Status.APPROVED)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(student.id, Status.DENIED)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Deny
                    </button>
                  </>
                )}
                {status === "DENIED" && (
                  <button
                    onClick={() => handleStatusChange(student.id, Status.APPROVED)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentStatusPage;
