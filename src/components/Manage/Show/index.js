import { useLocation } from "react-router-dom";
import styles from "./Show.module.scss";
import ShowDash from "./ShowDash";

function ShowAdmin() {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <div className={styles.container_show}>
            <h1>Hello</h1>
            {/* {pathname === '/admin/products' && (
                <div>{pathname}</div>
            )}
            {pathname === '/admin/dash' && (
                <h1>hello</h1>
            )} */}
        </div>
    );
}

export default ShowAdmin;