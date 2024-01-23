import React, {useState, useEffect} from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData } from './api';

const App = () => {
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({lat: 40.691702424157754, lng: -73.8944761455059});
    //const [bounds, setBounds] = useState(null);
    //const [bounds, setBounds] = useState({});
    const [bounds, setBounds] = useState({ne: {lat: 40.743745519758335, lng: -73.79027768969536}, sw: {lat: 40.63961864839575, lng: -73.99867460131645}});
    const [childClicked, setChildClicked] = useState(null); // to store the place that was clicked on the map
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    /*useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude});
        })
    }, []);*/

    useEffect(() => {
        //console.log(coordinates, bounds);
        setIsLoading(true);
        getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
            //console.log(data);
            setPlaces(data);
            setIsLoading(false);
        })
    }, [type, coordinates, bounds]);

  return (
    <>
        <CssBaseline />
        <Header />
        <Grid container spacing={3} style={{ width: '100%' }}>
            <Grid item xs={12} md={4}>
            <List 
                places={places}
                childClicked={childClicked}
                isLoading={isLoading}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
            />
            </Grid>
            <Grid item xs={12} md={8}>
            <Map
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                places={places}
                setChildClicked={setChildClicked}
            />
            </Grid>
        </Grid>
    </>
  );
}

export default App
