import React, { Component } from 'react';

import { Text, TextInput, TouchableOpacity } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MembersActions from '../../store/ducks/members';

import Modal from '../Modal';

import styles from './styles';

class InviteMember extends Component {
  state = {
    email: '',
  };

  handleSubmit = () => {
    const { inviteMemberRequest, onRequestClose } = this.props;
    const { email } = this.state;

    inviteMemberRequest(email);
    onRequestClose();

    this.setState({ email: '' });
  };

  render() {
    const { visible, onRequestClose } = this.props;
    const { email } = this.state;

    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          returnKeyType="send"
          onSubmitEditing={this.handleSubmit}
          value={email}
          onChangeText={text => this.setState({ email: text })}
        />

        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Invite</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancel} onPress={onRequestClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(MembersActions, dispatch);

export default connect(null, mapDispatchToProps)(InviteMember);
