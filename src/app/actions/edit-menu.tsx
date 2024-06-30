'use client'

import { useState } from "react"
import { updateMenu, getUser, createLogo, deleteLogo } from '@/appwrite/appwrite-functions'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'

export default function EditMenu(props :any) {
    const [disabledButton, setDisabledButton] = useState(false);
    const [isLogoUpdate, setIsUpdateLogo] = useState(false);
    const [file, setFile] = useState<any>('');
    const router = useRouter();

    const handleInput = (e :any) => {
        if(e.target.name === 'is_active' || e.target.name === 'show_item_type'){
            props.setMenu({...props.menu, [e.target.name]:e.target.checked});
        }else{
            props.setMenu({...props.menu, [e.target.name]:e.target.value});
        }
    }

    const handleCancel = () => {
        props.toggleModal();
        setDisabledButton(false);
    }
    
    const handleFileChange = async (event: any) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            setDisabledButton(true);
            let temp = { ...props.menu };
            
            getUser()
            .then(function(){

                if(file && isLogoUpdate){
                    console.log('yes file');
                    createLogo(file)
                    .then(function(response){
                        if(props.menu.logo_id){
                            deleteLogo(props.menu.logo_id);
                        }
                        temp.logo_id = response.$id;
                        temp.logo_name= response.name;
                        handleUpdateMenu(temp);
                    })
                    .catch((err: any) => {
                        setDisabledButton(false);
                        toast.error(err?.response?.message)
                    }); 
                }else{
                    console.log('no file');
                    handleUpdateMenu(temp);
                }

            })
            .catch((err: any) => {
                router.push('/log-in');
                toast.error("You're logout. Please login again");
            }); 

        } catch (err) {
            //console.log(JSON.stringify(err));
            setDisabledButton(false);
            toast.error(JSON.stringify(err))
        }
    }

    const handleUpdateMenu = async (temp: any) => {
        updateMenu(temp)
        .then(function (response) {

            setDisabledButton(false);
            props.toggleModal();
            toast.success('Menu \"'+props.menu.menu_name+'\" updated');
            props.initMenus();

        })
        .catch((err: any) => {
            setDisabledButton(false);
            toast.error(err?.response?.message)
        }); 
    }

    return (
        <>
            <dialog id="edit-menu-modal" className={`modal ${props.modal ? "modal-open" : "modal-close"}`}>
                <div className="modal-box w-11/12 max-w-3xl rounded p-0">
                    <div className="border-b py-4">
                        <h1 className="text-xl text-gray-900 text-center">Edit Menu</h1>
                    </div>
                    <div className="modal-action px-6">
                        <form method="dialog" onSubmit={handleSubmit} className="w-full pb-6 space-y-4" autoComplete="off" id="edit-menu-form">

                            <div className="flex flex-col md:flex-row gap-4 w-full">

                                <div className="basis-1/2">
                                    <label htmlFor="menu_name" className="block text-xs font-medium leading-6 text-gray-900">
                                        Hotel/Restaurant/Cafe Name
                                    </label>
                                    <div className="mt-0">
                                        <input
                                        value={props.menu.menu_name || ''}
                                        onChange={handleInput}
                                        id="menu_name"
                                        name="menu_name"
                                        type="text"
                                        required
                                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>

                                <div className="basis-1/2"> 
                                    <label htmlFor="slogan" className="block text-xs font-medium leading-6 text-gray-900">
                                        Slogan
                                    </label>
                                    <div className="mt-0">
                                        <input
                                        value={props.menu.slogan || ''}
                                        onChange={handleInput}
                                        id="slogan"
                                        name="slogan"
                                        type="text"
                                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>

                            </div>

                            <div className='flex flex-col md:flex-row gap-4 w-full'>
                                <div className='basis-1/2'>
                                    <div className="form-control" >
                                        <label className="label cursor-pointer justify-start">
                                            <input 
                                                onChange={handleInput}
                                                id="is_active"
                                                name="is_active"
                                                type="checkbox" 
                                                className="toggle toggle-success" 
                                                checked={props.menu.is_active} />
                                                &nbsp;&nbsp;{props.menu.is_active ? "Online" : "Offline" }
                                        </label>
                                    </div>
                                </div>
                                <div className='basis-1/2'>
                                    <div className="form-control tooltip" data-tip="Show or hide the Item Type (All, Veg, Egg, Non-Veg) sort options on the menu card.">
                                        <label className="label cursor-pointer justify-start">
                                            <input 
                                                onChange={handleInput}
                                                id="show_item_type"
                                                name="show_item_type"
                                                type="checkbox" 
                                                className="toggle" 
                                                checked={props.menu.show_item_type} />
                                                &nbsp;&nbsp;Item Type
                                        </label>
                                    </div>
                                </div>
                            </div>

                         
                            <div className='flex flex-col md:flex-row gap-4 w-full'>
                                <div className='basis-1/2'>
                                    {isLogoUpdate? 
                                        <>
                                            <label htmlFor='slogan' className='block text-xs font-medium leading-6 text-gray-900 '>
                                               Logo/Picture
                                            </label>
                                            <div className="mt-0 flex gap-2">
                                                <input type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs" accept="image/*" onChange={handleFileChange}/>
                                                <button className="btn btn-sm" onClick={() => setIsUpdateLogo(false)} type="button">Cancel</button>
                                            </div>
                                        </>
                                    :
                                        <>
                                            <label htmlFor="country_id" className="block text-xs font-medium leading-6 text-gray-900">
                                                Logo/Picture
                                            </label>
                                            <div className="mt-0 flex gap-2">
                                                {props.menu?.logo_name ? 
                                                <p className="btn btn-ghost btn-sm hover:bg-white">{props.menu?.logo_name}</p>
                                                : '' }
                                                <button className="btn btn-sm" onClick={() => setIsUpdateLogo(true)} type="button">Update</button>
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className='basis-1/2'>
                                </div>
                            </div>
                               
                            
                            <div className="flex flex-col md:flex-row gap-4 w-full">

                                <div className="basis-1/2">
                                    <label htmlFor="country_id" className="block text-xs font-medium leading-6 text-gray-900">
                                        Country
                                    </label>
                                    <div className="mt-0">
                                        <input
                                        value={props.menu.country_id?.name || ''}
                                        onChange={handleInput}
                                        id="country_id"
                                        name="country_id"
                                        type="text"
                                        disabled
                                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>

                                <div className="basis-1/2">
                                    <label htmlFor="dialcodephone" className="block text-xs font-medium leading-6 text-gray-900">
                                        Phone
                                    </label>
                                    <div className="join mt-0 w-full" id="dialcodephone">
                                        <input
                                            value={props.menu.country_id?.dial_code || ''}
                                            id="dialcode"
                                            name="dialcode"
                                            type="text"
                                            disabled
                                            className="pl-2 w-1/4 join-item block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        <input
                                            value={props.menu.phone || ''}
                                            onChange={handleInput}
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            className="pl-2 join-item block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>
                                
                            </div>                                
                            
                            <div>
                                <label htmlFor="address" className="block text-xs font-medium leading-6 text-gray-900">
                                    Note
                                </label>
                                <div className="mt-0">
                                    <textarea
                                    value={props.menu.note || ''} 
                                    onChange={handleInput} 
                                    id="note"
                                    name="note"
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>      

                            <div>
                                <label htmlFor="address" className="block text-xs font-medium leading-6 text-gray-900">
                                    Detail Address
                                </label>
                                <div className="mt-0">
                                    <textarea
                                    value={props.menu.address || ''} 
                                    onChange={handleInput} 
                                    id="address"
                                    name="address"
                                    required
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
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
                                form="edit-menu-form"
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


