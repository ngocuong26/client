import styles from "./Banner.module.scss";
import banner from "../../../src/assets/image/banner.png";
import banner_img from "../../../src/assets/image/banner_right.png";
import { Link } from "react-router-dom";

function Banner({props}) {
    return(
        <>
            <div className={styles.banner}>
                <img src={banner} className={styles.banner_img}></img>

                {props && (
                    <div className={styles.container}>
                        <div className={styles.grid}>
                            <div className={styles.row}>
                                <div className={styles.col_6}>
                                    <div className={styles.info}>
                                        <h1>Chào mừng bạn đến với cửa hàng văn phòng phẩm VPP</h1>
                                        <p>VPP cung cấp đồ dùng học tập, văn phòng chất lượng</p>
                                        <Link to='/products'>
                                        <div className={styles.container_btn}>
                                            <button>
                                                <span className={styles.btn}>Mua sắm ngay!</span>
                                            </button>
                                        </div>
                                        </Link>
                                        <h2>
                                            <span className={styles.text_deco}>2.000+ Đơn hàng</span>
                                        </h2>
                                    </div>
                                </div>
                                <div className={styles.col_4}>
                                    <div className={styles.img_banner}>
                                        <img src={banner_img}></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Banner;