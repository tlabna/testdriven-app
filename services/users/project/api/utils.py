from functools import wraps

from flask import request, jsonify

from project.api.models import User


def authenticate(f):
    """Checks if user is Authenticated

    Wraps called function and checks if user is authenticated.
    If user is authenticated it will return called function with resp
    as argument

    Decorators:
        wraps

    Arguments:
        f {[function]} -- Function being called (ex. add_user())

    Returns:
        if authenticated:
            [function] -- wrapper function with resp arg
        else:
            [Object] -- response object with http code
    """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        response_object = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify(response_object), 403
        auth_token = auth_header.split(" ")[1]
        resp = User.decode_auth_token(auth_token)
        if isinstance(resp, str):
            response_object['message'] = resp
            return jsonify(response_object), 401
        user = User.query.filter_by(id=resp).first()
        if not user or not user.active:
            return jsonify(response_object), 401
        return f(resp, *args, **kwargs)

    return decorated_function


def is_admin(user_id):
    """Check user admin status

    Returns admin status of user

    Arguments:
        user_id {[String]} -- [user ID]

    Returns:
        [Boolean] -- [admin status]
    """
    user = User.query.filter_by(id=user_id).first()
    return user.admin
