'use client'

import { useState } from "react"
import { updateItem, getUser } from '@/appwrite/appwrite-functions'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'

export default function EditItem(props :any) {
    const [disabledButton, setDisabledButton] = useState(false);
    const router = useRouter();

    const handleInput = (e :any) => {
        if(e.target.name === 'is_active'){
            props.setItem({...props.item, [e.target.name]:e.target.checked});
        }else{
            props.setItem({...props.item, [e.target.name]:e.target.value});
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

                updateItem(props.item)
                .then(function (response) {

                    setDisabledButton(false);
                    props.toggleModal();
                    toast.success('Item \"'+props.item.item_name+'\" updated');
                    props.initItems();
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
            //console.log(JSON.stringify(err));
            setDisabledButton(false);
            toast.error(JSON.stringify(err)); 
        }
    }

    return (
        <>
            
            <dialog id="edit-item-modal" className={`modal ${props.modal ? "modal-open" : "modal-close"}`}>
                <div className="modal-box w-11/12 max-w-lg rounded p-0">
                    <div className="border-b py-4">
                        <h1 className="text-xl text-gray-900 text-center">Edit Item</h1>
                    </div>
                    <div className="modal-action px-6">
                        <form method="dialog" onSubmit={handleSubmit} className="w-full pb-6 space-y-4" autoComplete="off" id="edit-item-form">

                            <div>
                                <label htmlFor="item_name" className="block text-xs font-medium leading-6 text-gray-900">
                                    Item Name
                                </label>
                                <div className="mt-0">
                                    <input
                                        value={props.item.item_name}
                                        onChange={handleInput}
                                        id="item_name"
                                        name="item_name"
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
                                        checked={props.item.is_active} />
                                        {props.item.is_active ? "Online" : "Offline" }
                                </label>
                            </div>

                           
                                    <div className='flex flex-col md:flex-row gap-4 w-full'>
                                        <div className='basis-1/2'>
                                            <label htmlFor="price1" className="block text-xs font-medium leading-6 text-gray-900">
                                                { props.category.price_col_name1+" Price" }
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    value={props.item.price1}
                                                    onChange={handleInput}
                                                    id="price1"
                                                    name="price1"
                                                    type="text"
                                                    required
                                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                            </div>
                                        </div>
                                        {  props.category.no_of_price_cols == 2 ?
                                            <div className='basis-1/2'>
                                                <div> 
                                                    <label htmlFor="price2" className="block text-xs font-medium leading-6 text-gray-900">
                                                        { props.category.price_col_name2+" Price" }
                                                    </label>
                                                    <div className="mt-0">
                                                        <input
                                                            value={props.item.price2}
                                                            onChange={handleInput}
                                                            id="price2"
                                                            name="price2"
                                                            type="text"
                                                            required
                                                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                            </div>
                                        : <></>
                                        }
                                    </div>
                                

                            <div className='flex flex-col md:flex-row gap-4 w-full'>
                                <div className='basis-1/2'>
                                    <label htmlFor="type" className="block text-xs font-medium leading-6 text-gray-900">
                                        Type
                                    </label>
                                    <select 
                                        value={props.item.type} 
                                        onChange={handleInput} 
                                        id="type"
                                        name="type" 
                                        required
                                        className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <option value="none">None</option>
                                        <option value="veg">Veg</option>
                                        <option value="egg">Egg</option>
                                        <option value="nonveg">Non-Veg</option>
                                    </select> 
                                    <p className="text-xs">Type &ldquo;None&rdquo; items will display in Veg, Egg, Non-Veg categories</p>
                                </div>

                                <div className='basis-1/2'>
                                    <label htmlFor="tag" className="block text-xs font-medium leading-6 text-gray-900">
                                        Tag
                                    </label>
                                    <select 
                                        value={props.item.tag} 
                                        onChange={handleInput} 
                                        id="tag"
                                        name="tag" 
                                        required
                                        className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <option value="none">None</option>
                                        <option value="special">Special</option>
                                        <option value="best seller">Best Seller</option>
                                        <option value="must try">Must Try</option>
                                    </select> 
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-xs font-medium leading-6 text-gray-900">
                                    Item Description
                                </label>
                                <div className="mt-0">
                                    <textarea 
                                        value={props.item.description}
                                        onChange={handleInput}
                                        id="description"
                                        name="description"
                                        className="textarea textarea-bordered w-full">
                                     </textarea>
                                </div>
                            </div>


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
                                form="edit-item-form"
                                type="submit"
                                className="justify-center rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={disabledButton}>
                                { disabledButton ? 'Updating...' : 'Update'}
                            </button>
                    </div>
                </div>
            </dialog>
            
        </>
    
    )
}


