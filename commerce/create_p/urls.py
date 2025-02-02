from django.urls import path
from . import views

urlpatterns = [
    path('product/', views.CreateProductView.as_view(), name='create_product'),
    path('product/user', views.CreateProductUserView.as_view(), name='get_product'),
    path('product/delete/<int:pk>/', views.DeleteProductView.as_view(), name='delete_product'),
    path('order/', views.CreateOrderView.as_view(), name='create_order'),
    path('order/delete/<int:pk>/', views.DeleteOrderView.as_view(), name='create_order'),
    path('get_cart/<str:pk>', views.CreateCartView.as_view(), name='create_cart'),
    path('get_bank/', views.CreateBankView.as_view(), name='create_bank'),
]