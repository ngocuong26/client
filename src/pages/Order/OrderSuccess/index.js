import { useLocation, Link } from "react-router-dom";
import styles from "./OrderSuccess.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";


function OrderSuccess() {
    const location = useLocation();
    const {name, phone, address, total, date} = location.state || '';
    const [order, setOrder] = useState([]);
    const apiURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiURL}/orders?type=confirm`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                console.log('data order:', data);
                
                setOrder(data[data.length - 1]);
            })
    }, [])

    console.log('order', order);
    

    return (
        <> 
            <div className={styles.container_success}>
                <div className={styles.box}>
                    <p><FontAwesomeIcon icon={faCircleCheck} className={styles.icon}/></p>
                    <h3>Đặt hàng thành công</h3>
                    <p className={styles.id_order}>Mã đơn hàng: <span>{order?._id}</span></p>
                    <div className={styles.line}></div>
                    <p className={styles.info}>Thông tin giao hàng</p>
                    <p>Người nhận: {name}</p>
                    <p>SĐT: {phone}</p>
                    <p>Địa chỉ: {address}</p>

                    <img src={`${apiURL}/uploads/receipt.png`} className={styles.img}></img>
                    <Link to='/my/manage?type=confirm'>
                        <p className={styles.btn}>Theo dõi đơn hàng</p>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default OrderSuccess;
