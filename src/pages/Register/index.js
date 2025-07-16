import { useState } from "react";
import styles from "./Register.module.scss";
import { faEye, faEyeSlash, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Announce from "../../components/Announce";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassWord] = useState('');
    const [passwordAgain, setPassWordAgain] = useState('');
    const [trigger, setTrigger] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    const date = new Date().toISOString();
    const apiURL = process.env.REACT_APP_API_URL;

    const handleRegister = () => {
        if (password !== passwordAgain) {
            setTrigger('* Mật khẩu không trùng khớp!!!');
            return;
        }

        if (phone === '' || username === '' || password === '' || passwordAgain === '' || email === '') {
            setTrigger('* Vui lòng nhập đầy đủ thông tin!!!');
            return;
        }

        if (password.length <= 7) {
            setTrigger('* Mật khẩu phải trên 8 ký tự, chữ cái đầu viết hoa A-Z!!!');
            return;
        }

        if (password.charAt(0) !== password.charAt(0).toLocaleUpperCase()) {
            setTrigger('* Chữ cái đầu phải viết hoa A-Z!!!');
            return;
        }

        console.log('success');

        fetch(`${apiURL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, username, phone, password, date})
        })  
            .then(res => {
                if (!res.ok) {
                    throw new Error('Email đã tồn tại/không đúng!!!');
                }
                return res.json()
            })
            .then(data => navigate('/login', {
                state: {message: true}
            }))
            .catch(err => {
                console.log(err.message);
                setTrigger(err.message)
            })        
    }

    const handleShow = (op) => {
        if (op === 'password') {
            setShowPass(prev => !prev);
            return;
        }
        if (op === 'confirm') {
            setShowConfirm(prev => !prev);
            return;
        }
    }

    const handleUnShow = (op) => {
        if (op === 'password') {
            setShowPass(prev => !prev);
            return;
        }
        if (op === 'confirm') {
            setShowConfirm(prev => !prev);
            return;
        }
    }

    return (
        <>
        <div className={styles.container_login}>
            <div className={styles.container_login_child}>
                <h2>Đăng ký</h2>
                {trigger && <p style={{ color: 'red', marginTop: '10px' }}>{trigger}</p>}
                <div>
                    <div>
                        <label>Nhập tên *:</label>
                        <input type="text" placeholder="Enter your username" onChange={e => setUserName(e.target.value)} required onFocus={() => setTrigger(prev => !prev)}/>
                    </div>
                    
                    <div>
                        <label>Nhập email *:</label>
                        <input type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} required onFocus={() => setTrigger(prev => !prev)}/>
                    </div>

                    <div>
                        <label>Nhập SĐT *:</label>
                        <input type="text" placeholder="Enter your phone" onChange={e => setPhone(e.target.value)} required onFocus={() => setTrigger(prev => !prev)}/>
                    </div>

                    <div>
                        <label>Mật khẩu *:</label>
                        <div className={styles.container_pass}>
                            <input 
                                type={showPass ? 'text' : 'password'} 
                                placeholder="Enter your password" 
                                onChange={e => setPassWord(e.target.value)} 
                                value={password} required onFocus={() => setTrigger(prev => !prev)}
                            />
                            {!showPass ? <FontAwesomeIcon icon={faEyeSlash} className={styles.icon_eye_slash} onClick={() => handleShow('password')}/> : <p><FontAwesomeIcon icon={faEye} className={styles.icon_eye} onClick={() => handleUnShow('password')}/></p>}
                        </div>
                    </div>

                    <div>
                        <label>Nhập lại mật khẩu *:</label>
                        <div className={styles.container_pass}>
                            <input 
                                type={showConfirm ? 'text' : 'password'}
                                placeholder="Enter your confirm password" 
                                onChange={e => setPassWordAgain(e.target.value)} 
                                required onFocus={() => setTrigger(prev => !prev)}
                            />
                            {!showConfirm ? <FontAwesomeIcon icon={faEyeSlash} className={styles.icon_eye_slash} onClick={() => handleShow('confirm')}/> : <p><FontAwesomeIcon icon={faEye} className={styles.icon_eye} onClick={() => handleUnShow('confirm')}/></p>}
                        </div>
                    </div>
                </div>
                <button onClick={handleRegister}>Login</button>

                {/* <p>Bạn chưa có tài khoản? <Link to='/register'>Đăng nhập</Link></p> */}
            </div>

        </div>
        </>
    )
}

export default Register;