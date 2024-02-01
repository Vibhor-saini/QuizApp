    const questions = [
    {
      question: 'Javascript is an _______ language?',
      options: ['A. Object-Oriented ', 'B. Object-Based', 'C. Procedural', 'D. None of the above'],
      correctAnswer: 0,
    },
    {
      question: ' Which of the following keywords is used to define a variable in Javascript?',
      options: ['A. var', 'B. let', 'C. Both A and B', 'C. None of the above'],
      correctAnswer: 2,
    },
    {
      question: ' Which of the following methods is used to access HTML elements using Javascript?',
      options: ['A. getElementById()', 'B. getElementByClassName()', 'C. Both A snd B', 'D. None of the above'],
      correctAnswer: 2,
    },
    {
      question: ' Which of the following methods can be used to display data in some form using Javascript?',
      options: ['A. document.write()', 'B. console.log()', 'C. Window.alert()', 'D. All of the above'],
      correctAnswer: 3,
    },
    {
      question: ' How can a datatype be declared to be a constant type?',
      options: ['A. const', 'B. var', 'C. let', 'D. constant'],
      correctAnswer: 0,
    },
    {
      question: ' When an operator’s value is NULL, the typeof returned by the unary operator is:',
      options: ['A. Boolean', 'B. Undefined', 'C. Object', 'D. integer'],
      correctAnswer: 2,
    },
    {
      question: ' What keyword is used to check whether a given property is valid or not?',
      options: ['A. in', 'B. is in', 'C. exist', 'D. lies'],
      correctAnswer: 0
    },
    {
      question: ' What does the Javascript “debugger” statement do?',
      options: ['A. it will debug all the errors in the program at runtime.', 'B. it acts as a breakpoint in a program', 'C. it will debug error in the current statement if any. ', 'D. All of the above'],
      correctAnswer: 1
    },
    {
      question: ' Which function is used to serialize an object into a JSON string in Javascript?',
      options: ['A. stringify', 'B. parse()', 'C. convert()', 'D. None of the above'],
      correctAnswer: 0
    },
    {
      question: ' Which of the following are closures in Javascript?',
      options: ['A. Variables', 'B. Functions', 'C. Objects', 'D. All of the above'],
      correctAnswer: 3
    },
  ];

  let userName = '';
  let currentQuestion = 0;
  let userAnswers = Array(questions.length).fill(null);
  let score = 0;
  let timer;

  function showStartTestPage() {
    document.getElementById('rulesPage').style.display = 'none';
    document.getElementById('startTestPage').style.display = 'block';
  }

  function startTest() {
    userName = document.getElementById('userName').value;

    // Validate name field
    if (!userName.trim()) {
      alert('Please enter your name before starting the test.');
      return;
    }

    document.getElementById('startTestPage').style.display = 'none';
    document.getElementById('questionPage').style.display = 'block';
    displayQuestion();
  }

  function displayQuestion() {
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const timerDisplay = document.getElementById('timer');
    const currentQuestionData = questions[currentQuestion];

    let secondsLeft = 10;
    timerDisplay.innerText = `${secondsLeft}s`;

    // Clear existing timer
    if (timer) {
      clearInterval(timer);
    }

    timer = setInterval(() => {
      secondsLeft--;
      timerDisplay.innerText = `${secondsLeft}s`;

      if (secondsLeft === 0) {
        clearInterval(timer);
        nextQuestion(); // Automatically move to the next question when the timer reaches 0
      }
    }, 1000);

    questionText.innerText = currentQuestionData.question;
    optionsContainer.innerHTML = '';

    currentQuestionData.options.forEach((option, index) => {
      const optionBtn = document.createElement('button');
      optionBtn.className = 'btn btn-light answer-btn';
      optionBtn.innerText = option;
      optionBtn.onclick = () => selectAnswer(index);
      optionsContainer.appendChild(optionBtn);
    });
  }

  function selectAnswer(answerIndex) {
    userAnswers[currentQuestion] = answerIndex;
    // Do not proceed to the next question automatically
  }

  function nextQuestion() {
    // Check if it's the last question and the timer has reached 0
    if (currentQuestion === questions.length - 1 && document.getElementById('timer').innerText === '0s') {
      submitTest(); // Automatically submit the test if it's the last question and the timer is 0
    } else if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      displayQuestion();
    }
  }
  
  function submitTest() {
    // Check if the test is already submitted
    if (document.getElementById('resultPage').style.display === 'block') {
      return;
    }
  
    // Clear the timer
    clearInterval(timer);
  
    // Calculate score
    score = userAnswers.reduce(
      (acc, answer, index) => (answer === questions[index].correctAnswer ? acc + 1 : acc),
      0
    );
  
    // Display result
    const resultText = document.getElementById('resultText');
    resultText.innerText = `${userName}, you got ${score} marks out of ${questions.length} marks! Keep practicing. `;
  
    document.getElementById('questionPage').style.display = 'none';
    document.getElementById('resultPage').style.display = 'block';
  }
  
  function submitTestButton() {
    // Display a confirmation alert
    const isConfirmed = confirm('Are you sure you want to submit the test?');
  
    if (isConfirmed) {
      submitTest();
    }
  }
  
  

  function tryAgain() {
    // Reset variables
    currentQuestion = 0;
    userAnswers = Array(questions.length).fill(null);
    score = 0;

    document.getElementById('resultPage').style.display = 'none';
    document.getElementById('questionPage').style.display = 'block';
    displayQuestion();
  }

  function checkAnswers() {
    const checkAnswersPage = document.getElementById('checkAnswersPage');
    checkAnswersPage.innerHTML = '<h3>Check Answers:</h3>';

    questions.forEach((question, index) => {
      const questionContainer = document.createElement('div');
      questionContainer.className = 'question-container';

      const questionText = document.createElement('p');
      questionText.innerText = `${index + 1}. ${question.question}`;
      questionContainer.appendChild(questionText);

      const optionsContainer = document.createElement('div');
      question.options.forEach((option, optionIndex) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'btn btn-light answer-btn';

        if (optionIndex === question.correctAnswer) {
          optionBtn.classList.add('btn-success'); // Green for correct answer
        } else if (userAnswers[index] === optionIndex) {
          optionBtn.classList.add('btn-danger'); // Red for selected wrong answer
        }

        optionBtn.innerText = option;
        optionsContainer.appendChild(optionBtn);
      });

      questionContainer.appendChild(optionsContainer);
      checkAnswersPage.appendChild(questionContainer);
    });

    // Add Close button
    const closeButton = document.createElement('button');
    closeButton.className = 'btn btn-danger close-btn';
    closeButton.innerText = 'Close';
    closeButton.onclick = closeCheckAnswers;
    checkAnswersPage.appendChild(closeButton);

    document.getElementById('resultPage').style.display = 'none';
    checkAnswersPage.style.display = 'block';
  }

  function closeCheckAnswers() {
    document.getElementById('checkAnswersPage').style.display = 'none';
    document.getElementById('rulesPage').style.display = 'block';
  }

  function exitTest() {
    document.getElementById('resultPage').style.display = 'none';
    location.reload(); // Reload the page
  }
