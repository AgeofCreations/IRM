from celery import shared_task

from django.contrib.auth import get_user_model
UserModel = get_user_model()
from allauth.account.models import EmailAddress

@shared_task
def user_verification(user_id, verificating_user_id, action):
    verificating_user = UserModel.objects.get(id=verificating_user_id)
    admin_user = UserModel.objects.get(id=user_id)
    verificating_email = EmailAddress.objects.get(email=verificating_user.email)
    if action == 'verificate':
        verificating_email.verified = True
    elif action == 'deactivate':
        verificating_email.verified = False
    verificating_email.save()

