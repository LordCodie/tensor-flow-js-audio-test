const speechFunc = async () => {
    // When calling `create()`, you must provide the type of the audio input.
    const recognizer = speechCommands.create('BROWSER_FFT')

    // Make sure that the underlying model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded()

    // const words = recognizer.wordLabels()

    // See the array of words that the recognizer is trained to recognize.
    // console.log("array of words:", words)

        const spectrogram = {
            includeSpectrogram: true,
            probabilityThreshold: 0.75
        }

        await recognizer.listen(spectrogram)
        
        setTimeout(() => {
            recognizer.stopListening()
            console.log('stopping')
        }, 15)

    // listenToSpeech()
}

export default speechFunc

