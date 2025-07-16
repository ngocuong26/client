import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from "./ShowOrders.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faSearch } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners";

function ShowOrders({dash}) {
    const [orders, setOrders] = useState([]);
    const [filterOrders, setFilterOrders] = useState([]);
    const [order, setOrder] = useState([]);
    const [status, setStatus] = useState('');
    const [show, setShow] = useState(false);
    const [showSee, setShowSee] = useState(false);
    const [cb, setCb] = useState(false)
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const id_order = params.get('editId');
    const [search, setSearch] = useState('');
    const [currentPage, setCurrenPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const apiURL = process.env.REACT_APP_API_URL;
    const itemsInPage = 10;
    console.log(id_order);
    
    useEffect(() => {
        fetch(`${apiURL}/orders/showall`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [cb])

    const handleEdit = (id_order) => {
        navigate(`/admin/orders?editId=${id_order}`);
        setShow(prev => !prev);
    }

    const handleSee = (idOrder) => {
        console.log('id order', idOrder)
        setShowSee(prev => !prev);
        fetch(`${apiURL}/orders?seeId=${idOrder}`)
            .then(res => res.json())
            .then(data => {setOrder(data); console.log(data);
            })
    }
    
    const handleUnShow = (op) => {
        if (op === 'see') {
            setShowSee(prev => !prev);
            return;
        }
        setShow(false);
    }

    const handleCancel = () => {
        setShow(false);
        setShowSee(false);
    }
    
    const handleConfirm = () => {
        setTimeout(() => {
            setCb(prev => !prev);
            setShow(false);
            fetch(`${apiURL}/orders/edit?editId=${id_order}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({status})
            })
        }, 300)
    }

    const handleSearch = () => {
    }
    
    const handleInputSearch = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const result = orders.filter(order => (
            order._id.toLowerCase().includes(search.toLowerCase())
        ));

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setFilterOrders(result)
        }, 300)
    }, [search])


    const pageCount = Math.ceil((!search ? orders : filterOrders).length / itemsInPage)

    const handlePageClick = (event) => {
        setCurrenPage(event.selected);
        navigate(`/admin/orders?page=${event.selected+1}`)
    }

    const currentOrders = (search !== '' ? filterOrders : orders).slice(currentPage * itemsInPage, (currentPage * itemsInPage) + itemsInPage)
    console.log('currentOrders', currentOrders);

    const date = new Date();
    console.log(date.getMonth() + 1);
    

    return (
        <>
            <div className={styles.title}>
                {dash ? (
                    <>
                        <h2>Đơn hàng gần đây</h2>
                    </>
                ) 
                : 
                (
                    <>
                        <h1>Danh sách đơn hàng</h1>
                        <div>
                            <div className={styles.container_cliploader}>
                                <input 
                                    type='text' 
                                    placeholder='Nhập id đơn hàng muốn tìm'
                                    onChange={handleInputSearch}    
                                ></input>
                                <button onClick={handleSearch}>
                                    <FontAwesomeIcon icon={faSearch} className={styles.icon_search}/>
                                </button>
                                <ClipLoader loading={loading} color='#ccc' size='20px' cssOverride={{borderWidth: '3px', position: 'absolute', top: '8px', right: '72px'}}/>
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
                    </>
                )}
            </div>
            <div className={styles.container_showorder}>
                <table>
                    <thead>
                        <tr>
                            <th>Id_order</th>
                            <th>Tên khách hàng</th>
                            <th>Ngày đặt</th>
                            <th>Giờ</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>

                    {(dash ? orders.slice(-5) : currentOrders).map(order => (
                        <tr>
                            <td>{order._id}</td>
                            <td>{order.id_user}</td>
                            <td>{new Date(order.date).toLocaleDateString("vi-VN")}</td>
                            <td>{new Date(order.date).toLocaleTimeString("vi-VN")}</td>
                            <td>{order.total.toLocaleString('en-EN')}</td>
                            <td className={styles.status}>
                                <span 
                                    className={
                                        order.status === 'deleted' ? styles.deleted : (
                                        order.status === 'confirm' ? styles.confirm : (
                                        order.status === 'waittransform' ? styles.waittransform : (
                                        order.status === 'transform' ? styles.transform : styles.tranformed
                                        )
                                    )
                                    )}>{order.status}</span>
                            </td>
                            <td className={styles.container_option}>
                                <button onClick={() => handleSee(order._id)} className={styles.see}>
                                    <FontAwesomeIcon icon={faEye}/>
                                    Xem
                                </button>
                                <button onClick={() => handleEdit(order._id)} className={styles.edit}>
                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                    Sửa
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>

            {show && (
                <>
                    <div className={styles.box}>
                        <label>Trạng thái:</label>
                        <select value={status} onChange={e => setStatus(e.target.value)}>
                            <option value=''>Chọn trạng thái đơn hàng</option>
                            <option value='confirm'>Chờ xác nhận</option>
                            <option value='waittransform'>Chờ giao hàng</option>
                            <option value='transform'>Đang giao hàng</option>
                            <option value='transformed'>Đã giao hàng</option>
                        </select>
                        <div className={styles.option}>
                            <button onClick={handleConfirm}>Sửa</button>
                            <button onClick={() => handleUnShow('edit')}>Hủy</button>
                        </div>
                    </div>
                    <div className={styles.show_edit} onClick={handleCancel}>
                        <button>x</button>
                    </div>
                </>
            )}

            {showSee && (
                <>
                    <div className={styles.box}>
                        <p>Mã đơn hàng: <strong>{order._id}</strong></p>
                        <p>Sản phẩm:</p>
                        {order.products?.map(pro => (
                            <div className={styles.container_pro_see}>
                                <img src={`${apiURL}/uploads/${pro.img}`}></img>
                                <div>
                                    <p>{pro.name_product}</p>
                                    <p>SL: {pro.quantity}</p>
                                </div>
                            </div>
                        ))}
                        {order._id}
                        <div style={{display: 'flex', justifyContent: 'right'}}>
                            <button onClick={() => handleUnShow('see')}>Hủy</button>
                        </div>
                    </div>
                    <div className={styles.show_edit} onClick={handleCancel}>
                        <button>x</button>
                    </div>
                </>
            )}

        </>
    );
}

export default ShowOrders;