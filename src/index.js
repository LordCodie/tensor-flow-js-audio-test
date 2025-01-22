import { listenInput, stopInput } from "./_lib/speechCommands.js";

let audioContext;
let source;
let stream;

async function startAudioCapture() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        audioContext = new (window.AudioContext || window.webkitAudioContext)()
        source = audioContext.createMediaStreamSource(stream)
        console.log("Microphone access granted!")
        document.getElementById("status").innerText = "🎙️ Microphone is capturing audio..."
        return {stream, audioContext, source}
    } catch (error) {
        console.error("Error accessing microphone:", error)
        document.getElementById("status").innerText = "❌ Error accessing microphone."
    }
} 

function stopAudioCapture() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop())
        audioContext.close()
        document.getElementById("status").innerText = "⏹️ Audio capture stopped."
        console.log("Microphone access stopped.")
    }
}

document.getElementById("startBtn").addEventListener("click", async () => {
    listenInput()
    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;
})

document.getElementById("stopBtn").addEventListener("click", () => {
    stopInput()
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
})