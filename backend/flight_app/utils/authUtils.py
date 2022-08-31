from django.contrib.auth.models import Permission
from django.contrib.auth.models import User




def get_user_permissions(user):
    if user.is_superuser:
        return Permission.objects.all()
    return user.user_permissions.all() | Permission.objects.filter(group__user=user)


def get_user_permissions_id(user):
    if user.is_superuser:
        return[x.id for x in Permission.objects.all()]
    return [x.id for x in(user.user_permissions.all() | Permission.objects.filter(group__user=user))]

def get_user_permissions_by_group(group):

    return [x.name for x in Permission.objects.filter(group__id=group)]


def get_user_groups_id(user:User):
    groups = [x.id for x in user.groups.all()]
    if user.is_superuser:
        groups.append('Super user')
    return groups