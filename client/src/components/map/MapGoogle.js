import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
  marginTop: '72px',
};

const onMarkerClick = () => {
  console.log("clicked!");
}

export class MapContainer extends Component {
  render() {
    return (
      <div className="container-fluid" id="map-container">
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176 }}
        >
          <Marker onMouseDown={onMarkerClick} position={{ lat: 47.444, lng: -122.176 }} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCVBeQRbtorSxu023KYEIapNIMgT66U9eI',
})(MapContainer);
