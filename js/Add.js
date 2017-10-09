import Consts from "./../Consts";
import React, {Component} from "react";
import {
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
    }
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
                <Header>
                    <Left>
                        {!this.state.loading &&
                            <Button transparent onPress={this.onPressClose}>
                                <Label>close</Label>
                            </Button>
                        }
                    </Left>
                    <Body>
                        <Title>New</Title>
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