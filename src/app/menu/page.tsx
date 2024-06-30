'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

import Navbar from '@/components/navbar';
import Spinner from '@/components/spinner';
import VerifyEmailView from '@/components/verify-email-view';
import NewMenu from '../actions/new-menu';
import EditMenu from '../actions/edit-menu';
import DeleteMenu from '../actions/delete-menu';
import ThreeDotIcon from '../svg-icons/three-dots'
import OnlineCircle from '@/app/svg-icons/online-circle'
import OfflineCircle from '@/app/svg-icons/offline-circle'
import { getMenus, getCountries } from '@/appwrite/appwrite-functions'
import { MENU, COUNTRY } from '@/appwrite/initial-values';
import { UserAuth } from '../context/user';
import ProfileLogo from '@/components/profile-logo';
import DeleteLogo from '../actions/delete-logo';


export default function Menu() {
    const [countries, setCountries] = useState([COUNTRY]);
    const [menus, setMenus] = useState([MENU]);
    const [updateMenu, setUpdateMenu] = useState(MENU);
    const [deleteMenu, setDeleteMenu] = useState(MENU);
    const [deleteLogo, setDeleteLogo] = useState(MENU);
    const [openUpdateModal, setUpdateModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [openLogoDeleteModal, setLogoDeleteModal] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const { user, userLoading } = UserAuth();

    const initMenus = async () => {
        setDataLoaded(false);
        getMenus(user.$id)
        .then((response: any) => {
            //console.log(JSON.stringify(response));
            let temp = [];
            for(let i = 0; i < response.documents.length; i++){
                temp.push({
                    $id: response.documents[i].$id,
                    //user_id: response.documents[i].user_id,
                    menu_name: response.documents[i].menu_name,
                    slogan: response.documents[i].slogan,
                    profile_link: response.documents[i].profile_link,
                    phone: response.documents[i].phone,
                    country_id: response.documents[i].country_id,
                    address: response.documents[i].address,
                    is_delete: response.documents[i].is_delete,
                    is_active: response.documents[i].is_active,
                    show_item_type: response.documents[i].show_item_type,
                    logo_id: response.documents[i].logo_id,
                    logo_name: response.documents[i].logo_name,
                    note: response.documents[i].note
                })
            }
            setMenus(temp);
            setDataLoaded(true);
        })
        .catch((err: any) => {
            setDataLoaded(true);
            toast.error(err.response.message);
        }); 
    }
   
    const initCountries = () => {
        getCountries()
        .then((response: any) => {
            setCountries(response.documents);
        })
        .catch((err: any) => {
            toast.error(err.response.message);
        }); 
    }

    useEffect(() => {
        initCountries();
    }, []);

    useEffect(() => {
        if(user){
            initMenus();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    function toggleUpdateModal() {
        setUpdateModal(!openUpdateModal);
    }

    const toggleDeleteModal = () => {
        setDeleteModal(!openDeleteModal);
    } 

    const toggleLogoDeleteModal = () => {
        setLogoDeleteModal(!openLogoDeleteModal);
    } 
    
    function handleEdit(index: number): void {
        setUpdateMenu(menus[index]);
        toggleUpdateModal();
    }

    function handleDelete(index: number): void {
        setDeleteMenu(menus[index]);
        toggleDeleteModal();
    }

    function handleLogoDelete(index: number): void {
        setDeleteLogo(menus[index]);
        toggleLogoDeleteModal();
    }


    return (
        <>
        { userLoading ? 
                <Spinner/>
            :
                <>
                    { user?.emailVerification ? 
                            <>
                                <Navbar user={user}/>
                                
                                { dataLoaded ? 
                                        <>
                                            { menus && menus.length > 0 ?
                                                    <>
                                                        <EditMenu 
                                                            initMenus={initMenus} 
                                                            setMenu={setUpdateMenu} menu={updateMenu} 
                                                            modal={openUpdateModal} toggleModal={toggleUpdateModal}/>

                                                        <DeleteMenu 
                                                            initMenus={initMenus} 
                                                            menu={deleteMenu} 
                                                            modal={openDeleteModal} toggleModal={toggleDeleteModal}/>

                                                        <DeleteLogo 
                                                            initMenus={initMenus} 
                                                            menu={deleteLogo} 
                                                            modal={openLogoDeleteModal} toggleModal={toggleLogoDeleteModal}/>
                                                        
                                                        <header className="bg-white mt-6">
                                                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                                                                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Menus</h1>
                                                                <NewMenu initMenus={initMenus} countries={countries}/>
                                                            </div>
                                                        </header>
                                                        <main>
                                                            <div className="mx-auto max-w-7xl border-2 rounded-lg">

                                                                    <table className="table">
                                                                        <thead>
                                                                            <tr>
                                                                                <th className='pl-10'>Name</th>
                                                                                <th>Status</th>
                                                                                <th className='md:table-cell hidden'>Item Type</th>
                                                                                <th className='md:table-cell hidden'>Country</th>
                                                                                <th className='md:table-cell hidden'>Phone</th>
                                                                                <th className='md:table-cell hidden'>Note</th>
                                                                                <th className='md:table-cell hidden'>Address</th>
                                                                                <th></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {menus.map((menu, index) => 
                                                                                <tr key={menu.$id}>
                                                                                    <td>
                                                                                        <div className="flex items-center gap-3">
                                                                                           <ProfileLogo menu={menu}/>
                                                                                            <div>
                                                                                                <p className="font-bold text-blue-600 hover:text-blue-500 text-base">
                                                                                                    <Link href={`/categories/${menu.$id}/${menu.menu_name}`}>{menu.menu_name}</Link>
                                                                                                </p>
                                                                                                <p className="text-xs">{menu.slogan}</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>
                                                                                        {menu.is_active ? <OnlineCircle/> : <OfflineCircle/>}
                                                                                    </td>
                                                                                    <td className='md:table-cell hidden'>
                                                                                        {menu.show_item_type ? 
                                                                                            "Show"
                                                                                            :
                                                                                            "Hide"
                                                                                        }
                                                                                    </td>
                                                                                    <td className='md:table-cell hidden'>
                                                                                        {menu.country_id?.name}
                                                                                    </td>
                                                                                    <td className='md:table-cell hidden'>
                                                                                        {menu.phone}
                                                                                    </td>
                                                                                    <td className='md:table-cell hidden'>
                                                                                        {menu.note}
                                                                                    </td>
                                                                                    <td className='md:table-cell hidden'>
                                                                                        {menu.address}
                                                                                    </td>
                                                                                    <td>
                                                                                        <div className="dropdown dropdown-top dropdown-end">
                                                                                            <button tabIndex={0} role="button" className="btn-xs">
                                                                                                <ThreeDotIcon/>
                                                                                            </button>
                                                                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded w-52">
                                                                                                <li>
                                                                                                    <a onClick={() => handleEdit(index)}>Edit</a>
                                                                                                </li>
                                                                                                <li><a onClick={() => handleDelete(index)}>Delete</a></li>
                                                                                                {menu.logo_id ? 
                                                                                                    <li><a onClick={() => handleLogoDelete(index)}>Removed Logo/Image</a></li>
                                                                                                    : <></>
                                                                                                }
                                                                                                <li><Link href={"/edit-theme/"+menu.$id}>Edit Theme</Link></li>
                                                                                                <li><Link href={"/menu-card/"+menu.$id}>View Menu</Link></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            )}
                                                                        </tbody>
                                                                    </table>

                                                            </div>
                                                        </main>
                                                    </>
                                                :
                                                    <div className="flex flex-col items-center justify-center py-32">
                                                        <p className="mb-2 text-lg text-gray-900 ">No menus</p>
                                                        <p className="text-md text-gray-500 dark:text-gray-400 pb-8">Get started by creating a new menu.</p>
                                                        <NewMenu buttonName="+ Create menu" initMenus={initMenus} countries={countries}/>
                                                    </div>
                                            }
                                        </>
                                    : 
                                        <Spinner/>
                                }
                                
                            </>
                        :
                            <>
                                <Navbar user={user}/>
                                <VerifyEmailView title="Email not verified!" showIcon={false}/>
                            </>
                    }
                </>
        }
        </> 
    )
}
