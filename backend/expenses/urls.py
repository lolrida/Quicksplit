from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, GroupViewSet, ExpenseViewSet, SettlementViewSet,
    register_user, login_user, logout_user, current_user, csrf_token, update_balance
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'expenses', ExpenseViewSet)
router.register(r'settlements', SettlementViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', register_user, name='register'),
    path('auth/login/', login_user, name='login'),
    path('auth/csrf/', csrf_token, name='csrf-token'),
    path('auth/update-balance/', update_balance, name='update-balance'),
    path('auth/logout/', logout_user, name='logout'),
    path('auth/me/', current_user, name='current-user'),
]
