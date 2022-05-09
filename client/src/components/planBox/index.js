import React from 'react';
import './planBox.css';
import Trip from '../../components/trip/index'

const PlanBox = ({pins}) => {
    return (
        <div>
            <div className="NAV_TABLE">
                <div className="INFOMATION">Lịch trình</div>
                {/* <button type="button" className="button-details"> {'>'} </button> */}
            </div>
            {/* <div>
                <button type="button" className="HIDE_TABLE"> {'>'} </button>
            </div> */}
            {pins.map(p => (
                <Trip key = {p._id} pin = {p}/>
            ))}
            
        </div>
    );
};

export default PlanBox;