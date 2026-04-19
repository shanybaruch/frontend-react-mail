import React from 'react'
import { MailPreview } from './MailPreview'

export function MailList({ mails, selectedIds, onSelect, onMailClick }) {
    if (!mails.length) return <p className="mail-empty">No messages here.</p>

    return (
        <ul className="mail-list">
            {mails.map(mail => (
                <MailPreview
                    key={mail.id}
                    mail={mail}
                    isSelected={selectedIds.includes(mail.id)}
                    onSelect={onSelect}
                    onClick={onMailClick}
                />
            ))}
        </ul>
    )
}
