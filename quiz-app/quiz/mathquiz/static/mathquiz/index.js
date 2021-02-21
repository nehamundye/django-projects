
const questionId = document.querySelector('.question').dataset.id;
// console.log(questionId)
const options = document.querySelectorAll('.option')
const message = document.querySelector('#message')
const nextBtn = document.querySelector('#nextBtn')
const currentscore = document.querySelector('#currentscore')
const currentprogressbar = document.querySelector('.currentprogressbar')

// localStorage.setItem('score', 0)
// let score = 0
// If no score in localStorage, set it to 0
if (!localStorage.getItem('score')) {
    localStorage.setItem('score', 0);
}



options.forEach(option => {
    option.addEventListener('click', () => {
        // console.log(option.dataset.id)
        // console.log(`questionId: ${questionIdn}`)

        option_number = option.dataset.id
        // console.log(`optionId: ${option}`)

        // nextBtn.classList.add('show-btn');
        // console.log(nextBtn)
        nextBtn.style.display = 'inline'


        // currentprogressbar.setAttribute('id', 'play-animation')
        

        let score = localStorage.getItem('score');

        // check if for questionId, if option selected is correct or not.
        // If option selected is correct, then change option background color to green
        
        fetch(`/${questionId}/${option_number}`)
        .then(response => response.json())
        .then(answer => {
            // console.log(answer.isCorrect)
            // console.log(`correctAnswer is: ${answer.correctAnswer}`)

            if (answer.isCorrect === 'true') {
                // console.log("correct")
                option.style.backgroundColor = 'green'
                message.innerHTML = "Well Done! &#128512;"
                message.style.color = 'green'

                

                score++;
                localStorage.setItem('score', score);
                // console.log(`Score is: ${score}`)
                currentscore.innerHTML = `${score}`

                

                // console.log(options)

                options.forEach(option => {
                    option.classList.add('disableddivs');
                })

            // If option selected is incorrect
            } else {
                // console.log("incorrect")
                // If option selected is incorrect, then change option background color to red
                option.style.backgroundColor = 'red'
                option.style.backgroundColor = 'red'
                message.innerHTML = "Opps, the answer is incorrect. &#128577;"
                message.style.color = 'red'

                console.log(`Score is: ${score}`)
                currentscore.innerHTML = `${score}`

                // Disable all options/divs
                options.forEach(option => {
                    option.classList.add('disableddivs');
                })

                // Show the correct answer in green background
                options.forEach(option => {
                    if (option.dataset.id === answer.correctAnswer) {
                        option.style.backgroundColor = 'green'
                    }
                })
            }

        })
    })
});




document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('#message').innerHTML === 'Quiz Over') {

        let score = localStorage.getItem('score')
        // console.log(`End score: ${score}`)

        const div = document.createElement('div');
        div.className = 'finalscore';
        message.append(div)
        div.innerHTML = `Your Final Score: ${score}`

        localStorage.setItem('score', 0)

    }
})


let score = localStorage.getItem('score');
currentscore.innerHTML = `${score}`




