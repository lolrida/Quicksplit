from django.test import TestCase

from rest_framework.test import APITestCase
from django.urls import reverse
from .models import User


class UpdateBalanceAPITest(APITestCase):
	def setUp(self):
		self.user = User.objects.create_user(username='testbal', email='testbal@example.com', password='testpass')

	def test_update_balance(self):
		# get csrf cookie
		self.client.get(reverse('csrf-token'))
		# login
		login_resp = self.client.post(reverse('login'), {'email': 'testbal@example.com', 'password': 'testpass'}, format='json')
		self.assertEqual(login_resp.status_code, 200)

		# update balance
		resp = self.client.post(reverse('update-balance'), {'balance': '50.25'}, format='json')
		self.assertEqual(resp.status_code, 200)
		self.user.refresh_from_db()
		self.assertEqual(str(self.user.balance), '50.25')


