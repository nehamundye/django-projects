from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from plotly.offline import plot
from plotly.graph_objs import Scatter


# Create your views here.
def index(request):
    return render(request, "getimagesInfinityScroll/index.html")