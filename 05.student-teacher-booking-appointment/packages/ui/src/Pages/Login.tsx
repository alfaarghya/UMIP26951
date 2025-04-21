'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import api from '@stba/utils/api';
import { UserLoginSchema } from '@stba/types/serverTypes';
import { LoginProps, Role, UserLoginType } from '@stba/types/client';
import { useUser } from '../context/UserContext';

const LoginPage = ({ role, }: LoginProps) => {
  const { setName } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserLoginType>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      role, // set role from props
    },
  });

  //send a post request to login route
  const onSubmit = async (data: UserLoginType) => {
    try {
      const res = await api.post('/auth/login', { ...data, role });

      if (res.status === 200) {
        const { name, role } = res.data;

        localStorage.setItem('name', name);
        localStorage.setItem('role', role);
        setName(name);

        toast.success('Login successful!');
        router.push("/dashboard");
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || 'Something went wrong during login';
      toast.error(message);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Log In <p className='text-sm'>{role}</p></h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      {/* additional link for student */}
      {role === Role.STUDENT && (
        <p className="text-sm text-center mt-4">
          Student need to Register First.{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      )}
      {/* additional link for teacher */}
      {role === Role.TEACHER && (
        <p className="text-sm text-center mt-4">
          Teacher need to Update Password First.{" "}
          <p className="text-blue-600 hover:underline">
            Link will be provided by admin
          </p>
        </p>
      )}
    </div>
  );
};

export default LoginPage;
