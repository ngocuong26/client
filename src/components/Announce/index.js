import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Announce.module.scss";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function Announce({title, suggest, err}) {

    return (
        <div className={ err ? styles.announce_err : styles.announce}>
            <div className={styles.icon}>
                {err ? (
                    <FontAwesomeIcon icon={faCircleXmark}/>
                ): (
                    <FontAwesomeIcon icon={faCircleCheck} />
                )}
            </div>
            <div>
                <p>{title}</p>
                <span>{suggest}</span>
            </div>
        </div>
    );
}

export default Announce;