import React, { Component } from 'react';
import PropTypes from 'prop-types';


import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '../../store/ducks/auth';

import styles from './styles';

class SignIn extends Component {
  static propTypes ={
    signInRequest: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    const { signInRequest } = this.props;

    signInRequest(email, password);

    // SAGA(email, password)
  };

  render() {
    const { email, password } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}
      >
        <View>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={text => this.setState({ email: text })}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            autoFocus
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={text => this.setState({ password: text })}
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            returnKeyType="send"
            ref={el => {
              this.passwordInput = el;
            }}
            onSubmitEditing={this.handleSubmit}
          />

          <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);
