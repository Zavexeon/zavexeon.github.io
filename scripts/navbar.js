document.querySelectorAll('.navbar-start-hidden').forEach(node => node.hidden = true)

if (window.location.hash === '') { 
    window.location.hash = '#home'
    window.location.reload() 
}

const navbarElement = document.getElementById('main-navbar')
const navbarCommandElement = document.getElementById('navbar-command')
const navbarCommandTexts = document.querySelectorAll('.navbar-command-text')
const navbarLinksElement = document.getElementById('navbar-links')


const typeNavbar = () => {
    navbarCommandElement.hidden = true
    navbarLinksElement.hidden = true

    const displayedCommandText = [...navbarCommandTexts].filter(node => window.getComputedStyle(node, null).display !== 'none')[0]

    const navbarCommandText = displayedCommandText.innerText
    displayedCommandText.innerText = ''

    navbarCommandElement.hidden = false

    typewriter(displayedCommandText, navbarCommandText, () => {
        window.setTimeout(() => {
            navbarLinksElement.hidden = false
        }, 170)
    })
}

const hashAndLinkedLinks = {}
document.querySelectorAll('#main-navbar #navbar-links > ul > li > a').forEach(node => {
    const url = new URL(node.href)
    hashAndLinkedLinks[url.hash] = node.parentElement
})

const updateNavbarContent = () => {
    const activeLink = document.querySelector('#main-navbar #navbar-links > ul > li.active-link')
    if(activeLink) activeLink.classList.remove('active-link')

    if (hashAndLinkedLinks[window.location.hash]) {
        if(window.location.hash !== '#home') hashAndLinkedLinks[window.location.hash].classList.add('active-link')
        document.getElementById('current-location').innerText = window.location.hash.substring(1)
        document.title = `zave | ${window.location.hash.substring(1)}`
    } else {
        document.getElementById('current-location').innerText = '404'
        document.title = `zave | ${404}`
    }
    
    typeNavbar()
}

window.addEventListener('hashchange', () => { 
    if(navbarCommandElement.innerText.trim() !== 'navigate') window.location.reload()
    updateNavbarContent()
})

const cursorElement = document.getElementById('blinking-cursor')

window.setInterval(() => cursorElement.innerText = cursorElement.innerText === '▮' ? '▯' : '▮', 450)

window.addEventListener('load', () => {
    updateNavbarContent()
})