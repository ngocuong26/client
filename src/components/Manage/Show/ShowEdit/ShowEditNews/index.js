import { useEffect, useState } from "react";
import styles from "./ShowEditNews.module.scss";

function ShowEditNews({id_new}) {
    const [newItem, setNewItem] = useState({});
    const [contents, setContents] = useState([]);
    const [show, setShow] = useState(false);
    const [arr, setArr] = useState([]);
    const apiURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiURL}/news?id=${id_new}`)
            .then(res => res.json())
            .then(data => {
                setNewItem(data);
                setContents(data.contents)
            })
    }, []);

    const handleAdd = () => {
        // let a = arr.push(i);

        setArr(arr.push(1));
        // arr.push(i);

        console.log(arr);
        
    }

    return (
        <div className={styles.container_edit_news}>
            <h2>Chỉnh sửa tin tức</h2>
            <label>Tiêu đề báo</label>
            <input value={newItem.title} onChange={e => setNewItem(e.target.value)}></input>

            {contents.map((content, index) => (
                <div key={index}>
                    <label>Tiêu đề con</label>
                    <textarea>{content.content}</textarea>
                </div>
            ))}

            <button onClick={handleAdd}>Thêm tiêu đề và nội dung</button>
            {/* {arr} */}

            {/* {arr.map(a => (
                <div>
                    <label>Tiêu đề</label>
                    <input placeholder="Nhập tiêu đề"></input>
    
                    <label>Nội dung</label>
                    <textarea></textarea>
                </div>

            ))} */}
        </div>
    );
}

export default ShowEditNews;