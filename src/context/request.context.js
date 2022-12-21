import { createContext, useEffect, useState } from 'react';

import adminService from '../api/admin.api';

export function useRequests() {
    const [authorized, setAuthorized] = useState(false);
    const [requests, setRequests] = useState([]);
    const [closedRequests, setClosedRequests] = useState([]);

    async function realodRequests() {
        return adminService.getVolunteersRequests()
            .then(data => filterRequests(data));
    }

    function filterRequests(data) {
        setRequests(data.filter(req => req.status === 'open'));
        setClosedRequests(data.filter(req => {
            if (req.status == 'approved' || req.status == 'rejected') return req
        }));
    }

    useEffect(() => {
        realodRequests();

        const eventSource = new EventSource(
            `${process.env.REACT_APP_BASE_SERVICE_URL}admin/requests/sse`)
        eventSource.onmessage = ({ data }) => {
            const newRequest = JSON.parse(data);
            setRequests(prev => [{ ...newRequest.request, isNew: true }, ...prev]);
        }
    }, []);

    return { requests, closedRequests, realodRequests, authorized, setAuthorized };
}

export const RequestContext = createContext(null);