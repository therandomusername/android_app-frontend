import React, {Component} from 'react'
import {Text, View, StyleSheet, CheckBox, Button} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getRoutes, getMarkers} from '../../shared/actions/actions'
import {resetUserInfo} from '../../shared/actions/actions'
import {setGetOthers} from './actions'
import {StackNavigator} from 'react-navigation'

let {FBLogin} = require('react-native-facebook-login')

class ProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.onOwnedOnlyChange = this.onOwnedOnlyChange.bind(this);
        this.onRefreshClick = this.onRefreshClick.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    onOwnedOnlyChange(e) {
        this.props.setGetOthers(e)
    }

    onRefreshClick() {
        this.props.getMarkers();
        this.props.getRoutes();
    }

    onLogout() {
        this.props.resetToken();
    }

    render() {
        return <View fits style={styles.container}>
            <View style={styles.ownedOnlyView}><Text>Pobierz obiekty innych użytkowników:</Text>
                <CheckBox value={this.props.getOthers} onValueChange={this.onOwnedOnlyChange}/></View>
            <Button title={"Odśwież"} onPress={this.onRefreshClick}/>
            <FBLogin containerStyle={styles.fb}
                     onLogout={this.onLogout}/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ownedOnlyView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
    fb: {
        height: 50,
        margin: 5
    }
});

function mapStateToProps(state) {
    return {
        getOthers: state.getOthers
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMarkers: getMarkers,
        getRoutes: getRoutes,
        resetToken: resetUserInfo,
        setGetOthers: setGetOthers
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)