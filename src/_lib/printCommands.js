const saveTextFile = (filename, content) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = filename
    a.click()
    URL.revokeObjectURL(a.href)
}

saveTextFile('array-of-words.txt', JSON.stringify(words, null, 2))