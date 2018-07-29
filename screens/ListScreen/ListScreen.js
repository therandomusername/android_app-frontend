import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SectionList, View, Text, StyleSheet, PermissionsAndroid} from 'react-native'
import MarkerView from './components/MarkerView'

class ListScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            sections: [],
        };

        this.onExpandPress = this.onExpandPress.bind(this);
    }

    spreadDataIntoState(data) {
        let ownData = data.markers.filter(e => e.ownerID == this.props.userID).concat(data.routes.filter(e => e.ownerID == this.props.userID));
        let publicMarkers = data.markers.filter(e => e.ownerID != this.props.userID);
        let publicRoutes = data.routes.filter(e => e.ownerID != this.props.userID);

        this.setState(() => ({
            sections: [
                {title: "Moje", data: ownData},
                {title: "Znaczniki", data: publicMarkers},
                {title: "Trasy", data: publicRoutes}
            ],
            expandedId: null
        }))
    }

    onExpandPress(marker) {
        this.props.navigation.navigate('Details', {marker: marker});
    }

    componentDidMount() {
        this.spreadDataIntoState({
            markers: this.props.markers,
            routes: this.props.routes
        })
    }

    componentWillReceiveProps(nextProps) {
        this.spreadDataIntoState({
            markers: nextProps.markers,
            routes: nextProps.routes
        })
    }

    render() {
        let renderItemFunc = ({item, index}) => (
            <MarkerView isPublic={item.isPublic} marker={item} onExpand={this.onExpandPress}
                        expanded={this.state.expandedId === item.id}/>);

        let sectionHeader = (info) => (
            <View style={styles.header}><Text style={styles.headerText}>{info.section.title}</Text></View>);

        let keyExtractor = (item, index) => index;

        return <View><SectionList sections={this.state.sections} renderSectionHeader={sectionHeader}
                                  renderItem={renderItemFunc}
                                  keyExtractor={keyExtractor} extraData={this.state}/></View>

    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        height: 30,
        borderColor: 'darkblue'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20
    }
});

function mapStateToProps(state) {
    return {
        markers: state.markers,
        routes: state.routes,
        userID: state.userInfo.userID
    }
}

export default connect(mapStateToProps, null)(ListScreen)