import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import TabNavigator from '../TabNavigator/TabNavigator'
import {resetUserInfo, setUserInfo} from '../../actions/actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

let {FBLogin} = require('react-native-facebook-login')

class MainComponent extends Component {
    constructor(props) {
        super(props);

        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogin(data) {
        let {userId, token} = data.credentials;
        let info = {
            userID: userId,
            token
        };
        console.log("LOGIN");
        console.log(data);
        console.log(info);
        this.props.setInfo(info);
    }

    onLogout() {
        this.props.resetInfo();
    }

    render() {
        let comp = <View style={styles.container}>
            <FBLogin containerStyle={styles.btn}
                     permissions={["email","user_friends"]}
                     onLogin={(data) => this.onLogin(data)}
                     onLogout={() => this.onLogout()}
                     onLoginFound={function(data){
                         console.log("Existing login found.");
                         console.log(data);
                     }}
                     onLoginNotFound={function(){
                         console.log("No user logged in.");
                     }}
                     onError={function(data){
                         console.log("ERROR");
                         console.log(data);
                     }}
                     onCancel={function(){
                         console.log("User cancelled.");
                     }}
                     onPermissionsMissing={function(data){
                         console.log("Check permissions!");
                         console.log(data);
                     }}/>
        </View>;

        if (this.props.userInfo !== null) {
            comp = <TabNavigator/>
        }

        return comp;
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    btn: {
        height: 50,
        borderRadius: 5
    }
});

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setInfo: setUserInfo,
        resetInfo: resetUserInfo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);