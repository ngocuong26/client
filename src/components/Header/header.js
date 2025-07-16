import styles from './Header.module.scss';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronRight, faDollarSign, faGear, faInfo, faMagnifyingGlass, faShoppingCart, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/image/logo.png";

function Header({cart}) {
    const [username, setUsername] = useState({});
    const [itemsInCart, setItemsInCart] = useState([]);
    const [type, setType] = useState(null);
    const [isFixed, setIsFixed] = useState(false);
    const location = useLocation();
    const [user, setUser] = useState([])
    const pathname = location.pathname;
    console.log('location: ', location);
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('');
    const [dataSearch, setDataSearch] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const apiURL = process.env.REACT_APP_API_URL;

    console.log('cart', cart);
    

    const storedUsername = JSON.parse(localStorage.getItem('username'));
    useEffect(() => {
        fetch(`${apiURL}/users`)
            .then(res => res.json())
            .then(data => {
                if(storedUsername) {
                    const userFilter = data.filter(item => item._id === storedUsername.id);
                    console.log('data', userFilter);
                    setUser(userFilter);
                }
            })
    }, [])

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        console.log(storedUsername);
        
        if (storedUsername) {
            const userObj = JSON.parse(storedUsername);
            console.log(userObj);
            setUsername(userObj);
            // setUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        fetch(`${apiURL}/cart`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setItemsInCart(data))
    }, [])
    
    const handleLogout = () => {
        fetch(`${apiURL}/logout`, {
            method: 'POST',
            credentials: 'include',
        })
        .then(() => {
            localStorage.removeItem('username');
            window.location.href = "/"; 
            console.log('username: ', username);
            
        })
        .catch(err => console.error("Logout failed", err));
    }

    const handActive = (op) => {
        if (pathname === '/' || pathname === '/about' || pathname === '/contact' || pathname === '/news') {
            setType(op);
        }
    }

    useEffect(() => {
        const handleScroll = () => {
        setIsFixed(window.scrollY > 600);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    console.log('storedUsername: ',storedUsername);
    
    const handleShow = () => {
        setShow(prev => !prev);
        console.log(show);
        
    }

    const handleUnShow = () => {
        setTimeout(() => {
            setShow(false);
        }, 200)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        if (search.trim() === "") {
            setDataSearch([]);
            return;
        }

        fetch(`${apiURL}/products/search?key=${search}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDataSearch(data);
            })
            .catch(err => console.log('err: ', err))
    }, [search])

    const handleShowProduct = (id_product) => {
        window.location.href = `/products/${id_product}`
    }

    const handleShowSearch = () => {
        setShowSearch(true);
    }

    const handleSearchTest = (e) => {
        setShowSearch(false);
        e.preventDefault(); // chặn reload nếu dùng form
        if (search.trim()) {
        navigate(`/search?key=${search}`, {
            state: {key: search}
        });
        }
    };

    console.log(process.env.REACT_APP_API_URL);

    return(
        <header className={isFixed && pathname === '/' ? styles.headerFixed : styles.header}>
            <div className={styles.container}>
                {/* LOGO */}
                <Link to='/'>
                    <img src={logo}></img>
                </Link>

                {/* Search */}
                <div className={styles.container_search}>
                    <input 
                        className={styles.search} 
                        placeholder='Tìm kiếm sản phẩm...'
                        onChange={handleSearch}
                    ></input>
                    <FontAwesomeIcon className={styles.icon_search} icon={faMagnifyingGlass}/>
                    {dataSearch.length > 0 && (
                        <div className={styles.container_dataSearch}>
                            {(dataSearch.length > 0 && dataSearch.slice(0, 5)).map(item => (
                                <div onClick={() => handleShowProduct(item.id_product)}>
                                        <img src={`${apiURL}/uploads/${item.img}`}></img>
                                        <p>{item.name}</p>
                                    {/* <Link to={`/products/${item.id_product}`} className={styles.link}>
                                    </Link>
                                    <Link to={`/products/${item.id_product}`} className={styles.link}>
                                    </Link> */}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* User */}
                <div className={styles.container_user}>
                    <div onClick={handleShowSearch}>
                        <FontAwesomeIcon className={styles.icon_search_typephone} icon={faMagnifyingGlass}/>
                    </div>
                    <div className={styles.cart}>
                        <Link to='/cart'>
                            <div>
                                <FontAwesomeIcon className={styles.icon} icon={faShoppingCart} />
                                <span className={styles.cart_quantity}>{cart}</span>
                                <span className={styles.cart_text}>Giỏ hàng</span>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.user} title={!storedUsername && 'Bạn cần đăng nhập'}>
                        <FontAwesomeIcon className={styles.icon} icon={faUser}/>
                        <span className={styles.user_text}>{username && user.length > 0 ? user[0].name : 'Khách hàng'}</span>

                        {storedUsername && (
                            <div className={styles.wrapper_user}>
                                <Link to='/my/manage?type=confirm'>
                                    <p>
                                        <div className={styles.review_star}>
                                            <FontAwesomeIcon icon={faGear} />
                                        </div>
                                        Quản lý đơn hàng
                                    </p>
                                </Link>

                                <Link to='/my/spend'>
                                    <p>
                                        <div className={styles.review_star}>
                                            <FontAwesomeIcon icon={faDollarSign} />
                                        </div>
                                        Chi tiêu
                                    </p>
                                </Link>

                                <Link to='/my/review'>
                                    <p>
                                        <div className={styles.review_star}>
                                            <FontAwesomeIcon icon={faStarRegular} />
                                        </div>
                                        Đánh giá
                                    </p>
                                </Link>

                                <Link to='/my/info'>
                                    <p>
                                        <div className={styles.review_star}>
                                            <FontAwesomeIcon icon={faInfo} />
                                        </div>
                                        Thông tin
                                    </p>
                                </Link>

                            </div>
                        )}

                    </div>

                    {username.email ? (<button onClick={handleLogout} className={styles.btn_log_tab}>Đăng xuất</button>) : 
                    (
                            <Link to='/login' className={styles.link}>
                                <button className={styles.btn_log_tab}>Đăng nhập</button>
                            </Link>
                    )}

                    <div className={styles.container_menu} onClick={handleShow}>
                        <FontAwesomeIcon icon={faBars} className={styles.icon_menu} />
                    </div>

                    {show && (
                        <>
                            <div className={styles.show_menu}  onClick={handleUnShow}>
                                <FontAwesomeIcon icon={faXmark} className={styles.icon_xmark}/>
                            </div>
                            <div className={styles.container_menu_show}>
                                <Link to='/'>
                                    <div>
                                        <FontAwesomeIcon icon={faChevronRight}/>
                                        <span onClick={handleUnShow}>Trang chủ</span>
                                    </div>
                                </Link>
                                <Link to='/about'>
                                    <div>
                                        <FontAwesomeIcon icon={faChevronRight}/>
                                        <span onClick={handleUnShow}>Giới thiệu</span>
                                    </div>
                                </Link>
                                <Link to='/contact'>
                                    <div>
                                        <FontAwesomeIcon icon={faChevronRight}/>
                                        <span onClick={handleUnShow}>Liên hệ</span>
                                    </div>
                                </Link>
                                <Link to='/news'>
                                    <div>
                                        <FontAwesomeIcon icon={faChevronRight}/>
                                        <span onClick={handleUnShow}>Tin tức</span>
                                    </div>
                                </Link>

                                {username.email ? (<button onClick={handleLogout} className={styles.btn_log}>Đăng xuất</button>) : 
                                (
                                    <div style={{display: 'flex', gap: '14px'}}>
                                        <Link to='/login'>
                                            <button className={styles.btn_log}>Đăng nhập</button>
                                        </Link>
                                        <Link to='register'>
                                            <button className={styles.btn_log}>Đăng ký</button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {showSearch && (
                    <div className={styles.search_typePhone}>
                        <form onSubmit={handleSearchTest}>
                            <input
                                type="text"
                                placeholder="Nhập từ khóa"
                                value={search}
                                className={styles.search} 
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>
                        {/* <input 
                            placeholder='Tìm kiếm sản phẩm...'
                            onChange={handleSearch}
                            onFocus={() => (true)}
                        ></input> */}

                        {/* {dataSearch.length > 0 && (
                            <div className={styles.container_searchData_phone}>
                                {dataSearch.map(pro => (

                                    <p>{pro.name}</p>
                                ))}
                            </div>
                        )} */}
                    </div>
                )}
            </div>


            <div className={isFixed ? styles.navbar_bg : styles.navbar}>
                <div className={styles.container_nav}>
                    {/* <h2>Home</h2> */}
                    <Link to="/"><button className={type === 'home' ? styles.btn_active : styles.btn_header} onClick={() => handActive('home')}>TRANG CHỦ</button></Link>
                    <Link to="/about"><button className={type === 'about' ? styles.btn_active : styles.btn_header} onClick={() => handActive('about')}>GIỚI THIỆU</button></Link>
                    <Link to="/contact"><button className={type === 'contact' ? styles.btn_active : styles.btn_header} onClick={() => handActive('contact')}>LIÊN HỆ</button></Link>
                    <Link to="/news"><button className={type === 'new' ? styles.btn_active : styles.btn_header} onClick={() => handActive('new')}>TIN TỨC</button></Link>
                    {/* <h2>Contact</h2> */}
                    {/* <h2>News</h2> */}
                </div>
            </div>

        </header>
    )
}

export default Header;