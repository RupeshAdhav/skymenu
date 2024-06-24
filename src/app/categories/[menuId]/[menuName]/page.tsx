'use client';

import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useEffect, useState, useRef } from 'react';

import { UserAuth } from '@/app/context/user';
import { CATEGORY } from '@/appwrite/initial-values';
import { getCategories, updateCategory } from '@/appwrite/appwrite-functions';
import ThreeDotIcon from '@/app/svg-icons/three-dots'
import OnlineCircle from '@/app/svg-icons/online-circle'
import OfflineCircle from '@/app/svg-icons/offline-circle'
import Navbar from '@/components/navbar';
import Spinner from '@/components/spinner';
import NewCategory from '@/app/actions/new-category';
import EditCategory from '@/app/actions/edit-category';
import DeleteCategory from '@/app/actions/delete-category';
import VerifyEmailView from '@/components/verify-email-view';


export default function Category({params} : {params:any}) {
    const { user, userLoading } = UserAuth();
    const [categories, setCategories] = useState([CATEGORY]);
    const [editCategory, setEditCategory] = useState(CATEGORY);
    const [deleteCategory, setDeleteCategory] = useState(CATEGORY);
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
        const copyListItems = [...categories];
        const dragItemContent = copyListItems[dragItem.current];

        copyListItems.splice(dragItem.current, 1);
        dragItemContent.order_no = dragOverItem.current; // set order
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);

        dragItem.current = 0;
        dragOverItem.current = 0;

        try{
            updateCategory(dragItemContent)
            .then(() => {
                initCategories();
            })
            .catch((err: any) => {
                toast.error(err?.response?.message); 
            });
        }catch(err: any){
            toast.error(err.message);
        }
    }

    const initCategories = () => {
        setDataLoaded(false);
        if(user?.$id){
            getCategories(user.$id, params.menuId)
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
                setCategories(temp);
                setDataLoaded(true);
            })
            .catch((err: any) => {
                toast.error(err.response.message); 
            }); 
        }
    }

    useEffect(() => {
        if(user){
            initCategories();
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
        setEditCategory(categories[index]);
        toggleUpdateModal();
    }

    function handleDelete(index: number): void {
        setDeleteCategory(categories[index]);
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

                                            { categories && categories.length > 0 ?
                                                    <>
                                                        <EditCategory 
                                                            initCategories={initCategories} 
                                                            setCategory={setEditCategory} category={editCategory} 
                                                            modal={openUpdateModal} toggleModal={toggleUpdateModal}/>

                                                        <DeleteCategory 
                                                            initCategories={initCategories} 
                                                            category={deleteCategory} 
                                                            modal={openDeleteModal} toggleModal={toggleDeleteModal}/>

                                                        <header className="bg-white mt-6">
                                                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                                                                <div>
                                                                    {/* <p className='text-sm'>{decodeURIComponent(params.menuName)}</p> */}
                                                                    <div className="text-sm breadcrumbs py-1">
                                                                        <ul>
                                                                            <li>{decodeURIComponent(params.menuName)}</li> 
                                                                        </ul>
                                                                    </div>
                                                                    <h1 className="text-xl font-bold tracking-tight text-gray-900">Categories</h1>
                                                                </div>
                                                                <NewCategory initCategories={initCategories} menuId={params.menuId} orderNo={categories.length}/>
                                                            </div>
                                                        </header>
                                                        <main>
                                                            <div className="mx-auto max-w-7xl border-2 rounded-lg">
                                                                <table className="table">
                                                                    <thead>
                                                                        <tr key="0000000619">
                                                                            <td></td>
                                                                            <th>Category Name</th>
                                                                            <th>Status</th>
                                                                            <th className='md:table-cell hidden'>Number of <br/> Price Columns</th>
                                                                            <th className='md:table-cell hidden'>Price Column Names</th>
                                                                            <th></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {categories.map((category, index) => 
                                                                            <tr key={index} onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)} onDragEnd={drop} draggable>
                                                                                <td className='w-[3%]'>{index + 1}</td>
                                                                                <td >
                                                                                    <p className='font-bold text-blue-600 hover:text-blue-500'>
                                                                                        <Link href={`/items/${params.menuId}/${category.$id}/${params.menuName}/${category.category_name}`}>
                                                                                            {category.category_name}
                                                                                        </Link>
                                                                                    </p>
                                                                                </td>
                                                                                <td>
                                                                                    {category.is_active ? <OnlineCircle/> : <OfflineCircle/>}
                                                                                </td>
                                                                                <td className='md:table-cell hidden'>
                                                                                    {category.no_of_price_cols}
                                                                                </td>
                                                                                <td className='md:table-cell hidden'>
                                                                                    { category.no_of_price_cols === 1 ? '--' : category.price_col_name1+" / "+category.price_col_name2 }
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
                                                            <p className='text-center text-xs pt-5 text-gray-400'>drag or drop columns in a row to change the categories display order</p>
                                                        </main>
                                                    </>
                                                :
                                                    <div className="flex flex-col items-center justify-center py-32">
                                                        <p className="mb-2 text-lg text-gray-900 ">No categories</p>
                                                        <p className="text-md text-gray-500 dark:text-gray-400 pb-8">Create new category for {decodeURI(params.menuName)}</p>
                                                        <NewCategory buttonName="+ Create category" initCategories={initCategories} menuId={params.menuId} orderNo={categories.length}/>
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
