import { useEffect, useState } from "react";
import Category from "../../components/Menu/Categories";
import Products from "./Products";
import Contract from "./Contract/contract";
import ProductsItem from "../Products/ProductItem";
import { useLocation, useNavigate } from "react-router-dom";
import Announce from "../../components/Announce";

function Home({setCB}) {
    const [annoucne, setAnnounce] = useState(false);
    const navigate = useNavigate();
    const apiURL = process.env.REACT_APP_API_URL;

    const location = useLocation();
    let status = location.state?.status || false;
    useEffect(() => {
        setAnnounce(status);
        

        setTimeout(() => {
            setAnnounce(false);
            navigate('/', {replace: true, state: {status: false}})
        }, 2000);
    }, [])

    useEffect(() => {
        if (!sessionStorage.getItem("hasViewed")) {
            fetch(`${apiURL}/views`, {
                method: 'POST'
            })
                .then(res => res.json())
                .then(data => console.log('data', data))
        }

        sessionStorage.setItem("hasViewed", "true")
    }, [])

    return(
        <>
            {/* <Banner /> */}
            <Category title="Danh mục sản phẩm" />

            <Products title="Sản phẩm bán chạy" btn="Xem tất cả" />
            <ProductsItem slice='15' setCB={setCB}/>
            {/* <ProductsSale /> */}
            <Contract />
            {annoucne && (
                <Announce title='Đã gửi liên hệ của bạn cho admin!!!' />
            )}
        </>
    )
}

export default Home;