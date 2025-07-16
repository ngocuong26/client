import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./News.module.scss";

function NewDetail() {
    const {id} = useParams();
    console.log(id);
    const [news, setNews] = useState({});
    const [content, setContent] = useState([]);
    const apiURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiURL}/news?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setNews(data); 
                console.log(data);
                setContent(data.contents)
            })
    }, [])
    

    return (
        <div className={styles.container_detail}>
            <Link to='/news'>
                <span>TIN TỨC</span>
            </Link>
            <h2>{news.title}</h2>
            <div className={styles.line}></div>
            <img src={`${apiURL}/uploads/${news.img}`}></img>
            {content.map((n, index) => (
                <>
                    <h3>{n.title_child}</h3>
                    <p>{n.content}</p>
                </>
            ))}
        </div>
    );
}

export default NewDetail;