from rest_framework import  status
from .models import Table
from django.http import JsonResponse,HttpResponse
from random import randint
from django.forms.models import model_to_dict
from .serializers import TableSerializer
from rest_framework import generics
# Create your views here.
    
def main(request):
    return HttpResponse("Hello")


class GetNumber(generics.RetrieveAPIView):
   
  serializer_class = TableSerializer

  def get_object(self):
    
          count = Table.objects.count()
          random_object = Table.objects.all()[randint(0, count - 1)]
          return random_object



