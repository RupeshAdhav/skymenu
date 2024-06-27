'use client'

import { useState } from "react"
import { deleteItem, getUser } from '@/appwrite/appwrite-functions'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'

export default function DeleteItem(props :any) {
    const [disabledButton, setDisabledButton] = useState(false);
    const router = useRouter();

    const handleCancel = () => {
        props.toggleModal();
        setDisabledButton(false);
    }

    const handleSubmit = async () => {
        try {
            setDisabledButton(true);

            getUser()
            .then(function(){

                deleteItem(props.item.$id)
                .then(function(){

                    setDisabledButton(false);
                    props.toggleModal();
                    props.initItems();
                    toast.success('Item \"'+props.item.item_name+'\" deleted');

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
            //console.log(JSON.stringify(err));
            setDisabledButton(false);
            toast.error(JSON.stringify(err));
        }
    }

    return (
        <>
            <dialog id="delete-item-modal" className={`modal ${props.modal ? "modal-open" : "modal-close"}`}>
                <div className="modal-box rounded p-0">
                    <div className="border-b py-4">
                        <h1 className="text-xl text-gray-900 text-center">Delete &ldquo;{props.item.item_name}&rdquo; Item</h1>
                    </div>
                    <div className="modal-action px-6">
                        <div className="w-full pb-6">
                            <p>Are you sure do you want to delete this item permanently?</p>
                        </div>
                    </div>
                    <div className="border-t py-3 flex justify-end px-4 gap-3">
                            <button 
                                type="button" 
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2"
                                onClick={handleCancel}>
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="justify-center rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={disabledButton}>
                                { disabledButton ? 'Deleting...' : 'Delete'}
                            </button>
                    </div>
                </div>
            </dialog>
            
        </>
    
    )
}


