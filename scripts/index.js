document.querySelectorAll('#page-content > section').forEach(node => {
    if (node.id !== 'home' && node.classList.contains('active-section')) node.classList.remove('active-section')
})

const typewriter = (element, text, finishedCallback, speed=120) => {
    const textArray = text.split('')
    let index = 0

    const typewriterInterval = window.setInterval(() => {
        element.textContent += textArray[index]
        index++
        if (index === textArray.length) { 
            clearInterval(typewriterInterval)
            finishedCallback()
        }
    }, speed)  
}

const typeWriterAll = () => {
    const toTypeNodes = document.querySelectorAll('.active-section .type-contents')

    toTypeNodes.forEach(node => node.hidden = true)
    let index = 0
    const typeNode = () => {
        if (index === toTypeNodes.length) return

        const node = toTypeNodes[index]
        const texttoType = node.textContent

        node.textContent = ''
        node.hidden = false

        index++
        typewriter(node, texttoType, typeNode, texttoType.length / 165)
    }

    typeNode()
}

const hashAndLinkedSection = {}

console.log(hashAndLinkedSection)

document.querySelectorAll('#page-content > section').forEach(node => hashAndLinkedSection[node.id] = node)

const updatePageContent = () => {
    const key = window.location.hash.substring(1)
    if (hashAndLinkedSection[key]) {
        document.querySelector('#page-content > section.active-section').classList.remove('active-section')
        hashAndLinkedSection[key].classList.add('active-section')
    } else {
        document.querySelector('#page-content > section.active-section').classList.remove('active-section')
        hashAndLinkedSection['404'].classList.add('active-section')
    }

}

window.addEventListener('hashchange', () => { 
    updatePageContent() 
    typeWriterAll()
})

window.addEventListener('load', () => {
    updatePageContent()
    typeWriterAll()
    document.getElementById('footer-year').textContent = new Date().getFullYear()
})

