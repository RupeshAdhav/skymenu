/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import '@/style/googleFont.css';

export default function MenuCardNavbar(props: any) {
    
    return (
        <>
            <div className={`h-[9%] navbar sticky top-0 shadow-md lg:px-5 ${props.theme.navbar_bg_color} ${props.theme.navbar_shadow_color}`}>
                <div className='flex justify-center	w-full'>
                    {/* <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Tailwind-CSS-Avatar-component" />
                        </div>
                    </div> */}
                     <div className='flex flex-col items-center'>
                        <p className={`${props.theme.title_font_family} ${props.theme.title_txt_color} ${props.theme.title_txt_transform} ${props.theme.title_txt_weight} ${props.theme.title_txt_size}`}>
                            {props?.menu?.menu_name}
                        </p>
                        <p className={`${props.theme.subtitle_font_family} ${props.theme.subtitle_txt_color} ${props.theme.subtitle_txt_transform} ${props.theme.subtitle_txt_weight} ${props.theme.subtitle_txt_size}`}>
                            {props?.menu?.slogan}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
