import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import style from "./Notifications.module.scss";
import arrowIcon from "../../images/arrow.svg";
import closeIcon from "../../images/close.svg";

export const Notification = (request) => {
    const ref = useRef(null);
    const timer = useRef(null);

    useEffect(() => {
        timer.current = setTimeout(() => ref.current.style.display = "none", 30000);
        return () => {
            clearTimeout(timer);
        };
    }, [])

    return (
        <div ref={ref}
            key={request.request.id}
            className={style.notification}
        >
            <img src={closeIcon}
                className={style.closeIcon}
                onClick={() => ref.current.style.display = "none"}
            />
            <Link to={`/admin/request/${request.request.id}`}
                state={request.request.id}
                onClick={() => ref.current.style.display = "none"}
            >
                <div className={style.title}
                    onClick={() => { }}>
                    New request
                </div>
                <div className={style.details}>
                    <div>View details</div>
                    <img className={style.arrowIcon} src={arrowIcon} />
                </div>
            </Link>
        </div>
    )
}