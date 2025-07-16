import { useEffect, useState } from "react"
import styles from "./News.module.scss";
import { Link, useNavigate } from "react-router-dom";

function News() {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();
    const apiURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiURL}/news`)
            .then(res => res.json())
            .then(data => setNews(data))
    })

    const handleNewDetail = (id) => {
        // navigate(`/news?id=${id}`)
    }

    return (
        <div className={styles.grid}>
            <div className={styles.row}>

                {news.map((item, index) => (
                    <div className={styles.col_3}>
                        <div key={index} className={styles.new_item} onClick={() => handleNewDetail(item._id)}>
                            <Link to={`/news/${item._id}`}>
                                <div className={styles.container_img}>
                                    <img src={`${apiURL}/uploads/${item.img}`}></img>
                                </div>
                                <div className={styles.info}>
                                    <h3>{item.title}</h3>
                                    <div className={styles.line}></div>
                                    <p>{item.description}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default News;