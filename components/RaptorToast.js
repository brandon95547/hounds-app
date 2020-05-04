import React, { useRef } from "react";
import { Animated, Text, View, StyleSheet, Button } from "react-native";
import { globals, componentStyles, colors, spacingStyles } from './GlobalStyles';

export default class RaptorToast extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      message: this.props.message,
      speed: this.props.speed,
      direction: this.props.direction,
      showToast: this.props.showToast,
      fadeAnim: new Animated.Value(0),
      color: colors.secondary
    }
    
  }

  componentDidMount() {
    if(this.state.showToast) {
      // this.showToast(colors.green, "Invalid email")
    }
  } 

  showToast(color, message) {
    this.setState({ color: color, message: message })
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1000
    }).start();

    setTimeout(() => this.hideToast(), 3500)
  }

  hideToast() {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 1000
    }).start();
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },
      fadingContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: this.state.color,
        width: "60%",
        borderRadius: 16,
        marginBottom: 80
      },
      fadingText: {
        fontSize: 18,
        textAlign: "center",
        color: "white"
      },
      buttonRow: {
        flexDirection: "row",
        marginVertical: 16
      }
    });
    // fadeAnim will be used as the value for opacity. Initial Value: 0
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "flex-end", flexDirection: "column"}}>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: this.state.fadeAnim // Bind opacity to animated value
            }
          ]}
        >
          <Text style={styles.fadingText}>{this.state.message}</Text>
        </Animated.View>
      </View>
    );
  }
}