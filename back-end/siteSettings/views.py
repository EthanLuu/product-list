import json
from django.forms.models import model_to_dict
from django.http.response import JsonResponse
from django.shortcuts import render
from .models import SiteSetting


def rest(request, name):
    response = {}
    if request.method == "GET":
        response = get_setting(request, name)
    elif request.method == "PUT":
        response = edit_setting(request, name)
    return response


def get_setting(_, name):
    response = {}
    try:
        setting: SiteSetting = SiteSetting.objects.get(name=name)
        response['item'] = setting.value
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
