from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import User, Group, Expense, Settlement
from .serializers import UserSerializer, GroupSerializer, ExpenseSerializer, SettlementSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        return Group.objects.filter(members=self.request.user)

    @action(detail=True, methods=['post'])
    def add_member(self, request, pk=None):
        group = self.get_object()
        user_id = request.data.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            group.members.add(user)
            return Response({'status': 'member added'})
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(paid_by=self.request.user)

    def get_queryset(self):
        return Expense.objects.filter(group__members=self.request.user)

    @action(detail=False, methods=['get'])
    def by_group(self, request):
        group_id = request.query_params.get('group_id')
        if not group_id:
            return Response({'error': 'group_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        expenses = Expense.objects.filter(group_id=group_id, group__members=self.request.user)
        serializer = self.get_serializer(expenses, many=True)
        return Response(serializer.data)


class SettlementViewSet(viewsets.ModelViewSet):
    queryset = Settlement.objects.all()
    serializer_class = SettlementSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Settlement.objects.filter(
            group__members=self.request.user
        )

    @action(detail=True, methods=['post'])
    def mark_settled(self, request, pk=None):
        settlement = self.get_object()
        settlement.settled = True
        settlement.save()
        return Response({'status': 'settlement marked as settled'})


# Endpoint di autenticazione
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """Registrazione nuovo utente"""
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    first_name = request.data.get('first_name', '')
    last_name = request.data.get('last_name', '')

    if not username or not email or not password:
        return Response({'error': 'Username, email e password sono richiesti'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username già esistente'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email già registrata'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name
    )

    return Response({
        'message': 'Utente registrato con successo',
        'user': UserSerializer(user).data
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """Login utente - accetta email o username"""
    username_or_email = request.data.get('username') or request.data.get('email')
    password = request.data.get('password')

    if not username_or_email or not password:
        return Response({'error': 'Email/Username e password sono richiesti'}, status=status.HTTP_400_BAD_REQUEST)

    # Prova a trovare l'utente per email
    user = None
    if '@' in username_or_email:
        # È un'email
        try:
            user_obj = User.objects.get(email=username_or_email)
            user = authenticate(username=user_obj.username, password=password)
        except User.DoesNotExist:
            pass
    else:
        # È uno username
        user = authenticate(username=username_or_email, password=password)

    if user is not None:
        login(request, user)
        return Response({
            'message': 'Login effettuato con successo',
            'user': UserSerializer(user).data
        })
    else:
        return Response({'error': 'Credenziali non valide'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    """Logout utente"""
    logout(request)
    return Response({'message': 'Logout effettuato con successo'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    """Ottieni utente corrente"""
    return Response(UserSerializer(request.user).data)


@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def csrf_token(request):
    """Endpoint per impostare il cookie CSRF (chiamare prima delle POST dal frontend)"""
    return Response({'message': 'CSRF cookie set'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_balance(request):
    """Aggiorna il saldo dell'utente loggato"""
    balance = request.data.get('balance')
    if balance is None:
        return Response({'error': 'Balance is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # convert to Decimal via serializer or float
        from decimal import Decimal
        bal = Decimal(str(balance))
    except Exception:
        return Response({'error': 'Invalid balance format'}, status=status.HTTP_400_BAD_REQUEST)

    user = request.user
    user.balance = bal
    user.save()
    return Response({'message': 'Balance updated', 'user': UserSerializer(user).data})
