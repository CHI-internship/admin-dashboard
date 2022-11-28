import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import adminService from '../api/admin.api'

const getRequests = async (setState) => {
  const requests = await adminService.getVolunteersRequests();
  setState(requests);
}

const getRequest = async (id) => {
  const request = await adminService.getVolunteerRequest(id);
  return request;
}

export default function Requests() {
  const navigate = useNavigate();
  const [requests, SetRequests] = useState([]);

  useEffect(() => {
    getRequests(SetRequests);
  }, [])
  
  return (
    <div>
      {requests && requests.map(element => 
      <Card sx={{ maxWidth: 345, marginLeft: "40%" }} key={element.id}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Activate Request
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Country - {element.country} <br/>
        Card number - {element.card_number}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={async () => {
        const request = await getRequest(element.id);
        await adminService.approveRequest(request.userId, true);
        navigate('/admin/requests'); 
      }}>
        Approve
      </Button>
      <Button size="small"
      onClick={() => navigate(`/admin/request/${element.id}`)}>
        Learn More
      </Button>
    </CardActions>
  </Card>
    )
    }
    </div>
  )
}
