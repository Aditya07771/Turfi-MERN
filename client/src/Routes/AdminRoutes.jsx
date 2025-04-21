import React from 'react'
import AdminDashboard from '../Owner/AdminDashboard/AdminDashboard'

const AdminRoutes = () => {
  return (
    <div>
        <div>
            <Routes>
                <Route path='admin-dashboard' element={<AdminDashboard/>}/>
                
            </Routes>
        </div>
    </div>
  )
}

export default AdminRoutes