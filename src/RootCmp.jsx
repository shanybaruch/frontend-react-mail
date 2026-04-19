import React from 'react'
import { Routes, Route } from 'react-router'
import { MailIndex } from './pages/MailIndex'

export function RootCmp() {
    return (
        <div className="main-container">
            <Routes>
                <Route path="/*" element={<MailIndex />} />
            </Routes>
        </div>
    )
}
