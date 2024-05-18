import { zodResolver } from '@hookform/resolvers/zod'
import { StatusCodes } from 'http-status-codes';
import { useForm } from "react-hook-form"
import { signUpSchema, signUpPayload } from "../lib/schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useToast } from "../hooks/use-toast"
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import { useTransition } from 'react';
import { cn } from '../lib/utils';

const Register = () => {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, reset } = useForm<signUpPayload>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "John",
            lastName: "Doe",
            email: "test@gmail.com",
            password: "test123",
            confirmPassword: "test123"
        }
    })

    const { mutate } = useMutation({
        mutationFn: async (payload: signUpPayload) => {
            const { data, status } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/auth/signup`, payload);
            return { data, status };
        },
        onError: (err) => {
            console.log(err);
            if (err instanceof AxiosError) {
                if (err.response?.status === StatusCodes.CONFLICT)
                    return toast({
                        title: err.response?.data.message,
                        description: "Please try again with different credentials",
                        variant: "destructive"
                    })
                if (err.response?.status === StatusCodes.BAD_REQUEST) {
                    return toast({
                        title: err.response?.data.message,
                        description: "Make sure all the fields are filled correctly",
                        variant: "destructive"
                    })
                } if (err.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
                    return toast({
                        title: err.response?.data.message,
                        description: "Please try again later",
                        variant: "destructive"
                    })
                }
            }
            return toast({
                title: "Something went wrong while authenticating user.",
                description: "Please try again later.",
                variant: "destructive"
            })
        },
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries()
            reset();
            navigate("/login")
        }
    })
    const onSubmit = ((payload: signUpPayload) => {
        startTransition(() => { mutate(payload) })
    })
    console.log(isPending);
    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <div className="flex flex-col md:flex-row gap-5">

                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input
                        className="border rounded w-full py-1 px-2 font-normal"
                        required
                        {...register("firstName")}
                    ></input>
                    {errors.firstName && (
                        <span className="text-red-500">{errors.firstName.message}</span>
                    )}
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input
                        className="border rounded w-full py-1 px-2 font-normal" required
                        {...register("lastName")}
                    ></input>
                    {errors.lastName && (
                        <span className="text-red-500">{errors.lastName.message}</span>
                    )}
                </label>
            </div>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                    type="email"
                    className="border rounded w-full py-1 px-2 font-normal" required
                    {...register("email")}
                ></input>
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input
                    type="password"
                    required
                    autoCorrect='true'
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("password")}
                ></input>
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input
                    type="password"
                    required
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("confirmPassword")}
                ></input>
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}
            </label>

            <span className='flex items-center justify-between mt-2'>
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
                >
                    Create Account
                </button>
                <span className='flex gap-3'>
                    <p>Already have an account?</p>
                    <Link to="/signin" className="text-blue-500 underline">Login</Link>
                </span>
            </span>
        </form >
    )
}

export default Register