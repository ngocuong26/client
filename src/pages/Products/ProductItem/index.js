import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProductItem.module.scss"
import { faCartPlus, faChevronDown, faListUl, faShuffle, faStar, faTh, faThLarge } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
// import styles from "./ProductItem.module.scss";

import { useEffect, useState } from "react";
import Announce from "../../../components/Announce";


function ProductsItem({slice, data, filterPro, setCB, searchData}) {
    const [announce, setAnnounce] = useState(false);
    const [products, setProducts] = useState([]);
    const [proSimilar, setProSimilar] = useState([]);
    const user = JSON.parse(localStorage.getItem('username'));
    const apiURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (!data) {
            fetch(`${apiURL}/products`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => setProducts(data))
        }
    }, []);

    const handleAddCart = (item) => {
        if (!user) {
            setAnnounce(true);
            setTimeout(() => {
                setAnnounce(false);
            }, 3000)
            return;
        }

        console.log(item);
        
        fetch(`${apiURL}/cart`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                itemCart: item,
                quantity: 1 
            })
        })

        console.log('setCB:', setCB);
        
        setCB(true);

        setAnnounce(prev => !prev);
        setTimeout(() => {
            setAnnounce(false);
        }, 1000)
    }
    
    console.log(filterPro);
    console.log('searchData', searchData);
    
    
    return (
        <div>
            <div className={data ? styles.grid_similar : styles.grid}>
                <div className={data ? styles.row_similar : styles.row}>
                    {(slice ? products.slice(0, slice) : (data ? data.slice(0, 6) : (filterPro ? filterPro :(searchData.length > 0 ? searchData : products)))).map((item, index) => (
                        <div className={styles.col_6} key={index}>
                            <div className={styles.container_product}>
                                <Link to={`/products/${item.id_product}`}>
                                    <div className={styles.img}>
                                        <img src={`${apiURL}/uploads/${item.img}`}></img>
                                    </div>
                                    <div className={styles.info_product}>
                                        <p className={styles.name_product}>{item.name}</p>
                                        <span className={styles.review}>
                                            <FontAwesomeIcon icon={faStar}/>
                                            <FontAwesomeIcon icon={faStar}/>
                                            <FontAwesomeIcon icon={faStar}/>
                                            <FontAwesomeIcon icon={faStar}/>
                                            <FontAwesomeIcon icon={faStarRegular}/>
                                        </span>
                                        <p className={styles.price_items}>{item.price.toLocaleString('en-US')}</p>
                                    </div>

                                </Link>
                                <button className={styles.btn_add_cart} 
                                    onClick={() => handleAddCart(item)}>
                                    <FontAwesomeIcon icon={faCartPlus}/>
                                    <span>Thêm vào giỏ</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {announce && user && (
                <Announce title='Đã thêm vào giỏ hàng thành công!!!' />
            )}

            {announce && !user && (
                <Announce title='Đăng nhập để thêm vào giỏ hàng!!!' err={true}/>
            )}
        </div>
    );
}

export default ProductsItem;