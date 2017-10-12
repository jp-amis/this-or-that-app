import Consts from "./../Consts";
import React, {Component} from "react";
import {
    AsyncStorage,
    View,
    TouchableHighlight,
    Image,
    StyleSheet,
} from "react-native";
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
    title: 'Select the image you want to upload...',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
    quality: 0.1,
};


var styles = StyleSheet.create({
    errorMessage: {
        margin: 15,
        padding: 8,
        backgroundColor: '#ff0000',
        textAlign: 'center',
        color: '#ffffff'
    }
});

class Add extends Component {
    constructor(props) {
        super(props);

        this.onPressClose = this.onPressClose.bind(this);
        this.onPressAddImage = this.onPressAddImage.bind(this);
        this.onPressSave = this.onPressSave.bind(this);

        this.state = {
            name: '',
            image: '',
            error: '',
            loading: false,
            imageURI: false,
        };
    }

    async onPressAddImage() {
        ImagePicker.showImagePicker(options, (response) => {
            if (!response.didCancel && !response.error) {
                this.setState({
                    imageURI: { uri: 'data:image/jpeg;base64,' + response.data },
                    image: response.data,
                });
            }
        });
    }

    async onPressSave() {
        if (this.state.name.trim() === '') {
            return this.setState({ error: 'Name is mandatory.', loading: false });
        }

        if (this.state.image.trim() === '') {
            return this.setState({ error: 'Image is mandatory.', loading: false });
        }

        this.setState({ error: '', loading: true });

        let token = null;
        try {
            token = await AsyncStorage.getItem(Consts.TOKEN_KEY);
        } catch (error) {}


        let response = await fetch(`${Consts.API_URL}/item/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': token,
            },
            body: JSON.stringify({
                name: this.state.name,
                image: this.state.image,
            }),
        });

        let body = await response.text();
        body = JSON.parse(body);

        if (response.status !== 200) {
            if (response.status === 403) {
                this.props.navigation.goBack();
                await AsyncStorage.removeItem(Consts.TOKEN_KEY);
                this.props.navigation.state.params.reloadMain();
                return false;
            }
            this.setState({ error: body.error, loading: false });
            return false;
        }

        this.props.navigation.state.params.extraParams.reloadList();
        this.props.navigation.goBack();
    }

    onPressClose() {
        this.props.navigation.goBack();
    }

    renderError() {
        if (this.state.error === '') {
            return null;
        }

        return(
            <Label
                style={styles.errorMessage}
                hide={true}
                ref="errorView"
            >
                {this.state.error}
            </Label>
        );
    }


    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "#ffffff"}}>
                    <Left>
                        {!this.state.loading &&
                            <Button transparent onPress={this.onPressClose}>
                                <Label>close</Label>
                            </Button>
                        }
                    </Left>
                    <Body>
                        <Title style={{ color: "#000000"}}>New</Title>
                    </Body>
                    <Right/>
                </Header>

                <Content>
                    {this.renderError()}
                    <Form>
                        <Item floatingLabel>
                            <Label>What is this or that?</Label>
                            <Input
                                returnKeyType="done"
                                keywordType="default"

                                onChangeText={ (text) => this.setState({ name: text }) }
                            />
                        </Item>
                    </Form>
                    <TouchableHighlight style={{ marginTop: 15, height: 250 }} onPress={this.onPressAddImage}>
                        {!this.state.imageURI ? (
                            <View style={{
                                flex: 1,
                                backgroundColor: '#fafafa',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Icon name='md-add'/>
                                <Label>Add Image</Label>
                            </View>)
                            : (
                                <Image source={this.state.imageURI} style={{ flex: 1 }} />
                            )
                        }
                    </TouchableHighlight>
                    {this.state.loading ? (
                        <Spinner color='green' />
                    ) : (
                        <Button
                            block
                            success
                            style={{ margin: 15 }}
                            onPress={this.onPressSave}
                        >
                            <Text>Save</Text>
                        </Button>
                    ) }
                </Content>
            </Container>
        );
    }
}

export default Add;
