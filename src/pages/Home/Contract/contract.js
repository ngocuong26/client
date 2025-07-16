import styles from "./Contract.module.scss";
import ck1 from "../../../assets/image/ck1.webp";
import ck2 from "../../../assets/image/ck2.png";
import ck3 from "../../../assets/image/ck3.png";
import ck4 from "../../../assets/image/ck4.png";
import ck5 from "../../../assets/image/ck5.png";
import { useRef, useEffect } from "react";

const ck = [
    {
        name: ck1,
        title: "Giao hàng nhanh"
    }, 
    {
        name: ck2,
        title: "Hỗ trợ 24/7"
    }, 
    {
        name: ck3,
        title: "Đổi trả dễ dàng"
    }, 
    {
        name: ck4,
        title: "Thanh toán linh hoạt"
    }, 
    {
        name: ck5,
        title: "Cam kết chính hãng"
    }
];


function Contract() {
    const boxRef = useRef();

    useEffect(() => {
        if (boxRef.current) {
            const height1 = boxRef.current.offsetHeight;
            const height2 = boxRef.current.getBoundingClientRect().height;

            console.log("offsetHeight:", height1);
            console.log("getBoundingClientRect().height:", height2);
        }
    }, []);

    return (
        <div className={styles.grid}>
            <div className={styles.row} ref={boxRef}>

                {ck.map((ck, index) => (
                    <div className={styles.col_5}>
                        <div className={styles.contract}>
                            <img src={ck.name} className={styles.img}></img>
                            <p>{ck.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Contract;