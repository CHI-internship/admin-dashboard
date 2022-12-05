import { createContext, useEffect, useState } from 'react';
import adminService from '../api/admin.api';


export function useRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        async function getQeruests() {
            await adminService.getVolunteersRequests()
                .then(data => setRequests(data.reverse()));
        }
        getQeruests();

        const eventSource = new EventSource(
            `${process.env.REACT_APP_BASE_SERVICE_URL}admin/requests/sse`);
        eventSource.onmessage = ({ data }) => {
            const newRequest = JSON.parse(data);
            setRequests(prev => [{ ...newRequest.request, isNew: true }, ...prev]);
        }
    }, []);

    return { requests, setRequests };
}

export const RequestContext = createContext(null);