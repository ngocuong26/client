import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProductsSale.module.scss";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import sp1 from "../../../assets/image/sp1.jpg";

function ProductsSale() {
    return (
        <>
            <div className={styles.grid}>
                <div className={styles.row}>
                    <div className={styles.col_4}>
                        <div className={styles.product_sale}>
                            <div className={styles.img_product}>
                                <img src={sp1} className={styles.img}></img>
                            </div>
                            <div className={styles.info_product}>
                                <div className={styles.container_info}>
                                    <h3>Cốc cắm bút hình quả táo</h3>
                                    <p>20.000 đ</p>
                                    <span><FontAwesomeIcon icon={faStar} className={styles.star} /></span>
                                    <div className={styles.btn}>
                                        <button>Mua ngay</button>
                                        <button>Thêm vào giỏ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.col_4}>
                        <div className={styles.product_sale}>
                            <div className={styles.img_product}>
                                <img src={sp1} className={styles.img}></img>
                            </div>
                            <div className={styles.info_product}>
                                <div className={styles.container_info}>
                                    <h3>Cốc cắm bút hình quả táo haha haha haha</h3>
                                    <p>20.000 đ</p>
                                    <span><FontAwesomeIcon icon={faStar} className={styles.star} /></span>
                                    <div className={styles.btn}>
                                        <button>Mua ngay</button>
                                        <button>Thêm vào giỏ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.col_4}>
                        <div className={styles.product_sale}>
                            <div className={styles.img_product}>
                                <img src={sp1} className={styles.img}></img>
                            </div>
                            <div className={styles.info_product}>
                                <div className={styles.container_info}>
                                    <h3>Cốc cắm bút hình quả táo</h3>
                                    <p>20.000 đ</p>
                                    <span><FontAwesomeIcon icon={faStar} className={styles.star} /></span>
                                    <div className={styles.btn}>
                                        <button>Mua ngay</button>
                                        <button>Thêm vào giỏ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.col_4}>
                        <div className={styles.product_sale}>
                            <div className={styles.img_product}>
                                <img src={sp1} className={styles.img}></img>
                            </div>
                            <div className={styles.info_product}>
                                <div className={styles.container_info}>
                                    <h3>Cốc cắm bút hình quả táo</h3>
                                    <p>20.000 đ</p>
                                    <span><FontAwesomeIcon icon={faStar} className={styles.star} /></span>
                                    <div className={styles.btn}>
                                        <button>Mua ngay</button>
                                        <button>Thêm vào giỏ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.col_4}>
                        <div className={styles.product_sale}>
                            <div className={styles.img_product}>
                                <img src={sp1} className={styles.img}></img>
                            </div>
                            <div className={styles.info_product}>
                                <div className={styles.container_info}>
                                    <h3>Cốc cắm bút hình quả táo</h3>
                                    <p>20.000 đ</p>
                                    <span><FontAwesomeIcon icon={faStar} className={styles.star} /></span>
                                    <div className={styles.btn}>
                                        <button>Mua ngay</button>
                                        <button>Thêm vào giỏ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.col_4}>
                        <div className={styles.product_sale}>
                            <div className={styles.img_product}>
                                <img src={sp1} className={styles.img}></img>
                            </div>
                            <div className={styles.info_product}>
                                <div className={styles.container_info}>
                                    <h3>Cốc cắm bút hình quả táo</h3>
                                    <p>20.000 đ</p>
                                    <span><FontAwesomeIcon icon={faStar} className={styles.star} /></span>
                                    <div className={styles.btn}>
                                        <button>Mua ngay</button>
                                        <button>Thêm vào giỏ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
        </>
    )
}

export default ProductsSale;