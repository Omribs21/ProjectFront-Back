from django.urls import path
from . import views
from .views import GetOrders,DeleteProduct,CleanWishlist,GetWishlist,DeleteFromWishlist,Wishlist,AddOrder,GetProducts,UpdatePriceToProduct,AddCategory,GetProductsByCategory, MyTokenObtainPairView,AddProduct


urlpatterns = [
     path('test/', views.get_data),
     path('register/', views.register),# Register to the website.
     path('updateProd/',views.UpdatePriceToProduct), # Update Product price.
     path('products/<id>/',views.GetProducts),# Get Product by his category id
     path('products/',views.GetProducts), # Get all Products
     path("addProduct/", views.AddProduct), # Add new Product to DB
     path("getprodbycat/<id>/",views.GetProductsByCategory),
     path('addOrder/',views.AddOrder),
     path("addCategory/",views.AddCategory),
     path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),# log in
     path('logout/',views.myLogout), # Logout of the website.
     path('AddToWishlist/',views.AddToWishlist), # Add an item to the user Wishlist 
     path('RemoveFromWishlist/', views.DeleteFromWishlist), # Remove specific item from Wishlist
     path('GetWishlist/',views.GetWishlist), # Get all of the user items in his Wishlist
     path('CleanWishlist/', views.CleanWishlist), # Clean the user Wishlist.
     path('DeleteProd/',views.DeleteProduct),
     path('AddPersonalProd/',views.AddPersonalProduct),
     path('PersonalProducts/',views.GetPersonalProducts),
     path('GetOrders/',views.GetOrders)
]