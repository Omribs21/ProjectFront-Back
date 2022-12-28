# Generated by Django 3.2.16 on 2022-12-28 18:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0017_auto_20221228_2012'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orders_details',
            name='email',
        ),
        migrations.RemoveField(
            model_name='orders_details',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='orders_details',
            name='last_name',
        ),
        migrations.AddField(
            model_name='orders',
            name='FirstName',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='orders',
            name='LastName',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='orders',
            name='email',
            field=models.EmailField(default='', max_length=50),
        ),
    ]