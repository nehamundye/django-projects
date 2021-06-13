from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
import json
from django.http import JsonResponse
import random
from .models import Quiz
from django.db.models import Avg, Max, Min, Sum


def index(request):
    list_of_quizids = Quiz.objects.order_by(
        'id').values_list('id', flat=True).distinct()
    total_questions = Quiz.objects.all().count()

    if "quizids" not in request.session:
        request.session["quizids"] = []
        first_random_number = random.choice(list_of_quizids)
        quiz = Quiz.objects.get(id=first_random_number)
        request.session["quizids"] += [first_random_number]
        print(request.session["quizids"])
        question_num = len(request.session["quizids"])
        return render(request, "mathquiz/index.html", {
            "quiz": quiz,
            "question_num": question_num
        })
    else:
        print("entered else clause")
        # remove used quizids
        list_to_remove = request.session["quizids"]
        available_quiz_ids = list(set(list_of_quizids) - set(list_to_remove))
        print("available_quiz_ids: ", available_quiz_ids)
        random_number = random.choice(available_quiz_ids)
        request.session["quizids"] += [random_number]
        print("request.session quizids", request.session["quizids"])
        question_num = len(request.session["quizids"])

        if not len(request.session["quizids"]) > 10:
            quiz = Quiz.objects.get(id=random_number)
            print("length: ", len(request.session["quizids"]))
            if len(request.session["quizids"]) == 10:
                return render(request, "mathquiz/index.html", {
                    "quiz": quiz,
                    "endButton": "endButton",
                    "question_num": question_num
                })
            return render(request, "mathquiz/index.html", {
                "quiz": quiz,
                "question_num": question_num
            })
        else:
            return render(request, "mathquiz/endquiz.html", {
                "quiz": "placeholder"
            })


def checkanswer(request, questionId, option_number):
    quiz = Quiz.objects.get(id=questionId)
    print(quiz.answer)
    print(option_number)
    if quiz.answer == option_number:
        return JsonResponse({"isCorrect": "true", "correctAnswer": quiz.answer})
    else:
        return JsonResponse({"isCorrect": "false", "correctAnswer": quiz.answer})


def replay(request):
    request.session["quizids"] = []
    return HttpResponseRedirect(reverse("mathquiz:index"))
