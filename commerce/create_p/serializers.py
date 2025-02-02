from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Cart, Product, Order, Bank

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        
class BankSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user = self.context['request'].user
        if user.is_authenticated:
            bank, created = Bank.objects.get_or_create(user=user, defaults={'user': user})
            return bank
        else:
            raise serializers.ValidationError("User must be authenticated to create a bank account.")
    
    class Meta:
        model = Bank
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    def create(self, validated_data):
        user = self.context['request'].user
        if user.is_authenticated:
            cart, created = Cart.objects.get_or_create(user=user, defaults={'user': user})
            products_data = validated_data.pop('orders', [])
            for product_data in products_data:
                cart.orders.add(product_data)
            return cart
        else:
            raise serializers.ValidationError("User must be authenticated to create a cart.")
    
    class Meta:
        model = Cart
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    cart = CartSerializer(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'