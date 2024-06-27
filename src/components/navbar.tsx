import { UserAuth } from '@/app/context/user';
import { useRouter  } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function Navbar(props: any) {
    const { logout } = UserAuth();
    const router = useRouter()

    const handleLogout = () => {
        logout()
        .then(function() {
            router.push('/log-in');
        })
        .catch((err: any) => {
          toast.error(JSON.stringify(err));
        });  
    }
    
    return (
        <>
        { props.user ? 
            <div className="navbar sticky top-0 border-b-2 lg:px-8 bg-white">
                <div className="flex-1">
                    <div className="text-center">
                        <span className="text-2xl leading-6 text-blue-500">
                            sky
                        </span>
                        <span className="text-2xl font-light leading-6 text-gray-900">
                            menu
                        </span>
                    </div>
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">

                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="avatar placeholder">
                                <div className="bg-slate-100 rounded-full w-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-center">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </div>
                            </div> 
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-sm">
                            <li><a className='hover:bg-white'>{props.user?.email}</a></li>
                            <li><a>Contact us</a></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>

                    </div>
                </div>
            </div>
            : <></> }
        </>
    )
}
