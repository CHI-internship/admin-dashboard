import { useContext } from 'react';

import { RequestCard } from './RequestCard/RequestCard';
import { RequestContext } from '../../context/request.context';

export default function RequestList({ requestsType }) {
  const { requests, closedRequests } = useContext(RequestContext);

  return (
    <div style={{ marginTop: "20px" }}>
      {
        requestsType === 'open' &&
        requests?.map(request => <RequestCard key={request.id} request={request} />)
      }
      {
        requestsType === 'closed' &&
        closedRequests?.map(request => <RequestCard key={request.id} request={request} />)
      }
    </div>
  )
}
