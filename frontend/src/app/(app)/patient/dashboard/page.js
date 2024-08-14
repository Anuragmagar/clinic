"use client"
import Patient from '../page'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'


// export const metadata = {
//     title: 'Laravel - Admin Dashboard',
// }

const Dashboard = () => {
    const router = useRouter()

    // useEffect(() => {
    //     // if (router.pathname === '/admin') {
    //     console.log(window.location.pathname)
    //     if (window.location.pathname === '/admin') {
    //         // router.replace('/admin/dashboard')
    //         router.push('/admin/dashboard')
    //     }
    // }, [router])


    return (
        <Patient>
            <h2>Patient dashboard page</h2>
            <p>Welcome to the patient page!</p>
        </Patient>
    )

    // const { user } = useAuth({ middleware: 'auth' })

    // return (
    //     user.role_id == 2 ?
    //         <>
    //             <Header title="Admin Dashboard" />
    //             <div className="py-12">
    //                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
    //                     <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
    //                         <div className="p-6 bg-white border-b border-gray-200">
    //                             {/* You are logged in! */}
    //                             <TestComponent />
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </>
    //         : <>
    //             <h1>No allowed</h1>
    //         </>
    // )
}

export default Dashboard