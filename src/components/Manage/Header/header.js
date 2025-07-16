import styles from "./ManageHeader.module.scss";
import logo from "../../../assets/image/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";

function ManageHeader({admin}) {
    const handleLogout = () => {
        localStorage.removeItem('admin');
        window.location.href = '/admin'
    }

    return (
        <div className={styles.header}>
            <img src={logo}></img>
            <div className={styles.container_search}>
                <input type="text" placeholder="Enter your search"></input>
            </div>
            <div className={styles.admin}>
                <div className={styles.container_letter}>
                    <FontAwesomeIcon icon={faEnvelope} className={styles.icon_letter}/>
                    <div className={styles.active}></div>
                </div>
                <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                <span>Admin</span>
                {admin && <button onClick={handleLogout}>Đăng xuất</button>}
            </div>
        </div>
    );
}

export default ManageHeader;