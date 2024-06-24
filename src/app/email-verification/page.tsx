'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { confirmVerificationEmail } from '@/appwrite/appwrite-functions';
import Spinner from '@/components/spinner';
import PageHeader from '@/components/page-header';

export default function EmailVerification() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const [message, setMessage] = useState(true);

    // const searchParams = useSearchParams();
    // const router = useRouter();
    // const userId = String(searchParams.get('userId'));
    // const secret = String(searchParams.get('secret'));

    // useEffect(() => {
    //     if(searchParams.has('userId') && searchParams.has('secret')){
    //         confirmVerificationEmail(userId, secret)
    //         .then((response: any) => {
    //             console.log(JSON.stringify(response));
    //             setLoading(false);
    //         })
    //         .catch((err: any) => {
    //             setError(err.message);
    //             setMessage(err.message);
    //             setLoading(false);
    //         });
    //     }else{
    //         router.push('/not-found');
    //     }
    //  }, []);
 
    return (
        <>
            { loading ? 
                    <Spinner/>
                :
                    (error ? 
                            <div className='text-center py-16'>
                                {message}
                            </div>
                        : 
                            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8">
                               <PageHeader header="Email verified!"/>

                                <div className="mt-10 text-center">
                                    <p className="py-6">
                                        Congratulations! Your email has been successfully verified.
                                    </p>
                                    <p className="">
                                        You can now <Link href="/log-in" className='text-blue-600'>log in</Link> to your account.
                                    </p>
                                </div>
                            </div>
                    )
            }
        </>
    );
}