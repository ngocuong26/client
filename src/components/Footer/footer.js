import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Footer.module.scss";
import { faChevronRight, faEnvelope, faLocationDot, faPhone, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";


function Footer() {
    const navigate= useNavigate();
    const apiURL = process.env.REACT_APP_API_URL;

    const handlePolicy = (type) => {
        navigate(`/policy/${type}`);
    }

    const handlePage = (type) => {
        navigate(`${type}`);
    }

    return (
        <div className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.col_3}>
                        <div className={styles.about}>
                            <img src={logo}></img>
                            <p>Chuyên cung cấp đồ dùng học tập, đồ dùng văn phòng chất lượng</p>
                            <p>
                                <FontAwesomeIcon icon={faLocationDot} className={styles.icon}/>
                                <span>khu 7, xã Thư Lâm, thành phố Hà Nội</span>
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faEnvelope} className={styles.icon}/>
                                <span>ngocuongVPP@gmail.com</span>
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faPhone} className={styles.icon}/>
                                <span>(+84) 9610xxxxx</span>
                            </p>
                        </div>
                    </div>
                    <div className={styles.col_3}>
                        <div className={styles.policy}>
                            <h3>Chính sách</h3>
                            <p onClick={() => handlePolicy('chinh-sach-bao-mat')}>
                                <FontAwesomeIcon icon={faChevronRight}/>
                                <span>Chính sách bảo mật</span>
                            </p>
                            <p onClick={() => handlePolicy('chinh-sach-doi-tra')}>
                                <FontAwesomeIcon icon={faChevronRight}/>
                                <span>Chính sách đổi trả</span>
                            </p>
                            <p onClick={() => handlePolicy('quy-dinh-chung')}>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <span>Quy định chung</span>
                            </p>
                        </div>
                    </div>
                    <div className={styles.col_3}>
                        <div className={styles.policy_link}>
                            <h3>Cửa hàng VPP</h3>
                            <p onClick={() => handlePage('')}>
                                <FontAwesomeIcon icon={faChevronRight}/>
                                <span>Trang chủ</span>
                            </p>
                            <p onClick={() => handlePage('/contact')}>
                                <FontAwesomeIcon icon={faChevronRight}/>
                                <span>Liên hệ</span>
                            </p>
                            <p onClick={() => handlePage('/about')}>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <span>Giới thiệu</span>
                            </p>
                            <p onClick={() => handlePage('/news')}>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <span>Tin tức</span>
                            </p>
                        </div>
                    </div>
                    <div className={styles.col_3}>
                        <div className={styles.note}>
                            <img src={`${apiURL}/uploads/logoSaleNoti.png`}></img>
                        </div>
                    </div>
                </div>

                <div className={styles.footer_bottom}>
                    {/* <div>hello</div> */}
                    <div className={styles.phone}>
                        <div >
                            <FontAwesomeIcon icon={faPhoneVolume} className={styles.phone_icon} />
                            <span className={styles.phone_number}>1999-8666</span>
                        </div>
                        <div >
                            <FontAwesomeIcon icon={faPhoneVolume} className={styles.phone_icon} />
                            <span className={styles.phone_number}>1999-8888</span>
                        </div>
                    </div>
                    <div className={styles.container_social}>
                        <span>Theo dõi</span>
                        <div className={styles.social}>
                            <div className={styles.social_icon}>
                                <FontAwesomeIcon icon={faFacebookF}/>   
                            </div>
                            <div className={styles.social_icon}>
                                <FontAwesomeIcon icon={faTwitter}/>
                            </div>
                            <div className={styles.social_icon}>
                                <FontAwesomeIcon icon={faInstagram}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.manage}>
                <div className={styles.container}>
                    <span>Copyright 2025 © </span>
                    <Link to='/admin/login'>           
                        <strong>VPP</strong>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;