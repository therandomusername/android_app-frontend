import React from 'react';
import store from '../store/store'
import TabNavigator from './TabNavigator/TabNavigator'
import {Provider} from "react-redux";
import MainComponent from './MainComponent/MainComponent'

export default class App extends React.Component {
    render() {
        console.log(this.props);
        return <Provider store={store}><MainComponent/></Provider>
    }
}
