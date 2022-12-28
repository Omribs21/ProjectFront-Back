from django.db import models
from django.contrib.auth.models import User

# CREATE USER PROFILE:
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

# CREATE CATEGORY FOR THE CLOTHES:
class Categories(models.Model):
    desc = models.CharField(max_length=50)
    _id = models.AutoField(primary_key=True,editable=False)

# I NEEDED 2 DIFFRENT MODELS BECAUSE EACH WORKS DIFFRENTLY
# PRODUCTS IS FOR OFFICIAL PRODS, PERSONALPRODUCTS IS CUSTOM MADE PRODS.
class Products(models.Model):
    desc = models.CharField(max_length=50)
    price = models.PositiveIntegerField()
    discount_price = models.PositiveIntegerField(default=1,null=False)
    _id = models.AutoField(primary_key=True, editable=False)
    category = models.ForeignKey(Categories ,on_delete=models.CASCADE, null=True)

class PersonalProducts(models.Model):
    desc = models.CharField(max_length=50)
    price = models.PositiveIntegerField()
    discount_price = models.PositiveIntegerField()
    _id = models.AutoField(primary_key=True, editable=False)
    category = models.ForeignKey(Categories ,on_delete=models.CASCADE, null=True)

# CREATE ORDER ID WITH THE USER DETAILS OF THE ORDER LATER TO BE USED
# AS A FK IN ORDER_DETAILS TO IDENTIFY WICH ITEM IS ASSOCIATED WITH WHAT 
# ORDER.
class Orders(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    _id = models.AutoField(primary_key=True, editable=False)
    city = models.CharField(max_length=50,default="", )
    district = models.CharField(max_length=50,default="", null=False)
    phone_num = models.CharField(max_length=50,default="", null=False)
    postal_code = models.CharField(max_length=50,default="", null=False)
    createdTime = models.DateTimeField(auto_now_add=True)
    FirstName = models.CharField(max_length=50, default="", null=False)
    LastName = models.CharField(max_length=50, default="", null=False)
    email = models.EmailField(max_length=50, default="", null=False)
    Total = models.IntegerField(null=True)

class Orders_details(models.Model):
    _id = models.AutoField(primary_key=True,editable=False)
    order_id = models.ForeignKey(Orders,on_delete=models.CASCADE, null=True)
    back_name = models.CharField(max_length=50, default="", null=False)
    desc = models.CharField(max_length=50, default="", null=False)
    price = models.PositiveIntegerField(default=0,null=False)
    quantity = models.PositiveIntegerField(default=0,null=False)
    patch = models.CharField(max_length=50, default="", null=False)
    size = models.CharField(max_length=50, default="", null=False)
    total = models.PositiveIntegerField(default=0,null=False)
    comments = models.CharField(max_length=150, default="", null=False)
    

# CREATE THE USER WISHLIST
class Wishlist(models.Model):
    _id = models.AutoField(primary_key = True,editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    prod_id = models.ForeignKey(Products,on_delete=models.CASCADE, null=True)



