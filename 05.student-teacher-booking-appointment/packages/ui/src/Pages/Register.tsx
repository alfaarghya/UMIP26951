'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { StudentRegisterSchema } from '@stba/types/serverTypes';
import { RegistrationProps, StudentRegisterType } from '@stba/types/client';
import api from '@stba/utils/api';

const RegisterPage = ({ role }: RegistrationProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentRegisterType>({
    resolver: zodResolver(StudentRegisterSchema),
  });

  const onSubmit = async (data: StudentRegisterType) => {
    try {
      const res = await api.post('/auth/student/register', data);

      if (res.status === 200) {
        toast.success(res.data.message || "Registration successful!");
        router.push('/login');
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || 'Something went wrong during registration';
      toast.error(message);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Registration<p className='text-sm'>{role}</p></h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full border p-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Already Register?.{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default RegisterPage;
