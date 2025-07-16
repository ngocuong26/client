import { Navigate, useNavigate, useParams } from "react-router-dom";
import styles from "./ShowAdd.module.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Announce from "../../../Announce";
import ShowAddCate from "./ShowAddCate";


function ShowAdd() {
    const {id} = useParams();
    console.log(id);
    const [idPro, setIdPro] = useState('');
    const [namePro, setNamePro] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [img, setImg] = useState(null);
    const [description, setDescription] = useState('');
    const [childCate, setChildCate] = useState('');
    const [parentCate, setParentCate] = useState('');
    const [cate, setCate] = useState([])
    const [err, setErr] = useState({});
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const apiURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiURL}/category`)
            .then(res => res.json())
            .then(data => setCate(data))
    }, [])
    
    const handleFile = async (e) => {
        console.log(e.target.files[0].name);
        // setImg(e.target.files[0].name);
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch(`${apiURL}/upload`, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        console.log(data);
        setImg(data.filename)
    }

    const handleNamePro = (e) => {
        setNamePro(e.target.value)
    }

    const handlePrice = (e) => {
        setPrice(e.target.value)
    }

    const handleIdPro = (e) => {
        cate.some(cate => console.log(cate.id_product));
        // console.log(newId);
        
        // if (newId) {
        //     alert('ID sản phẩm không được trung!!!');
        //     return;
        // }
        setIdPro(e.target.value);
    }

    const handleQuantity = (e) => {
        setQuantity(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleAdd = () => {
        const errors = {};
        if (!idPro.trim()) {
            errors.idPro = '* Hãy nhập ID sản phẩm'
        }
        if (!namePro.trim()) {
            errors.namePro = '* Hãy nhập tên sản phẩm'
        }
        if (!price.trim()) {
            errors.price = '* Hãy nhập giá sản phẩm'
        }
        if (!quantity) {
            errors.quantity = '* Hãy nhập số lượng sản phẩm'
        }
        if (!img) {
            errors.img = '* Hãy thêm ảnh sản phẩm'
        }
        if (!description.trim()) {
            errors.description = '* Hãy nhập mô tả sản phẩm'
        }
        if (!childCate.trim()) {
            errors.childCate = '* Hãy nhập danh mục chính sản phẩm'
        }
        if (!parentCate.trim()) {
            errors.parentCate = '* Hãy nhập danh mục con sản phẩm'
        }

        if (Object.keys(errors).length > 0) {
            setErr(errors);
            return
        }

        setShow(prev => !prev);
        setTimeout(() => {
            setShow(false);
        }, 2500);


        fetch(`${apiURL}/products/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {idPro, 
                namePro, 
                price, 
                quantity, 
                img, 
                category: {
                    parent: parentCate,
                    child: childCate
                },
                description
            })
        })

        setErr({});
        setTimeout(() => {
            navigate("/admin/products?page=1");
        }, 1000)
    }

    return (
        <>
            {id === 'product' && (
                <div className={styles.container_add}>
                    <h2>Thêm sản phẩm</h2>
                    <label>Nhập ID:</label>
                    <input type='text' placeholder="Nhập ID sản phẩm" onChange={handleIdPro} onFocus={() => setErr(prev => ({...prev, idPro: null}))}></input>
                    {err.idPro && (
                        <span style={{color: 'red'}}>{err.idPro}</span>
                    )}

                    <label>Thêm ảnh</label>
                    <input 
                        type='file' 
                        id="file" 
                        className={styles.file}
                        onChange={handleFile}
                        onFocus={() => setErr(prev => ({...prev, img: null}))}
                    >
                    </input>
                    <div style={{display: 'flex'}}>
                        {img && (
                            <label className={styles.choose_file}>
                                <img src={`${apiURL}/uploads/${img}`}></img>
                                <FontAwesomeIcon className={styles.cancel_img} icon={faXmarkCircle}/>
                            </label>
                        )}
                        <label for='file' className={styles.choose_file} onFocus={() => setErr(prev => ({...prev, img: null}))}>
                            <span>+</span>
                        </label>
                        {err.img && (
                            <span style={{color: 'red'}}>{err.img}</span>
                        )}
                    </div>

                    <label>Nhập tên sản phẩm:</label>
                    <input type="text" placeholder="Nhập tên sản phẩm" onChange={handleNamePro} onFocus={() => setErr(prev => ({...prev, namePro: null}))}></input>
                    {err.namePro && (
                        <span style={{color: 'red'}}>{err.namePro}</span>
                    )}

                    <label>Nhập giá:</label>
                    <input type="number" step='1000' placeholder="Nhập giá sản phẩm" onChange={handlePrice} onFocus={() => setErr(prev => ({...prev, price: null}))}></input>
                    {err.price && (
                        <span style={{color: 'red'}}>{err.price}</span>
                    )}

                    <label>Nhập số lượng:</label>
                    <input type="number" placeholder="Nhập số lượng sản phẩm" onChange={handleQuantity} onFocus={() => setErr(prev => ({...prev, quantity: null}))}></input>
                    {err.quantity && (
                        <span style={{color: 'red'}}>{err.quantity}</span>
                    )}

                    <label>Nhập danh mục:</label>
                    <div className={styles.cate}>
                        <div>
                            <p>Danh mục cha:</p>
                            <select value={parentCate} onChange={e => setParentCate(e.target.value)}>
                                <option value=''>Chọn danh mục cha</option>
                                {cate?.map((cate,index) => (
                                    <option key={index} value={cate.parent}>{cate.parent}</option>
                                ))}
                            </select>
                            {/* <input type="text" placeholder="Nhập danh mục cha" onFocus={() => setErr(prev => ({...prev, parentCate: null}))}></input> */}
                            {err.parentCate && (
                                <span style={{color: 'red'}}>{err.parentCate}</span>
                            )}
                        </div>

                        <div>
                            <p>Danh mục chính:</p>
                            {/* <input type="text" placeholder="Nhập danh mục sản phẩm" onFocus={() => setErr(prev => ({...prev, childCate: null}))}></input> */}
                            <select value={childCate} onChange={(e) => setChildCate(e.target.value)}>
                                <option>Chọn danh mục chính</option>
                                {cate.find(item => item.parent === parentCate)?.child.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                            {err.childCate && (
                                <span style={{color: 'red'}}>{err.childCate}</span>
                            )}
                        </div>
                    </div>

                    <label>Nhập mô tả:</label>
                    <textarea onChange={handleDescription} onFocus={() => setErr(prev => ({...prev, description: null}))}></textarea>
                    {err.description && (
                        <span style={{color: 'red'}}>{err.description}</span>
                    )}

                    <div className={styles.container_btn}>
                        <button className={styles.add} onClick={handleAdd}>Thêm</button>
                        <button className={styles.cancel} onClick={Navigate}>Hủy</button>
                    </div>
                </div>
            )}

            {show && (
                <Announce title='Đã thêm sản phẩm thành công!!!' />
            )}

            {id === 'category' && (
                <ShowAddCate />
            )}
        </>
    );
}

export default ShowAdd;