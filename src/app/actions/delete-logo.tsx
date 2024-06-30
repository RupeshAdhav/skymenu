'use client'

import { useState } from "react"
import { deleteLogo, getUser, updateMenu } from '@/appwrite/appwrite-functions'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'

export default function DeleteLogo(props :any) {
    const [disabledButton, setDisabledButton] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        try {

            setDisabledButton(true);
            let temp = { ...props.menu };

            getUser()
            .then(function(){

                deleteLogo(temp.logo_id)
                .then(function(){

                    temp.logo_id = '';
                    temp.logo_name = '';
                    updateMenu(temp)
                    .then(function (response) {

                        setDisabledButton(false);
                        props.toggleModal();
                        toast.success('\"'+props.menu.menu_name+'\" logo/Image removed');
                        props.initMenus();

                    })
                    .catch((err: any) => {
                        setDisabledButton(false);
                        toast.error(err?.response?.message)
                    }); 

                })
                .catch((err: any) => {
                    setDisabledButton(false);
                    toast.error(err?.response?.message);
                }); 

            })
            .catch((err: any) => {
                router.push('/log-in');
                toast.error("You're logout. Please login again");
            }); 

        } catch (err) {
            console.log(JSON.stringify(err));
            setDisabledButton(false);
            toast.error(JSON.stringify(err));
        }
    }

    return (
        <>
            <dialog id="delete-menu-modal" className={`modal ${props.modal ? "modal-open" : "modal-close"}`}>
                <div className="modal-box rounded p-0">
                    <div className="border-b py-4">
                        <h1 className="text-xl text-gray-900 text-center">Removed Logo/Image</h1>
                    </div>
                    <div className="modal-action px-6">
                        <div className="w-full pb-6">
                            <p>Are you sure do you want to removed menu &ldquo;{props.menu.menu_name}&rdquo; logo/image?</p>
                        </div>
                    </div>
                    <div className="border-t py-3 flex justify-end px-4 gap-3">
                            <button 
                                type="button" 
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2"
                                onClick={props.toggleModal}>
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="justify-center rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={disabledButton}>
                                { disabledButton ? 'Removing...' : 'Remove'}
                            </button>
                    </div>
                </div>
            </dialog>
            
        </>
    
    )
}


