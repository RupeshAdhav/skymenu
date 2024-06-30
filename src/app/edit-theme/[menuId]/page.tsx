'use client';

import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import '@/style/scrollbar.css';
import '@/style/googleFont.css';
import { UserAuth } from '@/app/context/user';
import { MENU, THEME, MENU_TYPE,  ITEM_TYPE, CATEGORY_TYPE, THEME_TYPE } from '@/appwrite/initial-values';
import { getMenu, getCategoriesForMenuCard, getItemsForMenuCard, getTheme, updateTheme } from '@/appwrite/appwrite-functions';
import MenuCardNavbar from '@/components/menu-card-navbar'
import Spinner from '@/components/spinner';
import ThreeColumnRow from '@/components/three-columns-row';
import TwoColumnRow from '@/components/two-columns-row';
import Navbar from '@/components/navbar';
import VerifyEmailView from '@/components/verify-email-view';



export default function EditTheme({params} : {params:any}) {
    const { user, userLoading } = UserAuth();
    const [theme, setTheme] = useState(THEME);
    const [menu, setMenu] = useState(MENU);
    const [items, setItems] = useState(new Map());
    const [categories, setCategories] = useState(new Map());
    const [currentCategory, setCurrentCategory] = useState<any>();
    const [currentItems, setCurrentItems] = useState<any>();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [themeStyle, setThemeStyle] = useState(1);
    const [itemType, setItemType] = useState("none");
    const [openLogoModal, setLogoModel] = useState(false);
    const router = useRouter();

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
                    drawer_close_icon_color: response.documents[i].drawer_close_icon_color,
                    note_icon_color: response.documents[i].note_icon_color
                });
            }
            setTheme(temp[0]);
            
        })
        .catch((err: any) => {
            toast.error(err?.response?.message); 
        }); 
        
    }

    const handleTheme = (e :any) => {
        setTheme({...theme, [e.target.name]:e.target.value});
        if((e.target.name === 'drawer_bg_color' 
            || e.target.name === 'category_txt_color' 
            || e.target.name === 'drawer_close_icon_color'
            || e.target.name === 'category_txt_transform'
            || e.target.name === 'category_txt_weight'
            || e.target.name === 'category_txt_size'
            || e.target.name === 'category_font_family')
            && toggleDrawer === false){
            handleDrawer();
        }
        if((e.target.name === 'dial_bg_color' || e.target.name === 'drawer_open_icon_color') && toggleDrawer === true){
            handleDrawer();
        }
    }

    const saveTheme = (e :any) => {
        setDisabledButton(true);
        updateTheme(theme)
        .then(function (response) {
            initTheme();
            setDisabledButton(false);
            toast.success('Theme update succesfully');
        })
        .catch((err: any) => {
            setDisabledButton(false);
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
            { userLoading ? 
                    <Spinner/>
                :
                    <>
                        { user?.emailVerification ? 
                                <>
                                   
                                    { dataLoaded ? 
                                        <>
                                            <div className="hidden lg:flex w-full flex-row h-screen bg-slate-100 ">

                                                <div className="px-10 pt-5 w-1/3 h-full">
                                                   
                                                    <button 
                                                        type='button'
                                                        onClick={() => router.replace('/menu')}
                                                        className="rounded-none border border-black bg-slate-100 text-black px-8 py-2">
                                                        Back
                                                    </button>

                                                    <div className="flex flex-col text-center gap-5 pt-20">
                                                        <a onClick={() => setThemeStyle(1)} className={`${themeStyle === 1 ? 'text-2xl font-bold text-blue-500' : 'text-lg font-light'} cursor-pointer`}>
                                                            Font Family
                                                        </a>
                                                        <a onClick={() => setThemeStyle(2)} className={`${themeStyle === 2 ? 'text-2xl font-bold text-blue-500' : 'text-lg font-light'} cursor-pointer`}>
                                                            Background Color
                                                        </a>
                                                        <a onClick={() => setThemeStyle(3)} className={`${themeStyle === 3 ? 'text-2xl font-bold text-blue-500' : 'text-lg font-light'} cursor-pointer`}>
                                                            Text Color
                                                        </a>
                                                        <a onClick={() => setThemeStyle(4)} className={`${themeStyle === 4 ? 'text-2xl font-bold text-blue-500' : 'text-lg font-light'} cursor-pointer`}>
                                                            Note/Info Icon Color
                                                        </a>
                                                        <a onClick={() => setThemeStyle(5)} className={`${themeStyle === 5 ? 'text-2xl font-bold text-blue-500' : 'text-lg font-light'} cursor-pointer`}>
                                                            Border Size & Color
                                                        </a>
                                                        <a onClick={() => setThemeStyle(6)} className={`${themeStyle === 6 ? 'text-2xl font-bold text-blue-500' : 'text-lg font-light'} cursor-pointer`}>
                                                            Text Size
                                                        </a>
                                                        <a onClick={() => setThemeStyle(7)} className={`${themeStyle === 7 ? 'text-2xl font-bold text-blue-500' : 'text-lg font-light'} cursor-pointer`}>
                                                            Text Weight
                                                        </a>
                                                        <a onClick={() => setThemeStyle(8)} className={`${themeStyle === 8 ? 'text-2xl font-bold text-blue-500' : 'text-lg font-light'} cursor-pointer`}>
                                                            Text Transform
                                                        </a>
                                                    </div>

                                                </div>
                                                    
                                                {/* Menu Card */}
                                                <div className="w-1/3 shadow-lg shadow-slate-400 h-full">
                                                    <div className={`relative ${theme.card_bg_color} h-full`}>

                                                        <MenuCardNavbar menu={menu} theme={theme} modal={openLogoModal} toggleModal={toggleLogoModal}/>

                                                        <div className='h-[91%] overflow-y-auto no-scrollbar'>
                                                            
                                                                { 
                                                                currentCategory && currentCategory?.$id !== '' ?
                                                                        <div className='flex justify-between pt-3 pb-1 px-3'>
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
                                                                
                                                                <div className={`${toggleDrawer ? 'translate-y-0':'translate-y-full'} transition duration-150 w-1/3 fixed block bottom-0 z-40 h-[50%] ${theme.drawer_bg_color} card rounded-none`} id="drawer-bottom" tabIndex={-1}>
                                                                    <div className='h-full relative'>

                                                                        { toggleDrawer === true ? 
                                                                            <div className='absolute inset-x-0 -top-8 text-right'>
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
                                                </div>

                                                <div className="px-10 pt-5 w-1/3 h-full">
                                                    
                                                    <div className='text-right'>
                                                        <button 
                                                            type="button" 
                                                            className="rounded-none bg-blue-500 text-white px-8 py-2"
                                                            onClick={saveTheme}
                                                            disabled={disabledButton}>
                                                            {disabledButton ? 'Saving...' : 'Save' }
                                                        </button>
                                                    </div>
                                                    
                                                    
                                                    {
                                                        themeStyle === 1 ? 
                                                            <div className='flex flex-col gap-5 px-20 pt-16'>
                                                                <div>
                                                                    <label htmlFor="title_font_family" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Restaurant/Hotel Name
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.title_font_family} 
                                                                            onChange={handleTheme} 
                                                                            id="title_font_family"
                                                                            name="title_font_family" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {FONT_FAMILY.map((fontFamily, index) => {
                                                                                    return (
                                                                                        <option value={fontFamily} key={fontFamily} className={`${fontFamily}`}>
                                                                                            {fontFamily}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 text-lg ${theme.title_font_family}`}>Aa</p> 
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="subtitle_font_family" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Slogan
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.subtitle_font_family} 
                                                                            onChange={handleTheme} 
                                                                            id="subtitle_font_family"
                                                                            name="subtitle_font_family" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {FONT_FAMILY.map((fontFamily, index) => {
                                                                                    return (
                                                                                        <option value={fontFamily} key={fontFamily} className={`${fontFamily}`}>
                                                                                            {fontFamily}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 text-lg ${theme.subtitle_font_family}`}>Aa</p> 
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="item_font_family" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Item Name
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.item_font_family} 
                                                                            onChange={handleTheme} 
                                                                            id="item_font_family"
                                                                            name="item_font_family" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {FONT_FAMILY.map((fontFamily, index) => {
                                                                                    return (
                                                                                        <option value={fontFamily} key={fontFamily} className={`${fontFamily}`}>
                                                                                            {fontFamily}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 text-lg ${theme.item_font_family}`}>Aa</p> 
                                                                    </span>
                                                                </div>
                                                                {/* <div>
                                                                    <label htmlFor="currency_txt_color" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Currency Symbol
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.currency_txt_color} 
                                                                            onChange={handleTheme} 
                                                                            id="currency_txt_color"
                                                                            name="currency_txt_color" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {FONT_FAMILY.map((fontFamily, index) => {
                                                                                    return (
                                                                                        <option value={fontFamily} key={fontFamily} className={`${fontFamily}`}>
                                                                                            {fontFamily}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 font-bold text-lg ${theme.currency_txt_color}`}>Aa</p> 
                                                                    </span>
                                                                </div> */}
                                                                <div>
                                                                    <label htmlFor="price_font_family" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Price
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.price_font_family} 
                                                                            onChange={handleTheme} 
                                                                            id="price_font_family"
                                                                            name="price_font_family" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {FONT_FAMILY.map((fontFamily, index) => {
                                                                                    return (
                                                                                        <option value={fontFamily} key={fontFamily} className={`${fontFamily}`}>
                                                                                            {fontFamily}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 text-lg ${theme.price_font_family}`}>Aa</p> 
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="description_font_family" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Description
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.description_font_family} 
                                                                            onChange={handleTheme} 
                                                                            id="description_font_family"
                                                                            name="description_font_family" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300 ${theme.description_txt_color}">
                                                                            {FONT_FAMILY.map((fontFamily, index) => {
                                                                                    return (
                                                                                        <option value={fontFamily} key={fontFamily} className={`${fontFamily}`}>
                                                                                            {fontFamily}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 text-lg ${theme.description_font_family}`}>Aa</p> 
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="category_font_family" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Category
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.category_font_family} 
                                                                            onChange={handleTheme} 
                                                                            id="category_font_family"
                                                                            name="category_font_family" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {FONT_FAMILY.map((fontFamily, index) => {
                                                                                    return (
                                                                                        <option value={fontFamily} key={fontFamily} className={`${fontFamily}`}>
                                                                                            {fontFamily}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 text-lg ${theme.category_font_family}`}>Aa</p> 
                                                                    </span>
                                                                </div>
                                                            </div>
                                                         : <></>
                                                    }

                                                    {
                                                        themeStyle === 2 ? 
                                                            <div className='flex flex-col gap-5 px-20 pt-10'>
                                                                <div>
                                                                    <label htmlFor="navbar_bg_color" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Navbar
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.navbar_bg_color} 
                                                                            onChange={handleTheme} 
                                                                            id="navbar_bg_color"
                                                                            name="navbar_bg_color" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {BG_COLORS.map((bgColor, index) => {
                                                                                    return (
                                                                                        <option value={bgColor} key={bgColor} className={`${bgColor}`}>
                                                                                            {bgColor}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <div className={`w-7 my-1 ml-2 border-[1px] border-gray-300 ${theme.navbar_bg_color}`}></div>
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="navbar_shadow_color" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Navbar Shadow
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.navbar_shadow_color} 
                                                                            onChange={handleTheme} 
                                                                            id="navbar_shadow_color"
                                                                            name="navbar_shadow_color" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {SHADOW_COLORS.map((shadowColor, index) => {
                                                                                    return (
                                                                                        <option value={shadowColor} key={shadowColor} className={`${shadowColor.replace('shadow', 'bg')}`}>
                                                                                            {shadowColor}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select>
                                                                        <div className={`w-7 my-1 ml-2 border-[1px] border-gray-300 ${theme.navbar_shadow_color.replace('shadow', 'bg')}`}></div> 
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="card_bg_color" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Card
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.card_bg_color} 
                                                                            onChange={handleTheme} 
                                                                            id="card_bg_color"
                                                                            name="card_bg_color" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {BG_COLORS.map((bgColor, index) => {
                                                                                    return (
                                                                                        <option value={bgColor} key={bgColor} className={`${bgColor}`}>
                                                                                            {bgColor}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <div className={`w-7 my-1 ml-2 border-[1px] border-gray-300 ${theme.card_bg_color}`}></div> 
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="drawer_bg_color" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Category Bottom Drawer
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.drawer_bg_color} 
                                                                            onChange={handleTheme} 
                                                                            id="drawer_bg_color"
                                                                            name="drawer_bg_color" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {BG_COLORS.map((bgColor, index) => {
                                                                                    return (
                                                                                        <option value={bgColor} key={bgColor} className={`${bgColor}`}>
                                                                                            {bgColor}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select>
                                                                        <div className={`w-7 my-1 ml-2 border-[1px] border-gray-300 ${theme.drawer_bg_color}`}></div> 
                                                                    </span>
                                                                </div>
                                                                {/* <div>
                                                                    <label htmlFor="dial_bg_color" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Category Button
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.dial_bg_color} 
                                                                            onChange={handleTheme} 
                                                                            id="dial_bg_color"
                                                                            name="dial_bg_color" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {BG_COLORS.map((bgColor, index) => {
                                                                                    return (
                                                                                        <option value={bgColor} key={bgColor} className={`${bgColor}`}>
                                                                                            {bgColor}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <div className={`w-7 my-1 ml-2 border-[1px] border-gray-300 ${theme.dial_bg_color}`}></div> 
                                                                    </span>
                                                                </div> */}
                                                            </div>
                                                         : <></>
                                                    }

                                                    {
                                                        themeStyle === 3 ? 
                                                            <div className='flex flex-col gap-5 px-20 pt-10'>
                                                                <div>
                                                                    <label htmlFor="title_txt_color" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Restaurant/Hotel Name
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.title_txt_color} 
                                                                            onChange={handleTheme} 
                                                                            id="title_txt_color"
                                                                            name="title_txt_color" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_COLORS.map((txtColor, index) => {
                                                                                    return (
                                                                                        <option value={txtColor} key={txtColor} className={`${txtColor}`}>
                                                                                            {txtColor}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 font-bold text-lg ${theme.title_txt_color}`}>Aa</p> 
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="subtitle_txt_color" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Slogan
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.subtitle_txt_color} 
                                                                            onChange={handleTheme} 
                                                                            id="subtitle_txt_color"
                                                                            name="subtitle_txt_color" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_COLORS.map((txtColor, index) => {
                                                                                    return (
                                                                                        <option value={txtColor} key={txtColor} className={`${txtColor}`}>
                                                                                            {txtColor}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 font-bold text-lg ${theme.subtitle_txt_color}`}>Aa</p> 
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="item_txt_color" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Item Name
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.item_txt_color} 
                                                                            onChange={handleTheme} 
                                                                            id="item_txt_color"
                                                                            name="item_txt_color" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_COLORS.map((txtColor, index) => {
                                                                                    return (
                                                                                        <option value={txtColor} key={txtColor} className={`${txtColor}`}>
                                                                                            {txtColor}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 font-bold text-lg ${theme.item_txt_color}`}>Aa</p> 
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="currency_txt_color" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Currency Symbol
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.currency_txt_color} 
                                                                            onChange={handleTheme} 
                                                                            id="currency_txt_color"
                                                                            name="currency_txt_color" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_COLORS.map((txtColor, index) => {
                                                                                    return (
                                                                                        <option value={txtColor} key={txtColor} className={`${txtColor}`}>
                                                                                            {txtColor}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 font-bold text-lg ${theme.currency_txt_color}`}>Aa</p> 
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="price_txt_color" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Price
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.price_txt_color} 
                                                                            onChange={handleTheme} 
                                                                            id="price_txt_color"
                                                                            name="price_txt_color" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_COLORS.map((txtColor, index) => {
                                                                                    return (
                                                                                        <option value={txtColor} key={txtColor} className={`${txtColor}`}>
                                                                                            {txtColor}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 font-bold text-lg ${theme.price_txt_color}`}>Aa</p> 
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="description_txt_color" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Description
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.description_txt_color} 
                                                                            onChange={handleTheme} 
                                                                            id="description_txt_color"
                                                                            name="description_txt_color" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300 ${theme.description_txt_color}">
                                                                            {TEXT_COLORS.map((txtColor, index) => {
                                                                                    return (
                                                                                        <option value={txtColor} key={txtColor} className={`${txtColor}`}>
                                                                                            {txtColor}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 font-bold text-lg ${theme.description_txt_color}`}>Aa</p> 
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="category_txt_color" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Category
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.category_txt_color} 
                                                                            onChange={handleTheme} 
                                                                            id="category_txt_color"
                                                                            name="category_txt_color" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_COLORS.map((txtColor, index) => {
                                                                                    return (
                                                                                        <option value={txtColor} key={txtColor} className={`${txtColor}`}>
                                                                                            {txtColor}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 font-bold text-lg ${theme.category_txt_color}`}>Aa</p> 
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        : <></>
                                                    }

                                                    {
                                                        themeStyle === 4 ? 
                                                            <div className='flex flex-col gap-5 px-20 pt-10'>
                                                                <div>
                                                                    <label htmlFor="note_icon_color" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Note Icon Color
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.note_icon_color} 
                                                                            onChange={handleTheme} 
                                                                            id="note_icon_color"
                                                                            name="note_icon_color" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_COLORS.map((txtColor, index) => {
                                                                                    return (
                                                                                        <option value={txtColor} key={txtColor} className={`${txtColor}`}>
                                                                                            {txtColor}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <div className={`w-7 my-1 ml-2 border-[1px] border-gray-300 ${theme.note_icon_color.replace('text', 'bg')}`}></div> 
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        : <></>
                                                    }

                                                    {
                                                        themeStyle === 5 ? 
                                                            <div className='flex flex-col gap-5 px-20 pt-10'>
                                                                <div>
                                                                    <label htmlFor="border_size" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Item Border Size
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.border_size} 
                                                                            onChange={handleTheme} 
                                                                            id="border_size"
                                                                            name="border_size" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {BORDER_SIZE.map((borderSize, index) => {
                                                                                    return (
                                                                                        <option value={borderSize} key={borderSize}>
                                                                                            {borderSize}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select>
                                                                        <div className={`w-7 my-1 ml-2 border-black ${theme.border_size}`}></div>  
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="border_color" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Item Border Color                                                           
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.border_color} 
                                                                            onChange={handleTheme} 
                                                                            id="border_color"
                                                                            name="border_color" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {BORDER_COLORS.map((borderColor, index) => {
                                                                                    return (
                                                                                        <option value={borderColor} key={borderColor} className={`${borderColor.replace('border', 'bg')}`}>
                                                                                            {borderColor}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <div className={`w-7 my-1 ml-2 border-[1px] border-gray-300 ${theme.border_color.replace('border', 'bg')}`}></div> 
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        : <></>
                                                    }

                                                    {
                                                        themeStyle === 6 ? 
                                                            <div className='flex flex-col gap-5 px-20 pt-10'>
                                                                <div>
                                                                    <label htmlFor="title_txt_size" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Restaurant/Hotel Name
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.title_txt_size} 
                                                                            onChange={handleTheme} 
                                                                            id="title_txt_size"
                                                                            name="title_txt_size" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_SIZE.map((txtSize, index) => {
                                                                                    return (
                                                                                        <option value={txtSize} key={txtSize} className={`${txtSize}`}>
                                                                                            {txtSize}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        {/* <p className={`ml-2 ${theme.title_txt_size}`}>Aa</p>  */}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="subtitle_txt_size" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Slogan
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.subtitle_txt_size} 
                                                                            onChange={handleTheme} 
                                                                            id="subtitle_txt_size"
                                                                            name="subtitle_txt_size" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_SIZE.map((txtSize, index) => {
                                                                                    return (
                                                                                        <option value={txtSize} key={txtSize} className={`${txtSize}`}>
                                                                                            {txtSize}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        {/* <p className={`ml-2 ${theme.subtitle_txt_size}`}>Aa</p>  */}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="item_txt_size" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Item Name
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.item_txt_size} 
                                                                            onChange={handleTheme} 
                                                                            id="item_txt_size"
                                                                            name="item_txt_size" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_SIZE.map((txtSize, index) => {
                                                                                    return (
                                                                                        <option value={txtSize} key={txtSize} className={`${txtSize}`}>
                                                                                            {txtSize}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        {/* <p className={`ml-2 ${theme.item_txt_size}`}>Aa</p>  */}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="currency_txt_size" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Currency Symbol
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.currency_txt_size} 
                                                                            onChange={handleTheme} 
                                                                            id="currency_txt_size"
                                                                            name="currency_txt_size" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_SIZE.map((txtSize, index) => {
                                                                                    return (
                                                                                        <option value={txtSize} key={txtSize} className={`${txtSize}`}>
                                                                                            {txtSize}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        {/* <p className={`ml-2 ${theme.currency_txt_size}`}>Aa</p>  */}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="price_txt_size" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Price
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.price_txt_size} 
                                                                            onChange={handleTheme} 
                                                                            id="price_txt_size"
                                                                            name="price_txt_size" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_SIZE.map((txtSize, index) => {
                                                                                    return (
                                                                                        <option value={txtSize} key={txtSize} className={`${txtSize}`}>
                                                                                            {txtSize}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        {/* <p className={`ml-2 ${theme.price_txt_size}`}>Aa</p>  */}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="description_txt_size" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Description
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.description_txt_size} 
                                                                            onChange={handleTheme} 
                                                                            id="description_txt_size"
                                                                            name="description_txt_size" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_SIZE.map((txtSize, index) => {
                                                                                    return (
                                                                                        <option value={txtSize} key={txtSize} className={`${txtSize}`}>
                                                                                            {txtSize}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        {/* <p className={`ml-2 ${theme.description_txt_size}`}>Aa</p>  */}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="category_txt_size" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Category
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.category_txt_size} 
                                                                            onChange={handleTheme} 
                                                                            id="category_txt_size"
                                                                            name="category_txt_size" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_SIZE.map((txtSize, index) => {
                                                                                    return (
                                                                                        <option value={txtSize} key={txtSize} className={`${txtSize}`}>
                                                                                            {txtSize}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        {/* <p className={`ml-2 ${theme.category_txt_size}`}>Aa</p>  */}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        : <></>
                                                    }    

                                                    {
                                                        themeStyle === 7 ? 
                                                            <div className='flex flex-col gap-5 px-20 pt-10'>
                                                                <p className='text-xs'>Note: Some text-weight do not get apply on for some font-family</p>
                                                                <div>
                                                                    <label htmlFor="title_txt_weight" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Hotel/Restaurant Name
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.title_txt_weight} 
                                                                            onChange={handleTheme} 
                                                                            id="title_txt_weight"
                                                                            name="title_txt_weight" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_WEIGHT.map((txtWeight, index) => {
                                                                                    return (
                                                                                        <option value={txtWeight} key={txtWeight} className={txtWeight}>
                                                                                            {txtWeight}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 text-lg ${theme.title_txt_weight}`}>Aa</p> 
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="subtitle_txt_weight" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Slogan                                                          
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.subtitle_txt_weight} 
                                                                            onChange={handleTheme} 
                                                                            id="subtitle_txt_weight"
                                                                            name="subtitle_txt_weight" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_WEIGHT.map((txtWeight, index) => {
                                                                                    return (
                                                                                        <option value={txtWeight} key={txtWeight} className={txtWeight}>
                                                                                            {txtWeight}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 text-lg ${theme.subtitle_txt_weight}`}>Aa</p>
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="item_txt_weight" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Item Name
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.item_txt_weight} 
                                                                            onChange={handleTheme} 
                                                                            id="item_txt_weight"
                                                                            name="item_txt_weight" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_WEIGHT.map((txtWeight, index) => {
                                                                                    return (
                                                                                        <option value={txtWeight} key={txtWeight} className={txtWeight}>
                                                                                            {txtWeight}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 text-lg ${theme.item_txt_weight}`}>Aa</p>
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="description_txt_weight" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Description                                                         
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.description_txt_weight} 
                                                                            onChange={handleTheme} 
                                                                            id="description_txt_weight"
                                                                            name="description_txt_weight" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_WEIGHT.map((txtWeight, index) => {
                                                                                    return (
                                                                                        <option value={txtWeight} key={txtWeight} className={txtWeight}>
                                                                                            {txtWeight}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 text-lg ${theme.description_txt_weight}`}>Aa</p>
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="category_txt_weight" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Category
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.category_txt_weight} 
                                                                            onChange={handleTheme} 
                                                                            id="category_txt_weight"
                                                                            name="category_txt_weight" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_WEIGHT.map((txtWeight, index) => {
                                                                                    return (
                                                                                        <option value={txtWeight} key={txtWeight} className={txtWeight}>
                                                                                            {txtWeight}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        <p className={`ml-2 mt-1 text-lg ${theme.category_txt_weight}`}>Aa</p>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        : <></>
                                                    }

                                                    {
                                                        themeStyle === 8 ? 
                                                            <div className='flex flex-col gap-5 px-20 pt-10'>
                                                                <div>
                                                                    <label htmlFor="title_txt_transform" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Hotel/Restaurant Name
                                                                    </label>
                                                                    <span className='flex'>
                                                                        <select 
                                                                            value={theme.title_txt_transform} 
                                                                            onChange={handleTheme} 
                                                                            id="title_txt_transform"
                                                                            name="title_txt_transform" 
                                                                            required
                                                                            className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                            {TEXT_TRANSFORM.map((txtTransform, index) => {
                                                                                    return (
                                                                                        <option value={txtTransform} key={txtTransform}>
                                                                                            {txtTransform}
                                                                                        </option>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </select> 
                                                                        {/* <p className={`ml-2 mt-1 text-xs ${theme.title_txt_transform}`}>The&nbsp;menu</p>  */}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="subtitle_txt_transform" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Slogan                                                          
                                                                    </label>
                                                                    <select 
                                                                        value={theme.subtitle_txt_transform} 
                                                                        onChange={handleTheme} 
                                                                        id="subtitle_txt_transform"
                                                                        name="subtitle_txt_transform" 
                                                                        required
                                                                        className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                        {TEXT_TRANSFORM.map((txtTransform, index) => {
                                                                                return (
                                                                                    <option value={txtTransform} key={txtTransform}>
                                                                                        {txtTransform}
                                                                                    </option>
                                                                                );
                                                                            },
                                                                        )}
                                                                    </select> 
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="item_txt_transform" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Item Name
                                                                    </label>
                                                                    <select 
                                                                        value={theme.item_txt_transform} 
                                                                        onChange={handleTheme} 
                                                                        id="item_txt_transform"
                                                                        name="item_txt_transform" 
                                                                        required
                                                                        className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                        {TEXT_TRANSFORM.map((txtTransform, index) => {
                                                                                return (
                                                                                    <option value={txtTransform} key={txtTransform}>
                                                                                        {txtTransform}
                                                                                    </option>
                                                                                );
                                                                            },
                                                                        )}
                                                                    </select> 
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="description_txt_transform" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Description                                                         
                                                                    </label>
                                                                    <select 
                                                                        value={theme.description_txt_transform} 
                                                                        onChange={handleTheme} 
                                                                        id="description_txt_transform"
                                                                        name="description_txt_transform" 
                                                                        required
                                                                        className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                        {TEXT_TRANSFORM.map((txtTransform, index) => {
                                                                                return (
                                                                                    <option value={txtTransform} key={txtTransform}>
                                                                                        {txtTransform}
                                                                                    </option>
                                                                                );
                                                                            },
                                                                        )}
                                                                    </select> 
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="category_txt_transform" className="block text-xs font-medium leading-6 text-gray-900">
                                                                        Category
                                                                    </label>
                                                                    <select 
                                                                        value={theme.category_txt_transform} 
                                                                        onChange={handleTheme} 
                                                                        id="category_txt_transform"
                                                                        name="category_txt_transform" 
                                                                        required
                                                                        className="pl-2 w-full block rounded-md border-0 py-2 text-gray-900 sm:text-sm ring-1 ring-gray-300">
                                                                        {TEXT_TRANSFORM.map((txtTransform, index) => {
                                                                                return (
                                                                                    <option value={txtTransform} key={txtTransform}>
                                                                                        {txtTransform}
                                                                                    </option>
                                                                                );
                                                                            },
                                                                        )}
                                                                    </select> 
                                                                </div>
                                                                <div>
                                                                    
                                                                </div>
                                                            </div>
                                                        : <></>
                                                    }

                                                </div> 

                                            </div>

                                            <div className='lg:hidden text-center'>
                                                <p className='mt-20'>This page available for desktop only</p>
                                                    <button 
                                                        type='button'
                                                        onClick={() => router.replace('/menu')}
                                                        className="rounded-none bg-slate-100 text-black px-8 py-2 mt-20">
                                                        Go back
                                                    </button>
                                            </div>
                                        </>
                                        : 
                                            <Spinner/>
                                    }
                                </>
                            :
                                <>
                                    <Navbar user={user}/>
                                    <VerifyEmailView title="Email not verified!" showIcon={false}/>
                                </>
                        }
                    </>  
            }
        </> 
    );
}


const FONT_FAMILY = [
    "Roboto",
    "Poppins",
    "Mukta",
    "Roboto-Condensed",
    "Oswald",
    "Briem-Hand",
    "Teachers",
    "Ubuntu-Sans"
]

const BG_COLORS = [
    "bg-black",
    "bg-white",
    "bg-slate-50", "bg-slate-100", "bg-slate-200", "bg-slate-300", "bg-slate-400", "bg-slate-500", "bg-slate-600", "bg-slate-700", "bg-slate-800", "bg-slate-900", "bg-slate-950",
    "bg-gray-50", "bg-gray-100", "bg-gray-200", "bg-gray-300", "bg-gray-400", "bg-gray-500", "bg-gray-600", "bg-gray-700", "bg-gray-800", "bg-gray-900", "bg-gray-950",
    "bg-zinc-50", "bg-zinc-100", "bg-zinc-200", "bg-zinc-300", "bg-zinc-400", "bg-zinc-500", "bg-zinc-600", "bg-zinc-700", "bg-zinc-800", "bg-zinc-900", "bg-zinc-950",
    "bg-neutral-50", "bg-neutral-100", "bg-neutral-200", "bg-neutral-300", "bg-neutral-400", "bg-neutral-500", "bg-neutral-600", "bg-neutral-700", "bg-neutral-800", "bg-neutral-900", "bg-neutral-950",
    "bg-stone-50", "bg-stone-100", "bg-stone-200", "bg-stone-300", "bg-stone-400", "bg-stone-500", "bg-stone-600", "bg-stone-700", "bg-stone-800", "bg-stone-900", "bg-stone-950",
    "bg-red-50", "bg-red-100", "bg-red-200", "bg-red-300", "bg-red-400", "bg-red-500", "bg-red-600", "bg-red-700", "bg-red-800", "bg-red-900", "bg-red-950",
    "bg-orange-50", "bg-orange-100", "bg-orange-200", "bg-orange-300", "bg-orange-400", "bg-orange-500", "bg-orange-600", "bg-orange-700", "bg-orange-800", "bg-orange-900", "bg-orange-950",
    "bg-amber-50", "bg-amber-100", "bg-amber-200", "bg-amber-300", "bg-amber-400", "bg-amber-500", "bg-amber-600", "bg-amber-700", "bg-amber-800", "bg-amber-900", "bg-amber-950",
    "bg-yellow-50", "bg-yellow-100", "bg-yellow-200", "bg-yellow-300", "bg-yellow-400", "bg-yellow-500", "bg-yellow-600", "bg-yellow-700", "bg-yellow-800", "bg-yellow-900", "bg-yellow-950",
    "bg-lime-50", "bg-lime-100", "bg-lime-200", "bg-lime-300", "bg-lime-400", "bg-lime-500", "bg-lime-600", "bg-lime-700", "bg-lime-800", "bg-lime-900", "bg-lime-950",
    "bg-green-50", "bg-green-100", "bg-green-200", "bg-green-300", "bg-green-400", "bg-green-500", "bg-green-600", "bg-green-700", "bg-green-800", "bg-green-900", "bg-green-950",
    "bg-emerald-50", "bg-emerald-100", "bg-emerald-200", "bg-emerald-300", "bg-emerald-400", "bg-emerald-500", "bg-emerald-600", "bg-emerald-700", "bg-emerald-800", "bg-emerald-900", "bg-emerald-950",
    "bg-teal-50", "bg-teal-100", "bg-teal-200", "bg-teal-300", "bg-teal-400", "bg-teal-500", "bg-teal-600", "bg-teal-700", "bg-teal-800", "bg-teal-900", "bg-teal-950",
    "bg-cyan-50", "bg-cyan-100", "bg-cyan-200", "bg-cyan-300", "bg-cyan-400", "bg-cyan-500", "bg-cyan-600", "bg-cyan-700", "bg-cyan-800", "bg-cyan-900", "bg-cyan-950",
    "bg-sky-50", "bg-sky-100", "bg-sky-200", "bg-sky-300", "bg-sky-400", "bg-sky-500", "bg-sky-600", "bg-sky-700", "bg-sky-800", "bg-sky-900", "bg-sky-950",
    "bg-blue-50", "bg-blue-100", "bg-blue-200", "bg-blue-300", "bg-blue-400", "bg-blue-500", "bg-blue-600", "bg-blue-700", "bg-blue-800", "bg-blue-900", "bg-blue-950",
    "bg-indigo-50", "bg-indigo-100", "bg-indigo-200", "bg-indigo-300", "bg-indigo-400", "bg-indigo-500", "bg-indigo-600", "bg-indigo-700", "bg-indigo-800", "bg-indigo-900", "bg-indigo-950",
    "bg-violet-50", "bg-violet-100", "bg-violet-200", "bg-violet-300", "bg-violet-400", "bg-violet-500", "bg-violet-600", "bg-violet-700", "bg-violet-800", "bg-violet-900", "bg-violet-950",
    "bg-purple-50", "bg-purple-100", "bg-purple-200", "bg-purple-300", "bg-purple-400", "bg-purple-500", "bg-purple-600", "bg-purple-700", "bg-purple-800", "bg-purple-900", "bg-purple-950",
    "bg-fuchsia-50", "bg-fuchsia-100", "bg-fuchsia-200", "bg-fuchsia-300", "bg-fuchsia-400", "bg-fuchsia-500", "bg-fuchsia-600", "bg-fuchsia-700", "bg-fuchsia-800", "bg-fuchsia-900", "bg-fuchsia-950",
    "bg-pink-50", "bg-pink-100", "bg-pink-200", "bg-pink-300", "bg-pink-400", "bg-pink-500", "bg-pink-600", "bg-pink-700", "bg-pink-800", "bg-pink-900", "bg-pink-950",
    "bg-rose-50", "bg-rose-100", "bg-rose-200", "bg-rose-300", "bg-rose-400", "bg-rose-500", "bg-rose-600", "bg-rose-700", "bg-rose-800", "bg-rose-900", "bg-rose-950"
]

const SHADOW_COLORS = [
    "shadow-inherit",
    "shadow-current",
    "shadow-transparent",
    "shadow-black",
    "shadow-white",
    "shadow-slate-50", "shadow-slate-100", "shadow-slate-200", "shadow-slate-300", "shadow-slate-400", "shadow-slate-500", "shadow-slate-600", "shadow-slate-700", "shadow-slate-800", "shadow-slate-900", "shadow-slate-950",
    "shadow-gray-50", "shadow-gray-100", "shadow-gray-200", "shadow-gray-300", "shadow-gray-400", "shadow-gray-500", "shadow-gray-600", "shadow-gray-700", "shadow-gray-800", "shadow-gray-900", "shadow-gray-950",
    "shadow-zinc-50", "shadow-zinc-100", "shadow-zinc-200", "shadow-zinc-300", "shadow-zinc-400", "shadow-zinc-500", "shadow-zinc-600", "shadow-zinc-700", "shadow-zinc-800", "shadow-zinc-900", "shadow-zinc-950",
    "shadow-neutral-50", "shadow-neutral-100", "shadow-neutral-200", "shadow-neutral-300", "shadow-neutral-400", "shadow-neutral-500", "shadow-neutral-600", "shadow-neutral-700", "shadow-neutral-800", "shadow-neutral-900", "shadow-neutral-950",
    "shadow-stone-50", "shadow-stone-100", "shadow-stone-200", "shadow-stone-300", "shadow-stone-400", "shadow-stone-500", "shadow-stone-600", "shadow-stone-700", "shadow-stone-800", "shadow-stone-900", "shadow-stone-950",
    "shadow-red-50", "shadow-red-100", "shadow-red-200", "shadow-red-300", "shadow-red-400", "shadow-red-500", "shadow-red-600", "shadow-red-700", "shadow-red-800", "shadow-red-900", "shadow-red-950",
    "shadow-orange-50", "shadow-orange-100", "shadow-orange-200", "shadow-orange-300", "shadow-orange-400", "shadow-orange-500", "shadow-orange-600", "shadow-orange-700", "shadow-orange-800", "shadow-orange-900", "shadow-orange-950",
    "shadow-amber-50", "shadow-amber-100", "shadow-amber-200", "shadow-amber-300", "shadow-amber-400", "shadow-amber-500", "shadow-amber-600", "shadow-amber-700", "shadow-amber-800", "shadow-amber-900", "shadow-amber-950",
    "shadow-yellow-50", "shadow-yellow-100", "shadow-yellow-200", "shadow-yellow-300", "shadow-yellow-400", "shadow-yellow-500", "shadow-yellow-600", "shadow-yellow-700", "shadow-yellow-800", "shadow-yellow-900", "shadow-yellow-950",
    "shadow-lime-50", "shadow-lime-100", "shadow-lime-200", "shadow-lime-300", "shadow-lime-400", "shadow-lime-500", "shadow-lime-600", "shadow-lime-700", "shadow-lime-800", "shadow-lime-900", "shadow-lime-950",
    "shadow-green-50", "shadow-green-100", "shadow-green-200", "shadow-green-300", "shadow-green-400", "shadow-green-500", "shadow-green-600", "shadow-green-700", "shadow-green-800", "shadow-green-900", "shadow-green-950",
    "shadow-emerald-50", "shadow-emerald-100", "shadow-emerald-200", "shadow-emerald-300", "shadow-emerald-400", "shadow-emerald-500", "shadow-emerald-600", "shadow-emerald-700", "shadow-emerald-800", "shadow-emerald-900", "shadow-emerald-950",
    "shadow-teal-50", "shadow-teal-100", "shadow-teal-200", "shadow-teal-300", "shadow-teal-400", "shadow-teal-500", "shadow-teal-600", "shadow-teal-700", "shadow-teal-800", "shadow-teal-900", "shadow-teal-950",
    "shadow-cyan-50", "shadow-cyan-100", "shadow-cyan-200", "shadow-cyan-300", "shadow-cyan-400", "shadow-cyan-500", "shadow-cyan-600", "shadow-cyan-700", "shadow-cyan-800", "shadow-cyan-900", "shadow-cyan-950",
    "shadow-sky-50", "shadow-sky-100", "shadow-sky-200", "shadow-sky-300", "shadow-sky-400", "shadow-sky-500", "shadow-sky-600", "shadow-sky-700", "shadow-sky-800", "shadow-sky-900", "shadow-sky-950",
    "shadow-blue-50", "shadow-blue-100", "shadow-blue-200", "shadow-blue-300", "shadow-blue-400", "shadow-blue-500", "shadow-blue-600", "shadow-blue-700", "shadow-blue-800", "shadow-blue-900", "shadow-blue-950",
    "shadow-indigo-50", "shadow-indigo-100", "shadow-indigo-200", "shadow-indigo-300", "shadow-indigo-400", "shadow-indigo-500", "shadow-indigo-600", "shadow-indigo-700", "shadow-indigo-800", "shadow-indigo-900", "shadow-indigo-950",
    "shadow-violet-50", "shadow-violet-100", "shadow-violet-200", "shadow-violet-300", "shadow-violet-400", "shadow-violet-500", "shadow-violet-600", "shadow-violet-700", "shadow-violet-800", "shadow-violet-900", "shadow-violet-950",
    "shadow-purple-50", "shadow-purple-100", "shadow-purple-200", "shadow-purple-300", "shadow-purple-400", "shadow-purple-500", "shadow-purple-600", "shadow-purple-700", "shadow-purple-800", "shadow-purple-900", "shadow-purple-950",
    "shadow-fuchsia-50", "shadow-fuchsia-100", "shadow-fuchsia-200", "shadow-fuchsia-300", "shadow-fuchsia-400", "shadow-fuchsia-500", "shadow-fuchsia-600", "shadow-fuchsia-700", "shadow-fuchsia-800", "shadow-fuchsia-900", "shadow-fuchsia-950",
    "shadow-pink-50", "shadow-pink-100", "shadow-pink-200", "shadow-pink-300", "shadow-pink-400", "shadow-pink-500", "shadow-pink-600", "shadow-pink-700", "shadow-pink-800", "shadow-pink-900", "shadow-pink-950",
    "shadow-rose-50", "shadow-rose-100", "shadow-rose-200", "shadow-rose-300", "shadow-rose-400", "shadow-rose-500", "shadow-rose-600", "shadow-rose-700", "shadow-rose-800", "shadow-rose-900", "shadow-rose-950"
]

const TEXT_COLORS = [
    "text-black",
    "text-white",
    "text-slate-50", "text-slate-100", "text-slate-200", "text-slate-300", "text-slate-400", "text-slate-500", "text-slate-600", "text-slate-700", "text-slate-800", "text-slate-900", "text-slate-950",
    "text-gray-50", "text-gray-100", "text-gray-200", "text-gray-300", "text-gray-400", "text-gray-500", "text-gray-600", "text-gray-700", "text-gray-800", "text-gray-900", "text-gray-950",
    "text-zinc-50", "text-zinc-100", "text-zinc-200", "text-zinc-300", "text-zinc-400", "text-zinc-500", "text-zinc-600", "text-zinc-700", "text-zinc-800", "text-zinc-900", "text-zinc-950",
    "text-neutral-50", "text-neutral-100", "text-neutral-200", "text-neutral-300", "text-neutral-400", "text-neutral-500", "text-neutral-600", "text-neutral-700", "text-neutral-800", "text-neutral-900", "text-neutral-950",
    "text-stone-50", "text-stone-100", "text-stone-200", "text-stone-300", "text-stone-400", "text-stone-500", "text-stone-600", "text-stone-700", "text-stone-800", "text-stone-900", "text-stone-950",
    "text-red-50", "text-red-100", "text-red-200", "text-red-300", "text-red-400", "text-red-500", "text-red-600", "text-red-700", "text-red-800", "text-red-900", "text-red-950",
    "text-orange-50", "text-orange-100", "text-orange-200", "text-orange-300", "text-orange-400", "text-orange-500", "text-orange-600", "text-orange-700", "text-orange-800", "text-orange-900", "text-orange-950",
    "text-amber-50", "text-amber-100", "text-amber-200", "text-amber-300", "text-amber-400", "text-amber-500", "text-amber-600", "text-amber-700", "text-amber-800", "text-amber-900", "text-amber-950",
    "text-yellow-50", "text-yellow-100", "text-yellow-200", "text-yellow-300", "text-yellow-400", "text-yellow-500", "text-yellow-600", "text-yellow-700", "text-yellow-800", "text-yellow-900", "text-yellow-950",
    "text-lime-50", "text-lime-100", "text-lime-200", "text-lime-300", "text-lime-400", "text-lime-500", "text-lime-600", "text-lime-700", "text-lime-800", "text-lime-900", "text-lime-950",
    "text-green-50", "text-green-100", "text-green-200", "text-green-300", "text-green-400", "text-green-500", "text-green-600", "text-green-700", "text-green-800", "text-green-900", "text-green-950",
    "text-emerald-50", "text-emerald-100", "text-emerald-200", "text-emerald-300", "text-emerald-400", "text-emerald-500", "text-emerald-600", "text-emerald-700", "text-emerald-800", "text-emerald-900", "text-emerald-950",
    "text-teal-50", "text-teal-100", "text-teal-200", "text-teal-300", "text-teal-400", "text-teal-500", "text-teal-600", "text-teal-700", "text-teal-800", "text-teal-900", "text-teal-950",
    "text-cyan-50", "text-cyan-100", "text-cyan-200", "text-cyan-300", "text-cyan-400", "text-cyan-500", "text-cyan-600", "text-cyan-700", "text-cyan-800", "text-cyan-900", "text-cyan-950",
    "text-sky-50", "text-sky-100", "text-sky-200", "text-sky-300", "text-sky-400", "text-sky-500", "text-sky-600", "text-sky-700", "text-sky-800", "text-sky-900", "text-sky-950",
    "text-blue-50", "text-blue-100", "text-blue-200", "text-blue-300", "text-blue-400", "text-blue-500", "text-blue-600", "text-blue-700", "text-blue-800", "text-blue-900", "text-blue-950",
    "text-indigo-50", "text-indigo-100", "text-indigo-200", "text-indigo-300", "text-indigo-400", "text-indigo-500", "text-indigo-600", "text-indigo-700", "text-indigo-800", "text-indigo-900", "text-indigo-950",
    "text-violet-50", "text-violet-100", "text-violet-200", "text-violet-300", "text-violet-400", "text-violet-500", "text-violet-600", "text-violet-700", "text-violet-800", "text-violet-900", "text-violet-950",
    "text-purple-50", "text-purple-100", "text-purple-200", "text-purple-300", "text-purple-400", "text-purple-500", "text-purple-600", "text-purple-700", "text-purple-800", "text-purple-900", "text-purple-950",
    "text-fuchsia-50", "text-fuchsia-100", "text-fuchsia-200", "text-fuchsia-300", "text-fuchsia-400", "text-fuchsia-500", "text-fuchsia-600", "text-fuchsia-700", "text-fuchsia-800", "text-fuchsia-900", "text-fuchsia-950",
    "text-pink-50", "text-pink-100", "text-pink-200", "text-pink-300", "text-pink-400", "text-pink-500", "text-pink-600", "text-pink-700", "text-pink-800", "text-pink-900", "text-pink-950",
    "text-rose-50", "text-rose-100", "text-rose-200", "text-rose-300", "text-rose-400", "text-rose-500", "text-rose-600", "text-rose-700", "text-rose-800", "text-rose-900", "text-rose-950"
]

const BORDER_COLORS = [
    "border-black",
    "border-white",
    "border-slate-50", "border-slate-100", "border-slate-200", "border-slate-300", "border-slate-400", "border-slate-500", "border-slate-600", "border-slate-700", "border-slate-800", "border-slate-900", "border-slate-950",
    "border-gray-50", "border-gray-100", "border-gray-200", "border-gray-300", "border-gray-400", "border-gray-500", "border-gray-600", "border-gray-700", "border-gray-800", "border-gray-900", "border-gray-950",
    "border-zinc-50", "border-zinc-100", "border-zinc-200", "border-zinc-300", "border-zinc-400", "border-zinc-500", "border-zinc-600", "border-zinc-700", "border-zinc-800", "border-zinc-900", "border-zinc-950",
    "border-neutral-50", "border-neutral-100", "border-neutral-200", "border-neutral-300", "border-neutral-400", "border-neutral-500", "border-neutral-600", "border-neutral-700", "border-neutral-800", "border-neutral-900", "border-neutral-950",
    "border-stone-50", "border-stone-100", "border-stone-200", "border-stone-300", "border-stone-400", "border-stone-500", "border-stone-600", "border-stone-700", "border-stone-800", "border-stone-900", "border-stone-950",
    "border-red-50", "border-red-100", "border-red-200", "border-red-300", "border-red-400", "border-red-500", "border-red-600", "border-red-700", "border-red-800", "border-red-900", "border-red-950",
    "border-orange-50", "border-orange-100", "border-orange-200", "border-orange-300", "border-orange-400", "border-orange-500", "border-orange-600", "border-orange-700", "border-orange-800", "border-orange-900", "border-orange-950",
    "border-amber-50", "border-amber-100", "border-amber-200", "border-amber-300", "border-amber-400", "border-amber-500", "border-amber-600", "border-amber-700", "border-amber-800", "border-amber-900", "border-amber-950",
    "border-yellow-50", "border-yellow-100", "border-yellow-200", "border-yellow-300", "border-yellow-400", "border-yellow-500", "border-yellow-600", "border-yellow-700", "border-yellow-800", "border-yellow-900", "border-yellow-950",
    "border-lime-50", "border-lime-100", "border-lime-200", "border-lime-300", "border-lime-400", "border-lime-500", "border-lime-600", "border-lime-700", "border-lime-800", "border-lime-900", "border-lime-950",
    "border-green-50", "border-green-100", "border-green-200", "border-green-300", "border-green-400", "border-green-500", "border-green-600", "border-green-700", "border-green-800", "border-green-900", "border-green-950",
    "border-emerald-50", "border-emerald-100", "border-emerald-200", "border-emerald-300", "border-emerald-400", "border-emerald-500", "border-emerald-600", "border-emerald-700", "border-emerald-800", "border-emerald-900", "border-emerald-950",
    "border-teal-50", "border-teal-100", "border-teal-200", "border-teal-300", "border-teal-400", "border-teal-500", "border-teal-600", "border-teal-700", "border-teal-800", "border-teal-900", "border-teal-950",
    "border-cyan-50", "border-cyan-100", "border-cyan-200", "border-cyan-300", "border-cyan-400", "border-cyan-500", "border-cyan-600", "border-cyan-700", "border-cyan-800", "border-cyan-900", "border-cyan-950",
    "border-sky-50", "border-sky-100", "border-sky-200", "border-sky-300", "border-sky-400", "border-sky-500", "border-sky-600", "border-sky-700", "border-sky-800", "border-sky-900", "border-sky-950",
    "border-blue-50", "border-blue-100", "border-blue-200", "border-blue-300", "border-blue-400", "border-blue-500", "border-blue-600", "border-blue-700", "border-blue-800", "border-blue-900", "border-blue-950",
    "border-indigo-50", "border-indigo-100", "border-indigo-200", "border-indigo-300", "border-indigo-400", "border-indigo-500", "border-indigo-600", "border-indigo-700", "border-indigo-800", "border-indigo-900", "border-indigo-950",
    "border-violet-50", "border-violet-100", "border-violet-200", "border-violet-300", "border-violet-400", "border-violet-500", "border-violet-600", "border-violet-700", "border-violet-800", "border-violet-900", "border-violet-950",
    "border-purple-50", "border-purple-100", "border-purple-200", "border-purple-300", "border-purple-400", "border-purple-500", "border-purple-600", "border-purple-700", "border-purple-800", "border-purple-900", "border-purple-950",
    "border-fuchsia-50", "border-fuchsia-100", "border-fuchsia-200", "border-fuchsia-300", "border-fuchsia-400", "border-fuchsia-500", "border-fuchsia-600", "border-fuchsia-700", "border-fuchsia-800", "border-fuchsia-900", "border-fuchsia-950",
    "border-pink-50", "border-pink-100", "border-pink-200", "border-pink-300", "border-pink-400", "border-pink-500", "border-pink-600", "border-pink-700", "border-pink-800", "border-pink-900", "border-pink-950",
    "border-rose-50", "border-rose-100", "border-rose-200", "border-rose-300", "border-rose-400", "border-rose-500", "border-rose-600", "border-rose-700", "border-rose-800", "border-rose-900", "border-rose-950"
]

const BORDER_SIZE = [
    'border-none',
    'border-b',
    'border-b-2',
    'border-b-3',
    'border-b-4',
    'border-b-5'
]  

const TEXT_TRANSFORM = [
    'uppercase',
    'lowercase',
    'capitalize',
    'normal-case'
]

const TEXT_WEIGHT = [
    'font-thin',
    'font-extralight',
    'font-light',
    'font-normal',
    'font-medium',
    'font-semibold',
    'font-bold',
    'font-extrabold'
]  

const TEXT_SIZE = [
    'text-xs',
    'text-sm',
    'text-base',
    'text-lg',
    'text-xl'
]