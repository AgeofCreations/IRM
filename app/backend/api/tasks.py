from celery import shared_task

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
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

@shared_task
def user_group_updating(user_id, updating_user_id, action, group_to_update):
    q_updating_user = UserModel.objects.get(id=updating_user_id)
    q_group_to_update = Group.objects.get(name=group_to_update)
    if action == 'add':
        q_updating_user.groups.add(q_group_to_update)
    elif action == 'remove':
        q_updating_user.groups.remove(q_group_to_update)

