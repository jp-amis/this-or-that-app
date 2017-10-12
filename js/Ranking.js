import Consts from "./../Consts";
import React, {Component} from "react";
import {
    StyleSheet,
    Image,
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
    Text,
    Card,
    CardItem,
    Toast,
    Root,
} from "native-base";

var styles = StyleSheet.create({
    smallerTextWithMarginLeft: {
        marginLeft: 10,
        fontSize: 12
    },
    smallerTextWithMarginRight: {
        marginRight: 10,
        fontSize: 12
    },
    name: {
        fontSize: 14,
    },
    position: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    total: {
        fontSize: 12,
    }
});

class Ranking extends Component {
    constructor(props) {
        super(props);

        this.onPressClose = this.onPressClose.bind(this);

        this.state = {
            loading: true,
            cards: [{},{}],
        };
    }

    onPressClose() {
        this.props.navigation.goBack();
    }

    async componentDidMount() {
        let token = null;
        try {
            token = await AsyncStorage.getItem(Consts.TOKEN_KEY);
        } catch (error) {}

        const response = await fetch(`${Consts.API_URL}/rank/top`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': token,
            },
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

            Toast.show({
                text: body.error,
                position: 'top',
                buttonText: 'Ok'
            });
            return false;
        }

        console.log(JSON.stringify(body.cards));
        this.setState({ loading: false, cards: body.cards });
    }

    render() {
        return (
            <Root>
                <Container>
                    <Header style={{ backgroundColor: "#ffffff"}}>
                        <Left>
                            <Button transparent onPress={this.onPressClose}>
                                <Label>close</Label>
                            </Button>
                        </Left>
                        <Body>
                         <Title style={{ color: "#000000"}}>Ranking</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <Content>
                        {this.state.loading &&
                        <Spinner color="black"/>
                        }
                        { this.state.cards.map((prop, key) => {
                            return (
                                <Card key={key} style={{elevation: 3}}>
                                    <CardItem header>
                                        <Left style={{ }}>
                                            <Text style={styles.position}>#{ key + 1}</Text>
                                            <Text style={styles.name}>{ prop.name }</Text>
                                        </Left>
                                        <Right style={{alignItems: 'flex-end' }}>
                                            <Text style={styles.total}>{ prop.total }</Text>
                                        </Right>
                                    </CardItem>
                                    <CardItem cardBody style={{flex: 1}}>
                                        <Image
                                            source={{uri: Consts.IMAGE_URL + prop.image }}
                                            style={{height: 250, flex: 1}}/>
                                    </CardItem>
                                </Card>
                            );
                        }) }
                    </Content>
                </Container>
            </Root>
        );
    }
}

export default Ranking;
