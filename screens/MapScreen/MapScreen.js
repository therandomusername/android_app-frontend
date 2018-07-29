import React, {Component} from 'react'
import {View, CheckBox, Text, StyleSheet, Button} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Map from './components/Map'
import Inputs from './components/Inputs'
import {addRoute, addMarker} from './actions/actions'

class MapScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creatingRoute: false,
            name: "",
            description: "",
            newMarkers: []
        };

        this.addMarkerOnLongPress = this.addMarkerOnLongPress.bind(this);
        this.toggleCreatingRoute = this.toggleCreatingRoute.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescChange = this.onDescChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDeleteLast = this.onDeleteLast.bind(this);
    }

    addMarkerOnLongPress(e) {
        let cord = e.nativeEvent.coordinate;
        if (this.state.creatingRoute) {
            this.setState(state => ({newMarkers: [...state.newMarkers, {coordinate: cord, id: state.newMarkers.length}]}))
        }
        else {
            this.setState(() => ({newMarkers: [{coordinate: cord, id: 0}]}))
        }
    }

    toggleCreatingRoute(e) {
        if (!e) {
            this.setState(() => ({newMarkers: []}))
        }
        this.setState(() => ({creatingRoute: e}));
    }

    onNameChange(e) {
        this.setState(() => ({name: e}))
    }

    onDescChange(e) {
        this.setState(() => ({description: e}))
    }

    onSubmit() {
        if (this.state.creatingRoute) {
            this.props.addRoute({
                coordinates: this.state.newMarkers.map(m => m.coordinate),
                name: this.state.name,
                description: this.state.description
            })
        }
        else {
            this.props.addMarker({
                coordinate: this.state.newMarkers[0].coordinate,
                name: this.state.name,
                description: this.state.description,
                isPublic: false
            })
        }

        this.setState(() => ({
            newMarkers: [],
            name: "",
            description: ""
        }))
    }

    onDeleteLast() {
        this.setState(state => {
            state.newMarkers.splice(-1, 1);
            return {
                newMarkers: [...state.newMarkers]
            }
        })
    }

    render() {
        let buttonDisabled = !(this.state.name !== "" && this.state.newMarkers.length > 0);
        let routeButton = null;
        if (this.state.creatingRoute)
            routeButton = <Button title={"Usuń ostatni"} onPress={this.onDeleteLast}/>;

        return <View style={styles.container}>
            <View><Map newRouteMarkers={this.state.newMarkers} onLongPress={this.addMarkerOnLongPress}/></View>
            <View style={styles.checkbox}><Text style={styles.text}>Tworzenie trasy</Text><CheckBox value={this.state.creatingRoute} onValueChange={this.toggleCreatingRoute}/>{routeButton}</View>
            <View style={{width: '100%'}}><Inputs buttonDisabled={buttonDisabled} name={this.state.name} description={this.state.description} onPress={this.onSubmit} onNameChange={this.onNameChange} onDescChange={this.onDescChange}/></View>
        </View>
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
        addMarker: addMarker,
        addRoute: addRoute
    }, dispatch)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    text: {
        fontWeight: 'bold'
    },
    checkbox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)