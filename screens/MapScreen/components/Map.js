import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import MapView, {Marker, Polyline} from 'react-native-maps'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {getMarkers, getRoutes} from '../../../shared/actions/actions'

class Map extends Component {
    state = {
        flex: 0
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getRoutes();
        this.props.getMarkers();

        // setTimeout(() => this.forceUpdate(), 1000);
    }

    render() {
        let markers = this.props.markers.map(m => (
            <Marker key={m.id} title={m.name} key={m.id} coordinate={m.coordinate}/>));
        let routes = this.props.routes.map(m => (
            <Polyline key={m.id} coordinates={m.coordinates} strokeWidth={4} title={m.name}/>));
        let routeMarkers = this.props.newRouteMarkers.map(m => (
            <Marker key={m.id} coordinate={m.coordinate} pinColor={'#0000FF'}/>));
        return <View key={this.state.key} style={styles.container}><MapView
            cacheEnabled={false} style={[styles.map, {flex: this.state.flex}]}
            initialRegion={{
                latitude: 51.1078852,
                longitude: 17.0385376,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }} onLongPress={this.props.onLongPress}
            showsMyLocationButton={true}
            showsUserLocation={true}
            followsUserLocation={true}
            onMapReady={() => this.setState({flex: 1})}
        >{markers}{routeMarkers}{routes}</MapView></View>
    }
}

function mapStateToProps(state) {
    return {
        markers: state.markers,
        routes: state.routes
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMarkers: getMarkers,
        getRoutes: getRoutes
    }, dispatch)
}

const styles = StyleSheet.create({
    container: {
        height: 350,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    marker: {
        ...StyleSheet.absoluteFillObject
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Map)