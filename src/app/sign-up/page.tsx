'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from "next/link";
import { UserAuth } from '../context/user';
import PageHeader from '@/components/page-header';
import { toast } from 'react-hot-toast';


export default function SignUp() {

  const [disabledButton, setDisabledButton] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register, login } = UserAuth();
  const router = useRouter();

  const handleSubmit = async (event :any) => {
    event.preventDefault();
    if(password === confirmPassword){
      if(password.length >= 8){

        try {

          setDisabledButton(true);
          
          register(email, password)
          .then(() => {

            login(email, password)
            .then(() => {
              router.push('verify-email');
            }).catch((err: any) => {
              toast.error(err.message);
              setDisabledButton(false);
            });

          })
          .catch((err :any) => {
            toast.error(err.response.message);
            setDisabledButton(false);
          });

        } catch (err: any) {
          toast.error(JSON.stringify(err));
        }

      }else{
        toast.error('password length must be greater than or equal to 8 characters');
      }
    }else{
      toast.error('password does not match');
    }    
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8">
       <PageHeader header="Sign up for a new account"/>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={disabledButton}>
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/log-in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Log in
            </Link>
          </p>

        </div>
      </div>
    </>
  )
}
