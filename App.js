import React from 'react';
import { Text } from 'react-native';
// import Main from "./js/Main";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        };
    }

    render() {
        return  <Text>Hello world!</Text>;
    }
}
