from ast import Return
from unicodedata import category
from urllib import response
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import json
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from base.serializers import OrderSerializer,CategorySerializer,ProductSerializer,WishlistSerializer,PersonalProductsSerializer
from base.models import Profile,Categories,Products,Orders,Orders_details,Wishlist,PersonalProducts
from django.contrib.auth import logout

# Simple view for testing
@api_view(['GET'])
def get_data(request):
    if request.method == 'GET':
        return JsonResponse({"test":"test"} , safe=False)
    
# Register the user and create new one in DB.
@api_view(["POST"])
def register(request): # request =  {"username":"omri","password":1234}
    Username = request.data["username"]
    Password = request.data["password"]
    Email = request.data["email"]
    First_name = request.data["first_name"]
    Last_name = request.data["last_name"]
    print(Username, Password, Email,)
    user = User.objects.create_user(
        username=Username, password=Password, email=Email,first_name= First_name, last_name= Last_name)
    return Response({"first name": First_name, "last name": Last_name})

# Log in function with a token, and retunes the user data from DB.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # classmethod (static method) method we can use with out creating an object
    @classmethod
    def get_token(cls, user):
        # super -> the class we inherit
        token = super().get_token(user)
        # select one row from Profile table (where user = given user)
        token['username'] = user.username
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name  
        token['email'] = user.email   
        print("logged")
        return token
    
# User loggin out.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def myLogout(request):
    logout(request)
    return Response("logged out")

# Generate Token
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Add new category to the DB.
@api_view(["POST"])
def AddCategory(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response("data was not saved")
    return Response({'new category':"added"})

# Add new OfficialProd to DB.
@api_view(["POST"])
def AddProduct(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response("data was not saved")
    return Response({"new product":"Added"})

# Add new PersonalProd to DB.
@api_view(["POST"])
def AddPersonalProduct(request):
    serializer = PersonalProductsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response("data was not saved")
    return Response({"new product":"Added"})

# Get 1 Personalproduct if id is > 0 or return all of the Personalproducts. 
@api_view(["GET"])
def GetPersonalProducts(request, id = 0):
    if int(id) > 0:
        products = PersonalProducts.objects.filter(_id = int(id))
    else:
        products = PersonalProducts.objects.all()
    serializer = PersonalProductsSerializer(products,many =True)
    return Response(serializer.data)

# Returnes OfficialProducts by the recieved category.
@api_view(["GET"])
def GetProductsByCategory(request,id =1):
    print(request.data)
    products = Products.objects.filter(category = int(id))
    serializer = ProductSerializer(products,many = True)
    return Response(serializer.data)

# Update price to selected product
@api_view(["PUT"])
def UpdatePriceToProduct(request):
    id = request.data["_id"]
    temp=Products.objects.get(_id = id)
    temp.price =request.data['price']
    temp.save()
    return Response({"new price":"Updated"})

# Get 1 Officialproduct if id is > 0 or return all of the Officialproducts. 
@api_view(["GET"])
def GetProducts(request, id = 0):
    if int(id) > 0:
        products = Products.objects.filter(_id = int(id))
    else:
        products = Products.objects.all()
    serializer = ProductSerializer(products,many =True)
    return Response(serializer.data)

# DELETE the item from the Wishlist by its ID and the user ID.
@api_view(['DELETE'])
def DeleteProduct(request):
    Products.objects.filter(_id=request.data["prod_id"]).delete()
    return JsonResponse({"item ID that deleted":request.data["prod_id"]})

# Add order detail to DB.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def AddOrder(request):
    # User_id = request.user.id
    print(request.data["mycartItems"])
    # details for the order.
    myCart = (request.data["cartItems"])["CartItems"]
    myProductCart = (request.data["mycartItems"])["MycartItems"]
    city = request.data["city"]
    district = request.data["district"]
    phone =request.data["phone"]
    postalCode = request.data["postalCode"]
    totalCart = request.data["total"]
    first_name = request.data["first_name"]
    last_name = request.data["last_name"]
    email = request.data["email"]
    # create new order with the values above.
    newOrder = Orders.objects.create(user = request.user,FirstName = first_name, LastName = last_name, email= email,
    city= city,district=district,phone_num = phone, postal_code = postalCode,Total = totalCart)
    
    # add every item of the order to the DB with the order Id
    # depends on wich cart the func recieve.
    for item in myCart:
        print(item)
        Orders_details.objects.create(
            order_id = newOrder, 
            desc = item["desc"],
            back_name = item["back_name"],
            price = item["price"],
            quantity = item["quantity"],
            total = item["total"],
            patch = item["patch"],
            size = item["size"],
            comments = item["comments"])
    for item in myProductCart:
        Orders_details.objects.create(
            order_id = newOrder, 
            desc = item["desc"],
            price = item["price"],
            quantity = item["quantity"],
            total = item["total"],
            size = item["size"])
    return Response({"order saved, cost:":totalCart})

# ADD NEW PRODUCT TO USER WISHLIST
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddToWishlist(request):
    user_id = request.user.id # returnes the user id.
    user = request.user # returnes the user as an Object.
    prod_id = request.data["prod_id"] # returnes the id of the product
    product_id = Products.objects.get(_id = request.data["prod_id"])
    count = Wishlist.objects.filter(prod_id = prod_id, user_id= user_id).count()
    if count >= 1: # checks if the product id and the same user id is already in db.
        return Response("item already in wishlist") # if so notify.
    else: # otherwise add the new item to the user wishlist
        Wishlist.objects.create(user = user, prod_id = product_id)
        return Response("item added to wishlist.")

# DELETE the item from the Wishlist by its ID and the user ID.
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def DeleteFromWishlist(request):
    Wishlist.objects.filter(prod_id=request.data["prod_id"],user_id = request.data["user_id"]).delete()
    return JsonResponse({"item ID that deleted":request.data["prod_id"]})

# DELETE the whole user's wishlist --> Clean it.
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def CleanWishlist(request):
    user_id = request.data["user_id"]
    all_products = Wishlist.objects.filter(user_id= user_id)
    for prod in all_products:  
        prod.delete()
    return JsonResponse({"Your wishlist is empty!":user_id})

# GET THE USER WISHLIST
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetWishlist(request):
    user_id = request.user.id # returnes the user id as int.
    all_products = Wishlist.objects.filter(user_id = user_id) # returnes all the product of the user 
    serializer = WishlistSerializer(all_products,many =True)
    return Response(serializer.data) # returnes the data in JSON format.

# GET ALL OF THE ORDERS OF THE USER:
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def GetOrders(request):
    user_id = request.user.id
    all_orders = Orders.objects.filter(user_id = user_id)
    serializer = OrderSerializer(all_orders,many =True)
    return Response(serializer.data)