import React from 'react'
import { RiInboxFill, RiSendPlane2Line } from 'react-icons/ri'
import { MdOutlineInsertDriveFile } from 'react-icons/md'
import { FaRegTrashAlt } from 'react-icons/fa'
import { LuPencil } from 'react-icons/lu'

export function MailSidebar({ folder, onSetFolder, unreadCount, onCompose, collapsed }) {
    const folders = [
        { name: 'inbox', label: 'Inbox', icon: <RiInboxFill /> },
        { name: 'sent', label: 'Sent', icon: <RiSendPlane2Line /> },
        { name: 'draft', label: 'Draft', icon: <MdOutlineInsertDriveFile /> },
        { name: 'trash', label: 'Trash', icon: <FaRegTrashAlt /> },
    ]

    return (
        <aside className={`mail-sidebar ${collapsed ? 'collapsed' : ''}`}>
            <button className="compose-btn" onClick={onCompose} title="Compose">
                <span className="compose-icon" style={{ fontSize: '18px', display: 'flex' }}><LuPencil /></span>
                <span className="compose-label">Compose</span>
            </button>
            <nav className="folder-nav">
                {folders.map(f => (
                    <button
                        key={f.name}
                        className={`folder-item ${folder === f.name ? 'active' : ''}`}
                        onClick={() => onSetFolder(f.name)}
                        title={f.label}
                    >
                        <span className="folder-icon" style={{ fontSize: '18px', display: 'flex' }}>{f.icon}</span>
                        <span className="folder-label">{f.label}</span>
                        {f.name === 'inbox' && unreadCount > 0 && (
                            <span className="unread-badge">{unreadCount}</span>
                        )}
                    </button>
                ))}
            </nav>
        </aside>
    )
}
