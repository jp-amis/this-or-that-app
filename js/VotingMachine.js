import Consts from "./../Consts";
import React, {Component} from "react";
import {
    AsyncStorage,
    StyleSheet,
    Image,
    Modal,
    BackHandler,
} from 'react-native';
import {
    Root,
    Toast,
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
    Spinner,
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

const CARD_THIS = 1;
const CARD_THAT = 2;

class VotingMachine extends Component {
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
        this.onPressReload = this.onPressReload.bind(this);
        this.onPressRanking = this.onPressRanking.bind(this);
        this.renderEmptyView = this.renderEmptyView.bind(this);
        this.saveVote = this.saveVote.bind(this);

        this.state = {
            cards: [],
            currentCard: 1,
            cardHeight: 350,
            loading: false,
        };
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', function() {
            return true;
        }.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    componentDidMount() {
        this.onPressReload();
    }

    async onPressReload() {
        this.setState({ loading: true });

        await new Promise(resolve => setTimeout(resolve, 1500));

        let token = null;
        try {
            token = await AsyncStorage.getItem(Consts.TOKEN_KEY);
        } catch (error) {}

        let response = await fetch(`${Consts.API_URL}/this-or-that`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': token,
            },
            body: JSON.stringify({
                quantity: Consts.QUANTITY_CARDS_TO_LOAD,
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

            Toast.show({
                text: body.error,
                position: 'top',
                buttonText: 'Ok'
            });
            this.setState({ loading: false });
            return false;
        }

        const cards = this.state.cards.concat(body.cards);
        this.setState({ loading: false, cards, });
    }

    onPressAdd() {
        this.props.navigation.state.params.navigateTo('Add', {
            reloadList: this.onPressReload,
        });
    }

    onPressRanking() {
        this.props.navigation.state.params.navigateTo('Ranking');
    }

    onPressThis() {
        this._deckSwiper._root.swipeLeft();
        this.voteForCard(CARD_THIS);
    }

    onSwipeLeft() {
        this.voteForCard(CARD_THIS);
    }

    onPressThat() {
        this._deckSwiper._root.swipeRight();
        this.voteForCard(CARD_THAT);
    }

    onSwipeRight() {
        this.voteForCard(CARD_THAT);
    }

    async voteForCard(cardDirection) {
        const card = this.state.cards[this.state.currentCard-1];

        this.saveVote(cardDirection, card);

        const currentCard = this.state.currentCard + 1;

        if(currentCard > this.state.cards.length && this.state.cards.length) {
            this.setState({ currentCard: 1, cards: [] });
            return this.onPressReload();
        }

        this.setState({ currentCard });
    }

    async saveVote(cardDirection, card) {
        const params = {};
        params.thisCard = card.thisID;
        params.thatCard = card.thatID;
        params.vote = cardDirection === CARD_THIS ? params.thisCard : params.thatCard;

        let token = null;
        try {
            token = await AsyncStorage.getItem(Consts.TOKEN_KEY);
        } catch (error) {}

        const response = await fetch(`${Consts.API_URL}/this-or-that/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': token,
            },
            body: JSON.stringify(params),
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
    }

    onLayoutContainerView(event) {
        this.setState({ cardHeight: event.nativeEvent.layout.height - 15 });
    }

    async logout() {
        await AsyncStorage.removeItem(Consts.TOKEN_KEY);
        this.props.navigation.state.params.reloadMain();
    }

    renderEmptyView() {
        return (
            <View style={ [{height: this.state.cardHeight }, styles.emptyView] }>
                {!this.state.loading ? (
                    <View>
                        <Text style={{margin: 30}}>No more This or That for
                            now...</Text>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <Button iconLeft dark onPress={this.onPressAdd}>
                                <Icon dark name='md-add' style={styles.white}/>
                                <Text>New</Text>
                            </Button>
                            <Text style={{margin: 10}}>or</Text>
                            <Button iconLeft dark onPress={this.onPressReload}>
                                <Icon dark name='ios-refresh-outline'
                                      style={styles.white}/>
                                <Text>Reload</Text>
                            </Button>
                        </View>
                    </View>
                ) : ( <Spinner color="black" />)}
            </View>
        );
    }

    render() {
        return (
            <Root>
                <Container>
                    <Header style={{ backgroundColor: "#ffffff"}}>
                        <Left>
                            <Button transparent onPress={this.logout}>
                                <Label>logout</Label>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: "#000000"}}>This or That</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={this.onPressRanking}>
                                <Icon name='md-podium' style={ styles.black } />
                            </Button>
                        </Right>
                    </Header>
                    <View style={{ flex: 1 }} onLayout={this.onLayoutContainerView} >
                        {this.state.cards.length ? (
                        <DeckSwiper
                            ref={(deckSwiper) => this._deckSwiper = deckSwiper}
                            onSwipeRight={this.onSwipeRight}
                            onSwipeLeft={this.onSwipeLeft}
                            looping={false}
                            dataSource={this.state.cards}
                            renderEmpty={() => {}}
                            renderItem={item =>
                                <Card style={{height: this.state.cardHeight }}>
                                    <CardItem header>
                                        <Text>#This</Text>
                                        <Text style={ styles.smallerTextWithMarginLeft }>{ item.thisName }</Text>
                                    </CardItem>
                                    <CardItem cardBody style={{ flex: 1 }}>
                                        <Grid>
                                            <Row>
                                                <Image source={{uri: Consts.IMAGE_URL + item.thisImage }} style={{ flex: 1 }} />
                                            </Row>
                                            <Row>
                                                <Image source={{uri: Consts.IMAGE_URL + item.thatImage }} style={{ flex: 1 }} />
                                            </Row>
                                        </Grid>
                                    </CardItem>
                                    <CardItem footer style={{ alignSelf: 'flex-end' }}>
                                        <Text style={ styles.smallerTextWithMarginRight }>{ item.thatName }</Text>
                                        <Text>#That</Text>
                                    </CardItem>
                                </Card>
                            }
                        />
                            ) : (this.renderEmptyView())}
                    </View>
                    <Footer style={{ backgroundColor: "#ffffff"}}>
                        <Body>
                            <Grid>
                                <Col>
                                    {this.state.cards.length >= this.state.currentCard &&
                                    <Button iconLeft dark
                                            onPress={this.onPressThis}>
                                        <Icon dark name='ios-arrow-back-outline' style={styles.white}/>
                                        <Text>This</Text>
                                    </Button>
                                    }
                                </Col>
                                <Col>
                                    {!this.state.loading &&
                                    <Button transparent dark onPress={this.onPressAdd}>
                                        <Icon name='md-add'/>
                                    </Button>
                                    }
                                </Col>
                                <Col>
                                    {this.state.cards.length >= this.state.currentCard &&
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
            </Root>
        );
    }
}

export default VotingMachine;
