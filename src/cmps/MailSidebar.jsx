import React from 'react'

export function MailSidebar({ folder, onSetFolder, unreadCount, onCompose, collapsed }) {
    const folders = [
        { name: 'inbox', label: 'Inbox', icon: '📥' },
        { name: 'sent', label: 'Sent', icon: '📤' },
        { name: 'draft', label: 'Draft', icon: '📝' },
        { name: 'trash', label: 'Trash', icon: '🗑️' },
    ]

    return (
        <aside className={`mail-sidebar ${collapsed ? 'collapsed' : ''}`}>
            <button className="compose-btn" onClick={onCompose} title="Compose">
                <span className="compose-icon">✏</span>
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
                        <span className="folder-icon">{f.icon}</span>
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
