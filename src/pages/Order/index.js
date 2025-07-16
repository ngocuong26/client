import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import styles from "./Order.module.scss";

function Order({setCB}) {
    // const [idOrder, setOder] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [provinceName, setProvinceName] = useState('');
    const [townName, setTownName] = useState('');
    const location = useLocation();
    const { products, quantity } = location.state || {};
    // const {cartItems} = location.state || {};
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [town, setTown] = useState([]);
    const [idProvince, setIdProvince] = useState('');
    const [idDistrict, setIdDistrict] = useState('');
    const [errors, setErrors] = useState({});
    const apiURL = process.env.REACT_APP_API_URL;
    let total = 0;

    const navigate = useNavigate();
    console.log(products);
    // console.log(cartItems);
    

    useEffect(() => {
        fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then(res => res.json())
            .then(province_data => {setProvince(province_data.data); console.log(province_data.data);
            })
            .catch(err => {
                alert('Kết nối không ổn định!!!')
            })

        }, [])
        
    useEffect(() => {
        fetch(`https://esgoo.net/api-tinhthanh/2/${idProvince}.htm`)
            .then(res => res.json())
            .then(district_data => {setDistrict(district_data.data); console.log(district_data);
            })
    }, [idProvince])

    useEffect(() => {
        fetch(`https://esgoo.net/api-tinhthanh/3/${idDistrict}.htm`)
            .then(res => res.json())
            .then(town => {setTown(town.data); console.log(town);
            })
    }, [idDistrict])
    
    const handleOrder = () => {
        const date = new Date().toISOString();

        const newErrs = {};
        if (!name) {
            newErrs.name = '* Vui lòng nhập tên';
        }
        if (!phone) {
            newErrs.phone = '* Vui lòng nhập số điện thoại';
        }
        if (!email) {
            newErrs.email = '* Vui lòng nhập email';
        }
        if (!idProvince) {
            newErrs.province = '* Vui lòng chọn tỉnh/thành phố';
        }
        if (!idDistrict) {
            newErrs.district = '* Vui lòng chọn quận/huyện';
        }
        if (!town) {
            newErrs.town = '* Vui lòng chọn xã/phường/thị trấn';
        }
        if (!address) {
            newErrs.address = '* Vui lòng nhập địa chỉ';
        }
        if (Object.keys(newErrs).length > 0) {
            return setErrors(newErrs);
        }

        navigate('/order/success', {
            state: {
                districtName, provinceName
            }
        })
        fetch(`${apiURL}/orders/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                credentials: 'include',
                body: JSON.stringify({products, quantity, total, name, phone, address, date})
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    navigate('/order/success', {
                        state: {
                            name, phone, address, total, date
                        }
                    })
                })

            setCB(true);
        };

    // console.log(districtName);
    console.log(provinceName);
    console.log(townName);
    products.length > 0 ? (
        products.map(item => (
            total += item.price * item.quantity
        ))
    ) : (
            total += products.price * quantity
    )
    console.log('Total', total);
    
    return (
        <>
        <div className={styles.grid}>
            <div className={styles.row}>
                <div className={styles.col_8}>
                    <div className={styles.info_user_order}>

                        <strong>THÔNG TIN GIAO HÀNG</strong>

                        <div className={styles.container_order}>
                            {/* PAY LEFT */}
                            <div className={styles.info_user_order_left}>
                                <div>
                                    <label>Họ và tên *:</label>
                                    <input 
                                        placeholder="Nhập tên của bạn" 
                                        onChange={e => setName(e.target.value)}
                                        onFocus={() => setErrors({})}
                                    ></input>
                                    {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                                </div>
                            </div>
                            <div className={styles.info_user_order_right}>
                                <div>
                                    <label>Số điện thoại *:</label>
                                    <input 
                                        placeholder="Nhập số điện thoại" 
                                        onChange={e => setPhone(e.target.value)}
                                        onFocus={() => setErrors({})}
                                    ></input>
                                    {errors.phone && <span style={{color: 'red'}}>{errors.phone}</span>}
                                </div>
                            </div>
                        </div>

                        <div className={styles.container_order}>
                            <div className={styles.info_user_order_left}>
                                <div>
                                    <label>Địa chỉ email *:</label>
                                    <input 
                                        type="email"
                                        placeholder="Nhập email của bạn" 
                                        onChange={e => setEmail(e.target.value)}
                                        onFocus={() => setErrors({})}
                                    ></input>
                                    {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                                </div>
                            </div>
                            <div className={styles.info_user_order_right}>
                                <div>
                                    <label>Tỉnh/Thành phố *:</label>
                                    <select 
                                        onFocus={() => setErrors({})}
                                        onChange= { 
                                            e => {setIdProvince(e.target.value); 
                                            console.log(e.target.value);
                                            const provinceName = province.find(p => p.id === e.target.value).full_name;
                                            setProvinceName(provinceName)
                                        }}>
                                        <option value=''>Chọn Tỉnh/Thành phố</option>
                                        {province.map((item, index) => (
                                            <option value={item.id} key={index}>{item.full_name}</option>
                                        ))}
                                    </select>
                                    {errors.province && <span style={{color: 'red'}}>{errors.province}</span>}
                                </div>
                            </div>
                        </div>

                        <div className={styles.container_order}>
                            <div className={styles.info_user_order_left}>
                                <div>
                                    <label>Quận/Huyện *:</label>
                                    <select 
                                        onFocus={() => setErrors({})}
                                        onChange={e => {setIdDistrict(e.target.value); 
                                        console.log(e.target.value); 
                                        const districtName = district.find(p => p.id === e.target.value).full_name; 
                                        setDistrictName(districtName);
                                    }}>
                                        <option value=''>Chọn Quận/Huyện</option>
                                        {district.map((item, index) => (
                                            <option value={item.id} key={index}>{item.full_name}</option>
                                        ))}
                                    </select>
                                    {errors.district && <span style={{color: 'red'}}>{errors.district}</span>}
                                </div>
                            </div>
                            <div className={styles.info_user_order_right}>
                                <div>
                                    <label>Xã/Phường/Thị trấn *:</label>
                                    <select 
                                        onFocus={() => setErrors({})}
                                        onChange={
                                            e => {const townName = town.find(p => p.id === e.target.value).full_name;
                                            setTownName(townName)
                                        }}>
                                        <option value=''>Chọn Xã/Phường/Thị trấn</option>
                                        {town.map((item, index) => (
                                            <option value={item.id} key={index}>{item.full_name}</option>
                                        ))}
                                    </select>
                                    {errors.town && <span style={{color: 'red'}}>{errors.town}</span>}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Địa chỉ *:</label>
                            <input 
                                placeholder="Nhập địa chỉ" 
                                onChange={e => setAddress(e.target.value)}
                                onFocus={() => setErrors({})}
                            ></input>
                            {errors.address && <span style={{color: 'red'}}>{errors.address}</span>}
                        </div>

                    </div>
                </div>
                <div className={styles.col_4}>
                    <div className={styles.info_order}>
                        <strong>THÔNG TIN ĐƠN HÀNG</strong>

                        <table className={styles.table}>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th>SL</th>
                                <th>Tạm tính</th>
                            </tr>

                            <div className={styles.line_big}></div>

                            {products.length > 0 ? (products.map((item, index) => (
                                <>
                                    <tr>
                                        <td className={styles.name_product}>{item.name_product}</td>
                                        <td>{item.quantity}</td>
                                        <td>{(item.price * item.quantity).toLocaleString('en-EN')}</td>
                                    </tr>

                                </>

                            ))) : (
                                <tr>
                                    <td>{products.name}</td>
                                    <td>{quantity || 1}</td>
                                    <td>{(products.price * quantity).toLocaleString('en-EN')}</td>
                                </tr>
                            )}
                            <div className={styles.line_big}></div>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: '600'}}>Tổng</td>
                                <td style={{fontWeight: '600'}}>{products.length > 0 ? products.length : quantity}</td>
                                <td style={{fontWeight: '600'}}>{total.toLocaleString('en-EN')}</td>
                            </tr>
                        </table>

                        <button className={styles.btn_order} onClick={handleOrder} >Đặt hàng</button>

                    </div>
                </div>  
            </div>
            
        </div>
        </>
    )
}

export default Order;