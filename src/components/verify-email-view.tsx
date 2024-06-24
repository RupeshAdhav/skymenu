'use client'
import { sendVerificationEmail } from "@/appwrite/appwrite-functions";
import { useState } from "react";
import Spinner from "@/components/spinner";
import LogoutView from "@/components/logout-view";
import { UserAuth } from "@/app/context/user";
import Link from "next/link";
import { toast } from 'react-hot-toast';


export default function VerifyEmailView(props: any){
    const [isEmailSend, setEmailSend] = useState(false);
    const { user, userLoading } = UserAuth();

    function sendEmail(){
        sendVerificationEmail()
        .then((response: any) => {
            console.log(JSON.stringify(response));
            toast.success('Email send!');
            setEmailSend(true);
        })
        .catch((err: any) => {
          toast.error(err.response.message); 
        });  
    }

    return (
        <>
           
            { userLoading ? 
                <Spinner/>
            :
                ( user && user.email ? 
                        <>

                            { !user.emailVerification ? 

                                    <>
                                        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8">
                                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                                 { props.showIcon ?
                                                    <img
                                                        className="mx-auto h-10 w-auto"
                                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                                        alt="Your Company"
                                                    />
                                                : ''}
                                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                                    { props.title ? props.title : 'Thank you for creating an account!' }
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="mt-10 text-center">
                                            { !isEmailSend ? 
                                                <>
                                                    <p className="py-6">
                                                        To complete the registration process, please verify your email address.
                                                    </p>
                                                    <button
                                                        className="justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        onClick={sendEmail}>
                                                            Verify email
                                                    </button>
                                                </>
                                            : 
                                                <>
                                                    <p className="py-6">
                                                        We send you an email to verify account. Please check your an email inbox.
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                            Didn&#xb4;t receive the email?{' '}<button className="btn btn-link px-0" onClick={sendEmail}>Resend it</button>
                                                    </p>
                                                </>
                                            }

                                        </div>
                                    </>
                                :
                                    <>
                                        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8">
                                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                                <img
                                                    className="mx-auto h-10 w-auto"
                                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                                    alt="Your Company"
                                                />
                                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                                    Your email is already verified.
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="mt-10 sm:mx-auto sm:max-w-sm">
                                            <div className="text-center py-6">
                                                    <div>
                                                        <Link href="/log-in" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                                            Return to login page
                                                        </Link> 
                                                    </div>
                                            </div>
                                        </div>
                                    </>

                            }

                        </>
                    : 
                        <LogoutView/>
                )

            }
        
        </>
    )

}