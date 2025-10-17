from rest_framework import serializers
from .models import User, Group, Expense, Settlement


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'balance', 'created_at']
        read_only_fields = ['id', 'created_at']


class GroupSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    members = UserSerializer(many=True, read_only=True)
    member_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'created_by', 'members', 'member_ids', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']

    def create(self, validated_data):
        member_ids = validated_data.pop('member_ids', [])
        group = Group.objects.create(**validated_data)
        if member_ids:
            group.members.set(User.objects.filter(id__in=member_ids))
        return group


class ExpenseSerializer(serializers.ModelSerializer):
    paid_by = UserSerializer(read_only=True)
    split_between = UserSerializer(many=True, read_only=True)
    split_between_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Expense
        fields = ['id', 'description', 'amount', 'group', 'paid_by', 'split_between', 'split_between_ids', 'created_at', 'updated_at']
        read_only_fields = ['id', 'paid_by', 'created_at', 'updated_at']

    def create(self, validated_data):
        split_between_ids = validated_data.pop('split_between_ids', [])
        expense = Expense.objects.create(**validated_data)
        if split_between_ids:
            expense.split_between.set(User.objects.filter(id__in=split_between_ids))
        return expense


class SettlementSerializer(serializers.ModelSerializer):
    from_user = UserSerializer(read_only=True)
    to_user = UserSerializer(read_only=True)

    class Meta:
        model = Settlement
        fields = ['id', 'group', 'from_user', 'to_user', 'amount', 'settled', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
