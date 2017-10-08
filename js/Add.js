import Consts from "./../Consts";
import React, {Component} from "react";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Item,
    Label,
    Input,
    Body,
    Left,
    Right,
    Icon,
    Form,
    Spinner,
    Text
} from "native-base";
var ImagePicker = require('react-native-image-picker');

var options = {
    title: 'Select Avatar',
    customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
console.log(ImagePicker);
// ImagePicker.showImagePicker(options, (response) => {
//     console.log('Response = ', response);
//
//     // if (response.didCancel) {
//     //     console.log('User cancelled image picker');
//     // }
//     // else if (response.error) {
//     //     console.log('ImagePicker Error: ', response.error);
//     // }
//     // else if (response.customButton) {
//     //     console.log('User tapped custom button: ', response.customButton);
//     // }
//     // else {
//     //     let source = { uri: response.uri };
//     //
//     //     // You can also display the image using data:
//     //     // let source = { uri: 'data:image/jpeg;base64,' + response.data };
//     //
//     //     this.setState({
//     //         avatarSource: source
//     //     });
//     // }
// });

class Add extends Component {
    constructor(props) {
        super(props);

        this.onPressClose = this.onPressClose.bind(this);

        this.state = {};

        ImagePicker.showImagePicker(options, (response => console.log(response)));
    }

    onPressClose() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.onPressClose}>
                            <Label>close</Label>
                        </Button>
                    </Left>
                    <Body>
                        <Title>New</Title>
                    </Body>
                    <Right/>
                </Header>

                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>What is this or that?</Label>
                            <Input
                                returnKeyType="default"
                                keywordType="email-address"
                            />
                        </Item>
                        <Item>

                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}

export default Add;
