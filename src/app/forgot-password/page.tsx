'use client'
import Link from "next/link";
import { useState } from 'react';
import { sendForgotPasswordLink } from '@/appwrite/appwrite-functions';
import PageHeader from "@/components/page-header";
import { toast } from 'react-hot-toast';

export default function ForgotPassword() {

  const [emailSend, setEmailSend] = useState(false);
  const [email, setEmail] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {

      setDisabledButton(true);

      sendForgotPasswordLink(email)
      .then(() => {
          setEmailSend(true);
          setDisabledButton(false);
      })
      .catch((err: any) => {
          toast.error(err.message); 
          setDisabledButton(false);
      });

    } catch (err: any) {
      toast.error(JSON.stringify(err)); 
    }
}


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8">
        <PageHeader header={ emailSend ?  'Email send successfully' : 'Forgot password' }/>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          { emailSend ?  
                <div className="text-center py-20">
                  <p>
                    We send you link to reset password. Please check your an email inbox.
                  </p>
                </div>
              : 
                <>
                  <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          id="email"
                          name="email"
                          type="email"
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
                        Send an email to reset password
                      </button>
                    </div>
                  </form>

                  <p className="mt-10 text-center text-sm text-gray-500">
                    Remember password?{' '}
                    <Link href="/log-in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                      Log in
                    </Link>
                  </p>
                </>
            }
        </div>
      </div>
    </>
  )
}
  