export const USER = {
    $id: "",
    email: "",
    emailVerification: false,
}

export type COUNTRY_TYPE = {
    $id: string,
    name: string,
    dial_code: string,
    currency_code: string,
    currency_symbol: string,
    currency_html: string
}

export const COUNTRY = {
    $id: "",
    name: "",
    dial_code: "",
    currency_code: "",
    currency_symbol: "",
    currency_html: ""
}


export type MENU_TYPE = {
    $id: string,
    //user_id: "",
    menu_name: string,
    slogan: string,
    country_id: COUNTRY_TYPE,
    phone: string,
    address: string,
    profile_link: string,
    is_delete: boolean,
    is_active: boolean,
    show_item_type: boolean,
    logo_id: string,
    logo_name: string,
    note: string
}

export const MENU = {
    $id: "",
    //user_id: "",
    menu_name: "",
    slogan: "",
    country_id: {$id:"", name: "", dial_code: "", currency_code: "", currency_symbol: "",  currency_html: ""},
    phone: "",
    address: "",
    profile_link: "",
    is_delete: false,
    is_active: true,
    show_item_type: false,
    logo_id: "",
    logo_name: "",
    note: ""
}

export type CATEGORY_TYPE = {
    $id: string,
    //user_id: "",
    //menu_id: "",
    order_no: number,
    category_name: string,
    no_of_price_cols: number,
    price_col_name1: string,
    price_col_name2: string,
    is_active: boolean
}

export const CATEGORY = {
    $id: "",
    //user_id: "",
    //menu_id: "",
    order_no: 0,
    category_name: "",
    no_of_price_cols: 1,
    price_col_name1: '',
    price_col_name2: '',
    is_active: true
}

export type ITEM_TYPE = {
    $id: string,
    //user_id: "",
    //menu_id: "",
    //category_id: "",
    order_no: number,
    item_name: string,
    price1: number,
    price2: number,
    type: string,
    tag: string,
    description: string,
    is_active: boolean
}

export const ITEM = {
    $id: "",
    //user_id: "",
    //menu_id: "",
    //category_id: "",
    order_no: 0,
    item_name: "",
    price1: 0,
    price2: 0,
    type: "none",
    tag: "none",
    description:"",
    is_active: true
}

export type THEME_TYPE = {
    $id: string,
    menu_id: string,

    title_font_family: string, 
    subtitle_font_family: string, 
    item_font_family: string, 
    price_font_family: string,
    description_font_family: string,
    category_font_family: string,

    navbar_shadow_color: string, 

    title_txt_transform: string, 
    subtitle_txt_transform: string, 
    item_txt_transform: string, 
    description_txt_transform: string, 
    category_txt_transform: string, 

    navbar_bg_color: string, 
    card_bg_color: string, 
    dial_bg_color: string,
    drawer_bg_color: string,

    title_txt_color: string, 
    subtitle_txt_color: string, 
    item_txt_color: string, 
    price_txt_color: string,
    currency_txt_color: string,
    description_txt_color: string,
    category_txt_color: string,

    title_txt_size: string,
    subtitle_txt_size: string,
    item_txt_size: string,
    description_txt_size: string,
    currency_txt_size: string,
    price_txt_size: string,
    category_txt_size: string,

    title_txt_weight: string,
    subtitle_txt_weight: string,
    item_txt_weight: string,
    description_txt_weight: string,
    currency_txt_weight: string,
    price_txt_weight: string,
    category_txt_weight: string,

    border_size: string,
    border_color: string,

    drawer_open_icon_color: string,
    drawer_close_icon_color: string,
    note_icon_color: string
};

export const THEME = {
    $id: '',
    menu_id: '',

    title_font_family: 'Oswald', 
    subtitle_font_family: 'Roboto-Condensed', 
    item_font_family: 'Oswald', 
    price_font_family: 'Oswald',
    description_font_family: 'Roboto-Condensed',
    category_font_family: 'Oswald',

    title_txt_transform: 'normal-case', 
    subtitle_txt_transform: 'normal-case', 
    item_txt_transform: 'normal-case', 
    description_txt_transform: 'normal-case', 
    category_txt_transform: 'normal-case', 

    navbar_bg_color: 'bg-orange-200', 
    card_bg_color: 'bg-orange-200', 
    dial_bg_color: 'bg-orange-300',
    drawer_bg_color: 'bg-orange-300',
    
    navbar_shadow_color: 'shadow-orange-300', 

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
    border_color: 'border-orange-300',

    drawer_open_icon_color: 'text-white',
    drawer_close_icon_color: 'text-white',
    note_icon_color: 'bg-orange-300'
};

