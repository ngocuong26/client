// import { useEffect, useState } from "react";
import styles from "./ProductsDetail.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Announce from "../../../components/Announce";
import ProductsItem from "../ProductItem";
// import OrderSuccess from "../../OrderSuccess";


function ProductsDetail({setCB}) {
    const [products, setProducts] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const total = 21000;
    let [quantity, setQuantity] = useState(Number(1));
    const [announce, setAnnounce] = useState(false);
    const [similar, setSimilar] = useState([]);
    const [cate, setCate] = useState([]);
    const [title, setTitle] = useState('');
    const apiURL = process.env.REACT_APP_API_URL;

    const user = JSON.parse(localStorage.getItem('username'));

    useEffect(() => {
        fetch(`${apiURL}/products/${id}`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                console.log(data);
                setSimilar(data.productSiilar);
            })
    }, [id]);

    const handleBuyNow = () => {
        if (!user) {
            setAnnounce(true);
            setTitle('Đăng nhập để mua hàng');
            setTimeout(() => {
                setAnnounce(false);
            }, 3000);
            return;
        }
        if (quantity === 0) {
            alert('Số lượng bạn đặt là 0!!!');
            quantity = 1;
            return setQuantity(quantity);
        }
        navigate('/order', {state: {products, quantity}})
    };

    const handleAddCart = () => {
        if (!user) {
            setAnnounce(true);
            setTitle('Đăng nhập để thêm vào giỏ!!!')
            setTimeout(() => {
                setAnnounce(false);
            }, 3000)
            return;
        }
        const pro = JSON.parse(JSON.stringify(products));
        console.log(pro);
             
        fetch(`${apiURL}/cart`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                itemCart: pro,
                quantity 
            })
        });

        setCB(true);

        setAnnounce(prev =>!prev);

        setTimeout(() => {
            setAnnounce(false);
        }, 1000);
    }

    console.log(id);

    const handleQuantity = (e) => {
        console.log
        (Number(e.target.value))
        setQuantity(e.target.value)
    }

    const handleAdd = () => {
        if (quantity >= products.quantity) {
            alert(`Vượt quá số lượng tồn kho ${products.quantity} sản phẩm`);
            return quantity = products.quantity;
        }
        quantity = Number(quantity) + 1;
        console.log(quantity)
        setQuantity(Number(quantity));
    }

    const handleMinus = () => {
        if (quantity <= 1) {
            return quantity = 1;
        }
        quantity = quantity - 1;
        console.log(quantity)
        setQuantity(quantity);
    }

    console.log('log',products.category?.child);
    
    useEffect(() => {
        fetch(`${apiURL}/category`)
            .then(res => res.json())
            .then(data => setCate(data))
    }, [])

    const handleCate = (parent) => {
        navigate(`/category?cate=${parent.split(' ').join('-')}`)
    }

    return (
        <>
            <Link to="/">
                <span className={styles.home}>Trang chủ <FontAwesomeIcon icon={faChevronRight} style={{marginRight: '10px'}}/></span>
            </Link>
            <Link to="/products"><span className={styles.name}>Sản phẩm</span></Link>
            <div className={styles.container_detail}>

                <div className={styles.grid}>
                    <div className={styles.row}>
                        <div className={styles.col_3}>
                            <div className={styles.container_cate}>
                                <h3>Danh mục</h3>
                                {cate.map(cate => (
                                    <p key={cate._id} className={styles.cate}
                                        onClick={() => handleCate(cate.parent)}>
                                        <FontAwesomeIcon icon={faChevronRight} className={styles.icon}/>{cate.parent}
                                    </p>
                                ))}
                            </div>
                        </div>


                        {/* Container product detail */}
                        <div className={styles.col_3}>
                            <div className={styles.container_img_product}>
                                <img src={`${apiURL}/uploads/${products.img}`}></img>
                                <div className={styles.container_img_child}>
                                    <div className={styles.grid_img}>
                                        <div className={styles.row}>
                                            <div className={styles.col_4}>
                                                <div className={styles.img_child}>
                                                    {/* <img src={p.img}></img> */}
                                                </div>
                                            </div>
                                            <div className={styles.col_4}>
                                                <div className={styles.img_child}>
                                                    {/* <img src={p.img}></img> */}
                                                </div>
                                            </div>
                                            <div className={styles.col_4}>
                                                <div className={styles.img_child}>
                                                    {/* <img src={p.img}></img> */}
                                                </div>
                                            </div>
                                            <div className={styles.col_4}>
                                                <div className={styles.img_child}>
                                                    {/* <img src={p.img}></img> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Info product */}
                        <div className={styles.col_3}>
                            <div className={styles.product_detail}>
                                <h2>{products.name}</h2>
                                <p className={styles.price}>Giá: {products.price ? products.price.toLocaleString('en-US') : ''}</p>
                                {/* <p>{products.description}</p> */}
                                <p>SL tồn kho {products.quantity}</p>
                                {/* <p>{products.category.parent}</p> */}

                                <div className={styles.qunatity}>
                                    <button className={quantity !== 1 ? styles.btn_minus : styles.remove} onClick={handleMinus}>-</button>
                                    <input type="number" min='1' max={products.quantity} value={quantity} onChange={handleQuantity} size={String(quantity).length}></input>
                                    <button className={styles.btn_add} onClick={handleAdd}>+</button>
                                </div>

                                <div className={styles.btn_add_cart}>
                                    <button className={styles.btn_1} onClick={handleBuyNow}>
                                        {/* <FontAwesomeIcon icon={faCartShopping}/> */}
                                        <span>Mua ngay</span>
                                    </button>
                                    <button  className={styles.btn_2} onClick={handleAddCart}>
                                        <FontAwesomeIcon icon={faCartShopping} className={styles.icon_cart} />
                                        <span>Thêm vào giỏ</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.col_3}>

                        </div>

                        <div className={styles.col_9}>
                            <div className={styles.describe}>
                                <h3>Mô tả</h3>
                                <p className={styles.description}>{products.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.container_similar}>
                        <h3>Sản phẩm tương tự</h3>
                        {similar && (
                            <ProductsItem data={similar} setCB={setCB}/>
                        )}
                    </div>
                </div>

                {announce && user && (
                    <Announce title='Đã thêm vào giỏ hàng!!!'/>
                )}

                {announce && !user && (
                    <Announce title={title} err={true}/>
                )}
            </div>
        </>
    );
}

export default ProductsDetail;