import React, {useState, createContext} from 'react';

export const ElevationContext = createContext()

export const ElevationProvider = (props) => {
    const [currentLongitude, setCurrentLongitude] = useState(0);
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [locationStatus, setLocationStatus] = useState('');
    const [currentAltitude, setCurrentAltitude] = useState('...')
    const [currentElevation, setCurrentElevation] = useState(0)
  

return(
    <ElevationContext.Provider value={[locationStatus, setLocationStatus,currentLongitude,setCurrentLongitude, currentLatitude, setCurrentLatitude,currentAltitude, setCurrentAltitude, currentElevation, setCurrentElevation]}>
        {props.children}
    </ElevationContext.Provider>
)

}