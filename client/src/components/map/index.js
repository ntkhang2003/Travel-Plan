import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactMapGl, { Marker, Popup, GeolocateControl, NavigationControl } from 'react-map-gl';
import PlanBox from '../planBox/index'
import { Room } from "@material-ui/icons"	
import axios from "axios"
import Geocoder from 'react-map-gl-geocoder'
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import './map.css'
import {Link} from 'react-router-dom'
const DEFAULT_VIEWPORT = {
    latitude: 21.0244246,
    longitude: 105.7938072,
    zoom: 16
};


const Map = ({userId, currentUser}) => {
    const [newPlace, setNewPlace] = useState(null)
    const [pins, setPins] = useState([])
    const [note, setNote] = useState("")
    const [vehicle, setVehicle] = useState("")
    const [timeDeparture, setTimeDeparture] = useState("")
    const [currentPlaceId, setCurrentPlaceId] = useState(null)
    const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
    const handleDblClick = (e) => {
		const [longtitude, latitude] = e.lngLat
		setNewPlace({
			lat: latitude,
			long: longtitude,
		})
	}
    const handleMarkerClick = (id,lat,long) => {
		setCurrentPlaceId(id)
		setViewport({...viewport, lat, long})
	}
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
          const geocoderDefaultOverrides = { transitionDuration: 1000 };
    
          return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides
          });
        },
        [handleViewportChange]
    );
    const mapRef = useRef();
    const [user, setUser] = useState([])
    useEffect(() => {
		const getPins = async ()=> {
			try {
				const allPins = await axios.get(`/api/pins/${currentUser}`)
				setPins(allPins.data)
			} catch (err) {
				console.log(err)
			}
		}
		getPins()
	}, [pins])
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/api/users/${userId}`)
            setUser(res.data)
        }
        fetchUser()
    }, [user])
    
    const handleSubmit = async (e) => {
		e.preventDefault()
		const newPin = {
            username: currentUser,
			note,
            vehicle,
            timeDeparture,
			lat: newPlace.lat,
			long: newPlace.long
		}

		try {
			const res = await axios.post('/api/pins', newPin)
			setPins([...pins, res.data])
			setNewPlace(null)
		} catch(err){
			console.log(err)
		}
	}
    return (
        <div style={{ height: "100%", width:"100%", overflow: "hidden" }}>
            
            <ReactMapGl
                {...viewport}
                ref={mapRef}
                mapboxApiAccessToken="pk.eyJ1IjoibnRraGFuZzIwMDMiLCJhIjoiY2wybG9jbmNwMDk3ZTNjbzNwZGR3MHJzdCJ9.zgAaGS2pca3J3zYHtQtiuA"
                mapStyle="mapbox://styles/ntkhang2003/cl2u4h7h9003q14qlg5xxzdh7"
                width="100vw"
                height="92vh"
                onViewportChange={handleViewportChange}
                // onMove={(viewport => setViewport(viewport))}
                transitionDuration="200"
                onDblClick={handleDblClick}
            >
                {currentUser && 
                    <Geocoder 
                    mapRef={mapRef}
                    mapboxApiAccessToken="pk.eyJ1IjoibnRraGFuZzIwMDMiLCJhIjoiY2wybG9jbmNwMDk3ZTNjbzNwZGR3MHJzdCJ9.zgAaGS2pca3J3zYHtQtiuA"
                    onViewportChange={handleGeocoderViewportChange}
                />
                }
                
                {/* <GeolocateControl/>
                <NavigationControl/> */}

                {currentUser ? (<PlanBox pins = {pins} />): (<div className="error-home"><span class="noti">Bạn chưa đăng nhập. Hãy đăng nhập để xem lịch trình</span><Link className='login-home' to="/login">Đăng nhập</Link></div>)} 
                {currentUser && pins.map(p => (
				<>
					<Marker
						latitude={p.lat}
						longitude={p.long}
						offsetLeft={-3.5 * viewport.zoom}
						offsetTop={-7 * viewport.zoom}
					>
					<Room
						style={{
							fontSize: 4 * viewport.zoom,
							color: "white",
							cursor: "pointer",
						}}
						onClick={() => handleMarkerClick(p._id,p.lat,p.long)}
					/>
					</Marker>
					{p._id === currentPlaceId && (
						<Popup
							key={p._id}
							latitude={p.lat}
							longitude={p.long}
							closeButton={true}
							closeOnClick={false}
							onClose={() => setCurrentPlaceId(null)}
							anchor="right"
						>
							<div className="card">
                                <h4 className="place">{p.note}</h4>
                                <span className="date">{p.timeDeparture}</span>
                                <span className="vehicle">{p.vehicle}</span>
							</div>
						</Popup>
					    )}
				        </>
			        ))}
                    {newPlace && 
                        <Popup
                            latitude={newPlace.lat}
                            longitude={newPlace.long}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={() => setNewPlace(null)}
                            anchor="right"
                            className='outsideForm'
                        >
                            <div>
                                <form className='pinForm' onSubmit={handleSubmit}>
                                    {/* <label className="text">Ghi chú</label> */}
                                    <input 
                                        className='setNote'
                                        placeholder="Nhập ghi chú" 
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                    <br/>
                                    {/* <label className="text">Phương tiện</label> */}
                                    <input 
                                        className ="setVehicle"
                                        placeholder="Nhập phương tiện" 
                                        onChange={(e) => setVehicle(e.target.value)}
                                    />

                                    <br/>
                                    {/* <label className="text">Thời gian</label> */}
                                    <input 
                                        className='setTimeDeparture'
                                        placeholder="Nhập thời gian" 
                                        onChange={(e) => setTimeDeparture(e.target.value)}
                                    />
                                    <br/>
                                    <div>
                                        <button className="submitButton" type="submit">Add</button>
                                    </div>
                                </form>
                            </div>
                        </Popup>
                    }
            </ReactMapGl>   
        </div>
    );
};  

export default Map;