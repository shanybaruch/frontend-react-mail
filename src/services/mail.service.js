const MAILS = [
    { id: 'm1', from: 'Udemy', subject: 'udemy', body: 'hi! its udemy', date: new Date('2023-12-17').getTime(), isRead: true, folder: 'inbox' },
    { id: 'm2', from: 'Sapporo', subject: 'Best Jewelry', body: 'sale sale sale!!!', date: new Date('2024-06-08').getTime(), isRead: false, folder: 'inbox' },
    { id: 'm3', from: 'Jewelry', subject: 'My jewelrys...', body: 'welcome our family', date: new Date('2024-09-15').getTime(), isRead: true, folder: 'inbox' },
    { id: 'm4', from: 'RavKav', subject: 'ravkav Tel-Aviv', body: 'no much money in your card', date: new Date('2024-04-13').getTime(), isRead: true, folder: 'inbox' },
    { id: 'm5', from: 'Google', subject: 'Mail', body: 'We cannot to send message', date: new Date('2023-04-01').getTime(), isRead: false, folder: 'inbox' },
    { id: 'm6', from: 'Sdarot', subject: 'Welcome back!', body: 'You can see all our movies in free!', date: new Date('2024-09-22').getTime(), isRead: true, folder: 'inbox' },
    { id: 'm7', from: 'Movies', subject: 'Hello', body: 'Dont forget, new moveis uploaded', date: new Date('2024-11-13').getTime(), isRead: true, folder: 'inbox' },
    { id: 'm8', from: 'Titanic', subject: 'one thing', body: 'this was cerfully', date: new Date('2024-06-23').getTime(), isRead: false, folder: 'inbox' },
    { id: 'm9', from: 'You', subject: 'כעהח', body: 'כעהח', date: new Date('2025-10-19').getTime(), isRead: false, folder: 'inbox' },
    { id: 'm10', from: 'You', subject: 'לצפטל', body: 'לצפטל', date: new Date('2025-10-19').getTime(), isRead: false, folder: 'inbox' },
]

function formatDate(timestamp) {
    const date = new Date(timestamp)
    const now = new Date()
    const isThisYear = date.getFullYear() === now.getFullYear()
    const isToday = date.toDateString() === now.toDateString()
    if (isToday) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    if (isThisYear) return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    return date.toISOString().slice(0, 10)
}

export const mailService = {
    query,
    getById,
    save,
    remove,
    getUnreadCount,
    formatDate,
}

function query(folder = 'inbox') {
    return Promise.resolve([...MAILS].filter(m => m.folder === folder).sort((a, b) => b.date - a.date))
}

function getById(id) {
    return Promise.resolve(MAILS.find(m => m.id === id))
}

function save(mail) {
    if (mail.id) {
        const idx = MAILS.findIndex(m => m.id === mail.id)
        if (idx !== -1) MAILS[idx] = { ...MAILS[idx], ...mail }
    } else {
        mail.id = 'm' + Date.now()
        MAILS.push(mail)
    }
    return Promise.resolve(mail)
}

function remove(id) {
    const idx = MAILS.findIndex(m => m.id === id)
    if (idx !== -1) MAILS.splice(idx, 1)
    return Promise.resolve()
}

function getUnreadCount(folder = 'inbox') {
    return MAILS.filter(m => m.folder === folder && !m.isRead).length
}
