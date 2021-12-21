import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AdminLayout from "../../component/AdminLayout";

class GeneralSetting extends Component {
    render() {
        return (
            <AdminLayout pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <h1>Umumiy sozlamalar</h1>
                </div>
            </AdminLayout>
        );
    }
}

GeneralSetting.propTypes = {};

export default GeneralSetting;
