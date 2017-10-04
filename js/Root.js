import Consts from "./../Consts";
import React, {Component} from "react";
import {
    AsyncStorage
} from 'react-native';
import {
    Label,
} from "native-base";


class Root extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);

        setTimeout(this.logout, 5000);

        this.state = {};
    }

    async logout() {
        await AsyncStorage.removeItem(Consts.TOKEN_KEY);
        this.props.navigation.state.params.reloadMain();
    }

    render() {
        return (
            <Label>ROOT</Label>
        );
    }
}

export default Root;
