import React, { Component } from "react";
import chase_icon from "../chase_icon.png";
import { Redirect } from 'react-router-dom';

import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

import axios from "axios";

const mapStyles = {
    width: "80%",
    height: "80%",
};

const googleAPIKey = "AIzaSyD8gwyU7-Ty2s2_IVmz9I3J5cS5JltJ8rM";
const proxyCorsSite = "https://cors-anywhere.herokuapp.com/";

export class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accounts: this.props.location.state.customer_accounts,
            places: [],
            address: { formatted_address: "San Jose" },
            noError: true,
            latitude: 37.3352,
            longitude: -121.8811,
            search: "",
            showingInfoWindow: false,
            goBack: false,
            showATM: false,
            activeMarker: {},
            selectedPlace: {},
            message: ""
        };
    }

    checkInput = () => {
        // const search = /^[a-z0-9]+$/i
        const search = /^[a-zA-Z0-9,. ]*$/
        if (this.state.search === "")
            return 'E';
        else if (!(search.test(this.state.search))) return 'Z'
        else return 'OK';
    }

    handleCancel =() =>{
        this.setState({
            goBack: true
        })
    }

    getJSON = (latitude, longitude) => {
        const endPoint = `${proxyCorsSite}https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
        const parameters = {
            location: `${latitude},${longitude}`,
            radius: 9000,
            name: "chase atm",
            key: googleAPIKey,
        };

        axios
            .get(endPoint + new URLSearchParams(parameters))
            .then((response) => {
                console.log(response);
                return response.data.results;
            })
            .then(
                (placesData) => {
                    this.setState({
                        places: placesData,
                        noError: true,
                    });
                    console.log(placesData);
                    if (placesData.length) {
                        return placesData;
                    } else {
                        alert("No Chase ATMs nearby. Please search again.");
                        this.setState({
                            search: "",
                        });
                    }
                },
                (error) => {
                    if (error) {
                        alert(
                            "Unable to connect to database currently. Please try again."
                        );
                        this.setState({
                            places: [],
                            noError: false,
                        });
                        return error;
                    }
                }
            );
    };

    getLatLngJSON(address) {
        const endPoint = `https://maps.googleapis.com/maps/api/geocode/json?`;
        const parameters = {
            address: address,
            key: googleAPIKey,
        };

        axios
            .get(endPoint + new URLSearchParams(parameters))
            // axios
            //     .get(
            //         `${proxyCorsSite}https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleAPIKey}`,
            //         {
            //             header:
            //                 "Access-Control-Allow-Origin: *",
            //         }
            //     )
            .then((response) => {
                console.log(response);
                return response.data.results;
            })
            .then(
                (addressData) => {
                    this.setState({
                        address: addressData[0],
                        noAddrError: true,
                    });
                    console.log(addressData);

                    if (addressData.length) {
                        let address = addressData[0];
                        this.getJSON(
                            address.geometry.location.lat,
                            address.geometry.location.lng
                        );
                        this.setState({
                            latitude: address.geometry.location.lat,
                            longitude: address.geometry.location.lng,
                        });
                    } else {
                        alert("Invalid address!");
                        this.setState({
                            search: "",
                        });
                    }
                },
                (error) => {
                    if (error) {
                        alert("Warning");
                        this.setState({
                            latitude: 37.3352,
                            longitude: -121.8811,
                            noError: false,
                        });
                        return error;
                    }
                }
            );
    }

    updateMap(event) {
        event.preventDefault();
        let check = this.checkInput();
        if(check === 'Z') {
            this.setState({
                message: 'Invalid Search Query!',
                search: ''
            })
        }
        else{
            this.getLatLngJSON(this.state.search);
            this.setState({
                message: '',
            })
        }
    }

    updateSearch = (query) => {
        this.setState({
            search: query,
        });
    };

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            showATM: true
        });
        console.log(this.state.selectedPlace);
    };

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            });
        }
    };

    

    componentDidMount() {
        this.getJSON(this.state.latitude, this.state.longitude);
    }

    render() {
        if(this.state.showATM){
            return <Redirect to={{
                pathname: '/atm/',
                state: {customer_accounts: this.state.accounts} }}
            />
        }

        if(this.state.goBack){
            return <Redirect to="/usermain/" />
        }

        return (
            <div>
                <form onSubmit={(event) => this.updateMap(event)}>
                    <p>Find Chase ATMs in:</p>
                    <input
                        id="location_text"
                        name="location_text"
                        type="text"
                        value={this.state.search}
                        onChange={(e) => this.updateSearch(e.target.value)}
                        placeholder="San Jose"
                    />
                    <input type="submit" />  <button onClick={this.handleCancel}>Back to Main page</button> {this.state.message}
                </form>
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    onClick={this.onMapClicked}
                    center={{
                        lat: this.state.latitude,
                        lng: this.state.longitude,
                    }}
                >
                    <Marker
                        onClick={this.onMarkerClick}
                        title={this.state.address.formatted_address}
                        position={{
                            lat: this.state.latitude,
                            lng: this.state.longitude,
                        }}
                    />
                    {this.state.places.length > 0 && 
                        this.state.places.map((place) => (
                            <Marker
                                onClick={this.onMarkerClick}
                                title={place.vicinity}
                                name={place.name}
                                position={{
                                    lat: place.geometry.location.lat,
                                    lng: place.geometry.location.lng,
                                }}
                                key={place.id}
                                icon={chase_icon}
                            />
                        ))
                    }
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <h3>{this.state.selectedPlace.title}</h3>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyD8gwyU7-Ty2s2_IVmz9I3J5cS5JltJ8rM",
})(MapContainer)