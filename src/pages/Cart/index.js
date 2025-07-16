import { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";

function Cart({setCB}) {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const apiURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        setTimeout(() => {
            fetch(`${apiURL}/cart`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    
                    setCart(data)
                })
        }, 500);
    }, [])


    const hanleDelete = (id_product) => {
        const isConfirmed = window.confirm("Bạn có muốn xóa sản phẩm này không?");
        if (!isConfirmed) return; 

        fetch(`${apiURL}/cart/delete/${id_product}`, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {setCart(data); console.log(data);
            })

        setCB(true);
    }

    const handleBuyNow = () => {
        const cartItems = JSON.parse(JSON.stringify(cart));
        navigate('/order', {
            state: {
                products: cartItems
            }
        })
            
    }

    return (
        <>
            <div className={styles.container_name}>
                <Link to='/'>
                    <span>Trang chủ</span>
                    <FontAwesomeIcon icon={faChevronRight} className={styles.icon}/>
                </Link>
                <span className={styles.name}>Giỏ hàng</span>
            </div>
            {cart.length > 0 ? (
                <div>
                    {cart.map((item, index) => (
                        <div className={styles.phone}>
                            <img src={`${apiURL}/uploads/${item.img}`} className={styles.img}></img>
                            <div style={{flex: '1'}}>
                                <p>{item.name_product}</p>
                                <div style={{display: 'flex', marginTop: '20px'}}>
                                    <p className={styles.container_price}>{(item.price).toLocaleString('en-EN')}</p>
                                    <span>x   {item.quantity}</span>
                                </div>
                            </div>
                            <button 
                                className={styles.btn_delete} 
                                onClick={() => hanleDelete(item.id_product)}
                            >
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </div>
                    ))}
                    <table className={styles.table}>
                        <tr>
                            <th className={styles.col1}>STT</th>
                            <th className={styles.col2}></th>
                            <th className={styles.col3}>
                                Tên sản phẩm
                            </th>
                            <th className={styles.col4}>Giá</th>
                            <th className={styles.col5}>Số lượng</th>
                            <th className={styles.col6}>Lựa chọn</th>
                        </tr>

                        {cart.map((item, index) => (
                            <tr>
                                <td className={styles.col1}>{index + 1}</td>
                                <td className={styles.col2}><img src={`${apiURL}/uploads/${item.img}`} className={styles.img}></img></td>
                                <td>{item.name_product}</td>
                                <td>{item.price}</td>
                                <td className={styles.col5}>{item.quantity}</td>
                                <td className={styles.col6}>
                                    <button 
                                        className={styles.btn_delete} 
                                        onClick={() => hanleDelete(item.id_product)}
                                    >
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </table>
                    <button className={styles.btn_buy_now} onClick={handleBuyNow}>
                        Mua ngay
                    </button>
                </div>
            ) : (
                <div className={styles.container_continue_buy}>
                    <h3>Không có sản phẩm nào</h3>
                    <Link to='/products'>
                        <button className={styles.btn_continue_buy}>Tiếp tục mua sắm</button>
                    </Link>
                </div>
            )}
        </>
    );
}

export default Cart;