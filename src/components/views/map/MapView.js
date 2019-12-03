import React from 'react';
import GoogleMapReact from 'google-map-react';

// AIzaSyAYBk7ONSM5KzrT2HJyoXF5fbrFNZN_2r0

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const renderMarker = (map, maps) => {
    new maps.Marker({
      map: map,
      position: new maps.LatLng(55.7482273, 37.5403716),
      label: 'Empire'
    });
  };

export default class MapView extends React.Component {
    static defaultProps = {
      center:  {
        lat: 52.221506,
        lng: 21.006460,
      },
      zoom: 16,
    };
  
    render() {
      return (
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyAYBk7ONSM5KzrT2HJyoXF5fbrFNZN_2r0" }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
                lat={52.221506}
                lng={21.006460}
                text="WE"
            />
            <Marker position={YOURLOCATION} icon={RotateIcon.makeIcon(YOURICON).setRotation({vanBearing}).getUrl()}/>
          </GoogleMapReact>
        </div>
      );
    }
  }