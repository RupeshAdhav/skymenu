'use client'

import { useState } from "react"
import { createCategory, getUser } from '@/appwrite/appwrite-functions'
import { UserAuth } from '../context/user';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'

export default function NewCategory(props :any) {
    const { user } = UserAuth();  
    const [modal, setModal] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [status, setStatus] = useState(true);
    const [numberOfPriceColumns, setNumberOfPriceColumns] = useState(1);

    const router = useRouter();

    const handleStatus = (e :any) => {
        setStatus(e.target.checked);
    }

    const handleNumberOfPriceColumns = (e :any) => {
        setNumberOfPriceColumns( e.target.value);
    }

    const handleCancel = () => {
        setModal(false);
        setDisabledButton(false);
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            setDisabledButton(true);

            const formData = new FormData(event.target);
            const formCategory = {
                user_id: user.$id,
                menu_id: props.menuId,
                order_no: props.orderNo,
                category_name: formData.get('category_name'),
                no_of_price_cols: formData.get('no_of_price_cols') as unknown as number,
                price_col_name1: formData.get('price_col_name1'),
                price_col_name2: formData.get('price_col_name2'),
                is_active: status
            }

            getUser()
            .then(function(){

                createCategory(formCategory, user.$id)
                .then(function () {

                    setDisabledButton(false);
                    setModal(false);
                    props.initCategories();
                    toast.success('New category \"'+formCategory.category_name+'\" created');

                })
                .catch((err: any) => {
                    console.log(JSON.stringify(err));
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
        
            <button
                onClick={(e) => setModal(true)}
                className="flex justify-center rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                { props.buttonName ? props.buttonName : "+ Category"}
            </button>
            
            <dialog id="new-category-modal" className={`modal ${modal ? "modal-open" : "modal-close"}`}>
                <div className="modal-box w-11/12 max-w-lg rounded p-0">
                    <div className="border-b py-4">
                        <h1 className="text-xl text-gray-900 text-center">New Category</h1>
                    </div>
                    <div className="modal-action px-6">
                        <form method="dialog" onSubmit={handleSubmit} className="w-full pb-6 space-y-4" autoComplete="off" id="new-category-form">

                            <div>
                                <label htmlFor="category_name" className="block text-xs font-medium leading-6 text-gray-900">
                                    Category Name
                                </label>
                                <div className="mt-0">
                                    <input
                                        id="category_name"
                                        name="category_name"
                                        type="text"
                                        required
                                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div className="form-control w-28">
                                <label className="label cursor-pointer">
                                    <input 
                                        onChange={handleStatus}
                                        id="is_active"
                                        name="is_active"
                                        type="checkbox" 
                                        className="toggle toggle-success" 
                                        checked={status} />
                                        {status ? "Online" : "Offline" }
                                </label>
                            </div>
                          
                            <div>
                                <label htmlFor="no_of_price_cols" className="block text-xs font-medium leading-6 text-gray-900">
                                    Number of Price Columns
                                </label>
                                <select 
                                    value={numberOfPriceColumns} 
                                    onChange={handleNumberOfPriceColumns} 
                                    id="no_of_price_cols"
                                    name="no_of_price_cols" 
                                    required
                                    className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                </select> 
                            </div>
                            
                            { numberOfPriceColumns == 2 ?
                                <>
                                    <div>
                                        <label htmlFor="price_col_name1" className="block text-xs font-medium leading-6 text-gray-900">
                                            1st Price Column Name
                                        </label>
                                        <div className="mt-0">
                                            <input
                                                id="price_col_name1"
                                                name="price_col_name1"
                                                type="text"
                                                required
                                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                    <div> 
                                        <label htmlFor="price_col_name2" className="block text-xs font-medium leading-6 text-gray-900">
                                            2nd Price Column Name
                                        </label>
                                        <div className="mt-0">
                                            <input
                                                id="price_col_name2"
                                                name="price_col_name2"
                                                type="text"
                                                required
                                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                </>
                                : <></>
                            }

                        </form>
                    </div>
                    <div className="border-t py-3 flex justify-end px-4 gap-3">
                            <button 
                                type="button" 
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2"
                                onClick={handleCancel}>
                                Cancel
                            </button>
                            <button
                                form="new-category-form"
                                type="submit"
                                className="justify-center rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={disabledButton}>
                                { disabledButton ? 'Saving...' : 'Save'}
                            </button>
                    </div>
                </div>
            </dialog>
            
        </>
    
    )
}


