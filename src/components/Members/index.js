import React, { Component } from 'react';

import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MembersActions from '../../store/ducks/members';

import InviteMember from '../InviteMember';
import RoleUpdater from '../RoleUpdater';
import Can from '../Can';

import styles from './styles';

class Members extends Component {
  state = {
    isInviteModalOpen: false,
    isRoleModalOpen: false,
    memberEdit: null,
  };

  componentDidMount() {
    const { getMembersRequest } = this.props;

    getMembersRequest();
  }

  toggleInviteModalOpen = () => {
    this.setState({ isInviteModalOpen: true });
  };

  toggleInviteModalClosed = () => {
    this.setState({ isInviteModalOpen: false });
  };

  toggleRoleModalOpen = member => {
    this.setState({ isRoleModalOpen: true, memberEdit: member });
  };

  toggleRoleModalClosed = () => {
    this.setState({ isRoleModalOpen: false, memberEdit: null });
  };

  render() {
    const { members } = this.props;
    const { isInviteModalOpen, isRoleModalOpen, memberEdit } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Members</Text>

        <FlatList
          style={styles.memberList}
          data={members.data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.memberContainer}>
              <Text style={styles.memberName}>{item.user.name}</Text>
              <Can checkRole="administrator">
                <TouchableOpacity
                  hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                  onPress={() => this.toggleRoleModalOpen(item)}
                >
                  <Icon name="settings" size={20} color="#999" />
                </TouchableOpacity>
              </Can>
            </View>
          )}
          ListFooterComponent={() => (
            <Can checkPermission="invites_create">
              <TouchableOpacity
                style={styles.button}
                onPress={this.toggleInviteModalOpen}
              >
                <Text style={styles.buttonText}>Invite</Text>
              </TouchableOpacity>
            </Can>
          )}
        />

        {memberEdit && (
          <RoleUpdater
            visible={isRoleModalOpen}
            onRequestClose={this.toggleRoleModalClosed}
            member={memberEdit}
          />
        )}

        <Can checkPermission="invites_create">
          <InviteMember
            visible={isInviteModalOpen}
            onRequestClose={this.toggleInviteModalClosed}
          />
        </Can>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  members: state.members,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(MembersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
