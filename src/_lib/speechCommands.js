// When calling `create()`, you must provide the type of the audio input.
const recognizer = speechCommands.create('BROWSER_FFT')

// Make sure that the underlying model and metadata are loaded via HTTPS requests.
await recognizer.ensureModelLoaded()

// See the array of words that the recognizer is trained to recognize.
const words = recognizer.wordLabels()
// console.log("array of words:", words)

const listenInput = async () => {
    try {
        await recognizer.listen(result => {
            const scores = result.scores;
            const maxIndex = scores.indexOf(Math.max(...scores))

            console.log("result", result)
            document.getElementById("result").innerText = `🎤 Detected: ${JSON.stringify(result, null, 2)}`
            document.getElementById("status").innerText = `🎤 Detected: ${words[maxIndex]}`
        }, {
            includeSpectrogram: true,
            probabilityThreshold: 0.75
        })
        console.log('listening...')
    } catch (error) {
        console.log(error)
    }
}

const stopInput = async () => {
    try {
        await recognizer.stopListening()
        document.getElementById("status").innerText = "⏹️ Audio capture stopped."
        console.log('stopping')
    } catch (error) {
        console.log(error)
    }
}

export { listenInput, stopInput }

