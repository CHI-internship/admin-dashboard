import { useContext } from 'react';

import { RequestCard } from './RequestCard/RequestCard';
import { RequestContext } from '../../context/request.context';

export default function RequestList() {
  const { requests } = useContext(RequestContext);

  return (
    <div style={{ marginTop: "20px" }}>
      {requests?.map(request => <RequestCard key={request.id} request={request} />)}
    </div>
  )
}
