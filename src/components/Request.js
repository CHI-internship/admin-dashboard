import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import adminService from '../api/admin.api'
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';


const getRequest = async (setState) => {
  const id = location.href.split('/')[5];
  const request = await adminService.getVolunteerRequest(id);
  setState(request);
}

export default function Requests() {
  const [request, SetRequest] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getRequest(SetRequest);
  }, [])

  const handleApprove = async () => {
    await adminService.approveRequest(request.userId, true);
    navigate('/admin/requests'); 
  }
  const handleReject = async () => {
    if (!document.getElementById('reject').value) alert('Input reject message')
    else await adminService.approveRequest(request.userId, false, document.getElementById('reject').value);
    navigate('/admin/requests'); 
  }
  const extension = request?.document?.split('.').pop();

  return (
    <div>
      {request &&  
        <Card sx={{ maxWidth: 400, marginLeft: "40%", marginTop: "10%" }} key={request.id}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center"}}>
              Activate Request
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Country - {request.country} 
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ paddingTop: "10px"}}>
              City - {request.city} 
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ paddingTop: "10px"}}>
              Card number - {request.card_number} 
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ paddingTop: "10px", marginBottom: "10px"}}>
              Document:
            </Typography>
            <div style={{
              backgroundImage: `url(${request.document})`,
              width: '100%',
              height: '300px',
              marginBottom: '10px',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat', 
              display: extension !== 'pdf'  ? "block" : "none"
            }}>
            </div>
        
            {extension === 'pdf' &&
              <iframe height="400" width="100%" src={"https://docs.google.com/gview?url=" + request.document + "&embedded=true"}></iframe>
            }
            <TextField id="reject" label="Input reject reason" variant="standard" sx={{ marginLeft: "20%"}}/>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained"
            onClick={async () => await handleApprove()}
            >
              Approve
            </Button>
            <Button size="small" variant="contained"
            onClick={async () => await handleReject()}
            >
              Reject
            </Button>
            <Button size="small" variant="contained" sx={{ paddingLeft: "7px"}}
            onClick={() =>  location = request.document}>
              Download the document
            </Button>
          </CardActions>
        </Card>
      }
  
    </div>
  )
}
