import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./ShowProducts.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPenToSquare, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import {BeatLoader} from "react-spinners";
import Announce from "../../../Announce";


function ShowProducts() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [pageTotal, setPageTotal] = useState(1);
    let page = 1;
    const [show, setShow] = useState(false);
    const [announce, setAnnounce] = useState(false);
    const [filter, setFilter] = useState('');
    const [cate, setCate] = useState([]);
    const [loading, setLoading] = useState(false);
    const itemPerPage = 10;
    const [curPage, setCurPage] = useState(0);
    const apiURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiURL}/category`)
            .then(res => res.json())
            .then(data => setCate(data))
    }, [])

    useEffect(() => {
        setLoading(prev => !prev);

        setTimeout(() => {
            fetch(`${apiURL}/products/filter?Cate=${filter}`)
                .then(res => res.json())
                .then(data => {
                    setLoading(false);
                    setProducts(data);
                    setPageTotal(Math.ceil(data.length / 10));
                    navigate(`?page=${page}`)
            })
        }, 1000)
    }, [filter, page])

    const handleFilter = (e) => {
        setFilter(e.target.value);
    }

    const pageCount = Math.ceil(products.length / itemPerPage);

    const handleInputSearch = () => {

    }

    const handleSearch = () => {

    }

    const handleAdd = () => {
        navigate('/admin/add/product');
        setShow(prev => !prev);
    }

    const handleCancel = () => {
        setShow(prev => !prev);
    }

    const handleEdit = (id_product, price, quantity, parent, child, name, description) => {
        navigate(`/admin/edit?type=product&Id=${id_product}`,
            {state: {
                price, quantity, parent, child, name, description
            }}
        )
    }

    const handleDelete = (id_product) => {
        setAnnounce(prev => !prev);

        setTimeout(() => {
            fetch(`${apiURL}/products/delete?Id=${id_product}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => setProducts(data))
            console.log(`${apiURL}/products/delete?Id=${id_product}`);
            
            setAnnounce(false);
        }, 2000);
    }

    const handlePageClick = (event) => {
        setCurPage(event.selected);
        navigate(`/admin/products?page=${event.selected + 1}`)
    }

    const curPro = products.slice(curPage * itemPerPage, (curPage * itemPerPage) + itemPerPage);
    
    return (
        <>
            <div className={styles.title}>
                <h1>Danh sách sản phẩm</h1>
                {/* <label>Tìm kiếm đơn hàng</label> */}
                <div>
                    <div>
                        <input 
                            type='text' 
                            placeholder='Nhập id sản phẩm muốn tìm'
                            onChange={handleInputSearch}    
                        ></input>
                        <button onClick={handleSearch}>
                            <FontAwesomeIcon icon={faSearch} className={styles.icon_search}/>
                        </button>
                    </div>
                    <div>
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={styles.pagination}
                            activeClassName={styles.active}
                            pageClassName={styles.pageItem}
                            nextClassName={styles.nextbtn}
                            previousClassName={styles.prevbtn}
                            pageLinkClassName={styles.pageLink}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.container_add_filter}>
                <button onClick={handleAdd} className={styles.add_pro}>Thêm sản phẩm</button>
                <div>
                    <label>Lọc sản phẩm</label>
                    <select value={filter} onChange={handleFilter}>
                        <option value=''>Tất cả</option>
                        {cate.map(cate => (
                            <option key={cate._id} value={cate.parent}>{cate.parent}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={styles.container_showorder}>
                {loading ? (
                        <div className={styles.loading}>
                            <BeatLoader color="#6b7280" size={6} loading={loading} className={styles.loader}/>
                        </div>
                    ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID sản phẩm</th>
                            <th></th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Danh mục</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>

                    
                        {curPro.map(product => (
                            <tr key={product.id_product}>
                                <td>{product.id_product}</td>
                                <td>
                                    <img src={`${apiURL}/uploads/${product.img}`}></img>
                                </td>
                                <td>
                                    <span>{product.name}</span>
                                </td>
                                <td>{product.price.toLocaleString('en-US') || ''}</td>
                                <td>{product.quantity}</td>
                                <td>{product.category.parent || ''}</td>
                                {/* <td></td> */}
                                <td>
                                    <button 
                                        className={styles.btn_edit} 
                                        onClick={() => handleEdit(
                                            product.id_product, 
                                            product.price, 
                                            product.quantity,
                                            product.category.parent,
                                            product.category.child,
                                            product.name,
                                            product.description
                                        )}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare}/>
                                        Sửa
                                    </button>
                                    <button className={styles.btn_cancel}
                                        onClick={() => handleDelete(product.id_product)}    
                                    >
                                        <FontAwesomeIcon icon={faTrash}/>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                </table>
                    )}
            </div>

            {announce && (
                <Announce title='Đã xóa sản phẩm thành công!!!' />
            )}
        </>
    );
}

export default ShowProducts;