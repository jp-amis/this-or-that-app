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

class Ranking extends Component {
    constructor(props) {
        super(props);

        this.onPressClose = this.onPressClose.bind(this);

        this.state = {
        };
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
                    <Title>Ranking</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                   <Text>this is the ranking...</Text>
                </Content>
            </Container>
        );
    }
}

export default Add;
