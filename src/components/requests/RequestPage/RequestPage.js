import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import style from './RequestPage.module.scss'
import { Docs } from './Docs';
import adminService from '../../../api/admin.api'

export default function RequestPage() {
  const [request, setRequest] = useState({})
  const [rejectReason, setRejectReason] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  const handleApprove = async () => {
    await adminService.approveRequest(request.userId, true);
    navigate('/admin/request');
  }
  const handleReject = async () => {
    await adminService.approveRequest(request.userId, false, rejectReason);
    navigate('/admin/request');
  }

  async function getRequest() {
    adminService.getVolunteerRequest(+id).then(data => setRequest(data))
  }

  useEffect(() => { getRequest() }, [ id ])

  return (
    <div className={style.page}>
      <Docs documents={request?.documents} />
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
