import json
import unittest

from project.tests.base import BaseTestCase
from project.tests.utils import add_user, login_user


class TestUserService(BaseTestCase):
    """Tests for the Users Service."""

    def test_users(self):
        """Ensure the /ping route behaves correctly."""
        response = self.client.get('/users/ping')
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
        self.assertIn('pong!', data['message'])
        self.assertIn('success', data['status'])

    def test_add_user(self):
        """Ensure a new user can be added to the database."""
        user = login_user(self, admin=True)
        token = user['token']
        with self.client:
            response = self.client.post(
                '/users',
                data=json.dumps({
                    'username': 'john',
                    'email': 'john@doe.com',
                    'password': 'testingpassword'
                }),
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'})
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 201)
            self.assertIn('john@doe.com was added!', data['message'])
            self.assertIn('success', data['status'])

    def test_add_user_invalid_json(self):
        """Ensure error is thrown if the JSON object is empty."""
        user = login_user(self, admin=True)
        token = user['token']
        with self.client:
            response = self.client.post(
                '/users',
                data=json.dumps({}),
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'})

            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 400)
            self.assertIn('Invalid payload.', data['message'])
            self.assertIn('fail', data['status'])

    def test_add_user_invalid_json_keys_no_username(self):
        """
        Ensure error is thrown if the JSON object does not have a username key.
        """
        user = login_user(self, admin=True)
        token = user['token']
        with self.client:
            response = self.client.post(
                '/users',
                data=json.dumps({
                    'email': 'john@doe.com',
                    'password': 'testingpassword'
                }),
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'})
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 400)
            self.assertIn('Invalid payload.', data['message'])
            self.assertIn('fail', data['status'])

    def test_add_user_invalid_json_keys_no_password(self):
        """
        Ensure error is thrown if the JSON object
        does not have a password key.
        """
        user = login_user(self, admin=True)
        token = user['token']
        with self.client:
            response = self.client.post(
                '/users',
                data=json.dumps(dict(username='john', email='john@doe.com')),
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'})
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 400)
            self.assertIn('Invalid payload.', data['message'])
            self.assertIn('fail', data['status'])

    def test_add_user_duplicate_email(self):
        """Ensure error is thrown if the email already exists."""
        user = login_user(self, admin=True)
        token = user['token']
        with self.client:
            self.client.post(
                '/users',
                data=json.dumps({
                    'username': 'john',
                    'email': 'john@doe.com',
                    'password': 'testingpassword'
                }),
                content_type='application/json',
                headers={'Authorization': f'Bearer: {token}'})
            response = self.client.post(
                '/users',
                data=json.dumps({
                    'username': 'john',
                    'email': 'john@doe.com',
                    'password': 'testingpassword'
                }),
                content_type='application/json',
                headers={'Authorization': f'Bearer: {token}'})
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 400)
            self.assertIn('Sorry. That email already exists.', data['message'])
            self.assertIn('fail', data['status'])

    def test_single_user(self):
        """Ensure get single user behaves correctly."""
        user = add_user('john', 'john@doe.com', 'testingpassword')

        with self.client:
            response = self.client.get(f'/users/{user.id}')
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 200)
            self.assertIn('john', data['data']['username'])
            self.assertIn('john@doe.com', data['data']['email'])
            self.assertIn('success', data['status'])

    def test_single_user_no_id(self):
        """Ensure error is thrown if an id is not provided."""
        with self.client:
            response = self.client.get('/users/something')
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 404)
            self.assertIn('User does not exist', data['message'])
            self.assertIn('fail', data['status'])

    def test_single_user_incorrect_id(self):
        """Ensure error is thrown if the id does not exist."""
        with self.client:
            response = self.client.get('/users/999')
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 404)
            self.assertIn('User does not exist', data['message'])
            self.assertIn('fail', data['status'])

    def test_all_users(self):
        """Ensure get all users behaves correctly"""
        add_user('john', 'john@doe.com', 'testingpassword')
        add_user('michael', 'michael@montreal.com', 'testingpassword')
        with self.client:
            response = self.client.get('/users')
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(data['data']['users']), 2)
            self.assertIn('john', data['data']['users'][0]['username'])
            self.assertIn('john@doe.com', data['data']['users'][0]['email'])
            self.assertIn('michael', data['data']['users'][1]['username'])
            self.assertIn('michael@montreal.com',
                          data['data']['users'][1]['email'])
            self.assertTrue(data['data']['users'][0]['active'])
            self.assertFalse(data['data']['users'][0]['admin'])
            self.assertTrue(data['data']['users'][1]['active'])
            self.assertFalse(data['data']['users'][1]['admin'])
            self.assertIn('success', data['status'])

    def test_main_no_users(self):
        """Ensure the main route behaves correctly when no users have been
        added to the database."""
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<h1>All Users</h1>', response.data)
        self.assertIn(b'<p>No users!</p>', response.data)

    def test_main_with_users(self):
        """Ensure the main route behaves correctly when users have been
        added to the database."""
        add_user('john', 'john@doe.com', 'testingpassword')
        add_user('michael', 'michael@montreal.com', 'testingpassword')
        with self.client:
            response = self.client.get('/')
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'<h1>All Users</h1>', response.data)
            self.assertNotIn(b'<p>No users!</p>', response.data)
            self.assertIn(b'john', response.data)
            self.assertIn(b'michael', response.data)

    def test_main_add_user(self):
        """Ensure a new user can be added to the database."""
        with self.client:
            response = self.client.post(
                '/',
                data=dict(
                    username='michael',
                    email='michael@montreal.com',
                    password='testingpassword'),
                follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'<h1>All Users</h1>', response.data)
            self.assertNotIn(b'<p>No users!</p>', response.data)
            self.assertIn(b'michael', response.data)

    def test_add_user_inactive(self):
        user = login_user(self, active=False)
        token = user['token']
        with self.client:
            response = self.client.post(
                '/users',
                data=json.dumps({
                    'username': 'michael',
                    'email': 'michael@montreal.com',
                    'password': 'test'
                }),
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'})
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'fail')
            self.assertTrue(data['message'] == 'Provide a valid auth token.')
            self.assertEqual(response.status_code, 401)

    def test_add_user_not_admin(self):
        user = login_user(self)
        token = user['token']
        with self.client:
            response = self.client.post(
                '/users',
                data=json.dumps({
                    'username': 'michael',
                    'email': 'michael@sonotreal.com',
                    'password': 'test'
                }),
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'})
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'fail')
            self.assertTrue(
                data['message'] == 'You do not have permission to do that.')
            self.assertEqual(response.status_code, 401)


if __name__ == '__main__':
    unittest.main()
