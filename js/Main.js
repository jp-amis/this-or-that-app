import Consts from "./../Consts";
import React, {Component} from "react";
import { StackNavigator } from 'react-navigation';
import {
    AsyncStorage,
    Platform,
    StyleSheet
} from "react-native";
import { Label } from "native-base";
import Auth from "./Auth";
import Root from "./Root";
import Add from "./Add";

var styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 150,
    }
});

const Routes = {
    Root: {
        screen: Root,
    },
    Auth: {
        screen: Auth,
    },
    Add: {
        screen: Add,
    }
};

class Main extends Component {
    constructor(props) {
        super(props);

        this.reload = this.reload.bind(this);
        this.navigateTo = this.navigateTo.bind(this);

        this.state = {
            isLogged: false,
        };
    }

    async reload(first) {
        this.props.navigation.goBack(null);
        let token = null;
        try {
            token = await AsyncStorage.getItem(Consts.TOKEN_KEY);
        } catch (error) {}

        if (token === null) {
            const {path, params, screen} = Routes.Auth;
            const {router} = screen;
            const action = path && router.getActionForPathAndParams(path, params);
            return this.props.navigation.navigate('Auth', {
                reloadMain: this.reload,
            }, action);
        }

        const {path, params, screen} = Routes.Root;
        const {router} = screen;
        const action = path && router.getActionForPathAndParams(path, params);
        return this.props.navigation.navigate('Root', {
            reloadMain: this.reload,
            navigateTo: this.navigateTo,
        }, action);
    }

    async navigateTo(route) {
        const {path, params, screen} = Routes[route];
        const {router} = screen;
        const action = path && router.getActionForPathAndParams(path, params);
        return this.props.navigation.navigate(route, {
            reloadMain: this.reload,
            navigateTo: this.navigateTo,
        }, action);
    }

    async componentWillMount() {
        // await Expo.Font.loadAsync({
            // Roboto: require("native-base/Fonts/Roboto.ttf"),
            // Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            // Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        // });

        this.setState({ isReady: true });
    }

    async componentDidMount() {
        this.reload(true);
    }

    render() {
        return (
            <Label style={styles.title}>This or That</Label>
        );
    }
};

const AppNavigator = StackNavigator(
    {
        ...Routes,
        Main: {
            screen: Main,
        },
    },
    {
        initialRouteName: 'Main',
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false,
        },
        mode: Platform.OS === 'ios' ? 'modal' : 'card',
    }
);

export default () => <AppNavigator />;
