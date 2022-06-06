import React from 'react';
import './trip.css';
import axios from 'axios'
const Trip = ({pin}) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/pins/${pin._id}`) 
            window.location.replace('/home')
        } catch (err) {}
    }
    return (
        <div className="TABLE">
            <div>
                <div className="trip-scroll">

                    <div className="trip-plane">
                        <h2 className="trip-info">{pin.note}<i className='delete-trip far fa-trash-alt' onClick={handleDelete}></i></h2>
                        <h2 className="trip-vehicle">{pin.vehicle} <span className ='space'>{pin.timeDeparture}</span></h2>
                        
                    </div>
                    

                    {/* <input type="range" min="1" max="100" value="50" className="slider" id="myRange" /> */}
                </div>

                {/* <button type="button" className="trip-add-button">+</button>
                <div className="title-slider"> Cost optimization</div> */}

            </div>

            </div>
    )
}

export default Trip