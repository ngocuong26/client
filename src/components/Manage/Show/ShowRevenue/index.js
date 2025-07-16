import styles from "./ShowRevenue.module.scss";

function ShowRevenue() {

    return (
        <div className={styles.container_revenue}>
            <h2>Doanh thu</h2>
            <div className={styles.container_filter}>
                <div>
                    <span>Tháng</span>
                    <select>
                        <option>Chọn tháng</option>
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>

                <div>
                    <span>Năm</span>
                    <select>
                        <option>Chọn năm</option>
                        <option>2020</option>
                        <option>2021</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default ShowRevenue;