'use client'

import { useState } from "react"
import { updateCategory, getUser } from '@/appwrite/appwrite-functions'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'

export default function EditCategory(props :any) {
    const [disabledButton, setDisabledButton] = useState(false);
    const router = useRouter();

    const handleInput = (e :any) => {
        if(e.target.name === 'is_active'){
            props.setCategory({...props.category, [e.target.name]:e.target.checked});
        }else if(e.target.name === 'no_of_price_cols'){
            props.setCategory({...props.category, [e.target.name]: parseInt(e.target.value)});
        }else{
            props.setCategory({...props.category, [e.target.name]:e.target.value});
        }
    }

    const handleCancel = () => {
        props.toggleModal();
        setDisabledButton(false);
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            setDisabledButton(true);

            getUser()
            .then(function(){

                updateCategory(props.category)
                .then(function (response) {

                    setDisabledButton(false);
                    props.toggleModal();
                    props.initCategories();
                    toast.success('Category \"'+props.category.category_name+'\" updated');

                })
                .catch((err: any) => {
                    //console.log(JSON.stringify(err));
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
                    
            <dialog id="edit-category-modal" className={`modal ${props.modal ? "modal-open" : "modal-close"}`}>
                <div className="modal-box w-11/12 max-w-lg rounded p-0">
                    <div className="border-b py-4">
                        <h1 className="text-xl text-gray-900 text-center">Edit Category</h1>
                    </div>
                    <div className="modal-action px-6">
                        <form method="dialog" onSubmit={handleSubmit} className="w-full pb-6 space-y-4" autoComplete="off" id="edit-category-form">

                            <div>
                                <label htmlFor="category_name" className="block text-xs font-medium leading-6 text-gray-900">
                                    Category Name
                                </label>
                                <div className="mt-0">
                                    <input
                                        value={props.category.category_name}
                                        onChange={handleInput}
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
                                        onChange={handleInput}
                                        id="is_active"
                                        name="is_active"
                                        type="checkbox" 
                                        className="toggle toggle-success" 
                                        checked={props.category.is_active} />
                                        {props.category.is_active ? "Online" : "Offline" }
                                </label>
                            </div>

                          
                            <div>
                                <label htmlFor="no_of_price_cols" className="block text-xs font-medium leading-6 text-gray-900">
                                    Number of Price Columns
                                </label>
                                <select 
                                    value={props.category.no_of_price_cols} 
                                    onChange={handleInput} 
                                    id="no_of_price_cols"
                                    name="no_of_price_cols" 
                                    required
                                    className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                </select> 
                            </div>
                            { props.category.no_of_price_cols == 2 ?
                                <>
                                    <div>
                                        <label htmlFor="price_col_name1" className="block text-xs font-medium leading-6 text-gray-900">
                                            1st Price Column Name
                                        </label>
                                        <div className="mt-0">
                                            <input
                                                value={props.category.price_col_name1}
                                                onChange={handleInput}
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
                                                value={props.category.price_col_name2}
                                                onChange={handleInput}
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
                                form="edit-category-form"
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


