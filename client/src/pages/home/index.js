import React from 'react';
import Map from '../../components/map';
const Home = ({currentUser, userId}) => {
    
    return (
        <div >
            <Map 
				currentUser={currentUser}
				userId = {userId}
			/>
            {/* {currentUser ? (
				<button className="button logout" onClick={handleLogout}>Logout</button>
			) : (<div className="buttons">
					<button className="button login">Login</button>
					<button className="button register">Register</button>
				</div>
			)} */}
        </div>
    );
};

export default Home;