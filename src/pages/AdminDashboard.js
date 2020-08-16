import React, {Component} from 'react';

import AdminNavBar from "../components/AdminNabBar";

class AdminDashboard extends Component {
    render() {
        return (
            <div>
                <AdminNavBar active="dashboard" />
            </div>
        );
    }
}

export default AdminDashboard;