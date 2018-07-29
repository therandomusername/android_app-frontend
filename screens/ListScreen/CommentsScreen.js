import React, {Component} from 'react'
import {View, Button, Text, TextInput,StyleSheet, FlatList} from 'react-native'
import {getComments} from './requsts'

class CommentsScreen extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        comments: [],
        comment: ""
    };

    constructor(props) {
        super(props);

        this.fetchComments = this.fetchComments.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    inputChange(e) {
        this.setState({comment: e.target.value});
    }

    async fetchComments() {
        let coms = await getComments(this.props.marker.id);
        this.setState({
            comments: coms
        })
    }

    componentDidMount() {
        this.fetchComments();
    }

    onSubmit({key}) {
        if (key === 'Enter') {
            //TODO: submit
            this.setState({comment: ""})
        }

    }

    render() {
        let coords = this.props.marker.coordinate ? [this.props.marker.coordinate] : this.props.marker.coordinates;
        coords = coords.map(e => <Text key={e.latitude + e.longitude}>Lat: {e.latitude} Long: {e.longitude}</Text>);

        return <View style={styles.container}>
            <Button onPress={() => this.props.navigation.navigate('List')} title={'Wróc'}/>
            <View style={styles.main}>
                <Text style={styles.header}>{this.props.marker.name}</Text>
                <View style={{borderBottomColor: 'lightblue', borderBottomWidth: 2}}/>
                <Text>{this.props.marker.description}</Text>
                <View>{coords}</View>
            </View>
            <View style={styles.commentInput}>
                <TextInput placeholder={"Tell others what you think..."} onChange={this.inputChange} onKeyPress={this.onSubmit}/>
            </View>
            <FlatList style={styles.list}
                      data={this.state.comments}
                      renderItem={({item}) => <View key={item.id} style={styles.comment}>
                          <Text style={styles.header}>{item.author}</Text>
                          <View style={{borderBottomColor: 'lightblue', borderBottomWidth: 2}}/>
                          <Text>{item.content}</Text>
                      </View>}/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10
    },
    list: {
        width: '100%',
        marginTop: 30
    },
    commentInput: {
        width: '95%',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    main: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '95%',
        marginRight: 'auto',
        marginLeft: 'auto',
        borderColor: 'blue',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20
    },
    comment: {
        padding: 10,
        width: "90%",
        marginLeft: 'auto',
        marginRight: 2,
        borderColor: 'blue',
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 5
    },
})

export default CommentsScreen;