# Generated by Django 4.0.3 on 2022-04-09 10:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0003_remove_reply_reply_post'),
    ]

    operations = [
        migrations.AddField(
            model_name='reply',
            name='reply_post',
            field=models.ForeignKey(
                default='', on_delete=django.db.models.deletion.CASCADE, related_name='threads', to='forum.post'),
        ),
        migrations.AlterField(
            model_name='reply',
            name='reply_content',
            field=models.CharField(default='', max_length=500),
        ),
        migrations.AlterField(
            model_name='reply',
            name='reply_user',
            field=models.CharField(default='anonymous', max_length=10),
        ),
    ]
