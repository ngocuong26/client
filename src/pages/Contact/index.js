import styles from "./Contact.module.scss";
import contact_img from "../../assets/image/contact.avif";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Announce from "../../components/Announce";

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [contact, setContact] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [announce, setAnnounce] = useState(false);
    const apiURL = process.env.REACT_APP_API_URL;

    const user = JSON.parse(localStorage.getItem('username'));

    const handleContact = () => {
        if (!user) {
            setAnnounce(true);

            setTimeout(() => {
                setAnnounce(false);
            }, 3000)

            return;
        }

        const newErrors = {}
        if (!name) {
            newErrors.name = '* Vui lòng nhập tên của bạn!!!';
        }
        if (!email) {
            newErrors.email = '* Vui lòng nhập email!!!';
        }
        if (!title) {
            newErrors.title = '* Vui lòng nhập tiêu đề!!!';
        }
        if (!contact) {
            newErrors.contact = '* Vui lòng nhập nội dung!!!';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return
        }

        fetch(`${apiURL}/contact/create`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, title, contact})
        });
        console.log('Đã gửi yêu cầu!!!!!!!!!!');

        navigate("/", {
            state: {status: true}
        });
    }


    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                <div className={styles.row}>
                    <div className={styles.col_3}>
                        <div className={styles.container_img}>
                            <img src={contact_img}></img>
                        </div>
                    </div>

                    <div className={styles.col_8}>
                        <div className={styles.container_contact}>
                            <div className={styles.grid}>
                                <div className={styles.row_contact}>
                                    <div className={styles.col_2}>
                                        <div className={styles.info_user}>
                                            <label>Nhập tên:</label>
                                            <input 
                                                type="text" 
                                                placeholder="Nhập tên của bạn" 
                                                onChange={e => setName(e.target.value)}
                                                onFocus={() => setErrors({})}
                                            ></input>
                                            {errors.name && (<span style={{color: 'red'}}>{errors.name}</span>)}
                                        </div>
                                    </div>
                                    <div className={styles.col_2}>
                                        <div className={styles.info_user}>
                                            <label>Nhập email:</label>
                                            <input 
                                                type="email" 
                                                placeholder="Nhập email của bán"
                                                onChange={e => setEmail(e.target.value)}   
                                                onFocus={() => setErrors({})} 
                                            ></input>
                                            {errors.email && (<span style={{color: 'red'}}>{errors.email}</span>)}
                                        </div>
                                    </div>

                                </div> 
                            </div>
                            <div className={styles.content}>
                                <label>Nhập tiêu đề:</label>
                                <input 
                                    type="text" 
                                    placeholder="Nhập tiêu đề"
                                    onChange={e => setTitle(e.target.value)}
                                    onFocus={() => setErrors({})}
                                ></input>
                                {errors.title && (<span style={{color: 'red'}}>{errors.title}</span>)}
                                <label className={styles.content_text}>Nhập ý kiến phản hồi:</label>
                                <textarea 
                                    className={styles.text_content}
                                    onChange={e => setContact(e.target.value)}   
                                    onFocus={() => setErrors({})} 
                                ></textarea>
                                {errors.contact && (<span style={{color: 'red'}}>{errors.contact}</span>)}
                            </div>

                            <div className={styles.btn}>
                                <button className={styles.btn_send} onClick={handleContact}>Gửi</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {announce && !user && (
                <Announce title='Đăng nhập để gửi liên hệ!!!' err={true}/>
            )}
        </div>
    );
}

export default Contact;