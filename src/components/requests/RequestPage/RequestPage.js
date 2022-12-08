import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import style from './RequestPage.module.scss'
import adminService from '../../../api/admin.api'
import downloadIcon from '../../../images/download.svg'


export default function RequestPage() {
  const [request, setRequest] = useState({})
  const [rejectReason, setRejectReason] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()
  const docExt = request?.document?.split('.').pop()

  const handleApprove = async () => {
    await adminService.approveRequest(request.userId, true);
    navigate('/admin/request');
  }
  const handleReject = async () => {
    await adminService.approveRequest(request.userId, false, rejectReason);
    navigate('/admin/request');
  }

  useEffect(() => {
    async function getRequest() {
      await adminService.getVolunteerRequest(+id).then(data => setRequest(data))
    }
    getRequest()
  }, [])

  return (
    <div className={style.page}>
      <div className={style.docs}>
        {
          docExt == 'pdf' ?
            <iframe src={"https://docs.google.com/gview?url=" + request.document + "&embedded=true"}>
            </iframe>
            :
            <div className={style.docImage} style={{ backgroundImage: `url(${request.document})` }}>
            </div>
        }
        <div className={style.download} onClick={() => location = request.document}>
          Download <img src={downloadIcon} />
        </div>
      </div>
      <div className={style.info}>
        <div>
          <div className={style.infoItem}>Country: {request?.country}</div>
          <div className={style.infoItem}>City: {request?.city}</div>
          <div className={style.infoItem}>Card number: {request?.card_number}</div>
        </div>
        <div className={style.actions}>
          <Button
            sx={{ marginBottom: "10px" }}
            size="small"
            variant="contained"
            onClick={handleApprove}
          >
            Approve
          </Button>
          <div>
            <Button
              sx={{ marginRight: "10px" }}
              size="small"
              variant="contained"
              onClick={handleReject}
            >
              Reject
            </Button>
            <Input
              placeholder="Reject reason"
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
