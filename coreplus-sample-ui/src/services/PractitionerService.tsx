import { useState, useEffect } from 'react';
import { Practitioner, APIResponse } from '../types/Practitioner';
import { fetch } from '../utils/Fetchers';
import { APIEndPoints } from '../utils/ApiEndPoints';

export const getSupervisorPractitioners = () => {
    const [data, setData] = useState<Practitioner[]>([]);

    const getData = async () => {
        const { statusCode, message, data } = await fetch<APIResponse>(APIEndPoints.GetSupervisors);
        if(statusCode === 200) {
            setData(data)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return data;
}