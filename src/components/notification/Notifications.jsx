import { useRef } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./Notifications.module.scss";
import arrowIcon from "../../images/arrow.svg";
import closeIcon from "../../images/close.svg";
import { RequestContext } from "../../context/request.context";



export const Notifications = () => {
    const { requests } = useContext(RequestContext);
    const ref = useRef(null);

    return (
        <div className={style.notifications}>
            {requests?.map(request => {
                if (request.isNew) {
                    return (
                        <div ref={ref}
                            key={request.id}
                            className={style.notification}
                        >
                            <img src={closeIcon}
                                className={style.closeIcon}
                                onClick={() => ref.current.style.display = "none"}
                            />
                            <Link to={`/admin/request/${request.id}`} state={request.id}>
                                <div className={style.title}
                                    onClick={() => ref.current.style.display = "none"}>
                                    New request
                                </div>
                                <div className={style.details}>
                                    <div>View details</div>
                                    <img className={style.arrowIcon} src={arrowIcon} />
                                </div>
                            </Link>
                        </div>
                    )}
            })}
        </div >
    )
}
