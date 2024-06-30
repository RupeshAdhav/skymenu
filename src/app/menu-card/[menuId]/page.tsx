'use client';

import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';

import '@/style/scrollbar.css';
import '@/style/googleFont.css';
import { MENU, THEME, MENU_TYPE,  ITEM_TYPE, CATEGORY_TYPE } from '@/appwrite/initial-values';
import { getMenu, getCategoriesForMenuCard, getItemsForMenuCard, getTheme } from '@/appwrite/appwrite-functions';
import MenuCardNavbar from '@/components/menu-card-navbar'
import Spinner from '@/components/spinner';
import ThreeColumnRow from '@/components/three-columns-row';
import TwoColumnRow from '@/components/two-columns-row';


export default function MenuCard({params} : {params:any}) {
    const [theme, setTheme] = useState(THEME);
    const [menu, setMenu] = useState(MENU);
    const [items, setItems] = useState(new Map());
    const [categories, setCategories] = useState(new Map());
    const [currentCategory, setCurrentCategory] = useState<any>();
    const [currentItems, setCurrentItems] = useState<any>();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [itemType, setItemType] = useState("none");
    const [openLogoModal, setLogoModel] = useState(false);

    const handleDrawer = () => {
        setToggleDrawer(!toggleDrawer);
    }  

    const handleCategory = (index: any) => {
        setCategoryIndex(parseInt(index));
        setCurrentCategory(categories.get(parseInt(index)));
        setCurrentItems(items.get(parseInt(index)));
        handleDrawer();
    }

    const handleItemType = (item_type: string) => {
        setItemType(item_type);
        handleDrawer();
    }

    const toggleLogoModal = () => {
        setLogoModel(!openLogoModal);
    } 

    const initCategories = () => {
        
            getCategoriesForMenuCard(params.menuId)
            .then((catResponse: any) => {
                const catSnap = catResponse.documents.map((d: CATEGORY_TYPE) => ({ id: d.$id, ...d }));
                
                if(catSnap.length > 0){

                    for(let i = 0; i < catSnap.length; i++){

                        getItemsForMenuCard(params.menuId, catSnap[i].$id)
                        .then((itemResponse: any) => {
                            let itemsData = itemResponse.documents.map((d: ITEM_TYPE) => ({ id: d.$id, ...d }));
                           
                            // setData((previous: any) => [...previous, 
                            //     {'category':catSnap[i], 'items':itemsData}
                            // ]);
                            setCategories(new Map(categories.set(i,catSnap[i])));
                            setItems(new Map(items.set(i,itemsData)));

                            if(i === 0){
                                setCurrentCategory(catSnap[0]);
                                setCurrentItems(itemsData);
                            }
                            if(i === catSnap.length - 1){
                                setDataLoaded(true);
                            }

                        })
                        .catch((err: any) => {
                            toast.error(err?.response?.message); 
                        }); 
                    }

                }else{
                    setDataLoaded(true);
                }

            })
            .catch((err: any) => {
                toast.error(err?.response?.message); 
                setDataLoaded(true);
            }); 
       
    }

    const initMenu = () => {
        getMenu(params.menuId)
        .then((response: any) => {

            const menuSnap = response.documents.map((d :MENU_TYPE) => ({ id: d.$id, ...d }));
            setMenu(menuSnap[0]);
            initCategories();

        })
        .catch((err: any) => {
            toast.error(err?.response?.message); 
        }); 
        
    }

    const initTheme = () => {
        getTheme(params.menuId)
        .then((response: any) => {
            //const themeSnap = response.documents.map((d :THEME_TYPE) => ({ id: d.$id, ...d }));
            let temp = [];
            for(let i = 0; i < response.documents.length; i++){
                temp.push({
                    $id: response.documents[i].$id,
                    menu_id: response.documents[i].menu_id,
                
                    title_font_family: response.documents[i].title_font_family, 
                    subtitle_font_family: response.documents[i].subtitle_font_family, 
                    item_font_family: response.documents[i].item_font_family, 
                    price_font_family: response.documents[i].price_font_family,
                    description_font_family: response.documents[i].description_font_family,
                    category_font_family: response.documents[i].category_font_family,
                
                    title_txt_transform: response.documents[i].title_txt_transform, 
                    subtitle_txt_transform: response.documents[i].subtitle_txt_transform, 
                    item_txt_transform: response.documents[i].item_txt_transform, 
                    description_txt_transform: response.documents[i].description_txt_transform, 
                    category_txt_transform: response.documents[i].category_txt_transform, 
                
                    navbar_bg_color: response.documents[i].navbar_bg_color, 
                    card_bg_color: response.documents[i].card_bg_color, 
                    dial_bg_color: response.documents[i].dial_bg_color,
                    drawer_bg_color: response.documents[i].drawer_bg_color,
                    
                    navbar_shadow_color: response.documents[i].navbar_shadow_color, 
                
                    title_txt_color: response.documents[i].title_txt_color, 
                    subtitle_txt_color: response.documents[i].subtitle_txt_color, 
                    item_txt_color: response.documents[i].item_txt_color, 
                    price_txt_color: response.documents[i].price_txt_color,
                    currency_txt_color: response.documents[i].currency_txt_color,
                    description_txt_color: response.documents[i].description_txt_color,
                    category_txt_color: response.documents[i].category_txt_color,
                
                    title_txt_size: response.documents[i].title_txt_size,
                    subtitle_txt_size: response.documents[i].subtitle_txt_size,
                    item_txt_size: response.documents[i].item_txt_size,
                    description_txt_size: response.documents[i].description_txt_size,
                    currency_txt_size: response.documents[i].currency_txt_size,
                    price_txt_size: response.documents[i].price_txt_size,
                    category_txt_size: response.documents[i].category_txt_size,
                
                    title_txt_weight: response.documents[i].title_txt_weight,
                    subtitle_txt_weight: response.documents[i].subtitle_txt_weight,
                    item_txt_weight: response.documents[i].item_txt_weight,
                    description_txt_weight: response.documents[i].description_txt_weight,
                    currency_txt_weight: response.documents[i].currency_txt_weight,
                    price_txt_weight: response.documents[i].price_txt_weight,
                    category_txt_weight: response.documents[i].category_txt_weight,
                
                    border_size: response.documents[i].border_size,
                    border_color: response.documents[i].border_color,
                
                    drawer_open_icon_color: response.documents[i].drawer_open_icon_color,
                    drawer_close_icon_color: response.documents[i].drawer_close_icon_color
                });
            }
            setTheme(temp[0]);
            
        })
        .catch((err: any) => {
            toast.error(err?.response?.message); 
        }); 
        
    }


    useEffect(() => {
        if(params.menuId){
            initMenu();
            initTheme();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      
        <>
            { dataLoaded ? 
                    
                    <div className={`relative ${theme.card_bg_color} h-screen`}>

                        <MenuCardNavbar menu={menu} theme={theme} modal={openLogoModal} toggleModal={toggleLogoModal}/>

                        <div className='h-[91%] overflow-y-auto no-scrollbar'>
                            
                                { 
                                    currentCategory && currentCategory?.$id !== '' ?
                                        <div className='flex justify-between pt-3 pb-1 px-4'>
                                            <p className={`text-xs ${theme.item_font_family} ${theme.item_txt_color}`}>
                                                {currentCategory.category_name}
                                            </p>
                                            <p className={`${currentCategory.no_of_price_cols > 1 ? 'visible' : 'invisible'} text-xs ${theme.price_font_family} ${theme.price_txt_color}`}>
                                                {currentCategory.price_col_name1+" / "+ currentCategory.price_col_name2}
                                            </p>
                                        </div>
                                    :  <></>
                                }

                                {
                                    currentItems && currentItems.length > 0 ?
                                            <>
                                                {currentItems.map((itm :any, index :number) => {
                                                    const isLast = index === (currentItems.length - 1) ? true : false;
                                                    return (
                                                        <div key={index}>
                                                            { 
                                                                currentCategory?.no_of_price_cols === 2 ?
                                                                    <ThreeColumnRow item={itm} isLast={isLast} menu={menu} theme={theme} itemType={itemType}/>
                                                                : 
                                                                    <TwoColumnRow item={itm} isLast={isLast} menu={menu} theme={theme} itemType={itemType}/>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                            </>
                                        :
                                            <p className={`text-center text-base pt-10 ${theme.item_txt_color} ${theme.item_font_family}`}>No items to show</p>
                                }
                                
                                <div className='absolute bottom-4 right-4'>
                                    <button onClick={handleDrawer} type='button' className={`btn btn-circle btn-md ${theme.drawer_bg_color} border-none`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-6 h-6 ${theme.category_txt_color} `}>
                                            <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className={`${toggleDrawer ? 'translate-y-0':'translate-y-full'} transition duration-150 w-full fixed block bottom-0 z-40 h-[50%] ${theme.drawer_bg_color} card rounded-none`} id="drawer-bottom" tabIndex={-1}>
                                    <div className='h-full relative'>

                                        { toggleDrawer === true ? 
                                            <div className='absolute inset-x-0 -top-8 text-right'>
                                                {/* <button onClick={handleDrawer} className="btn btn-xs btn-ghost">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`h-5 w-5 ${theme.drawer_bg_color.replace("bg","text")}`}><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
                                                </button> */}
                                                <button onClick={handleDrawer} className="btn btn-xs btn-ghost">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${theme.drawer_bg_color.replace("bg","text")}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                            </div>
                                        : '' }

                                        <div className={` ${menu.show_item_type ? 'flex justify-center h-[10%] px-4' : 'hidden'}`}>
                                        
                                            <div className='flex gap-3 pt-3'>
                                                { itemType === "none" ? 
                                                    <a className={`${theme.card_bg_color} ${theme.category_font_family} ${theme.item_txt_color} badge badge-sm cursor-pointer`}>ALL</a>
                                                :    
                                                    <a onClick={() => handleItemType("none")} className={`${theme.drawer_bg_color} ${theme.category_font_family} ${theme.category_txt_color} badge badge-sm cursor-pointer`}>ALL</a>
                                                }
                                                { itemType === "veg" ? 
                                                    <a className={`${theme.category_font_family} bg-green-500 text-white border-green-500 badge badge-sm cursor-pointer`}>VEG</a>
                                                :
                                                    <a onClick={() => handleItemType("veg")} className={`${theme.drawer_bg_color} ${theme.category_font_family} ${theme.category_txt_color} badge badge-sm cursor-pointer`}>VEG</a>
                                                }
                                                { itemType === "egg" ? 
                                                    <a className={`${theme.category_font_family} bg-orange-400 text-white border-orange-400 badge badge-sm cursor-pointer`}>EGG</a>
                                                :
                                                    <a onClick={() => handleItemType("egg")} className={`${theme.drawer_bg_color} ${theme.category_font_family} ${theme.category_txt_color} badge badge-sm cursor-pointer`}>EGG</a>
                                                }
                                                { itemType === "nonveg" ? 
                                                    <a className={`${theme.category_font_family} bg-red-500 text-white border-red-500 badge badge-sm cursor-pointer`}>NON-VEG</a>
                                                :
                                                    <a onClick={() => handleItemType("nonveg")} className={`${theme.drawer_bg_color} ${theme.category_font_family} ${theme.category_txt_color} badge badge-sm cursor-pointer`}>NON-VEG</a>
                                                }
                                            </div>
                                            
                                        </div>

                                        <div className={` ${menu.show_item_type ? 'h-[90%]' : 'h-[100%] pt-4'} pb-10 overflow-y-auto no-scrollbar`}>
                                            { 
                                                categories && categories.size > 0 ? 
                                                    <>
                                                        {[...categories.keys()].map((cat :any, index :number) => (
                                                            <div onClick={() => handleCategory(index)} className={`flex justify-between py-2 px-5 ${theme.category_font_family} ${theme.category_txt_color} ${theme.category_txt_transform} ${theme.category_txt_weight} ${theme.category_txt_size}`} key={index}>
                                                                <span className={`${categoryIndex === index ? "after:content-['_✓']" : ""} cursor-pointer`}>{categories.get(index)?.category_name}</span>
                                                                <span className='cursor-pointer'>{items.get(index)?.length}</span>
                                                            </div>
                                                        ))}
                                                    </>
                                                : 
                                                    <p className={`text-center text-base pt-10 ${theme.category_txt_color} ${theme.category_font_family}`}>No categories</p>
                                            }
                                        </div>
                                        
                                    </div>
                                </div>

                        </div>

                    </div>
                    
                : 
                    <Spinner/>
            }
        </>
                           
    );
}

