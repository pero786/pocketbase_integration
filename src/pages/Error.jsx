export default function Error() {
    return (
      <div class="min-h-screen flex items-center justify-center bg-grey-100 text-red-500">
        <div class="text-center p-8 border-4 border-red-700 rounded-xl shadow-lg glitch">
          <div class="text-8xl mb-4 animate-pulse">
            ☠️
          </div>
  
          <h1 class="text-5xl font-extrabold tracking-wide mb-2 glitch">
            FATAL ERROR
          </h1>
  
          <p class="text-lg mb-6 glitch">
            💀 Nešto je pošlo po zlu...  
            <br />  
            Bježi dok još možeš!
          </p>
  
          <a
            href="/"
            class="inline-block bg-red-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-red-900 transition duration-300 animate-pulse"
          >
            🏃‍♂️ Trči na početnu!
          </a>
        </div>
  
        <style>
          {`
            .glitch {
              position: relative;
              color: #ff0000;
              animation: glitch 1s infinite;
            }
  
            @keyframes glitch {
              0% { transform: translate(0); }
              20% { transform: translate(-2px, 2px); }
              40% { transform: translate(-2px, -2px); }
              60% { transform: translate(2px, 2px); }
              80% { transform: translate(2px, -2px); }
              100% { transform: translate(0); }
            }
          `}
        </style>
      </div>
    );
  }
  