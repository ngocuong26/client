import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ShowDash.module.scss";
import { faArrowDown, faArrowUp, faCartShopping, faChartLine, faEye, faUsers } from "@fortawesome/free-solid-svg-icons";
import ShowOrders from "../ShowOrders";
import { useEffect, useState } from "react";

function ShowDash() {
    const [diffrent, setDiffrent] = useState();
    const [revenue, setRevenue] = useState('');
    const [totalUser, setTotalUser] = useState();
    const [sale, setSale] = useState('');
    const [view, setView] = useState();
    const apiURL = process.env.REACT_APP_API_URL;
    const test_type_vist = 'up';

    let total_lastmonth = 0;

    useEffect(() => {
        const date = new Date().getMonth() + 1;
        console.log(date)
        fetch(`${apiURL}/orders/success?by=month&month=${date}`)
            .then(res => res.json())
            .then(data => {
                setDiffrent(
                    {
                        revenue: data.revenue,
                        sale: data.sale,
                        total: data.total, 
                        totaDifferent: data.totaDifferent, 
                        orderDifferent: data.orderDifferent, 
                        totalOrder: data.totalOrder
                    });
                // const orderMonth = data.filter(item => new Date(item.data).getMonth() + 1);
                console.log('total', typeof data.total);
                if (data.total > 0) {
                    setRevenue('up');
                }else {
                    setRevenue('down');
                }
                
                if (data.totalOrder < 0) {
                    setSale('down');
                }else { 
                    setSale('up');
                }
            })
    }, [])

    useEffect(() => {
        fetch(`${apiURL}/users`)
            .then(res => res.json())
            .then(data => setTotalUser(data.length))
    })

    console.log('data: ', new Date().toISOString());

    
    useEffect(() => {
        fetch(`${apiURL}/views`)
            .then(res => res.json())
            .then(data => setView(data.total_view))
    }, [])
    

    return (
        <>
            <div className={styles.grid}>
                <h2>Dashboard</h2>
                <div className={styles.row}>
                    <div className={styles.col_3}>
                        <div className={styles.container}>
                            <div className={styles.container_icon + ' ' + styles.users}>
                                <FontAwesomeIcon icon={faUsers}/>
                            </div>
                            <div className={styles.container_info}>
                                <span className={styles.title}>Total Users</span>
                                <h2>{totalUser}</h2>
                                <p>
                                    <span className={totalUser === 'down' ? styles.red : styles.green}><FontAwesomeIcon icon={totalUser === 'down' ? faArrowDown : faArrowUp} className={styles.icon}/>12%</span>
                                    so với tháng trước
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.col_3}>
                        <div className={styles.container}>
                            <div className={styles.container_icon + ' ' + styles.cart}>
                                <FontAwesomeIcon icon={faCartShopping}/>
                            </div>
                            <div className={styles.container_info}>
                                <span className={styles.title}>Sales</span>
                                <h2>{diffrent?.sale}</h2>
                                <p>
                                    <span className={sale === 'down' ? styles.red : styles.green}>
                                        <FontAwesomeIcon icon={sale === 'down' ? faArrowDown : faArrowUp} className={styles.icon}/>
                                        {Math.round(diffrent?.orderDifferent)}%
                                    </span>
                                    so với tháng trước
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.col_3}>
                        <div className={styles.container}>
                            <div className={styles.container_icon + ' ' + styles.revenue}>
                                <FontAwesomeIcon icon={faChartLine}/>
                            </div>
                            <div className={styles.container_info}>
                                <span className={styles.title}>Revenue</span>
                                <h2>{diffrent?.revenue.toLocaleString('en-EN')}</h2>
                                <p>
                                    <span className={revenue === 'down' ? styles.red : styles.green}>
                                        <FontAwesomeIcon icon={revenue === 'down' ? faArrowDown : faArrowUp} className={styles.icon}/>
                                        {Math.round(diffrent?.totaDifferent)}%
                                    </span>
                                    so với tháng trước
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.col_3}>
                        <div className={styles.container}>
                            <div className={styles.container_icon + ' ' + styles.visit}>
                                <FontAwesomeIcon icon={faEye}/>
                            </div>
                            <div className={styles.container_info}>
                                <span className={styles.title}>Visits</span>
                                <h2>{view?.toLocaleString('en-EN')}</h2>
                                <p>
                                    <span className={test_type_vist === 'down' ? styles.red : styles.green}>
                                        <FontAwesomeIcon icon={test_type_vist === 'down' ? faArrowDown : faArrowUp} className={styles.icon}/>
                                        22%
                                    </span>
                                    so với tháng trước
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
{/* 
            {orderSuccess.map(order => {
                order.total
                return order.total
            })} */}

            <ShowOrders dash={true} />
        </>
    );
}

export default ShowDash;
