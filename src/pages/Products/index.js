import { useEffect, useState } from "react";
import ProductsItem from "./ProductItem";
import { BeatLoader } from "react-spinners";
import styles from "./ProductsList.module.scss";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function ProductsList({setCB}) {
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('');
    const [filterPro, setFilterPro] = useState([]);
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const apiURL = process.env.REACT_APP_API_URL;
    
    let id = params.get('filter')
    useEffect(() => {
    console.log('2: ', params.get('filter'));
        
        fetch(`${apiURL}/products?filter=${id}`) 
        .then(res => res.json())
        .then(data => {
            if (id === 'newest') {
                setFilterPro(data.slice(0, 20));
            }else {
                setFilterPro(data);
            }
        })
    }, [id])
    
    const handleFilter = (e) => {
        // setFilter(e.target.value);
        const value = e.target.value
        setLoading(true);
        console.log(e.target.value);
        if (e.target.value === '') {
            navigate('/products')
        }else {
            navigate(`/products?filter=${e.target.value}`);
        }
        
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    return (
        <div className={styles.container_list}>
            <Link to="/">
                <span className={styles.home}>Trang chủ <FontAwesomeIcon icon={faChevronRight} style={{marginRight: '10px'}}/></span>
            </Link>
            <span className={styles.name}>Sản phẩm</span>
            {!loading && (
                <div className={styles.container_filter}>
                    <span>Hiển thị sản phẩm theo: </span>
                    <select value={id} onChange={handleFilter}>
                        <option value=''>Mặc định</option>
                        <option value='asc'>Giá từ thấp tới cao</option>
                        <option value='desc'>Giá từ cao tới thấp</option>
                        <option value='newest'>Sản phẩm mới nhất</option>
                    </select>
                </div>
            )}

            {loading ? (
                <div className={styles.loading}>
                    <BeatLoader  color="#6b7280" size={6} loading={loading}></BeatLoader>
                </div>
            ) : (
                <ProductsItem filterPro={filterPro} setCB={setCB}></ProductsItem>
            )}
        </div>
    );
}

export default ProductsList;