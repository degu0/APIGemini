const API_KEY = "AIzaSyBXztqftAhan-_KLb2_7k7opFeIqMup1m8";
const MODEL = "gemini-1.5-flash";

async function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  if (!userInput.trim()) return;

  appendMessage("Você", userInput);
  document.getElementById("userInput").value = "";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userInput }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const geminiResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "Sem resposta válida.";
    appendMessage("Gemini", geminiResponse);
  } catch (error) {
    appendMessage("Erro", "Ocorreu um erro: " + error.message);
  }
}

function appendMessage(sender, message) {
  const chatbox = document.getElementById("chatbox");
  if (sender === "Você") {
    chatbox.innerHTML += 
    `<div class='flex flex-row-reverse'>
        <p class="flex w-fit max-w-[80%] gap-1 bg-zinc-500 border-none rounded-lg rounded-tr-none p-3 shadow-md text-zinc-100">
            ${message}
        </p>
    </div>`;
  } else {
    chatbox.innerHTML +=     
    `<div class='flex'>
        <span class='mr-5 text-white'>
            <strong>${sender}:</strong>
        </span>
        <p class="flex w-fit max-w-[80%] gap-1 border-none p-3 text-white">
            ${message}
        </p>
    </div>`;
  }

  chatbox.scrollTop = chatbox.scrollHeight;
}

document.getElementById("userInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
