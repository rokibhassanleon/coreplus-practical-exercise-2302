import React, { useState, useEffect } from 'react';

// Types
import { AppointmentSummary, AppointmentSummaryList, Appointment, AppointmentDetails } from '../types/AppointmentSummary';
import { SearchCriteria } from '../types/Appointment';

// Service
import { getAppointmentList, getAppointmentDetails } from '../services/AppointmentService';

interface DataList {
    dtStart: string,
    dtEnd: string,
    items: AppointmentSummaryList[];
}

interface RevenueCost {
    revenue: number,
    cost: number
}

interface HeaderType {
    identity: string,
    caption: string,
    mappedData: Map<number, RevenueCost>
}

interface ChildAppointmentMap {
    [key: number]: Appointment[];
}

interface ChildAppointmentDetailsMap {
    [key: number]: AppointmentDetails;
}

const AppointmentDataTable: React.FC<DataList> = ({ dtStart, dtEnd, items }) => {
    const [headerList, setHeaderList] = useState<HeaderType[]>([]);
    const [childAppointmentMap, setChildAppointmentMap] = useState<ChildAppointmentMap>({});
    const [childAppointmentDetailsMap, setChildAppointmentDetailsMap] = useState<ChildAppointmentDetailsMap>({});
    const getMonthName = (monthNumber: number) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('en-US', {
            month: 'long',
        });
    };
    const generateHeaderList = () => {

        let headerList: HeaderType[] = [];
        items.forEach((item: AppointmentSummaryList) => {
            item.appointmentList.forEach((row: AppointmentSummary) => {
                const identity = row.month + '-' + row.year;
                const filterHeaders = headerList.filter(filterRow => {
                    return identity === filterRow.identity;
                });
                if (filterHeaders.length == 0) {
                    const header: HeaderType = {
                        identity: identity,
                        caption: getMonthName(row.month)+'-'+row.year,
                        mappedData: new Map<number, RevenueCost>([])
                    };
                    header.mappedData.set(item.practitioner_id, { revenue: row.revenue, cost: row.cost });
                    headerList.push(header);
                }
                else {
                    filterHeaders[0].mappedData.set(item.practitioner_id, {revenue: row.revenue, cost: row.cost});
                }
            });
        });
        setHeaderList(headerList);
    }
    useEffect(() => {
        generateHeaderList();
    }, [items]);

    const onClickAppointmentRow = async (practitionerId: number) => {
        
        if(childAppointmentMap[practitionerId] && childAppointmentMap[practitionerId].length > 0) {
            const newChildAppointmentMap = { ...childAppointmentMap };
            delete newChildAppointmentMap[practitionerId];
            setChildAppointmentMap(newChildAppointmentMap);
        }
        else {
            const searchCriteria: SearchCriteria = {
                practitionerId : practitionerId,
                dtStart : dtStart,
                dtEnd : dtEnd
            };
    
            const response = await getAppointmentList(searchCriteria);
            if(response.data) {
                const newChildAppointmentMap = { ...childAppointmentMap };
                newChildAppointmentMap[practitionerId] = response.data;
                setChildAppointmentMap(newChildAppointmentMap);
            }
        }
    }

    const onClickChildAppointmentRow = async (appointmentId: number) => {

        if(childAppointmentDetailsMap[appointmentId]) {
            const newChildAppointmentDetailsMap = { ...childAppointmentDetailsMap };
            delete newChildAppointmentDetailsMap[appointmentId];
            setChildAppointmentDetailsMap(newChildAppointmentDetailsMap);
        }
        else {
            const response = await getAppointmentDetails(appointmentId);
            if(response.data) {
                const newChildAppointmentDetailsMap = { ...childAppointmentDetailsMap };
                newChildAppointmentDetailsMap[appointmentId] = response.data;
                setChildAppointmentDetailsMap(newChildAppointmentDetailsMap);
            }
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Practitioner Name</th>
                    {
                        headerList.map((header: HeaderType) =>
                            <th key={header.identity}>
                                <div>{header.caption}</div>
                                <hr />
                                <div className='revenue-cost'>
                                    <div>Revenue</div>
                                    <hr className='cell-divider'/>
                                    <div>Cost</div>
                                </div>
                            </th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item: AppointmentSummaryList) =>
                        <>
                            <tr key={item.practitioner_id} className='cursor-pointer' onClick={ () => onClickAppointmentRow(item.practitioner_id) }>
                                <td>{item.practitionerName}</td>
                                {
                                    headerList.map((header: HeaderType) =>
                                        <td key={header.identity}>
                                            <div className='revenue-cost'>
                                                <div>{header.mappedData.get(item.practitioner_id)?.revenue}</div>
                                                <div>{header.mappedData.get(item.practitioner_id)?.cost}</div>
                                            </div>
                                        </td>
                                    )
                                }
                            </tr>
                            {
                                childAppointmentMap[item.practitioner_id] && 
                                <>
                                    <tr>
                                        <td colSpan={100}></td>
                                    </tr>
                                    <tr>
                                        <th colSpan={3}>Practitioner Appointment Breakdown</th>
                                    </tr>
                                    <tr>
                                        <th colSpan={1}>Date</th>
                                        <th colSpan={1}>Revenue</th>
                                        <th colSpan={1}>Cost</th>
                                    </tr>
                                    {
                                        childAppointmentMap[item.practitioner_id].map((child: Appointment) =>
                                            <>
                                                <tr key={child.id} className='cursor-pointer' onClick={ () => onClickChildAppointmentRow(child.id) }>
                                                    <td colSpan={1} className='text-center'>{new Date(child.date).toLocaleString().split(',')[0]}</td>
                                                    <td colSpan={1} className='text-center'>{child.revenue}</td>
                                                    <td colSpan={1} className='text-center'>{child.cost}</td>
                                                </tr>
                                                {
                                                    childAppointmentDetailsMap[child.id] && 
                                                    <>
                                                        <tr>
                                                            <th colSpan={3}>Appointment Details</th>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={3}>
                                                                <div className='text-center'>
                                                                    <div className='text-left' style={{ display: 'inline-block' }}>
                                                                        <div><span style={{ width: '10rem', display: 'inline-block' }}>Client Name</span>: {childAppointmentDetailsMap[child.id].client_name}</div>
                                                                        <div><span style={{ width: '10rem', display: 'inline-block' }}>Appointment Type</span>: {childAppointmentDetailsMap[child.id].appointment_type}</div>
                                                                        <div><span style={{ width: '10rem', display: 'inline-block' }}>Duration</span>: {childAppointmentDetailsMap[child.id].duration}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </>
                                                }
                                            </>
                                        )
                                    }
                                </>
                            }
                        </>
                    )
                }
            </tbody>
        </table>
    );
};

export default AppointmentDataTable;