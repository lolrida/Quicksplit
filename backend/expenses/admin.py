from django.contrib import admin
from .models import User, Group, Expense, Settlement


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'created_at']
    search_fields = ['username', 'email', 'first_name', 'last_name']


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_by', 'created_at']
    search_fields = ['name']
    filter_horizontal = ['members']


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ['description', 'amount', 'group', 'paid_by', 'created_at']
    search_fields = ['description']
    list_filter = ['group', 'created_at']
    filter_horizontal = ['split_between']


@admin.register(Settlement)
class SettlementAdmin(admin.ModelAdmin):
    list_display = ['from_user', 'to_user', 'amount', 'group', 'settled', 'created_at']
    list_filter = ['settled', 'group', 'created_at']
    search_fields = ['from_user__username', 'to_user__username']
