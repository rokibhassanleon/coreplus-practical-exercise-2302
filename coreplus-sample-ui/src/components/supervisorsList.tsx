import { useState, useEffect } from 'react';
import { getSupervisorPractitioners } from '../services/PractitionerService'
import { Practitioner } from '../types/Practitioner';

interface SupervisorListProps {
    onSupervisorChange: (id: number) => void,
    practitionerId: number
}

const SupervisorList = ({ onSupervisorChange, practitionerId }: SupervisorListProps) => {
    const [supervisors, setSupervisors] = useState<Practitioner[]>([]);
    
    useEffect(() => {
        (async()=>{
            const response = await getSupervisorPractitioners()
            if(response.data) {
                setSupervisors(response.data)
            }
        })();
    }, [])

    if (supervisors.length === 0) return null;

    return (
        <div className="supervisors">
            <h4>Supervisor practitioners</h4>
            {
                supervisors.map((item: any) =>
                    <button
                        onClick={(event: any) => {
                            onSupervisorChange(item.id);
                        }}
                        className={`${practitionerId == item.id ? 'selected-row' : ''} block w-full cursor-pointer rounded-lg p-2 text-left transition duration-500 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200`}
                        type="button">
                        {item.name}
                    </button>
                )
            }
        </div>
    );
}

export default SupervisorList;