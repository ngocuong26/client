import styles from "./Categories.module.scss";
import menu from "../../../assets/image/menu.png";
import ghim from "../../../assets/image/ghim.png";
import la from "../../../assets/image/la.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const colors = [
  "#F2FCE4", "#FFFCEB", "#ECFFEC", "#FEEFEA", "#FFF3EB",
  "#F4ECFF", "#F2FCE4", "#FEEFEA", "#FFFCEB", "#EAF3FF"
];

function Category({title, p}) {
    const [cate, setCate] = useState([]);
    const navigate = useNavigate();
    const apiURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiURL}/category`)
            .then(res => res.json())
            .then(data => setCate(data))
    }, []);

    const handleCate = (parent) => {
        navigate(`/category?cate=${parent}`);
    }

    return (
        <div className={styles.grid}>
            <h1 className={styles.title}>{title}</h1>
            {p && (
                <p>{p}</p>
            )}
            <div className={styles.row}>
                {cate.slice(0,8).map((item, index) => (
                    <div className={styles.col_8} key={index}>
                    <div
                        className={styles.category}
                        style={{ background: colors[index % colors.length] }}
                        onClick={() => handleCate(item.parent)}
                    >
                        <h4 key={index}>{item.parent}</h4>
                    </div>
                    </div>
                ))}
            </div>

            {/* <div className={styles.row}>
                <div className={styles.col_4}>
                    <div>
                        <div className={styles.container_menu}>
                            <img src={menu} className={styles.img_menu}></img>
                            <img src={ghim} className={styles.ghim}></img>
                            <img src={la} className={styles.la}></img>
                        </div>
                    </div>
                </div>
                <div className={styles.col_4}>
                    <div>
                        <div className={styles.container_menu}>
                            <img src={menu} className={styles.img_menu}></img>
                            <img src={ghim} className={styles.ghim}></img>
                            <img src={la} className={styles.la}></img>
                        </div>
                    </div>
                </div>
                <div className={styles.col_4}>
                    <div>
                        <div className={styles.container_menu}>
                            <img src={menu} className={styles.img_menu}></img>
                            <img src={ghim} className={styles.ghim}></img>
                            <img src={la} className={styles.la}></img>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default Category;