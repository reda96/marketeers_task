from rest_framework import  status
from .models import Table
from django.shortcuts import  redirect
from django.http import JsonResponse,HttpResponse
from random import randint
from django.forms.models import model_to_dict
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.forms import UserCreationForm

# Create your views here.
    
def main(request):
    return HttpResponse("Hello")

def GetNumber(request):
        count = Table.objects.count()
        random_object =     Table.objects.all()[randint(0, count - 1)]
        return JsonResponse(model_to_dict(random_object), status=status.HTTP_200_OK)



