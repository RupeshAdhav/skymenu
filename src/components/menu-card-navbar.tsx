/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { getLogo } from '@/appwrite/appwrite-functions';
import '@/style/googleFont.css';
import { useEffect, useState } from 'react';

export default function MenuCardNavbar(props: any) {
    const [logoUrl, setLogoUrl] = useState<any>();
    const [toShow, setToShow] = useState<any>('note');

    const handleModal = (toShow :string) => {
        setToShow(toShow);
        props.toggleModal();
    } 

    useEffect(() => {
        let tempLogoUrl = getLogo(props.menu.logo_id);
        if(!tempLogoUrl.toString().includes('storage_file_not_found')){
            setLogoUrl(tempLogoUrl);
        }
    }, []);
    

    return (
        <>
            <div className={`h-[9%] navbar sticky top-0 shadow-md lg:px-4 ${props.theme.navbar_bg_color} ${props.theme.navbar_shadow_color}`}>
                <div className={`flex justify-between w-full`}>
                    <div className='flex'>
                        { logoUrl && props.menu.logo_id ? 
                            
                                <img 
                                    src={logoUrl}
                                    alt={props.menu.menu_name} 
                                    className="inline-block h-9 w-9" onClick={() => handleModal('logo')}/>
                            :
                            <></>
                        }

                        <div className={`flex flex-col ${logoUrl && props.menu.logo_id ? 'pl-2' : ''}`}>
                            <p className={`${props.theme.title_font_family} ${props.theme.title_txt_color} ${props.theme.title_txt_transform} ${props.theme.title_txt_weight} ${props.theme.title_txt_size}`}>
                                {props?.menu?.menu_name}
                            </p>
                            <p className={`${props.theme.subtitle_font_family} ${props.theme.subtitle_txt_color} ${props.theme.subtitle_txt_transform} ${props.theme.subtitle_txt_weight} ${props.theme.subtitle_txt_size}`}>
                                {props?.menu?.slogan}
                            </p>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-xs btn-ghost hover:bg-transparent pt-2 pr-0" type='button' onClick={() => handleModal('note')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`h-6 w-6 ${props.theme.note_icon_color}`}><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            <dialog id="profile-menu-modal" className={`modal ${props.modal ? "modal-open" : "modal-close"}`}>
                <div className="modal-box rounded p-0">
                     { toShow === 'note' ?
                        <div className="border-b py-3 px-5">
                            <h1 className={`${props.theme.item_font_family} text-lg text-center text-gray-900`}>Note</h1>
                        </div>
                        :<></>
                     }
                    <div className="px-5 py-4">
                        { toShow === 'logo' ? 
                            <img 
                                src={logoUrl}
                                alt={props.menu.menu_name} 
                                className="inline-block w-100"/>
                            : 
                            <div className={`${props.theme.item_font_family} font-normal `}>
                                {props.menu.note}
                            </div>
                        }
                    </div>
                    <div className="border-t py-3 flex justify-end px-4 gap-3">
                        <button 
                            type="button" 
                            className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-light rounded-md text-sm px-5 py-1`}
                            onClick={props.toggleModal}>
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    )
}
