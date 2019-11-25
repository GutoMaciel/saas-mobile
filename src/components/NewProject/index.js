import React, { Component } from 'react';

import { Text, TextInput, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectsActions from '../../store/ducks/projects';

import Modal from '../Modal';

import styles from './styles';

class NewProject extends Component {
  state = {
    newProject: '',
  };

  handleSubmit = () => {
    const { createProjectRequest, onRequestClose } = this.props;
    const { newProject } = this.state;

    createProjectRequest(newProject);
    onRequestClose();
  };

  render() {
    const { visible, onRequestClose } = this.props;
    const { newProject } = this.state;

    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          autoFocus
          underlineColorAndroid="transparent"
          returnKeyType="send"
          onSubmitEditing={this.handleSubmit}
          value={newProject}
          onChangeText={text => this.setState({ newProject: text })}
        />

        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Create Project</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancel} onPress={onRequestClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(ProjectsActions, dispatch);

export default connect(null, mapDispatchToProps)(NewProject);
