import ManageHeader from "../../components/Manage/Header/header";
import styles from "./Admin.module.scss";
import Navbar from "../../components/Manage/Nav/navbar";
import ShowAdmin from "../../components/Manage/Show";
import { useLocation } from "react-router-dom";
import ShowProducts from "../../components/Manage/Show/ShowProducts";
import ShowOrders from "../../components/Manage/Show/ShowOrders";
import ShowDash from "../../components/Manage/Show/ShowDash";
import ShowUsers from "../../components/Manage/Show/ShowUsers";
import ShowNews from "../../components/Manage/Show/ShowNews";
import ShowAdd from "../../components/Manage/Show/ShowAdd/product";
import ShowEdit from "../../components/Manage/Show/ShowEdit";
import ShowCategory from "../../components/Manage/Show/ShowCategory";
import ShowContact from "../../components/Manage/Show/ShowContact";
import Login from "../Login";
import ShowRevenue from "../../components/Manage/Show/ShowRevenue";

function ManagePage() {
    const location = useLocation();
    const path = location.pathname;
    console.log(path);
    const admin = JSON.parse(localStorage.getItem('admin'));    
    
    return (
        <>
        {admin ? (
            <>
                <ManageHeader admin={admin}/>

                <div className={styles.grid}>
                    <div className={styles.row}>
                        <div className={styles.col_3}>
                            <Navbar />
                        </div>
                        <div className={styles.col_9}>
                            {path === '/admin/products' && <ShowProducts />}
                            {path === '/admin/add/product' && <ShowAdd />}
                            {path === '/admin/add/category' && <ShowAdd />}
                            {path === '/admin/users' && <ShowUsers />}
                            {path === '/admin/orders' && <ShowOrders />}
                            {path === '/admin/dash' && <ShowDash />}
                            {path === '/admin/news' && <ShowNews />}
                            {path === '/admin/edit' && <ShowEdit />}
                            {path === '/admin/cate' && <ShowCategory />}
                            {path === '/admin/contact' && <ShowContact/>}
                            {path === '/admin/revenue' && <ShowRevenue />}
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <Login type='admin'/>
        )}
        </>
    );
}

export default ManagePage;