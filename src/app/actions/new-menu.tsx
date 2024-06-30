'use client'

import { useState } from 'react'
import { createMenu, getUser, createTheme, createLogo } from '@/appwrite/appwrite-functions'
import { toast } from 'react-hot-toast';
import { UserAuth } from '../context/user';
import { useRouter } from 'next/navigation'

export default function NewMenu(props :any) {
    const { user } = UserAuth();  
    const [modal, setModal] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [countryIndex, setCountryIndex] = useState(0);
    const [status, setStatus] = useState(true);
    const [showItemTypeOption, setShowItemTypeOption] = useState(true);
    const [file, setFile] = useState<any>('');
    const router = useRouter();

    const handleStatus = (e :any) => {
        setStatus(e.target.checked);
    }

    const handleItemTypeOptions = (e :any) => {
        setShowItemTypeOption(e.target.checked);
    }

    const handleCountry = (e :any) => {
        setCountryIndex(parseInt(e.target.value));
    }
   
    const handleCancel = () => {
        setModal(false);
        setDisabledButton(false);
    }

    const handleFileChange = async (event: any) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {

            setDisabledButton(true);

            const formData = new FormData(event.target);
            const formMenu = {
                user_id: user.$id,
                menu_name: formData.get('menu_name'),
                slogan: formData.get('slogan'),
                country_id: props.countries[countryIndex].$id,
                phone: formData.get('phone'),
                address: formData.get('address'),
                profile_link: formData.get('profile_link'),
                is_delete: false,
                is_active: status,
                show_item_type: showItemTypeOption,
                logo_id: "",
                logo_name: "",
                note: formData.get('profile_link')
            }

            getUser()
            .then(function(){
                if(file){
                    createLogo(file)
                    .then(function(response){
                        console.log('## fileId: '+JSON.stringify(response));
                        formMenu.logo_id = response.$id;
                        formMenu.logo_name = response.name;
                        handleCreateMenu(formMenu);
                    })
                    .catch((err: any) => {
                        setDisabledButton(false);
                        toast.error(err?.response?.message)
                    }); 
                }else{
                    handleCreateMenu(formMenu);
                }
            })
            .catch((err: any) => {
                router.push('/log-in');
                toast.error("You're logout. Please login again");
            }); 

        } catch (err) {
            setDisabledButton(false);
            toast.error(JSON.stringify(err)); 
        }
    } 
    
    const handleCreateMenu = async (formMenu: any) => {
        createMenu(formMenu, user.$id)
        .then(function(response){
            
            setDisabledButton(false);
            setModal(false);
            setCountryIndex(0);
            createTheme({ 
                menu_id: response.$id, 
                title_font_family: 'Roboto', 
                subtitle_font_family: 'Roboto', 
                item_font_family: 'Roboto', 
                price_font_family: 'Roboto', 
                description_font_family: 'Roboto', 
                category_font_family: 'Roboto', 
                navbar_shadow_color: 'shadow-slate-100', 
                title_txt_transform: 'normal-case', 
                subtitle_txt_transform: 'normal-case', 
                item_txt_transform: 'normal-case', 
                description_txt_transform: 'normal-case', 
                category_txt_transform: 'normal-case', 
                navbar_bg_color: 'bg-white', 
                card_bg_color: 'bg-white', 
                dial_bg_color: 'bg-black', 
                drawer_bg_color: 'bg-black', 
                title_txt_color: 'text-black', 
                subtitle_txt_color: 'text-black', 
                item_txt_color: 'text-black', 
                price_txt_color: 'text-black', 
                currency_txt_color: 'text-black', 
                description_txt_color: 'text-black', 
                category_txt_color: 'text-white', 
                title_txt_size: 'text-base', 
                subtitle_txt_size: 'text-xs', 
                item_txt_size: 'text-base', 
                description_txt_size: 'text-xs', 
                currency_txt_size: 'text-base',
                price_txt_size: 'text-base',
                category_txt_size: 'text-base', 
                title_txt_weight: 'font-normal', 
                subtitle_txt_weight: 'font-normal', 
                item_txt_weight: 'font-normal', 
                description_txt_weight: 'font-normal', 
                currency_txt_weight: 'font-normal', 
                price_txt_weight: 'font-normal', 
                category_txt_weight: 'font-normal', 
                border_size: 'border-b', 
                border_color: 'border-black', 
                drawer_open_icon_color: 'text-white', 
                drawer_close_icon_color: 'text-white', 
                note_icon_color: 'text-black' 
            }); // create new theme
            toast.success('New menu \"'+formMenu.menu_name+'\" created');
            props.initMenus();

        })
        .catch((err: any) => {
            setDisabledButton(false);
            toast.error(err?.response?.message)
        }); 
    }
   
    return (
        <>
            <button
                onClick={() => setModal(true)}
                className='flex justify-center rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                { props.buttonName ? props.buttonName : '+ Menu'}
            </button>
            
            <dialog id='new-menu-modal' className={`modal ${modal ? 'modal-open' : 'modal-close'}`}>
                <div className='modal-box w-11/12 max-w-3xl rounded p-0'>
                    <div className='border-b py-4'>
                        <h1 className='text-xl text-gray-900 text-center'>New Menu</h1>
                    </div>
                    <div className='modal-action px-6'>
                        <form method='dialog' onSubmit={handleSubmit} className='w-full pb-6 space-y-4' autoComplete='off' id='new-menu-form'>

                            <div className='flex flex-col md:flex-row gap-4 w-full'>
                                <div className='basis-1/2'>
                                    <label htmlFor='menu_name' className='block text-xs font-medium leading-6 text-gray-900'>
                                        Hotel/Restaurant/Cafe Name
                                    </label>
                                    <div className='mt-0'>
                                        <input
                                        id='menu_name'
                                        name='menu_name'
                                        type='text'
                                        required
                                        className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                    </div>
                                </div>

                                <div className='basis-1/2'> 
                                    <label htmlFor='slogan' className='block text-xs font-medium leading-6 text-gray-900'>
                                        Slogan
                                    </label>
                                    <div className='mt-0'>
                                        <input
                                        id='slogan'
                                        name='slogan'
                                        type='text'
                                        className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row gap-4 w-full'>
                                <div className='basis-1/2'>
                                    <div className="form-control">
                                        <label className="label cursor-pointer justify-start p-0">
                                            <input 
                                                onChange={handleStatus}
                                                id="is_active"
                                                name="is_active"
                                                type="checkbox" 
                                                className="toggle toggle-success" 
                                                checked={status} />
                                                &nbsp;&nbsp;{status ? "Online" : "Offline" }
                                        </label>
                                    </div>
                                </div>
                                <div className='basis-1/2'>
                                    <div className="form-control tooltip" data-tip="Show or hide the Item Type (All, Veg, Egg, Non-Veg) sort options on the menu card.">
                                        <label className="label cursor-pointer justify-start p-0">
                                            <input 
                                                onChange={handleItemTypeOptions}
                                                id="show_item_type"
                                                name="show_item_type"
                                                type="checkbox" 
                                                className="toggle" 
                                                checked={showItemTypeOption} />
                                                &nbsp;&nbsp;Item Type
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='flex flex-col md:flex-row gap-4 w-full'>
                                <div className='basis-1/2'>
                                    <label htmlFor='slogan' className='block text-xs font-medium leading-6 text-gray-900 '>
                                        Logo/Picture
                                    </label>
                                    <input type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs" accept="image/*" onChange={handleFileChange}/>
                                </div>
                                <div className='basis-1/2'>
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row gap-4 w-full'>

                                <div className='basis-1/2'>
                                    <label htmlFor='country' className='block text-xs font-medium leading-6 text-gray-900'>
                                        Select Country
                                    </label>
                                    <select 
                                        value={countryIndex} 
                                        onChange={handleCountry} 
                                        id='country_id'
                                        name='country_id' 
                                        required
                                        className='pl-2 w-full block rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                                        {props.countries.map((country :any, index :number) => <option value={index} key={index}>{country.name}</option>)}
                                    </select> 
                                    <p className='font-normal text-xs pl-2'>Note: You cannot change country later. If by mistake you choose wrong country then you have to delete menu and create new one</p>   
                                </div>

                                <div className='basis-1/2'>
                                    <label htmlFor='dialcodephone' className='block text-xs font-medium leading-6 text-gray-900'>
                                        Phone
                                    </label>
                                    <div className='join mt-0 w-full' id='dialcodephone'>
                                        <input
                                            value={props.countries[countryIndex].dial_code}
                                            id='dialcode'
                                            name='dialcode'
                                            type='text'
                                            disabled
                                            className='pl-2 w-1/4 join-item block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                        <input
                                            id='phone'
                                            name='phone'
                                            type='tel'
                                            required
                                            className='pl-2 join-item block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                    </div>
                                </div>
                                
                            </div>

                             <div>
                                <label htmlFor='address' className='block text-xs font-medium leading-6 text-gray-900'>
                                   Note
                                </label>
                                <div className='mt-0'>
                                    <textarea
                                    id='note'
                                    name='note'
                                    className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                </div>
                            </div>                                      
                            
                            <div>
                                <label htmlFor='address' className='block text-xs font-medium leading-6 text-gray-900'>
                                    Detail Address
                                </label>
                                <div className='mt-0'>
                                    <textarea
                                    id='address'
                                    name='address'
                                    required
                                    className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                </div>
                            </div>          
                        
                        </form>
                    </div>
                    <div className='border-t py-3 flex justify-end px-4 gap-3'>
                            <button 
                                type='button' 
                                className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2'
                                onClick={handleCancel}>
                                Cancel
                            </button>
                            <button
                                form='new-menu-form'
                                type='submit'
                                className='justify-center rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                disabled={disabledButton}>
                                { disabledButton ? 'Saving...' : 'Save'}
                            </button>
                    </div>
                </div>
            </dialog>
            
        </>
    
    )
}


