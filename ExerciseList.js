import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';
import uuid from 'react-native-uuid';
//import Sound from 'react-native-sound';
/*
    sound = new Sound('motorcycle.mp3');

    playSound = () => {
        this.sound.play()
    }
*/

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
    const operators = ["x", ":"];
    leftOperandArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    rightOperandArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (let index = 0; index < exercisesCount; index++) {
        const operatorIndex = getRandomInt(0, operators.length - 1);
        const leftIndex = getRandomInt(0, leftOperandArray.length - 1);
        const rightIndex = getRandomInt(0, rightOperandArray.length - 1);
        const operator = operators[operatorIndex];
        const leftOperand = leftOperandArray[leftIndex];
        const rightOperand = rightOperandArray[rightIndex];
        let exercise;

        switch (operator) {
            case ":":
                const result = leftOperand * rightOperand;
                leftOperand = result;
                break;

            case "x":
            default:
                // do nothing
                break;
        }

        temp.push({
            "result": "",
            "rightOperator": rightOperand,
            "leftOperand": leftOperand,
            "operator": operator,
            "equals": "=",
            "isCorrect": false,
            "id": uuid.v4(),
            "exerciseTextInput_Style": "#edeeef",
        });
    }
    return temp;
}
function evaluateExercise(exercise) {
    switch (exercise.operator) {
        case "x":
            return exercise.leftOperand * exercise.rightOperator == exercise.result;

        case ":":
            return exercise.leftOperand / exercise.rightOperator == exercise.result;

        default:
            return null;
    }
}


const numberOfExercies = 5;

class ExerciseList extends Component {
    state = {
        exercises: []
    }

    componentDidMount() {
        //generateExercises();
        const temp = getRandomExercises(numberOfExercies, [], []);
        const exercises = temp.map(e => ({
            ...e
        }));
        this.setState({ exercises });
    }

    handleRefreshPress = () => {
        Keyboard.dismiss();

        let totalResult = true;
        const green = "#0f0";
        const red = "#f00";
        const ex = this.state.exercises;

        for (let index = 0; index < ex.length; index++) {
            const element = ex[index];
            if (element.isCorrect) {
                element.exerciseTextInput_Style = green;
            }
            else {
                element.exerciseTextInput_Style = red;
                totalResult = false;
            }
        }
        let exercises = ex.map(e => ({
            ...e
        }));
        this.setState({ exercises });

        if (totalResult) {
            Alert.alert(
                "בדיקה",
                "ענבר\nכל הכבוד!\nהנה תרגילים חדשים..",
                [
                    {
                        text: "OK", onPress: () => {
                            const temp = getRandomExercises(numberOfExercies, [], []);
                            exercises = temp.map(e => ({
                                ...e
                            }));
                            this.setState({ exercises });
                        }
                    }
                ]
            );


        } else {
            Alert.alert(
                "בדיקה",
                "ענבר\nיש לך טעות\nנסי שוב",
                [
                    { text: "OK" }
                ]
            );
        }
    }

    handleChangeResult = (value, index) => {
        //debugger;
        //console.log("value: " + value);
        //console.log("index: " + index);

        const temp = this.state.exercises;
        temp[index].result = value;

        //const green = "#0f0";
        //const red = "#f00";
        //console.log("this.state.exercises[index].leftOperand: " + this.state.exercises[index].leftOperand);
        //console.log("this.state.exercises[index].rightOperator: " + this.state.exercises[index].rightOperator);
        //console.log("this.state.exercises[index].result: " + this.state.exercises[index].result);

        if (evaluateExercise(temp[index])) {
            //console.log("correct");
            temp[index].isCorrect = true;
            //temp[index].exerciseTextInput_Style = green;
        } else {
            //console.log("incorrect");
            temp[index].isCorrect = false;
            //temp[index].exerciseTextInput_Style = red;
        }

        const exercises = temp.map(e => ({
            ...e
        }));
        this.setState({ exercises });
    }

    renderItem = ({ item, index }) => {
        //debugger;
        //console.log("item.id: " + item.id);
        //console.log("this.state.exercises: " + this.state.exercises[index].id);
        //console.log("this.state.exercises: " + this.state.exercises[item.id]);
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
                        style={[styles.exerciseTextInput_Init, { borderColor: this.state.exercises[index].exerciseTextInput_Style }]}
                        spellCheck={false}
                        placeholder="?"
                        value={this.state.exercises[index].result}
                        keyboardType="numeric"
                        onChangeText={value => this.handleChangeResult(value, index)}
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
                extraData={this.state.exercises}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
            />,
            <View>
                <TouchableHighlight
                    onPress={this.handleRefreshPress}
                    style={styles.button} >
                    <Text style={styles.buttonText}>בדיקה</Text>
                </TouchableHighlight>
            </View>
        ];
    }
}

export default ExerciseList;
