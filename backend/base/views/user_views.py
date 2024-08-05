from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.serializer import ProductSerializer, UserSerializer, UserSerializerWithToken

# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         try:
#             data = super().validate(attrs)
#             print(data)
#             serializer = UserSerializerWithToken(self.user).data

#             for k, v in serializer.items():
#                 data[k] = v
            
#             return data
#         except:
#             message = {'detail': f'Cannot find the user!'}
#             return Response(message, status=status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create_user(
            first_name=data['name'],
            last_name=data['last_name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message)

# @api_view(['POST'])
# def registerUser(request):
#     data = request.data

#     try:
#         user = User.objects.create_user(
#             email=data['email'],
#             first_name=data['first_name'],
#             username=data['email'],
#             password=make_password(data['password']),
#         )

#         serializer = UserSerializerWithToken(user, many=False)
#         return Response(serializer.data)
#     except:
#         message = {'detail': 'User with email: {data["email"]} already exists'}
#         return Response(message)

# @api_view(['POST'])
# def registerUser(request):
#     data = request.data
 
#     try:
#         user = User.objects.create_user(
#             email=data['email'],
#             first_name=data['first_name'],
#             last_name=data['last_name'],
#             password=data['password'],
#             username=data['first_name'] + data['last_name'],
#             is_active=True,
#             is_student=True,
#         )
#         serializer = UserSerializerWithToken(user, many=False)
#         # successMessage = "user Registered successfully!"
#         return Response(serializer.data)
#     except Exception as e:
#         message = {'detail': f'User with email: {data["email"]} already exists'}
#         # return Response(message, status=status.HTTP_400_BAD_REQUEST)
#         return Response(message)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data 

    user.first_name = data['name']
    user.last_name = data['last_name']
    user.username = data['email']
    user.email = data['email']
    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
