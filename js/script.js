let timer;
let isRunning = false;
let timeRemaining = 25 * 60; // 25 minutes en secondes

const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");
const resetButton = document.getElementById("reset-btn"); // Référence du bouton de réinitialisation

const pomodoroDuration = 25 * 60; // 25 minutes en secondes
const shortBreakDuration = 5 * 60; // 5 minutes en secondes
const longBreakDuration = 15 * 60; // 15 minutes en secondes

let timerLength = pomodoroDuration; // Temps par défaut

function startTimer() {
    if (isRunning) return; // Ne pas démarrer si déjà en cours
    isRunning = true;

    // Changer l'état des boutons
    startButton.style.display = "none"; // Masquer le bouton START
    stopButton.style.display = "inline"; // Afficher le bouton PAUSE

    timer = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timer);
            isRunning = false;
            alert("Temps écoulé !");
            resetTimer(); // Remise à zéro après la fin du compte à rebours
            stopButton.style.display = "none"; // Masquer le bouton PAUSE
            startButton.style.display = "inline"; // Afficher le bouton START
            return;
        }

        timeRemaining--;
        updateDisplay();
    }, 1000);
    //timeRemaining = timerLength; // Utiliser la durée sélectionnée lorsque le timer démarre
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;

    stopButton.style.display = "none"; // Masquer le bouton PAUSE
    startButton.style.display = "inline"; // Afficher le bouton START
}

function resetTimer() {
    clearInterval(timer); // Arrêtez le timer s'il est en cours
    isRunning = false; // Mettez à jour l'état pour refléter que le timer n'est pas en cours
    timeRemaining = timerLength; //25 * 60; // Remise à zéro
    updateDisplay();

    // Assurez-vous que START est visible si le timer est arrêté
    startButton.style.display = "inline";
    stopButton.style.display = "none"; // Masquer le bouton PAUSE
}

function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Événements pour les boutons
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer); // Événement pour le bouton de réinitialisation

// Initialiser l'affichage
updateDisplay();

// Configuration initiale des boutons
stopButton.style.display = "none"; // Masquer le bouton PAUSE

//----------------------------------------------les taches----------------------------
// Références pour la gestion des tâches
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const resetTasksButton = document.getElementById('reset-tasks-btn');

// Fonction pour ajouter une tâche
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        // Créer un bouton pour supprimer la tâche
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.classList.add('task-button');

        // Ajouter un événement de clic pour le bouton de suppression
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Empêche la propagation de l'événement au parent
            taskList.removeChild(li); // Supprime la tâche
        });

        // Ajout d'un événement cliquant sur la tâche
        li.addEventListener('click', () => {
            li.classList.toggle('completed'); // Marquer la tâche comme terminée
        });

        li.appendChild(deleteButton); // Ajoute le bouton de suppression à l'élément de la tâche
        taskList.appendChild(li); // Ajoute la tâche à la liste
        taskInput.value = ''; // Réinitialiser le champ de saisie
    }
});

// Fonction pour réinitialiser toutes les tâches
resetTasksButton.addEventListener('click', () => {
    taskList.innerHTML = ''; // Supprime toutes les tâches
});
//--------------------------------------Événements pour les boutons---------------------------------
document.getElementById("pomodoro-btn").addEventListener("click", () => {
    timerLength = pomodoroDuration;
    resetTimer();
    document.querySelector('.container-timer').classList.remove('bg-short-break', 'bg-long-break');
});

document.getElementById("short-break-btn").addEventListener("click", () => {
    timerLength = shortBreakDuration;
    resetTimer();
    document.querySelector('.container-timer').classList.add('bg-short-break');
    document.querySelector('.container-timer').classList.remove('bg-long-break');
});

document.getElementById("long-break-btn").addEventListener("click", () => {
    timerLength = longBreakDuration;
    resetTimer();
    document.querySelector('.container-timer').classList.add('bg-long-break');
    document.querySelector('.container-timer').classList.remove('bg-short-break');
});

// Lors de la réinitialisation, s'assurer que l'affichage est correct
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeRemaining = timerLength; // Réinitialiser à la longueur du timer sélectionné
    updateDisplay();
    // Assurez-vous que START est visible si le timer est arrêté
    startButton.style.display = "inline";
    stopButton.style.display = "none"; // Masquer le bouton PAUSE
}