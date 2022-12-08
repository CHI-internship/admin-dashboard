import { useContext } from "react";

import { Notification } from "./Notification";
import style from "./Notifications.module.scss";
import { RequestContext } from "../../context/request.context";


export const Notifications = () => {
    const { requests } = useContext(RequestContext);

    return (
        <div className={style.notifications}>
            {requests?.map(request => {
                if (request.isNew) return <Notification key={request.id} request={request} />
            })}
        </div >
    )
}
