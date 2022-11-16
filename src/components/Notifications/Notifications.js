import { useRef, useState } from 'react'
import envelopeIcon from '../../img/icons/envelope.svg'
import closeIcon from '../../img/icons/close.svg'
import style from './Notifications.module.scss'


export const Notifications = () => {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    function handlePopup() {
        setOpen(true)
        document.addEventListener('click', (e) => {
            if (!ref.current?.contains(e.target) ||
                e.target.className.includes('close')) {
                setOpen(false)
                document.removeEventListener('click', () => { })
                return
            }
        })
    }

    return (
        <div className={style.popup} onClick={handlePopup} ref={ref}>
            <img className={style.mainIcon} src={envelopeIcon} />
            {open &&
                <div className={style.info}>
                    <div className={style.head}>
                        <span>Notifications</span>
                        <img className={`close ${style.close}`} src={closeIcon} />
                    </div>
                    <div className={style.notifications}>
                        <div className={style.notification}></div>
                    </div>
                </div>}
        </div >
    )
}