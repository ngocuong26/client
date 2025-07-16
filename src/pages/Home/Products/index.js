import styles from "./Products.module.scss";
import { Link } from "react-router-dom";

function Products({title, btn}) {
    return (
        <>
            <div>
                {/* <h1>{title}</h1> */}
                {/* <div className={styles.grid}>
                    <div className={styles.row}>
                        <div className={styles.col_5}>
                            <div className={styles.product}></div>
                        </div>
                        <div className={styles.col_5}>
                            <div className={styles.product}></div>
                        </div>
                        <div className={styles.col_5}>
                            <div className={styles.product}></div>
                        </div>
                        <div className={styles.col_5}>
                            <div className={styles.product}></div>
                        </div>
                        <div className={styles.col_5}>
                            <div className={styles.product}></div>
                        </div>
                        <div className={styles.col_5}>
                            <div className={styles.product}></div>
                        </div>
                        <div className={styles.col_5}>
                            <div className={styles.product}></div>
                        </div>

                    </div>
                </div> */}

                <div className={styles.container_btn}>
                    {btn && 
                        <Link to="/products">
                            <button className={styles.btn_view}>{btn}</button>
                        </Link>
                    }
                </div>
            </div>
        </>
    );
}

export default Products;