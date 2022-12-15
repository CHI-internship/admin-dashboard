import cn from 'classnames';
import { Link } from 'react-router-dom';

import style from './RequestCard.module.scss';
import arrowIcon from '../../../images/arrow.svg';

export const RequestCard = (request) => {
    return (
        <div className={style.card}>
            <div className={cn(style.status, style[request.request.status])}>
                {request.request.status}
            </div>
            <div className={style.info}>
                <div className={style.infoItem}>Country: {request.request.country}</div>
                <div className={style.infoItem}>Card number: {request.request.card_number}</div>
            </div>
            <Link
                className={style.arrowContainer}
                to={`/admin/request/${ request.request.id }`}
                state={request.request.id}
            >
                <img src={arrowIcon} className={style.arrow} />
            </Link>
        </div>
    )
}
