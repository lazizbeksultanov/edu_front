import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AdminLayout from "../../component/AdminLayout";

class Dashboard extends Component {
    render() {
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <div className={"row dashboard-style"}>
                        <div className="col-md-3">
                            <div className="card">
                                <hgroup>
                                    <h4>Faol talabalar</h4>
                                    <h2 className="text-warning">5</h2>
                                </hgroup>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <hgroup>
                                    <h4>Faol talabalar</h4>
                                    <h2 className="text-warning">5</h2>
                                </hgroup>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <hgroup>
                                    <h4>Faol talabalar</h4>
                                    <h2 className="text-warning">5</h2>
                                </hgroup>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <hgroup>
                                    <h4>Faol talabalar</h4>
                                    <h2 className="text-warning">5</h2>
                                </hgroup>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

Dashboard.propTypes = {};

export default Dashboard;
