import Consts from "./../Consts";
import React, {Component} from "react";
import {
    AsyncStorage,
    StyleSheet
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

var styles = StyleSheet.create({
    container: {
        borderColor: '#ffffff',
    },
    centeredLabel: {
        marginTop: 25,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    signUpButton: {
        margin: 15,
        marginTop: 50,
    },
    signInButton: {
        margin: 15,
        marginTop: 50,
    },
    errorMessage: {
        margin: 15,
        padding: 8,
        backgroundColor: '#ff0000',
        textAlign: 'center',
        color: '#ffffff'
    }
});

class Login extends Component {
    constructor(props) {
        super(props);

        this.focusPasswordInputField = this.focusPasswordInputField.bind(this);
        this.onSignUpPressed = this.onSignUpPressed.bind(this);
        this.onSignInPressed = this.onSignInPressed.bind(this);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            error: '',
            loading: false
        };
    }

    focusPasswordInputField() {
        return this._passwordInput._root.focus();
    }

    focusConfirmPasswordInputField() {
        return this._confirmPasswordInput._root.focus();
    }

    onSignInPressed() {
        this.props.navigation.navigate('Login');
    }

    async onSignUpPressed() {
        this.setState({ error: '' });

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ error: 'Password and confirmation do not match' });
            return false;
        }
        this.setState({ error: '', loading: true });
        let response = await fetch(`${Consts.API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        });

        let body = await response.text();
        body = JSON.parse(body);

        if (response.status !== 200) {
            this.setState({ error: body.error, loading: false });
            return false;
        }

        try {
            if (body.ok) {
                await AsyncStorage.setItem(Consts.TOKEN_KEY, body.token);
            }
        } catch(error) {
            this.setState({ error: error.toString() });
        }
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
            <Container style={styles.container}>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Register</Title>
                    </Body>
                    <Right/>
                </Header>

                <Content>
                    {this.renderError()}
                    <Form>
                        <Item floatingLabel>
                            <Label>E-mail</Label>
                            <Input
                                returnKeyType="next"
                                keywordType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}

                                onSubmitEditing={this.focusPasswordInputField}
                                onChangeText={ (text) => this.setState({ email: text }) }
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry
                                returnKeyType="next"
                                getRef={(input) => this._passwordInput = input }

                                onSubmitEditing={this.focusConfirmPasswordInputField}
                                onChangeText={ (text) => this.setState({ password: text }) }
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Confirm Password</Label>
                            <Input
                                secureTextEntry
                                returnKeyType="go"
                                getRef={(input) => this._confirmPasswordInput = input }

                                onChangeText={ (text) => this.setState({ confirmPassword: text }) }
                            />
                        </Item>
                    </Form>
                    {this.state.loading ? (
                        <Spinner color='green' />
                    ) : (
                        <Button
                            block
                            success
                            style={styles.signUpButton}

                            onPress={this.onSignUpPressed}
                        >
                            <Text>Sign Up</Text>
                        </Button>
                    )}
                    <Label style={styles.centeredLabel}>or</Label>
                    <Button
                        block
                        primary
                        style={styles.signUpButton}
                        onPress={this.onSignInPressed}
                    >
                        <Text>Sign In</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default Login;
