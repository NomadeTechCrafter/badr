import React, {Component} from 'react';
import {Animated} from 'react-native';
export default class ComFadeInViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 300,
    }).start();
  }

  render() {
    return (
      <Animated.View // Special animatable View
        style={{
          ...this.props.style,
          opacity: this.state.fadeAnim, // Bind opacity to animated value
        }}>
        {this.props.children}
      </Animated.View>
    );
  }
}
