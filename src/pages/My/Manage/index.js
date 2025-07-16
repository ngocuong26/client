import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Manage.module.scss";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function MyManage() {
    const [user, setUser] = useState('');
    const [orderSelected, setOrderSelected] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get('type');
    const [trigger, setTrigger] = useState(false);
    const [call, setCall] = useState(false);
    const [animation, setAnimation] = useState(true);
    const [end, setEnd] = useState(2);
    const [drop, setDrop] = useState(false);
    const apiURL = process.env.REACT_APP_API_URL;
    console.log(type)

    useEffect(() => {
        fetch(`${apiURL}/orders?type=${type}`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {setOrders(data); console.log(data);
            })
    }, [type, call])

    const handClick = (type) => {
        setSearchParams({type: type});
    } 

    const handleDeleteCart = (id_order) => {
        setTrigger(prev => !prev);
        setAnimation(prev => !prev);
        document.body.style.overflow = 'hidden';
        setOrderSelected(id_order);
    }

    const handleUnShow = () => {
        setTrigger(prev => !prev);
        setAnimation(true);
        setOrderSelected(null)
        document.body.style.overflow = 'auto';
    }

    const handleDeleteOrder = (order, options) => {
        console.log(order);
        console.log(options);
        
        if (options === 'deleteOrder') {
            fetch(`${apiURL}/orders/delete?id=${order}`);
            if (animation === false) {setAnimation(prev => !prev);}
        }else if (options === 'orderAgain') {
            fetch(`${apiURL}/orders/update?id=${order}`);
            if (animation === false) {setAnimation(prev => !prev);}

        }
        
        setTimeout(() => {
            setCall(prev => !prev);
            console.log(2);
            
        }, 800);
        console.log(3);
        
        setTrigger(false);
        // setAnimation(prev => !prev);
        document.body.style.overflow = 'auto';

    }

    const handleSeeMore = (numOrder) => {
        setEnd(numOrder);
        console.log('end', end);
        setDrop(true);
    }
    
    const handleSeeLess = (numOrder) => {
        setEnd(2);
        setDrop(false);
    }

    return (
        <div className={styles.container}>
            <h1>Quản lý đơn hàng</h1>
            <div className={styles.container_manage}>
                <div className={styles.menu}>
                    <button onClick={() => handClick('confirm')} className={type === 'confirm' ? styles.active : styles.btn}>Chờ xác nhận</button>
                    <button onClick={() => handClick('waittransform')} className={type === 'waittransform' ?  styles.active : styles.btn}>Chờ giao hàng</button>
                    <button onClick={() => handClick('transform')} className={type === 'transform' ?  styles.active : styles.btn}>Đang giao</button>
                    <button onClick={() => handClick('transformed')} className={type === 'transformed' ?  styles.active : styles.btn}>Đã giao</button>
                    <button onClick={() => handClick('deletedorder')} className={type === 'deletedorder' ?  styles.active : styles.btn}>Đã hủy</button>
                </div>
                <div className={styles.container_info}>
                    {type === 'confirm' && (
                        <>
                            <h3>Đơn hàng đang chờ xác nhận</h3>
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <div key={index} className={animation && orderSelected === order._id ? styles.container_order_animation : styles.container_order}>
                                        <div>
                                            <h4>Mã đơn hàng: {order._id}</h4>
                                            <button onClick={() => handleDeleteCart(order._id)} className={styles.btn_delete}>Hủy</button>
                                        </div>
                                        {/* <div className={styles.line}></div> */}
                                        {(order.products.length > 2 ? order.products.slice(0, end) : order.products).map((pro, index) => (
                                            <>
                                                <div className={styles.line}></div>
                                                <div style={{display: 'flex'}}>
                                                    <img src={`${apiURL}/uploads/${pro.img}`}></img>
                                                    <div>
                                                        <span>Tên sản phẩm: {pro.name_product}</span>
                                                        <span>SL: {pro.quantity}</span>
                                                    </div>
                                                </div>
                                                {/* <div className={styles.line}></div> */}
                                            </>

                                        ))}
                                        {order.products.length > 2 && !drop  && 
                                            <button className={styles.see_more} onClick={() => handleSeeMore(order.products.length)}>
                                                    <FontAwesomeIcon icon={faChevronDown} style={{marginRight: '8px'}}/>
                                                    Xem thêm
                                            </button>
                                        }
                                        {drop && order.products.length > 2 &&
                                            <button className={styles.see_more} onClick={() => handleSeeLess(order.products.length)}>
                                                    <FontAwesomeIcon icon={faChevronUp} style={{marginRight: '8px'}}/>
                                                    Ẩn bớt
                                            </button>
                                        }
                                        <div className={styles.line}></div>

                                        <span>Trạng thái: Chờ xác nhận</span>
                                        <div className={styles.line}></div>
                                        <span style={{fontWeight: 'bold'}}>Tổng tiền: 
                                            <p className={styles.price}>{order.total.toLocaleString('en-EN')}</p>
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <span>Không có đơn hàng</span>
                            )}
                            <div className={trigger ? styles.show : styles.un_show}>
                                <button onClick={handleUnShow} className={styles.btn_un_show}>x</button>
                                <div className={styles.container_confirm}>
                                    <h3>Bạn có chắc chắn muốn xóa đơn hàng này không?</h3>
                                    <div>
                                        <button className={styles.btn_delete_confirm} onClick={() => handleDeleteOrder(orderSelected, 'deleteOrder')}>Xóa</button>
                                        <button onClick={handleUnShow}>Hủy</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {type === 'waittransform' && (
                        <>
                            <h3>Đơn hàng đang chờ vận chuyển</h3>
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <div key={index}>
                                        <span>Mã đơn hàng: {order._id}</span>
                                        <span>Số lượng: {order.quantity}</span>
                                        <span>Tổng tiền: {order.total}</span>
                                    </div>
                                ))
                            ) : (
                                <span>Không có đơn hàng</span>
                            )}
                        </>
                    )}

                    {type === 'transform' && (
                        <>
                            <h3>Đơn hàng đang vận chuyển</h3>
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <div key={index}>
                                        <span>Mã đơn hàng: {order._id}</span>
                                        <span>Số lượng: {order.quantity}</span>
                                        <span>Tổng tiền: {order.total}</span>
                                    </div>
                                ))
                            ) : (
                                <span>Không có đơn hàng</span>
                            )}
                        </>
                    )}

                    {type === 'transformed' && (
                        <>
                            <h3>Đơn hàng đã vận chuyển</h3>
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <div key={index}>
                                        <span>Mã đơn hàng: {order._id}</span>
                                        <span>Số lượng: {order.quantity}</span>
                                        <span>Tổng tiền: {order.total}</span>
                                    </div>
                                ))
                            ) : (
                                <span>Không có đơn hàng</span>
                            )}
                        </>
                    )}

                    {type === 'deletedorder' && (
                        <>
                            <h3>Đơn hàng đã hủy</h3>
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <div key={index} className={animation && orderSelected === order._id ? styles.container_order_animation : styles.container_order}>
                                        <div>
                                            <h4>Mã đơn hàng: {order._id}</h4>
                                            <button onClick={() => handleDeleteCart(order._id)} className={styles.btn_delete}>Mua lại</button>
                                        </div>
                                        <div className={styles.line}></div>
                                        {order.products.map((pro, index) => (
                                            <>
                                                <div style={{display: 'flex'}}>
                                                    <img src={`${apiURL}/uploads/${pro.img}`}></img>
                                                    <div>
                                                        <span>Tên sản phẩm: {pro.name_product}</span>
                                                        <span>SL: {pro.quantity}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.line}></div>
                                                {/* <div className={styles.line}></div> */}
                                            </>

                                        ))}
                                        <span>Trạng thái: Đã hủy</span>
                                        <div className={styles.line}></div>
                                        <span style={{fontWeight: 'bold'}}>Tổng tiền: {order.total}</span>
                                    </div>
                                ))
                            ) : (
                                <span>Không có đơn hàng</span>
                            )}
                            <div className={trigger ? styles.show : styles.un_show}>
                                <button onClick={handleUnShow} className={styles.btn_un_show}>x</button>
                                <div className={styles.container_confirm}>
                                    <h3>Bạn có chắc chắn muốn mua lại đơn hàng này không?</h3>
                                    <div>
                                        <button className={styles.btn_delete_confirm} onClick={() => handleDeleteOrder(orderSelected, 'orderAgain')}>Mua lại</button>
                                        <button onClick={handleUnShow}>Hủy</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* <span>Gio hang cua ban:</span>
            {orders.length > 0 ? (
                orders.map((order, index) => (
                    <div key={index}>
                        <span>Mã đơn hàng: {order._id}</span>
                        <span>Số lượng: {order.quantity}</span>
                        <span>Tổng tiền: {order.total}</span>
                    </div>
                ))
            ) : (
                <span>Không có đơn hàng</span>
            )} */}



        
        </div>
    )
}

export default MyManage;