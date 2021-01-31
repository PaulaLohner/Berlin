import React, { useState, useEffect } from "react";
import { Marker, MarkerClusterer } from "@react-google-maps/api";
import axios from "./axios";
import InfoModal from "./infoModal";

const BowieMap = () => {
    const [selected, setSelected] = useState({});
    const [locations, setLocations] = useState([]);
    // const [key, setKey] = useState("");

    useEffect(() => {
        axios.get("/book-map.json").then(({ data }) => {
            // console.log("data[0].theme: ", data[0].theme);

            setLocations(data);
        });
    }, []);

    const onSelect = (item) => {
        setSelected(item);
    };

    const onCloseClick = () => {
        setSelected({});
    };

    const icon = {
        url: "/book.png",
        scaledSize: { width: 32, height: 32 },
    };

    return (
        <div>
            <MarkerClusterer>
                {(clusterer) =>
                    locations.map((item) => {
                        return (
                            <Marker
                                key={item.name}
                                position={item.location}
                                onClick={() => onSelect(item)}
                                icon={icon}
                                clusterer={clusterer}
                            />
                        );
                    })
                }
            </MarkerClusterer>
            {selected.location && (
                <InfoModal selected={selected} onCloseClick={onCloseClick} />
            )}
        </div>
    );
};

export default BowieMap;
