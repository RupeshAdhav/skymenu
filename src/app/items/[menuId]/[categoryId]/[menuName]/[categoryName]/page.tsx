'use client';

import { toast } from 'react-hot-toast';
import { useEffect, useState, useRef } from 'react';

import { UserAuth } from '@/app/context/user';
import { ITEM, CATEGORY } from '@/appwrite/initial-values';
import { getItems, getCategory, updateItem} from '@/appwrite/appwrite-functions';
import ThreeDotIcon from '@/app/svg-icons/three-dots'
import OnlineCircle from '@/app/svg-icons/online-circle'
import OfflineCircle from '@/app/svg-icons/offline-circle'
import Navbar from '@/components/navbar';
import Spinner from '@/components/spinner';
import NewItem from '@/app/actions/new-item';
import EditItem from '@/app/actions/edit-item';
import DeleteItem from '@/app/actions/delete-item';
import VerifyEmailView from '@/components/verify-email-view';


export default function Item({params} : {params:any}) {
    const { user, userLoading } = UserAuth();
    const [items, setItems] = useState([ITEM]);
    const [editItem, setEditItem] = useState(ITEM);
    const [deleteItem, setDeleteItem] = useState(ITEM);
    const [category, setCategory] = useState(CATEGORY);
    const [openUpdateModal, setUpdateModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const dragItem = useRef(0);
    const dragOverItem = useRef(0);

    const dragStart = (e: any, position: any) => {
        dragItem.current = position;
    };
    
    const dragEnter = (e: any, position: any) => {
        dragOverItem.current = position;
    };
    
    const drop = () => {
        setDataLoaded(true);
        const copyListItems = [...items];
        const dragItemContent = copyListItems[dragItem.current];

        copyListItems.splice(dragItem.current, 1);
        dragItemContent.order_no = dragOverItem.current; // set order
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);

        dragItem.current = 0;
        dragOverItem.current = 0;

        try{
            updateItem(dragItemContent)
            .then(() => {
                initItems();
            })
            .catch((err: any) => {
                toast.error(err?.response?.message); 
            });
        }catch(err: any){
            toast.error(err.message);
        }
    }

    const initItems = () => {
        setDataLoaded(false);
        if(user?.$id){
            getItems(user.$id, params.menuId, params.categoryId)
            .then((response: any) => {
                let temp = [];
                for(let i = 0; i < response.documents.length; i++){
                    temp.push({
                        $id: response.documents[i].$id,
                        //user_id: response.documents[i].user_id,
                        //menu_id: response.documents[i].menu_id,
                        //category_id: response.documents[i].category_id,
                        item_name: response.documents[i].item_name,
                        price1: response.documents[i].price1,
                        price2: response.documents[i].price2,
                        type: response.documents[i].type,
                        tag: response.documents[i].tag,
                        is_active: response.documents[i]. is_active,
                        order_no: response.documents[i]. order_no,
                        description: response.documents[i]. description
                    })
                }
                setItems(temp);
                setDataLoaded(true);
            })
            .catch((err: any) => {
                toast.error(err.response.message); 
            }); 
        }
    }

    const initCategory = () => {
        if(user?.$id){
            getCategory(params.categoryId)
            .then((response: any) => {
                let temp = [];
                for(let i = 0; i < response.documents.length; i++){
                    temp.push({
                        $id: response.documents[i].$id,
                        //user_id: response.documents[i].user_id,
                        //menu_id: response.documents[i].menu_id,
                        category_name: response.documents[i].category_name,
                        no_of_price_cols: response.documents[i].no_of_price_cols,
                        price_col_name1: response.documents[i].price_col_name1,
                        price_col_name2: response.documents[i].price_col_name2,
                        is_active: response.documents[i]. is_active,
                        order_no: response.documents[i]. order_no
                    })
                }
                setCategory(temp[0]);
            })
            .catch((err: any) => {
                toast.error(err.response.message); 
            }); 
        }
    }

    useEffect(() => {
        if(user){
            initItems();
            initCategory();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const toggleUpdateModal = () => {
        setUpdateModal(!openUpdateModal);
    }

    const toggleDeleteModal = () => {
        setDeleteModal(!openDeleteModal);
    }    

    function handleEdit(index: number): void {
        setEditItem(items[index]);
        toggleUpdateModal();
    }

    function handleDelete(index: number): void {
        setDeleteItem(items[index]);
        toggleDeleteModal();
    }

    return (
        <>
        { userLoading ? 
                <Spinner/>
            :
                <>
                    { user?.emailVerification ? 
                            <>
                                <Navbar user={user}/>

                                { dataLoaded ? 
                                        <>

                                            { items && items.length > 0 ?
                                                    <>
                                                        <EditItem 
                                                            initItems={initItems} 
                                                            setItem={setEditItem} item={editItem} 
                                                            modal={openUpdateModal} toggleModal={toggleUpdateModal}
                                                            category={category}/>

                                                        <DeleteItem 
                                                            initItems={initItems} 
                                                            item={deleteItem} 
                                                            modal={openDeleteModal} toggleModal={toggleDeleteModal}/>

                                                        <header className="bg-white mt-6">
                                                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                                                                <div>
                                                                    {/* <p className='text-sm'>{decodeURIComponent(params.menuName)+" / "+decodeURIComponent(params.categoryName)}</p> */}
                                                                    <div className="text-sm breadcrumbs py-1">
                                                                        <ul>
                                                                            <li>{decodeURIComponent(params.menuName)}</li> 
                                                                            <li>{decodeURIComponent(params.categoryName)}</li> 
                                                                        </ul>
                                                                    </div>
                                                                    <h1 className="text-xl font-bold tracking-tight text-gray-900">Items</h1>
                                                                </div>
                                                                <NewItem initItems={initItems} category={category} menuId={params.menuId} categoryId={params.categoryId} orderNo={items.length}/>
                                                            </div>
                                                        </header>
                                                        <main>
                                                            <div className="mx-auto max-w-7xl border-2 rounded-lg">
                                                                <table className="table">
                                                                    <thead>
                                                                        <tr key="0000000619">
                                                                            <td></td>
                                                                            <th>Item Name</th>
                                                                            <th>Status</th>
                                                                            <th>Price                                                                                  
                                                                                <br/>
                                                                                <span className='font-normal'>
                                                                                    { category.no_of_price_cols === 1 ? '' : category.price_col_name1+" / "+category.price_col_name2 }
                                                                                </span>
                                                                            </th>
                                                                            <th className='md:table-cell hidden'>Type</th>
                                                                            <th className='md:table-cell hidden'>Tag</th>
                                                                            <th className='md:table-cell hidden'>Description</th>
                                                                            <th></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {items.map((item, index) => 
                                                                            <tr key={index} onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)} onDragEnd={drop} draggable>
                                                                                <td className='w-[3%]'>{index + 1}</td>
                                                                                <td>
                                                                                    <p className='font-bold'>
                                                                                            {item.item_name}
                                                                                    </p>
                                                                                </td>
                                                                                <td>
                                                                                    {item.is_active ? <OnlineCircle/> : <OfflineCircle/>}
                                                                                </td>
                                                                                <td>
                                                                                    { category.no_of_price_cols === 1 ? item.price1 : item.price1+" / "+item.price2 }
                                                                                </td>
                                                                                <td className='md:table-cell hidden'>
                                                                                    { item.type === "none" ? "--" : "" }
                                                                                    { item.type === "veg" ? <a className={` text-green-500 border-green-500 badge badge-sm cursor-pointer`}>VEG</a> : "" }
                                                                                    { item.type === "egg" ? <a className={`  text-orange-500 border-orange-500 badge badge-sm cursor-pointer`}>EGG</a> : "" }
                                                                                    { item.type === "nonveg" ? <a className={` text-red-500 border-red-500 badge badge-sm cursor-pointer`}>NON-VEG</a> : "" }
                                                                                </td>
                                                                                <td className='md:table-cell hidden'>
                                                                                    {item.tag === "none" ? "--" : "" }
                                                                                    {item.tag === "special" ? <a className="bg-yellow-500 text-white badge badge-sm cursor-none">SPECIAL</a> : ""}
                                                                                    {item.tag === "best seller" ? <a className="bg-red-500 text-white badge badge-sm cursor-none">BEST SELLER</a> : ""}
                                                                                    {item.tag === "must try" ? <a className="bg-blue-500 text-white badge badge-sm cursor-none">MUST TRY</a> : ""}
                                                                                </td>
                                                                                <td className='md:table-cell hidden w-[40%]'>
                                                                                    { item.description }
                                                                                </td>
                                                                                <td>
                                                                                    <div className="dropdown dropdown-top dropdown-end">
                                                                                        <button tabIndex={0} role="button" className="btn-xs">
                                                                                            <ThreeDotIcon/>
                                                                                        </button>
                                                                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded w-52">
                                                                                            <li>
                                                                                                <a onClick={() => handleEdit(index)}>Edit</a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a onClick={() => handleDelete(index)}>Delete</a>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        )}
                                                                    </tbody>
                                                                
                                                                </table>
                                                            </div>
                                                            <p className='text-center text-xs pt-5 text-gray-400'>drag or drop columns in a row to change the items display order</p>
                                                        </main>
                                                    </>
                                                :
                                                    <div className="flex flex-col items-center justify-center py-32">
                                                        <p className="mb-2 text-lg text-gray-900 ">No items</p>
                                                        <p className="text-md text-gray-500 dark:text-gray-400 pb-8">Create new item for {decodeURI(params.categoryName)}</p>
                                                        <NewItem buttonName="+ Create item" initItems={initItems} category={category} menuId={params.menuId} categoryId={params.categoryId} orderNo={items.length}/>
                                                    </div>
                                            }
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
    )
}
