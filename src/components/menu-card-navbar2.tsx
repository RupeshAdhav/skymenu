/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */


export default function MenuCardNavbar2(props: any) {
    
    return (
        <>
            <div className="navbar lg:px-5 border-b">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Tailwind-CSS-Avatar-component" />
                        </div>
                    </div>
                     <div>
                        <p>{props?.menu?.menu_name}</p>
                        <p className="text-xs">{props?.menu?.slogan}Family Restaurant</p>
                    </div>
                </div>
            </div>
        </>
    )
}
