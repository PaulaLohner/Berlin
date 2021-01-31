import React, { useEffect, useState } from "react";
import {
    GoogleMap,
    Marker,
    InfoWindow,
    LoadScript,
} from "@react-google-maps/api";
import { Route } from "react-router-dom";
import BowieMap from "./bowieMap";
import KinoMap from "./kinoMap";
import BookMap from "./bookMap";
import About from "./about";
import Suggestions from "./suggestions";

const InitialMap = () => {
    const [currentPosition, setCurrentPosition] = useState({});
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    }, []);

    // const { isLoaded, loadError } = useLoadScript({
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // });

    // if (loadError) return "Error loading maps";
    // if (!isLoaded) return "Loading maps";

    const mapStyles = {
        height: "100vh",
        width: "100%",
    };

    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    };

    const success = (position) => {
        // console.log("position.coords.latitude: ", position.coords.latitude);
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
        setCurrentPosition(currentPosition);
    };

    const onMarkerDragEnd = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setCurrentPosition({ lat, lng });
    };

    return (
        <LoadScript googleMapsApiKey="">
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={12}
                center={currentPosition}
                options={options}
            >
                {currentPosition.lat ? (
                    <Marker
                        position={currentPosition}
                        onDragEnd={(e) => onMarkerDragEnd(e)}
                        draggable={true}
                        onClick={() => setSelected(currentPosition)}
                    />
                ) : null}

                {selected && (
                    <InfoWindow
                        position={currentPosition}
                        onCloseClick={() => setSelected(null)}
                    >
                        <div>
                            <p>you are here!</p>
                        </div>
                    </InfoWindow>
                )}

                <Route exact path="/bowie-map" render={() => <BowieMap />} />
                <Route exact path="/kino-map" render={() => <KinoMap />} />
                <Route exact path="/book-map" render={() => <BookMap />} />
                <Route path="/about" render={() => <About />} />
                <Route path="/suggestions" render={() => <Suggestions />} />
            </GoogleMap>
        </LoadScript>
    );
};

export default InitialMap;
