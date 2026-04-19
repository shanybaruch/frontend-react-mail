import React, { useState, useEffect } from 'react'
import { MailSidebar } from '../cmps/MailSidebar'
import { MailList } from '../cmps/MailList'
import { mailService } from '../services/mail.service'

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [folder, setFolder] = useState('inbox')
    const [selectedIds, setSelectedIds] = useState([])
    const [searchTxt, setSearchTxt] = useState('')
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    useEffect(() => {
        loadMails()
    }, [folder])

    function loadMails() {
        mailService.query(folder).then(setMails)
    }

    function onSelect(id) {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        )
    }

    function onMailClick(mail) {
        if (!mail.isRead) {
            mailService.save({ ...mail, isRead: true }).then(loadMails)
        }
    }

    function onCompose() {
        const subject = prompt('Subject:')
        if (!subject) return
        const body = prompt('Message:')
        mailService.save({
            from: 'Me',
            subject,
            body: body || '',
            date: Date.now(),
            isRead: true,
            folder: 'sent',
        })
    }

    const filtered = mails.filter(m =>
        m.from.toLowerCase().includes(searchTxt.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchTxt.toLowerCase())
    )

    const unreadCount = mailService.getUnreadCount('inbox')

    return (
        <div className="mail-index">
            <header className="mail-header">
                <button className="hamburger-btn" onClick={() => setSidebarCollapsed(c => !c)}>☰</button>
                <div className="mail-logo">
                    <span className="logo-m">M</span>
                    <span className="logo-name">Mail</span>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search mail"
                        value={searchTxt}
                        onChange={e => setSearchTxt(e.target.value)}
                    />
                    <button className="search-filter-btn">⚙</button>
                </div>
                <button className="settings-btn">⚙</button>
            </header>

            <div className="mail-layout">
                <MailSidebar
                    folder={folder}
                    onSetFolder={setFolder}
                    unreadCount={unreadCount}
                    onCompose={onCompose}
                    collapsed={sidebarCollapsed}
                />
                <MailList
                    mails={filtered}
                    selectedIds={selectedIds}
                    onSelect={onSelect}
                    onMailClick={onMailClick}
                />
            </div>
        </div>
    )
}
