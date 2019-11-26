import { call, put } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';
import api from '../../services/api';

import MembersActions from '../ducks/members';

export function* getMembers() {
  const response = yield call(api.get, 'members');

  yield put(MembersActions.getMembersSuccess(response.data));
}

export function* updateMember({ id, roles }) {
  try {
    yield call(api.put, `members/${id}`, { roles: roles.map(role => role.id) });

    yield put(ToastActionsCreators.displayInfo('Success. Member updated!'));
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Error at uptate'));
  }
}

export function* inviteMember({ email }) {
  try {
    yield call(api.post, 'invites', { invites: [email] });

    yield put(ToastActionsCreators.displayInfo('Done'));
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Error'));
  }
}
