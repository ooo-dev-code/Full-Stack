from django.shortcuts import render
from . import models, serializers

from rest_framework.permissions import AllowAny
from rest_framework import generics
from rest_framework.permissions import IsAdminUser

# Create your views here.

class CreateProductUserView(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return models.Product.objects.all()
    
class CreateProductView(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer
    permission_classes = [IsAdminUser]
    
    def get_queryset(self):
        return models.Product.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class DeleteProductView(generics.DestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer
    permission_classes = [IsAdminUser]
    
    def get_queryset(self):
        return models.Product.objects.all()
    
    
class CreateOrderView(generics.CreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return models.Order.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)
    
class DeleteOrderView(generics.DestroyAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return models.Order.objects.all()
        
class CreateCartView(generics.ListCreateAPIView):
    queryset = models.Cart.objects.all()
    serializer_class = serializers.CartSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return models.Cart.objects.all()
    
class CreateBankView(generics.ListCreateAPIView):
    queryset = models.Bank.objects.all()
    serializer_class = serializers.BankSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return models.Bank.objects.all()