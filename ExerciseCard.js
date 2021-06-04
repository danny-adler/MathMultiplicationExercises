import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
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

class ExerciseCard extends Component {
    state = {
        equals: null,
        operator: null,
        leftOperand: null,
        rightOperator: null,
        result: null,
        id: null,
        isCorrect: false,
        exerciseTextInput_Style: "#edeeef",
    };

    componentDidMount() {
        this.setState({ equals: this.props.exercise.equals });
        this.setState({ operator: this.props.exercise.operator });
        this.setState({ leftOperand: this.props.exercise.leftOperand });
        this.setState({ rightOperator: this.props.exercise.rightOperator });
        this.setState({ id: this.props.exercise.id });
        this.setState({ result: this.props.exercise.result });
        this.setState({ isCorrect: this.props.exercise.isCorrect });
    }

    handleChangeResult = (value) => {
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

    render() {
        return (
            <View style={styles.card} isCorrect={this.state.isCorrect} result={this.state.result}>
                <View style={styles.exercisePart}>
                    <Text style={styles.exerciseText}>{this.state.leftOperand}</Text>
                </View>
                <View style={styles.exercisePart}>
                    <Text style={styles.exerciseText}>{this.state.operator}</Text>
                </View>
                <View style={styles.exercisePart}>
                    <Text style={styles.exerciseText}>{this.state.rightOperator}</Text>
                </View>
                <View style={styles.exercisePart}>
                    <Text style={styles.exerciseText}>{this.state.equals}</Text>
                </View>
                <View style={styles.exercisePart}>
                    <TextInput
                        //style={[styles.exerciseTextInput, setBorder]}
                        style={[styles.exerciseTextInput_Init, { borderColor: this.state.exerciseTextInput_Style }]}
                        spellCheck={false}
                        placeholder="?"
                        value={this.state.result}
                        keyboardType="numeric"
                        onChangeText={this.handleChangeResult}
                    />
                </View>
            </View>
        );
    }
}

ExerciseCard.propTypes = {
    exercise: PropTypes.shape({
        result: PropTypes.number.isRequired,
        isCorrect: PropTypes.bool.isRequired
    })
}

export default ExerciseCard;

