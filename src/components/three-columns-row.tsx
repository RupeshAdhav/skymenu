import '@/style/googleFont.css';

export default function ThreeColumnRow(props: any) {
    return (
        <>
            { (props.item.type === "veg" && props.itemType === "veg") 
                || (props.item.type === "nonveg" && props.itemType === "nonveg") ||
                (props.item.type === "egg" && props.itemType === "egg") || props.itemType === "none" || props.item.type === "none" ? 
                <>
                        
                    <div className="grid grid-cols-5 border-b-0 px-3 pt-3">
                        <div className="col-span-3 pb-0 text-left">
                            <span className={`${props.theme.item_font_family} ${props.theme.item_txt_color} ${props.theme.item_txt_transform} ${props.theme.item_txt_weight} ${props.theme.item_txt_size}`}>{props.item.item_name}</span>
                            {props.item.tag === "special" ? <>{" "}<a className="bg-yellow-500 text-white badge badge-sm cursor-none m-0">SPECIAL</a></> : ""}
                            {props.item.tag === "best seller" ? <>{" "}<a className="bg-red-500 text-white badge badge-sm cursor-none">BEST SELLER</a></> : ""}
                            {props.item.tag === "must try" ? <>{" "}<a className="bg-blue-500 text-white badge badge-sm cursor-none">MUST TRY</a></> : ""}
                        </div>
                        <div className="col-span-1 pb-0 text-right">
                            <span className={`${props.theme.price_font_family} ${props.theme.currency_txt_color} ${props.theme.currency_txt_weight} ${props.theme.currency_txt_size}`}>{props.menu.country_id.currency_symbol}</span>
                            <span className={`${props.theme.price_font_family} ${props.theme.price_txt_color} ${props.theme.price_txt_weight} ${props.theme.price_txt_size}`}>{props.item.price1}</span>
                        </div>
                        <div className="col-span-1 pb-0 text-right">
                            <span className={`${props.theme.price_font_family} ${props.theme.currency_txt_color} ${props.theme.currency_txt_weight} ${props.theme.currency_txt_size}`}>{props.menu.country_id.currency_symbol}</span>
                            <span className={`${props.theme.price_font_family} ${props.theme.price_txt_color} ${props.theme.price_txt_weight} ${props.theme.price_txt_size}`}>{props.item.price2}</span>
                        </div>
                    </div>
                    <div className={`grid grid-cols-5 ${props.theme.border_size} ${props.theme.border_color} px-3 pb-3`}>
                        <div className="col-span-3 text-left">
                            <span className={`${props.theme.description_font_family} ${props.theme.description_txt_color} ${props.theme.description_txt_transform} ${props.theme.description_txt_weight} ${props.theme.description_txt_size}`}>
                                {props.item.description}
                            </span>
                        </div>
                        <div className='col-span-1'>
                            
                        </div>
                        <div className='col-span-1'>
                            
                        </div>
                    </div>
                                              
                </>
            : <></> }
            
            {props.isLast ? 
                <div className="h-24">

                </div>
                : <></>
            }
        </>
    )
}