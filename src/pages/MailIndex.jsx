import React, { useState, useEffect } from 'react'
import { MdOutlineMenu, MdRefresh } from 'react-icons/md'
import { IoSearchOutline } from 'react-icons/io5'
import { IoSettingsOutline } from 'react-icons/io5'
import { FaRegTrashAlt } from 'react-icons/fa'
import { MailSidebar } from '../cmps/MailSidebar'
import { MailList } from '../cmps/MailList'
import { MailDetails } from '../cmps/MailDetails'
import { ComposeModal } from '../cmps/ComposeModal'
import { mailService } from '../services/mail.service'

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [folder, setFolder] = useState('inbox')
    const [selectedIds, setSelectedIds] = useState([])
    const [searchTxt, setSearchTxt] = useState('')
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [openMail, setOpenMail] = useState(null)
    const [composing, setComposing] = useState(false)

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
            mailService.save({ ...mail, isRead: true }).then(() => {
                loadMails()
                setOpenMail({ ...mail, isRead: true })
            })
        } else {
            setOpenMail(mail)
        }
    }

    function onDelete(mail) {
        if (mail.folder === 'trash') {
            mailService.remove(mail.id).then(loadMails)
        } else {
            mailService.save({ ...mail, folder: 'trash' }).then(loadMails)
        }
        setOpenMail(null)
    }

    function onDeleteSelected() {
        const selected = mails.filter(m => selectedIds.includes(m.id))
        Promise.all(
            selected.map(m =>
                m.folder === 'trash' ? mailService.remove(m.id) : mailService.save({ ...m, folder: 'trash' })
            )
        ).then(() => {
            setSelectedIds([])
            loadMails()
        })
    }

    function onBack() {
        setOpenMail(null)
    }

    function onSetFolder(f) {
        setFolder(f)
        setOpenMail(null)
    }

    function onCompose() {
        setComposing(true)
    }

    function onSend({ to, subject, body }) {
        mailService.save({
            from: 'Me',
            to,
            subject,
            body,
            date: Date.now(),
            isRead: true,
            folder: 'sent',
        }).then(loadMails)
    }

    const filtered = mails.filter(m =>
        m.from.toLowerCase().includes(searchTxt.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchTxt.toLowerCase())
    )

    const unreadCount = mailService.getUnreadCount('inbox')

    return (
        <div className="mail-index">
            <header className="mail-header">
                <button className="hamburger-btn" onClick={() => setSidebarCollapsed(c => !c)}><MdOutlineMenu /></button>
                <div className="mail-logo">
                    <img src="/img/mail-logo.png" alt="Mail logo" className="logo-img" />
                    <span className="logo-name">Mail</span>
                </div>
                <div className="search-bar">
                    <IoSearchOutline className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search mail"
                        value={searchTxt}
                        onChange={e => setSearchTxt(e.target.value)}
                    />
                    <button className="search-filter-btn">⚙</button>
                </div>
                <button className="settings-btn"><IoSettingsOutline /></button>
            </header>

            <div className="mail-layout">
                <MailSidebar
                    folder={folder}
                    onSetFolder={onSetFolder}
                    unreadCount={unreadCount}
                    onCompose={onCompose}
                    collapsed={sidebarCollapsed}
                />
                {openMail
                    ? <MailDetails mail={openMail} onBack={onBack} onDelete={onDelete} />
                    : <div className="mail-list-container">
                        <div className="mail-toolbar">
                            <button className="toolbar-btn" onClick={loadMails} title="Refresh">
                                <MdRefresh />
                            </button>
                        </div>
                        {selectedIds.length > 0 && (
                            <div className="bulk-toolbar">
                                <span className="bulk-count">{selectedIds.length} selected</span>
                                <button className="bulk-delete-btn" onClick={onDeleteSelected}>
                                    <FaRegTrashAlt /> Delete
                                </button>
                            </div>
                        )}
                        <MailList
                            mails={filtered}
                            selectedIds={selectedIds}
                            onSelect={onSelect}
                            onMailClick={onMailClick}
                            onDelete={onDelete}
                        />
                    </div>
                }
            </div>

            {composing && (
                <ComposeModal onClose={() => setComposing(false)} onSend={onSend} />
            )}
        </div>
    )
}
