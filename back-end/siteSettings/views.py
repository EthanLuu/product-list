import json
from django.http.response import JsonResponse
from .models import SiteSetting
from django.core import serializers


def rest(request, key):
    response = {}
    if request.method == "GET":
        if key:
            response = get_one_setting(request, key)
        else:
            response = get_all_settings(request)
    elif request.method == "PUT":
        if key:
            response = edit_setting(request, key)
        else:
            response = edit_settings(request)
    return response


def get_one_setting(_, key):
    response = {}
    try:
        setting: SiteSetting = SiteSetting.objects.get(key=key)
        response['item'] = setting.value
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)


def get_all_settings(_):
    response = {}
    try:
        settings: SiteSetting = SiteSetting.objects.all()
        response['item'] = json.loads(serializers.serialize("json", settings))
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)


def edit_setting(request, name):
    response = {}
    try:
        setting: SiteSetting = SiteSetting.objects.get(name=name)
        setting.value = json.loads(request.body).get("value")
        setting.save()
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)


def edit_settings(request):
    response = {}
    try:
        items = json.loads(request.body)
        for item in items:
            setting = SiteSetting.objects.get(name=item.get("name"))
            setting.value = item.get("value")
            setting.save()
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)
