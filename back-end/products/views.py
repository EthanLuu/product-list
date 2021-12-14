from typing import DefaultDict
from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse, response
from django.views.decorators.http import require_http_methods
from django.core import serializers
from django.forms.models import model_to_dict
import json

from .models import Product


def rest(request):
    response = {}
    if request.method == "GET":
        response = get_all()
    elif request.method == "POST":
        response = add_one(request)
    elif request.method == "DELETE":
        response = del_one(request)
    return response


def get_or_edit(request, id):
    response = {}
    if request.method == "GET":
        response = get_one(request, id)
    if request.method == "PUT":
        response = edit_one(request, id)
    return response


def add_one(request):
    response = {}
    try:
        obj = json.loads(request.body)
        product = Product(title=obj.get("title"), price=obj.get("price"), imageUrl=obj.get(
            "imageUrl"), brand=obj.get("brand"), category=obj.get("category"))
        product.save()
        response['item'] = json.dumps(model_to_dict(product))
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)


def get_one(_, id):
    response = {}
    try:
        product: Product = Product.objects.get(pk=id)
        response['item'] = json.dumps(model_to_dict(product))
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)


def del_one(request):
    response = {}
    try:
        obj = json.loads(request.body)
        Product.objects.get(pk=obj.get("id")).delete()
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)


def edit_one(request, id):
    response = {}
    try:
        obj = json.loads(request.body)
        p: Product = Product.objects.get(pk=id)
        p.title = obj.get("title")
        p.brand = obj.get("brand")
        p.category = obj.get("category")
        p.imageUrl = obj.get("imageUrl")
        p.price = obj.get("price")
        p.save()
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)


def get_all():
    response = {}
    try:
        products = Product.objects.all()
        response['items'] = json.loads(serializers.serialize("json", products))
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)


def get_category_map(request):
    response = {}
    try:
        items = Product.objects.values_list('category', 'brand')
        dic = DefaultDict(set)
        for item in items:
            [category, brand] = item
            dic[category].add(brand)
        for key in dic:
            dic[key] = list(dic[key])
        response['items'] = list(dic.items())
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)


def get_categories(request):
    response = {}
    try:
        items = Product.objects.values_list('category', flat=True)
        response['items'] = list(set(items))
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)


def get_brands(request):
    response = {}
    try:
        items = Product.objects.values_list('brand', flat=True)
        response['items'] = list(set(items))
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)
