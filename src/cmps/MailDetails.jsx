import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { mailService } from '../services/mail.service'

export function MailDetails({ mail, onBack, onDelete }) {
    return (
        <div className="mail-details">
            <div className="mail-details-toolbar">
                <button className="back-btn" onClick={onBack} title="Back">←</button>
                <button className="detail-delete-btn" onClick={() => onDelete(mail)} title="Delete"><FaRegTrashAlt /></button>
            </div>

            <div className="mail-details-inner">
                <h2 className="mail-details-subject">{mail.subject}</h2>

                <div className="mail-details-meta">
                    <div className="mail-details-avatar">
                        {mail.from.charAt(0).toUpperCase()}
                    </div>
                    <div className="mail-details-from-block">
                        <span className="mail-details-from">{mail.from}</span>
                        <span className="mail-details-date">{mailService.formatDate(mail.date)}</span>
                    </div>
                </div>

                <div className="mail-details-body">
                    {mail.body}
                </div>
            </div>
        </div>
    )
}
