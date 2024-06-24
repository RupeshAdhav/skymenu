import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "./spinner";

export default function LogoutView() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
          }, 3000);
     }, []);

    return (
        <>
            { !loading ? 
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                className="mx-auto h-10 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                You&#xb4;re logged out!
                            </h2>
                        </div>
                        <div className="mt-20 sm:mx-auto sm:max-w-sm">
                            <div className="text-center py-20">
                                <div>
                                    <Link href="/log-in" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2">
                                        Return to login page
                                    </Link> 
                                </div>
                            </div>
                        </div>
                    </div>
                :
                
                <Spinner/>
            }
        </>
    );
}