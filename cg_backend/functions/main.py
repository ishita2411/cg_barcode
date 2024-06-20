from firebase_functions import firestore_fn, https_fn

# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app, firestore
import google.cloud.firestore
from firebase_functions import options
app = initialize_app()


@https_fn.on_call()
def addUser(req: https_fn.CallableRequest):

    firestore_client: google.cloud.firestore.Client = firestore.client()

    # Push the new message into Cloud Firestore using the Firebase Admin SDK.
    _, doc_ref = firestore_client.collection("users").add({"uid": req.data['uid'], "role": req.data['role']})
    print('ye bhi hua')

    # Send back a message that we've successfully written the message
    return {
    'data': { 'success': 'true' }
}
    # return https_fn.Response({ 'data': { 'success': 'true' } })