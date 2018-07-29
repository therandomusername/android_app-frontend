import React, {Component} from 'react'
import {StackNavigator} from 'react-navigation'
import ListScreen from './ListScreen'
import CommentsScreen from './CommentsScreen'

const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends Component {
        static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
        render() {
            const {navigation: {state: {params}}} = this.props
            return <SomeComponent {...params} {...this.props} />
        }
    }
};

export default StackNavigator({
    List: {screen: ListScreen},
    Details: {screen: mapNavigationStateParamsToProps(CommentsScreen)}
});

