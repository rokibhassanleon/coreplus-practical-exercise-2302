import { useState, useEffect } from 'react';
import { getAppointmentSummary } from '../services/AppointmentService';
import { getAllPractitioners } from '../services/PractitionerService'
import { AppointmentSummaryList } from '../types/AppointmentSummary';
import { Practitioner } from '../types/Practitioner';
import { ReportSearchCriteria } from '../types/SearchCriteria';

// Components
import AppointmentDataTable from './AppointmentDataTable';

interface AppointmentReportProps {
    practitionerId: number
}

const AppointmentReports: React.FC<AppointmentReportProps> = ({ practitionerId }) => {
    const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
    const [appointmentSummaryList, setAppointmentSummaryList] = useState<AppointmentSummaryList[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchCriteria, setSearchCriteria] = useState<ReportSearchCriteria>({
        practitionerId : 0,
        dtStart : "",
        dtEnd : ""
    });
    
    useEffect(() => {
        (async()=>{
            const response = await getAllPractitioners()
            if(response.data) {
                setPractitioners(response.data)
            }
        })();
    }, [])

    useEffect(() => {
        setSearchCriteria((prevState:ReportSearchCriteria) => {
            return {...prevState, practitionerId:practitionerId};
        })
    }, [practitionerId]);

    const onChangeDtStart = (event:any) => {
        setSearchCriteria((prevState:ReportSearchCriteria) => {
            return {...prevState, dtStart:event.target.value}
        })
    }

    const onChangeDtEnd = (event:any) => {
        setSearchCriteria((prevState:ReportSearchCriteria) => {
            return {...prevState, dtEnd:event.target.value}
        })
    }

    const onClickShowReport = async() => {
        if(searchCriteria.dtStart && searchCriteria.dtEnd) {
            searchCriteria.practitionerId = searchCriteria.practitionerId ? searchCriteria.practitionerId : 0;
            setLoading(true);
            const response = await getAppointmentSummary(searchCriteria)
            if(response.data) {
                setAppointmentSummaryList(response.data)
            }
            setLoading(false);
        }
    }

    if (practitioners.length === 0) return null;

    return (
        <div className="pracinfo">
            <div style={{ display: 'flex', marginTop: '1rem', marginBottom: '1rem' }}>
                <label style={{ paddingTop: '0.6rem', marginRight: '0.8rem' }}>From</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input style={{ width: '100%' }} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/12 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="dtStart" onChange={onChangeDtStart}></input>
                </div>
                <label style={{ paddingTop: '0.6rem', marginRight: '0.8rem', marginLeft: '0.8rem' }}>To</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input style={{ width: '100%' }} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/12 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="dtEnd" onChange={onChangeDtEnd}></input>
                </div>
                <div className="flex items-center justify-between" style={{ marginLeft: '1rem' }}>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="button" onClick={onClickShowReport}>Show Report</button>
                </div>
            </div>
            { !loading && appointmentSummaryList && appointmentSummaryList.length > 0 && <AppointmentDataTable dtStart={searchCriteria.dtStart} dtEnd={searchCriteria.dtEnd} items={appointmentSummaryList}/>}
            { 
                loading && 
                <div className="flex items-center justify-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                    </div>
                </div> 
            }
        </div>
    );
}

export default AppointmentReports;