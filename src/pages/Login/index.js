import { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Announce from "../../components/Announce";

function Login({type}) {
    const [username, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const [trigger, setTrigger] = useState('');
    const [announce, setAnnounce] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const apiURL = process.env.REACT_APP_API_URL;

    let state = location.state;

    console.log(state);
    

    const handleLogin = () => {
        if (username === '' || password === '') {
            setTrigger('Vui lòng nhập tên đăng nhập và mật khẩu');
            return;
        }
        fetch(`${apiURL}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data =>
             
            {
            console.log('data', data);
            if (data.message === "success") {
            localStorage.setItem('username', JSON.stringify(data.user));
            window.location.href = "/";
            console.log("Bạn đã đăng nhập: " + username);
            console.log(data);
            
            
        }})
        .catch(error => {
            setTrigger('Tên đăng nhập hoặc mật khẩu sai!!!');
            setPassWord('');
        });
    };
    
    console.log(password);

    useEffect(() => {
        setAnnounce(true)

        setTimeout(() => {
            setAnnounce(false);
        }, 3000)    
    }, [])

    const handleLoginAdmin = () => {
        fetch(`${apiURL}/admin/login`, {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({username, password})
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Sai tài khoản, vui lòng nhập lại');
                    
                };
                return res.json()})
            .then(data => {
                console.log('data admin: ', data);
                localStorage.setItem('admin', JSON.stringify(data.admin));
                window.location.href = '/admin/dash'
            })
            .catch(err => {
                console.log(err);
                setTrigger(err.message);
            })
    }
 
    return (
        <>
        <div className={styles.container_login}>
            <div className={styles.container_login_child}>
                {!type && <h2>Đăng nhập</h2>}
                {type && <h2>Đăng nhập Admin</h2>}
                {trigger && <p style={{ color: 'red', marginTop: '10px' }}>{trigger}</p>}
                <div>
                    <div>
                        <label>Email *:</label>
                        <input type="text" placeholder="Enter your email" onChange={e => setUserName(e.target.value)} required/>
                    </div>

                    <div>
                        <label>Password *:</label>
                        <input type="password" placeholder="Enter your password" onChange={e => setPassWord(e.target.value)} value={password} required/>
                    </div>
                </div>

                {type ? <button onClick={handleLoginAdmin}>Login</button> : <button onClick={handleLogin}>Login</button>}

                {!type && (
                    <p>Bạn chưa có tài khoản? <Link to='/register'><span style={{color: '#007BFF', textDecoration: 'underline', }}>Đăng ký</span></Link></p>
                )}
            </div>

            {state && announce && (
                <Announce title='Đã đăng ký thành công!!!' suggest='Vui lòng đăng nhập lại' />
            )}
        </div>
        </>
    );
}

export default Login;
