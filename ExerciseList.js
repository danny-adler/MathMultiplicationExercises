import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text, StyleSheet, TextInput } from 'react-native';
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
    card: {
        backgroundColor: '#fff',
        padding: 10,
        paddingTop: 10,
        paddingBottom: 20,
        margin: 10,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: "row",
    },
    exercisePart: {
        width: "20%",
        textAlign: "center",
    },
    exerciseText: {
        fontSize: 28
    },
    exerciseTextInput_Init: {
        fontSize: 28,
        borderColor: '#edeeef',
        borderWidth: 2,
    },
    exerciseTextInput_Red: {
        fontSize: 28,
        borderColor: '#edeeef',
        borderWidth: 2,
    },
    exerciseTextInput_Green: {
        fontSize: 28,
        borderColor: '#edeeef',
        borderWidth: 2,
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
            //debugger;
            //console.log("typeof(element): " + Object.prototype.toString.call(element));
            console.log("element.isCorrect: " + element.isCorrect);
            console.log("element.result: " + element.result);

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

    handleChangeResult = (value, index) => {
        //debugger;
        this.setState({ result: value });

        const green = "#0f0";
        const red = "#f00";
        if (this.state.leftOperand * this.state.rightOperator == value) {
            this.setState({ isCorrect: true });
            this.setState({ exerciseTextInput_Style: green });
        } else {
            this.setState({ isCorrect: false });
            this.setState({ exerciseTextInput_Style: red });
        }
    }

    renderItem = ({ item, index }) => {
        //debugger;
        console.log("item.id: " + item.id);
        console.log("this.state.exercises: " + this.state.exercises[index].id);
        console.log("this.state.exercises: " + this.state.exercises[item.id]);
        return (
            <View style={styles.card} isCorrect={this.state.exercises[index].isCorrect}>
                <View style={styles.exercisePart}>
                    <Text style={styles.exerciseText}>{item.leftOperand}</Text>
                </View>
                <View style={styles.exercisePart}>
                    <Text style={styles.exerciseText}>{item.operator}</Text>
                </View>
                <View style={styles.exercisePart}>
                    <Text style={styles.exerciseText}>{item.rightOperator}</Text>
                </View>
                <View style={styles.exercisePart}>
                    <Text style={styles.exerciseText}>{item.equals}</Text>
                </View>
                <View style={styles.exercisePart}>
                    <TextInput
                        //style={[styles.exerciseTextInput, setBorder]}
                        style={[styles.exerciseTextInput_Init, { borderColor: this.state.exercises[index].exerciseTextInput_Style }]}
                        spellCheck={false}
                        placeholder="?"
                        value={this.state.exercises[index].result}
                        keyboardType="numeric"
                        onChangeText={this.handleChangeResult}
                    />
                </View>
            </View>
        )
    }


    render() {
        return [
            <FlatList
                style={styles.list}
                data={this.state.exercises}
                renderItem={ this.renderItem }
                keyExtractor={(item, index) => item.id.toString()}
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
