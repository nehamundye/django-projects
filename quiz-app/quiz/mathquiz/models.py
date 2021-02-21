from django.db import models

# Create your models here.
class Quiz(models.Model):
    question = models.CharField(max_length=500)
    option1 = models.CharField(max_length=500)
    option2 = models.CharField(max_length=500)
    option3 = models.CharField(max_length=500, blank=True)
    option4 = models.CharField(max_length=500, blank=True)
    answer = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.question}, {self.option1}, {self.option2}, {self.option3}, {self.option4}, {self.answer}"