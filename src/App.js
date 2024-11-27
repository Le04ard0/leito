import React, { useState, useEffect } from 'react';
import './App.css'; // Archivo de estilos

function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [audioStarted, setAudioStarted] = useState(false);

  const handleStartAudio = () => {
    const audio = document.getElementById('paw-patrol-audio');
    audio.play().catch((err) => console.error('Error al reproducir el audio:', err));
    setAudioStarted(true);
  };

  const eventDate = new Date('2024-12-22T15:00:00').getTime();

  useEffect(() => {
    const container = document.getElementById('star-container');
    const numberOfConfetti = 100;

    for (let i = 0; i < numberOfConfetti; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');

      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.top = `${-Math.random() * 20}vh`;

      const colors = ['#FF6347', '#FFD700', '#1E90FF', '#32CD32', '#FF69B4'];
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      const size = Math.random() * 5 + 5;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;

      confetti.style.animationDuration = `${Math.random() * 20 + 5}s`;

      container.appendChild(confetti);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <>
      {/* Audio de fondo */}
      <audio id="paw-patrol-audio" src={`${process.env.PUBLIC_URL}/audio.mp3`}loop />

      {/* Contenedor de estrellas */}
      <div id="star-container"></div>

      {/* Contenedor de invitación */}
      <div className="invitation-container">
        {/* Contador regresivo */}
        <div className="countdown">
          <h2>¡Faltan!</h2>
          <p>
            {timeLeft.days} días, {timeLeft.hours} horas, {timeLeft.minutes} minutos, {timeLeft.seconds} segundos
          </p>
        </div>

        <header className="invitation-header">
          <h2>¡Celebra conmigo mis 4 años !</h2>
          <h1>
            <p>Leonardo</p>
          </h1>
        </header>

        
        {/* Botón para iniciar el audio */}
        {!audioStarted && (
          <button onClick={handleStartAudio} className="start-audio-button">
            🔊 Escucha el audio
          </button>
        )}



        {/* Detalles del evento */}
        <div className="details">
          <img src={`${process.env.PUBLIC_URL}/paw.jpg`} alt="Paw Patrol" className="birthday-image" />
          

          <header className="revelacion">
          <h1 id='especial'>¡Ademas ese día será muy especial!</h1>
       
          <h2>
            <p id='atencion'>Mis papás y yo revelaremos si será niño o niña</p>
          </h2>
         
           <img src={`${process.env.PUBLIC_URL}/pies.png`} alt="pies" className="pies"/>
</header>


          <div className="event-info">
                   <p>📅 Fecha: 21 de diciembre de 2024</p>
            <p>🕒 Hora: 3:00 PM</p>
            <p>📍 Lugar: Simón Bolívar 1, barrio de San Juan, Zimatlán de Álvarez</p>
          </div>


        </div>
      </div>
    </>
  );
}

export default App;
