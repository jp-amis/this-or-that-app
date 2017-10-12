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
});

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
                    <Card>
                        <CardItem header>
                            <Text>#1</Text>
                            <Text style={ styles.smallerTextWithMarginLeft }>Lady 1</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem footer style={{ alignSelf: 'flex-end' }}>
                            <Text style={ styles.smallerTextWithMarginRight }>Lady Bug</Text>
                            <Text>#2</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>#1</Text>
                            <Text style={ styles.smallerTextWithMarginLeft }>Lady 1</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem footer style={{ alignSelf: 'flex-end' }}>
                            <Text style={ styles.smallerTextWithMarginRight }>Lady Bug</Text>
                            <Text>#2</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>#1</Text>
                            <Text style={ styles.smallerTextWithMarginLeft }>Lady 1</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem footer style={{ alignSelf: 'flex-end' }}>
                            <Text style={ styles.smallerTextWithMarginRight }>Lady Bug</Text>
                            <Text>#2</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>#1</Text>
                            <Text style={ styles.smallerTextWithMarginLeft }>Lady 1</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem footer style={{ alignSelf: 'flex-end' }}>
                            <Text style={ styles.smallerTextWithMarginRight }>Lady Bug</Text>
                            <Text>#2</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>#1</Text>
                            <Text style={ styles.smallerTextWithMarginLeft }>Lady 1</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem footer style={{ alignSelf: 'flex-end' }}>
                            <Text style={ styles.smallerTextWithMarginRight }>Lady Bug</Text>
                            <Text>#2</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>#1</Text>
                            <Text style={ styles.smallerTextWithMarginLeft }>Lady 1</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem footer style={{ alignSelf: 'flex-end' }}>
                            <Text style={ styles.smallerTextWithMarginRight }>Lady Bug</Text>
                            <Text>#2</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>#1</Text>
                            <Text style={ styles.smallerTextWithMarginLeft }>Lady 1</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem footer style={{ alignSelf: 'flex-end' }}>
                            <Text style={ styles.smallerTextWithMarginRight }>Lady Bug</Text>
                            <Text>#2</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>#1</Text>
                            <Text style={ styles.smallerTextWithMarginLeft }>Lady 1</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem footer style={{ alignSelf: 'flex-end' }}>
                            <Text style={ styles.smallerTextWithMarginRight }>Lady Bug</Text>
                            <Text>#2</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>#1</Text>
                            <Text style={ styles.smallerTextWithMarginLeft }>Lady 1</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem footer style={{ alignSelf: 'flex-end' }}>
                            <Text style={ styles.smallerTextWithMarginRight }>Lady Bug</Text>
                            <Text>#2</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1 }}>
                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ height: 250, flex: 1 }} />
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default Ranking;
