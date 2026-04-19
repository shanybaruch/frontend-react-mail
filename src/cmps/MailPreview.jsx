import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { mailService } from '../services/mail.service'

export function MailPreview({ mail, isSelected, onSelect, onClick, onDelete }) {
    return (
        <li
            className={`mail-preview ${mail.isRead ? 'read' : 'unread'} ${isSelected ? 'selected' : ''}`}
            onClick={() => onClick(mail)}
        >
            <input
                type="checkbox"
                className="mail-checkbox"
                checked={isSelected}
                onChange={e => { e.stopPropagation(); onSelect(mail.id) }}
                onClick={e => e.stopPropagation()}
            />
            <span className="mail-from">{mail.from}</span>
            <span className="mail-content">
                <span className="mail-subject">{mail.subject}</span>
                <span className="mail-body-preview"> &nbsp; {mail.body}</span>
            </span>
            <span className="mail-date">{mailService.formatDate(mail.date)}</span>
            <button
                className="mail-delete-btn"
                title="Delete"
                onClick={e => { e.stopPropagation(); onDelete(mail) }}
            >
                <FaRegTrashAlt />
            </button>
        </li>
    )
}
