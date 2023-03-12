import React from 'react'
import { useState, useEffect } from 'react';
import { getOtherPractitioners } from '../services/PractitionerService'
import { Practitioner } from '../types/Practitioner';

interface OtherListProps {
    onOtherChange: (id: number) => void,
    practitionerId: number
}

const OtherPractitionerList = ({ onOtherChange, practitionerId }: OtherListProps) => {
    const [practitioners, setPractitioners] = useState<Practitioner[]>([]);

    useEffect(() => {
        (async()=>{
            const response = await getOtherPractitioners()
            if(response.data) {
                setPractitioners(response.data)
            }
        })();
    }, []);

    if (practitioners.length === 0) return null;

    return (
        <div className="praclist">
            <h4>Remaining Practitioners</h4>
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                {
                    practitioners.map(item =>
                        <button
                            onClick={(event: any) => {
                                onOtherChange(item.id);
                            }}
                            type="button"
                            className={`${practitionerId == item.id ? 'selected-row' : ''} block w-full cursor-pointer rounded-lg p-2 text-left transition duration-500 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200`}>
                            {item.name}
                        </button>
                    )
                }
            </ul>
        </div>
    );
}

export default OtherPractitionerList;