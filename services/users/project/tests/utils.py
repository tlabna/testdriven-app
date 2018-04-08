import json

from project import db
from project.api.models import User


def add_user(username, email, password):
    """Simulates adding user to db

    Adds user to db

    Arguments:
        username {[String]}
        email {[String]}
        password {[String]}

    Returns:
        [Object] -- [User object created]
    """
    user = User(username=username, email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return user


def login_user(self, active=True, admin=False):
    """Simulates logging in a user

    - Creates a user, adds to db and logs in.
    - Can set up user with properties such as admin or active

    Keyword Arguments:
        active {bool} -- [User active status] (default: {True})
        admin {bool} -- [Admin status] (default: {False})

    Returns:
        [Object] -- {
            'user': [Object],
            'token': [String - encoded token],
        }
    """
    user = add_user('test', 'test@test.com', 'test')
    if not active:
        user = User.query.filter_by(email='test@test.com').first()
        user.active = False
        db.session.commit()
    if admin:
        user = User.query.filter_by(email='test@test.com').first()
        user.admin = True
        db.session.commit()
    resp_login = self.client.post(
        '/auth/login',
        data=json.dumps({
            'email': 'test@test.com',
            'password': 'test'
        }),
        content_type='application/json')
    token = json.loads(resp_login.data.decode())['auth_token']
    return {'user': user, 'token': token}
