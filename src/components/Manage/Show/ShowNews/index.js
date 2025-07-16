import { useEffect, useState } from "react";
import styles from "./ShowNews.module.scss";
import { useNavigate } from "react-router-dom";

function ShowNews() {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();
    const apiURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiURL}/news`)
            .then(res => res.json())
            .then(data => setNews(data))
    }, [])

    const handleEdit = (id) => {
        navigate(`/admin/edit?type=news&Id=${id}`)
    }

    return (
        <>
            <h1>Tin tức</h1>
            <div className={styles.row}>
                {news.map(n => (
                    <div className={styles.col_3} key={n._id}>
                        <div className={styles.items}>
                            <img className={styles.img} src={`${apiURL}/uploads/${n.img}`}></img>
                            <h3 className={styles.new_title}>{n.title}</h3>

                            <div className={styles.container_btn}>
                                <button className={styles.edit} onClick={() => handleEdit(n._id)}>Sửa</button>
                                <button className={styles.delete}>Xóa</button>
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
        </>
    );
}

export default ShowNews;