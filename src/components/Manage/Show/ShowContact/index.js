import { useEffect, useState } from "react";
import styles from "./ShowContact.module.scss";
import Announce from "../../../Announce";

function ShowContact() {
    const [conPending, setConPending] = useState([]);
    const [conReflied, setConReflied] = useState([]);
    const [show, setShow] = useState(false);
    const [item, setItem] = useState({});
    const [refly, setRefly] = useState('');
    const [annoucne, setAnnounce] = useState(false);
    const [cb, setCB] = useState(false);
    const apiURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        console.log('cb: ', cb);
        
        fetch(`${apiURL}/contact/pending`)
            .then(res => res.json())
            .then(data => setConPending(data))
    }, [cb])

    useEffect(() => {
        fetch(`${apiURL}/contact/reflied`)
            .then(res => res.json())
            .then(data => setConReflied(data))
    }, [])

    const handleRefly = ({id, title, contact}) => {
        setShow(prev => !prev);
        setItem({id, title, contact});
    }

    const handleCancel = () => {
        setShow(false);
    }

    const handleRequest = (id) => {
        fetch(`${apiURL}/contact/refly?id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refly: refly})
        })
        setShow(false);
        setAnnounce(true);
        setCB(prev => !prev);
        setTimeout(() => {
            setAnnounce(false);
        }, 2000);
    }

    return (
        <div>
            <h1>Danh sách liên hệ</h1>
            <div className={styles.row}>
                {conPending.map(contact => (
                    <div className={styles.col_3}>
                        <div className={styles.container_contact}>
                            <p className={styles.pending}>Trạng thái: <span>Chưa phản hồi</span></p>
                            <p>ID liên hệ:</p>
                            <p>{contact._id}</p>
                            <strong>Tiêu đề</strong>
                            <p>{contact.title}</p>
                            <strong>Nội dung</strong>
                            <p className={styles.contact_text}>{contact.contact}</p>

                            <button onClick={() => handleRefly({id: contact._id,title: contact.title, contact: contact.contact})} className={styles.btn_refly}>Phản hồi</button>
                        </div>
                    </div>
                    
                ))}
            </div>

            <div className={styles.row}>
                {conReflied.map(contact => (
                    <div className={styles.col_3}>
                        <div className={styles.container_contact}>
                            <p className={styles.reflied}>Trạng thái: <span>Đã phản hồi</span></p>
                            <p>ID: {contact._id}</p>
                            <strong>Tiêu đề</strong>
                            <p>{contact.title}</p>
                            <strong>Nội dung</strong>
                            <p className={styles.contact_text}>{contact.contact}</p>

                            <button onClick={() => handleRefly({id: contact._id,title: contact.title, contact: contact.contact})} className={styles.btn_refly}>Phản hồi</button>
                        </div>
                    </div>
                    
                ))}
            </div>

            {annoucne && (
                <Announce title='Đã gửi phản hồi liên hệ thành công!!!'/>
            )}

            {show && (
                <>
                    <div className={styles.show}>
                    </div>
                    <div className={styles.container_show}>
                        <strong>Tiêu đề</strong>
                        <p>{item.title}</p>
                        <strong>Nội dung</strong>
                        <p>{item.contact}</p>
                        <strong>Nhập phản hồi</strong>
                        <textarea onChange={e => setRefly(e.target.value)}></textarea>
                        <div style={{display: 'flex', gap: '20px', justifyContent: 'right', marginTop: '20px'}}>
                            <button className={styles.refly} onClick={() => handleRequest(item.id)}>Phản hồi</button>
                            <button className={styles.cancel_btn} onClick={handleCancel}>Hủy</button>
                        </div>
                    </div>
                </>
            )}
        </div>
        
    )
}

export default ShowContact;