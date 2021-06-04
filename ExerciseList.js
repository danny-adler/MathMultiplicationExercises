import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';

import ExerciseCard from './ExerciseCard';

/*
        const temp = [];
        const exercisesCount = 5;
        const min = 0;
        const max = 10;
        for (let index = 0; index < exercisesCount; index++) {
            const leftOperand = Math.floor(Math.random() * (max - min + 1)) + min;
            const rightOperand = Math.floor(Math.random() * (max - min + 1)) + min;
            temp.push({
                "result": "",
                "rightOperator": rightOperand,
                "leftOperand": leftOperand,
                "operator": "x",
                "equals": "=",
                "isCorrect": false,
                "id": uuid.v4()
            });
        }
*/

const styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#edeeef',
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

function getRandomInt(min /* - inclusive */, max /* - inclusive */) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomExercises(exercisesCount, leftOperandArray, rightOperandArray) {
    const temp = [];
    leftOperandArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    rightOperandArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (let index = 0; index < exercisesCount; index++) {
        const leftIndex = getRandomInt(0, leftOperandArray.length - 1);
        const rightIndex = getRandomInt(0, rightOperandArray.length - 1);
        const leftOperand = leftOperandArray[leftIndex];
        const rightOperand = rightOperandArray[rightIndex];
        temp.push({
            "result": "",
            "rightOperator": rightOperand,
            "leftOperand": leftOperand,
            "operator": "x",
            "equals": "=",
            "isCorrect": false,
            "id": uuid.v4()
        });
    }
    return temp;
}

class ExerciseList extends Component {
    state = {
        exercises: []
    }

    componentDidMount() {
        //generateExercises();
        const temp = getRandomExercises(5, [], []);
        const exercises = temp.map(e => ({
            ...e
        }));
        this.setState({ exercises });
    }

    handleRefreshPress = () => {
        let totalResult = true;
        const ex = this.state.exercises;
        console.log("ex.length: " + ex.length);

        for (let index = 0; index < ex.length; index++) {
            const element = ex[index];
            debugger;
            //console.log("typeof(element): " + Object.prototype.toString.call(element));
            //console.log("element.isCorrect: " + element.isCorrect);
            //console.log("element.result: " + element.result);

        }

        ex.forEach(element1 => {
            //console.log("element.isCorrect: " + element1.isCorrect);
            if (!element1.isCorrect) {
                totalResult = false;
            }
        });
        console.log("totalResult " + totalResult);

        const temp = getRandomExercises(5, [], []);
        const exercises = temp.map(e => ({
            ...e
        }));
        //this.setState({ exercises });
    }

    render() {
        return [
            <FlatList
                style={styles.list}
                data={this.state.exercises}
                renderItem={({ item }) => <ExerciseCard exercise={item} />}
                keyExtractor={item => item.id}
            />,
            <View>
                <TouchableHighlight
                    onPress={this.handleRefreshPress}
                    style={styles.button} >
                    <Text style={styles.buttonText}>Refresh</Text>
                </TouchableHighlight>
            </View>
        ];
    }
}

export default ExerciseList;
