import Consts from "./../Consts";
import React, {Component} from "react";
import {
    AsyncStorage,
    StyleSheet,
    Image,
    Modal,
} from 'react-native';
import {
    Container,
    Header,
    Body,
    Title,
    Footer,
    Button,
    Icon,
    Text,
    Grid,
    Col,
    Content,
    Card,
    CardItem,
    Right,
    View,
    Left,
    Row,
    DeckSwiper,
    Label,
} from "native-base";

var styles = StyleSheet.create({
    white: {
        color: '#ffffff',
    },
    black: {
        color: '#000000',
    },
    smallerTextWithMarginLeft: {
        marginLeft: 10,
        fontSize: 12
    },
    smallerTextWithMarginRight: {
        marginRight: 10,
        fontSize: 12
    },
    emptyView: {
        alignItems:'center',
        justifyContent:'center',
    }
});


class Root extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
        this.onLayoutContainerView = this.onLayoutContainerView.bind(this);
        this.onPressThis = this.onPressThis.bind(this);
        this.onPressThat = this.onPressThat.bind(this);
        this.onSwipeRight = this.onSwipeRight.bind(this);
        this.onSwipeLeft = this.onSwipeLeft.bind(this);
        this.voteForCard = this.voteForCard.bind(this);
        this.onPressAdd = this.onPressAdd.bind(this);

        this.cards = [
            {
                nameThis: 'Beatlejulia',
                nameThat: 'Besourosuco'
            },

            {
                nameThis: 'Lady #3',
                nameThat: 'Lady #4'
            }
        ];

        this.state = {
            currentCard: 1,
            cardHeight: 350,
        };
    }

    onPressAdd() {
        this.props.navigation.state.params.navigateTo('Add');
    }

    onPressThis() {
        this._deckSwiper._root.swipeLeft();
        this.voteForCard();
    }

    onSwipeLeft() {
        this.voteForCard();
    }

    onPressThat() {
        this._deckSwiper._root.swipeRight();
        this.voteForCard();
    }

    onSwipeRight() {
        this.voteForCard();
    }

    voteForCard() {
        const currentCard = this.state.currentCard + 1;
        this.setState({ currentCard });
        console.log(this.cards.length >= this.state.currentCard);
    }

    onLayoutContainerView(event) {
        this.setState({ cardHeight: event.nativeEvent.layout.height - 15 });
    }

    async logout() {
        await AsyncStorage.removeItem(Consts.TOKEN_KEY);
        this.props.navigation.state.params.reloadMain();
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.logout}>
                            <Label>Logout</Label>
                        </Button>
                    </Left>
                    <Body>
                        <Title>This or That</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='md-podium' style={ styles.black } />
                        </Button>
                    </Right>
                </Header>
                <View style={{ flex: 1 }} onLayout={this.onLayoutContainerView} >
                    <DeckSwiper
                        ref={(deckSwiper) => this._deckSwiper = deckSwiper}
                        onSwipeRight={this.onSwipeRight}
                        onSwipeLeft={this.onSwipeLeft}
                        looping={false}
                        dataSource={this.cards}
                        renderEmpty={() =>
                            <View style={ [{height: this.state.cardHeight }, styles.emptyView] }>
                                <View>

                                    <Text style={{ margin: 30 }}>No more This or That for now...</Text>

                                    <View style={{justifyContent:'center', alignItems: 'center', flexDirection: 'row'}}>
                                        <Button iconLeft dark onPress={this.onPressAdd}>
                                            <Icon dark name='md-add' style={ styles.white }/>
                                            <Text>New</Text>
                                        </Button>
                                        <Text style={{margin: 10}}>or</Text>
                                        <Button iconLeft dark>
                                            <Icon dark name='ios-refresh-outline' style={ styles.white }/>
                                            <Text>Reload</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        }
                        renderItem={item =>
                            <Card style={{height: this.state.cardHeight }}>
                                <CardItem header>
                                    <Text>#This</Text>
                                    <Text style={ styles.smallerTextWithMarginLeft }>{ item.nameThis }</Text>
                                </CardItem>
                                <CardItem cardBody style={{ flex: 1 }}>
                                    <Grid>
                                        <Row>
                                            <Image source={{uri: 'https://scontent-gru2-1.xx.fbcdn.net/v/t31.0-8/14884645_10154070443046238_5381593401603444922_o.jpg?oh=18bc71733bd1eebf98bc0b48817b1bb4&oe=5A77F20C'}} style={{ flex: 1 }} />
                                        </Row>
                                        <Row>
                                            <Image source={{uri: 'http://www.indiewire.com/wp-content/uploads/2013/03/beetlejuice.jpg'}} style={{ flex: 1 }} />
                                        </Row>
                                    </Grid>
                                </CardItem>
                                <CardItem footer style={{ alignSelf: 'flex-end' }}>
                                    <Text style={ styles.smallerTextWithMarginRight }>{ item.nameThat }</Text>
                                    <Text>#That</Text>
                                </CardItem>
                            </Card>
                        }
                    />
                </View>
                <Footer>
                    <Body>
                        <Grid>
                            <Col>
                                {this.cards.length >= this.state.currentCard &&
                                <Button iconLeft dark
                                        onPress={this.onPressThis}>
                                    <Icon dark name='ios-arrow-back-outline' style={styles.white}/>
                                    <Text>This</Text>
                                </Button>
                                }
                            </Col>
                            <Col>
                                <Button transparent dark onPress={this.onPressAdd}>
                                    <Icon name='md-add'/>
                                </Button>
                            </Col>
                            <Col>
                                {this.cards.length >= this.state.currentCard &&
                                <Button iconRight dark
                                        onPress={this.onPressThat}>
                                    <Text>That</Text>
                                    <Icon dark name='ios-arrow-forward-outline'
                                          style={styles.white}/>
                                </Button>
                                }
                            </Col>
                        </Grid>
                    </Body>
                </Footer>
            </Container>
        );
    }
}

export default Root;