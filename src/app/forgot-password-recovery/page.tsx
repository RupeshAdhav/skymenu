'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from "next/link";
import { updateForgotPassword } from '@/appwrite/appwrite-functions';
import Spinner from '@/components/spinner';
import PageHeader from '@/components/page-header';
import { toast } from 'react-hot-toast';
import { Suspense } from 'react'


export default function ForgotPasswordConfirmation() {

    const [dataLoaded, setDataLoaded] = useState(true);
    const [isNewPasswordSet, setNewPassword] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // const router = useRouter();
    // const searchParams = useSearchParams();
    // const userId = String(searchParams.get('userId'));
    // const secret = String(searchParams.get('secret'));

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if(password === confirmPassword){
            if(password.length >= 8){

                try {

                    setDisabledButton(true);

                    // updateForgotPassword(userId, secret, password, confirmPassword)
                    // .then(() => {
                    //     setNewPassword(true);
                    //     setDisabledButton(false);
                    // })
                    // .catch((err: any) => {
                    //     toast.error(err.message); 
                    //     setDisabledButton(false);
                    // });

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

    useEffect(() => {
        // if(searchParams.has('userId') || searchParams.has('secret')){
        //     setDataLoaded(true);
        // }else{
        //     toast.error('User id not found');
        //     router.push('/not-found');
        // }
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

    return (
        <Suspense>

            { !dataLoaded ? 
                    <Spinner/>
                :
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8">
                        <PageHeader header={ isNewPasswordSet ?  'Password updated successfully!' : 'Password recovery' }/>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            { isNewPasswordSet ?  
                                    <div className='text-center'>
                                        <p className="py-6">
                                            Your password has been updated successfully.
                                        </p>
                                        <p className="">
                                            You can now <Link href="/log-in" className='text-blue-600'>log in</Link> with your <br/>new password.
                                        </p>
                                    </div>
                                : 
                                    <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
                                        {/* <div>
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                value={email}
                                                id="email"
                                                name="email"
                                                type="email"
                                                disabled
                                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div> */}

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                New Password
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
                                                Confirm New Password
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
                                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                disabled={disabledButton}>
                                                Reset Password
                                            </button>
                                        </div>
                                    </form>
                            }
                        </div>
                    </div>
            }
       </Suspense>
    )
}
