import React, {Component} from "react";
import {
    BackHandler
} from 'react-native';
import {
    createNavigator,
    createNavigationContainer,
    TabRouter,
    addNavigationHelpers,
} from 'react-navigation';
import {
    Container,
    Label
} from 'native-base';
import Login from './Login';
import Register from './Register';

const tabRouter = TabRouter(
    {
        Login: {
            screen: Login,
            path: 'login',
        },
        Register: {
            screen: Register,
            path: 'register',
        },
    },
    {
        initialRouteName: 'Login',
    }
);

class Auth extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', function() {
           return true;
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    render() {
        const { routes, index } = this.props.navigation.state;
        const ActiveScreen = this.props.router.getComponentForRouteName(
            routes[this.props.navigation.state.index].routeName
        );

        // console.log(this.props.navigation.state.params.reloadMain);
        return (
            <Container>
                <ActiveScreen  navigation={addNavigationHelpers({
                    ...this.props.navigation,
                    state: routes[index],
                    reloadMain: this.props.navigation.state.params.reloadMain
                })} />
            </Container>
        );
    }
}

const AuthTabs = createNavigationContainer(
    createNavigator(tabRouter)(Auth)
);

export default AuthTabs;
