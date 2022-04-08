from django.db import models


class Post(models.Model):
    # add user image after login

    # auth... User
    # change to foriengnkey to User after
    Post_author = models.CharField(max_length=30, default="anonymous")
    # Post_classification = (
    #     ("Math", "數學"), ("English", "英文"), ("Physical", "物理"))
    Post_title = models.CharField(max_length=30)
    Post_content = models.CharField(max_length=1000)
    Post_created_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.Post_title

# null = true allow null if empty, blank = true can be set as empty
# model.CASCADE if delete the primarykey, it would delete the foreignkey,too.


class Reply(models.Model):
    # change to foriengnkey to user after
    reply_user = models.CharField(max_length=10)
    # add user image after login
    post = models.ForeignKey(Post, blank=True, on_delete=models.CASCADE)
    reply_content = models.CharField(max_length=500)

    def __str__(self):
        return self.forum
