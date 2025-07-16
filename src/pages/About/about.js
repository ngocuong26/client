import styles from "./About.module.scss";
import intro_img from "../../assets/image/intro.avif";
import about1 from "../../assets/image/about1.webp";
import about2 from "../../assets/image/about2.webp";
import about3 from "../../assets/image/about3.jpg";
import provide1 from "../../assets/image/provide1.png"
import provide2 from "../../assets/image/provide2.png"
import provide3 from "../../assets/image/provide3.png"
import provide4 from "../../assets/image/provide4.png"
import provide5 from "../../assets/image/provide5.png"
import provide6 from "../../assets/image/provide6.png"

function About() {
    return (
        <div className={styles.about}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.row_6}>
                        <div className={styles.col_6}>
                            <div className={styles.container_about_img}>
                                <div className={styles.img}>
                                    <img src={intro_img}></img>
                                </div>
                            </div>
                        </div>
                        <div className={styles.col_6}>
                            <div className={styles.container_about}>
                                <h1>Cửa hàng Văn phòng phẩm VPP</h1>
                                <p>Cửa hàng VPP là địa chỉ tin cậy chuyên cung cấp các sản phẩm văn phòng phẩm chất lượng, đa dạng mẫu mã, giá cả cạnh tranh. Chúng tôi luôn nỗ lực mang đến trải nghiệm mua sắm tiện lợi và dịch vụ chăm sóc khách hàng tận tâm.</p>
                                <p>Được thành lập từ năm 2020, VPP bắt đầu với sứ mệnh cung cấp văn phòng phẩm cho các cá nhân, trường học và doanh nghiệp. Trải qua hơn 4 năm phát triển, chúng tôi đã phục vụ hàng nghìn khách hàng và không ngừng hoàn thiện để phục vụ tốt hơn.</p>
                                <div className={styles.grid}>
                                    <div className={styles.row}>
                                        <div className={styles.col_4}>
                                            <div className={styles.img_child}>
                                               <img src={about1}></img> 
                                            </div>
                                        </div>
                                        <div className={styles.col_4}>
                                            <div className={styles.img_child}>
                                               <img src={about2}></img> 
                                            </div>
                                        </div>
                                        <div className={styles.col_4}>
                                            <div className={styles.img_child}>
                                               <img src={about3}></img> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.grid}>
                    <div className={styles.title}>
                        <h1>Lợi ích khi mua hàng tại VPP</h1>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.col_4}>
                            <div className={styles.provide_content}>
                                <div>
                                    <img src={provide1}></img>
                                </div>
                                <h3>Giá tốt & Khuyến mãi</h3>
                                <p>Giá cả cạnh tranh, khuyến mãi hấp dẫn</p>
                            </div>
                        </div>
                        <div className={styles.col_4}>
                            <div className={styles.provide_content}>
                                <div>
                                    <img src={provide2}></img>
                                </div>
                                <h3>Sản phẩm đa dạng</h3>
                                <p>Dụng cụ văn phòng, dụng cụ học tập, thiết bị học tập, văn phòng,...</p>
                            </div>
                        </div>
                        <div className={styles.col_4}>
                            <div className={styles.provide_content}>
                                <div>
                                    <img src={provide3}></img>
                                </div>
                                <h3>Giao hàng miễn phí</h3>
                                <p>Giao hành miễn phí, nhanh chóng</p>
                            </div>
                        </div>
                        <div className={styles.col_4}>
                            <div className={styles.provide_content}>
                                <div>
                                    <img src={provide4}></img>
                                </div>
                                <h3>Đổi trả dễ dàng</h3>
                                <p>Hỗ trợ đổi trả linh hoạt</p>
                            </div>
                        </div>
                        <div className={styles.col_4}>
                            <div className={styles.provide_content}>
                                <div>
                                    <img src={provide5}></img>
                                </div>
                                <h3>Hài lòng 100%</h3>
                                <p>Cam kết sản phẩm chất lượng, hỗ trợ tận tâm</p>
                            </div>
                        </div>
                        <div className={styles.col_4}>
                            <div className={styles.provide_content}>
                                <div>
                                    <img src={provide6}></img>
                                </div>
                                <h3>Ưu đãi mỗi ngày</h3>
                                <p>Nhiều combo, khuyến mãi hấp dẫn</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;