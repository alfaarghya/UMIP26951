'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import api from '@stba/utils/api';
import { SetPasswordType, UpdatePasswordProps } from '@stba/types/client';
import { SetPasswordSchema } from '@stba/types/serverTypes';

const UpdatePasswordPage = ({ role }: UpdatePasswordProps) => {
  const router = useRouter();
  const { teacherId } = useParams();
  const id = teacherId as string;

  console.log(teacherId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SetPasswordType>({
    resolver: zodResolver(SetPasswordSchema),
    defaultValues: {
      teacherId: id,
    },
  });

  //update password request to password route
  const onSubmit = async (data: SetPasswordType) => {
    try {
      const res = await api.post('/auth/teacher/password', { ...data, teacherId: id });

      if (res.status === 200) {
        toast.success(res.data.message);
        router.push('/login');
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || 'Something went wrong';
      toast.error(message);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Update Password<p className='text-sm'>{role}</p></h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input type="hidden" value={teacherId || ''} {...register('teacherId')} />

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
          {isSubmitting ? 'Updating...' : 'Set Password'}
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Password is already set?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default UpdatePasswordPage;
