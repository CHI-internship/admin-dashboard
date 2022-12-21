import cn from 'classnames';
import { FormControl, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Docs } from './Docs';
import style from './RequestPage.module.scss'
import adminService from '../../../api/admin.api'
import { RequestContext } from '../../../context/request.context';
import { rejectReasons } from '../../../mock-data/reject-reasons';

export default function RequestPage() {
  const { id } = useParams();
  const { realodRequests } = useContext(RequestContext)

  const [request, setRequest] = useState({});
  const [rejectReason, setRejectReason] = useState(rejectReasons[1]);

  async function handleSubmit(status, rejectReason) {
    await adminService.changeRequestStatus(request.userId, status, rejectReason);
    await getRequest();
    realodRequests()
  }
  async function getRequest() {
    adminService.getVolunteerRequest(+id).then(data => setRequest(data))
  }

  useEffect(() => { getRequest() }, [id])

  return (
    <div className={style.page}>
      <Docs documents={request?.documents} />
      <div className={style.info}>
        <div className={cn(style.status, style[request?.status])}>
          status:{request.status}
        </div>
        <div>
          <div className={style.infoItem}>Country: {request?.country}</div>
          <div className={style.infoItem}>City: {request?.city}</div>
          <div className={style.infoItem}>Card number: {request?.card_number}</div>
        </div>
        <div className={style.actions}>
          {
            request?.status !== 'open' &&
            <span className={style.toOpen} onClick={() => { handleSubmit('open') }}>
              back to open
            </span>
          }
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={{ marginRight: "10px" }}
              size="small"
              variant="contained"
              disabled={request?.status == 'rejected'}
              onClick={() => { handleSubmit('rejected', rejectReason) }}
            >
              Reject
            </Button>
            <FormControl variant="standard" sx={{ m: 1, width: 180 }}>
              <Select
                defaultValue={rejectReasons[1]}
                onChange={(e) => setRejectReason(e.target.value)}>
                {rejectReasons.map((item, index) =>
                  <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
              </Select>
            </FormControl>
          </div>
          <Button
            size="small"
            variant="contained"
            disabled={request?.status == 'approved'}
            onClick={() => { handleSubmit('approved') }}
          >
            Approve
          </Button>
        </div>
      </div>
    </div>
  )
}
