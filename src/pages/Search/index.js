import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import styles from "./Search.module.scss";
import { useEffect, useState } from "react";
import ProductsItem from "../Products/ProductItem";


function Search() {
    const location = useLocation();
    const state = location.state;
    const [products, setProducts] = useState([]);
    const apiURL = process.env.REACT_APP_API_URL

    useEffect(() => {
        if (state.key) {
            console.log('satte key: ', state.key);
            
            fetch(`${apiURL}/products/search?key=${state.key}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setProducts(data);
                })
        }
    }, [state])

    return (
        <div className={styles.container}>
            <div className={styles.container_name}>
                <Link to='/'>
                    <span className={styles.name}>Trang chủ
                        <FontAwesomeIcon icon={faChevronRight} className={styles.icon}/>
                    </span>
                </Link>
                    <span>Tìm kiếm</span>
                    <FontAwesomeIcon icon={faChevronRight} className={styles.icon}/>
                    <span className={styles.key}>{state?.key}</span>
            </div>

            {products.length > 0 ? (
                <ProductsItem searchData={products}/>
            ) : (
                <p className={styles.no_pro}>Không tìm thấy sản phẩm</p>
            )}

        </div>
    )
}

export default Search;