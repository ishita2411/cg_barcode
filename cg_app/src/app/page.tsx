'use client'

import { useRouter } from 'next/navigation'

export default function About(){
    const router = useRouter()

    // function handleAdminClick(){
    //     console.log('admin button clicked')
    // }
    // function handleSupervisorClick(){
    //     console.log('right place to be')
    //     console.log('supervisor button clicked')
    // }
    // function handleStaffClick(){
    //     console.log('staff button clicked')
    // }

    return (
        <div>
            Select your role:
            <button onClick={() => router.push('/admin')}>Admin</button>
            <button onClick={() => router.push('/supervisor')}>Supervisor</button>
            <button onClick={() => router.push('/staff')}>Staff</button>
        </div>
    )
    
    
}