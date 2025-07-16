import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../ProductItem/ProductItem.module.scss"
import { faCartPlus, faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { Link, useSearchParams } from "react-router-dom";
// import styles from "./ProductItem.module.scss";

import { useEffect, useState } from "react";
import Announce from "../../../components/Announce";
import Category from "../../../components/Menu/Categories";


function ProductsCate({setCB}) {
    const [announce, setAnnounce] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const cate = searchParams.get('cate');
    const apiURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (cate) {
            const id = cate.split('-').join(' ');
            fetch(`${apiURL}/category/${id}`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {setProducts(data);
                    console.log(data);
                    
                })
        }
    }, [cate]);

    const handleAddCart = (item) => {
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

        setCB(true);

        setAnnounce(prev => !prev);
        setTimeout(() => {
            setAnnounce(false);
        }, 1000)
    }
    
    
    return (
        <div>
            <Link to="/">
                <span className={styles.home}>Trang chủ <FontAwesomeIcon icon={faChevronRight} className={styles.icon}/></span>
            </Link>
            <span>Danh mục <FontAwesomeIcon icon={faChevronRight} className={styles.icon}/></span>
            <span className={styles.name_cate}>{cate.split('-').join(' ')}</span>
            <div className={styles.grid} style={{marginTop: '20px'}}>
                <div className={styles.row}>
                    {products.length > 0 ? (
                        products.map((item, index) => (
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
                                            <p className={styles.price_items}>{item.price?.toLocaleString('en-US')}</p>
                                        </div>
    
                                    </Link>
                                    <button className={styles.btn_add_cart} 
                                        onClick={() => handleAddCart(item)}>
                                        <FontAwesomeIcon icon={faCartPlus}/>
                                        <span>Thêm vào giỏ</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                            <h3 style={{display: 'block'}}>Danh mục này hiện chưa có sản phẩm</h3>
                            <Category p='Tham khảo danh mục khác'/>
                        </>
                    )}
                </div>
            </div>

            {announce && (
                <Announce title='Đã thêm vào giỏ hàng thành công!!!' />
            )}
        </div>
    );
}

export default ProductsCate;