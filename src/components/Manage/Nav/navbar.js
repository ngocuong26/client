import { useState } from "react";
import styles from "./Navbar.module.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faChartSimple, faCommentDots, faGauge, faNewspaper, faReceipt, faTableList, faUsers } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    // const [active, setActive] = useState(false);
    const [type, setType] = useState('');
    const navigate = useNavigate();


    const handleActive = (op) => {
        if (op === 'dash') {
            setType(op);
            navigate(`/admin/${op}`);
            return;
        }
        if (op === 'news') {
            setType(op);
            navigate(`/admin/${op}`);
            return;
        }
        // setActive(true);
        setType(op);
        navigate(`/admin/${op}?page=1`);
    }

    return (
        <div className={styles.navbar}>
            <p className={type === 'dash' ? styles.menu_active : styles.menu} onClick={() => handleActive('dash')}>
                <FontAwesomeIcon icon={faGauge} className={styles.icon}/>Dash</p>
            <p className={type === 'products' ? styles.menu_active : styles.menu} onClick={() => handleActive('products')}>
                <FontAwesomeIcon icon={faCartShopping} className={styles.icon}/>
                Products
            </p>
            <p className={type === 'users' ? styles.menu_active : styles.menu} onClick={() => handleActive('users')}>
                <FontAwesomeIcon icon={faUsers} className={styles.icon}/>
                Users
            </p>
            <p className={type === 'cate' ? styles.menu_active : styles.menu} onClick={() => handleActive('cate')}>
                <FontAwesomeIcon icon={faTableList} className={styles.icon}/>
                Categories
            </p>
            <p className={type === 'orders' ? styles.menu_active : styles.menu} onClick={() => handleActive('orders')}>
                <FontAwesomeIcon icon={faReceipt} className={styles.icon}/>
                Orders
            </p>
            <p className={type === 'reviews' ? styles.menu_active : styles.menu} onClick={() => handleActive('reviews')}>
                <FontAwesomeIcon icon={faCommentDots} className={styles.icon}/>
                Reviews
            </p>
            <p className={type === 'contact' ? styles.menu_active : styles.menu} onClick={() => handleActive('contact')}>
                <FontAwesomeIcon icon={faCommentDots} className={styles.icon}/>
                Contact
            </p>
            <p className={type === 'news' ? styles.menu_active : styles.menu} onClick={() => handleActive('news')}>
                <FontAwesomeIcon icon={faNewspaper} className={styles.icon}/>
                News
            </p>
            {/* <p className={type === 'revenue' ? styles.menu_active : styles.menu} onClick={() => handleActive('revenue')}>
                <FontAwesomeIcon icon={faChartSimple} className={styles.icon}/>
                Revenue
            </p> */}
        </div>
    )
}

export default Navbar;