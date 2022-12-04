import * as React from 'react';
import { useState, useEffect } from 'react';
import adminService from '../../api/admin.api'
import { RequestCard } from './RequestCard/RequestCard';

export default function RequestList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      const requests = await adminService.getVolunteersRequests();
      setRequests(requests)
    }
    getRequests()
  }, [])

  return (
    <div style={{ marginTop: "20px" }}>
      {
        requests &&
        requests.map(request => < RequestCard key={request.id} request={request} />)
      }
    </div>
  )
}
