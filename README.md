# MisterEmail

A Gmail-inspired email client built with React + Vite.

## Quick Start

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── assets/styles/cmps/mail/   # Mail app CSS
├── cmps/
│   ├── MailSidebar.jsx        # Folder navigation sidebar
│   ├── MailList.jsx           # Email list
│   ├── MailPreview.jsx        # Single email row
│   ├── MailDetails.jsx        # Full email view
│   └── ComposeModal.jsx       # New message dialog
├── pages/
│   └── MailIndex.jsx          # Main app page
├── services/
│   └── mail.service.js        # Data layer (localStorage)
public/img/
│   ├── mail-logo.png          # App logo (navbar + favicon)
│   └── mail-logo2.png         # Secondary logo asset
```

## Features

### Layout
- Fixed header with hamburger menu, logo, search bar, and settings icon
- Collapsible sidebar — toggle between full (icon + label) and icon-only mode with a smooth transition
- Email list panel that replaces with a detail view on click

### Sidebar
- Folders: Inbox, Sent, Draft, Trash — each with a react-icons icon
- Unread count badge on Inbox
- Compose button opens the compose modal

### Email List
- Unread mails shown in **bold** with white background
- Read mails shown in regular weight with gray background
- Hover shows a border outline and a trash delete button
- Checkboxes for multi-select; bulk delete toolbar appears when mails are selected

### Email Detail View
- Back arrow (`IoArrowBackOutline`) and delete button in the toolbar
- Shows sender avatar (initial letter), sender name, date, and full message body
- Opening an unread mail marks it as read automatically

### Compose Modal
- Opens in the bottom-right corner (Gmail style)
- Fields: To, Subject, free-text body
- Send button saves to the Sent folder
- Close button or overlay click dismisses it

### Delete
- Single delete from list row (hover to reveal trash icon)
- Single delete from detail view toolbar
- Bulk delete via the selection toolbar
- Moves to Trash; deleting from Trash removes permanently

### Search
- Search icon (`IoSearchOutline`) on the left of the search bar
- Filters mails in real time by sender or subject

### Persistence
- All changes (read status, deletes, sent mails) are saved to `localStorage` and survive page refresh
- First load seeds default mails; subsequent loads read from storage

## Icons (react-icons)

| Location | Icon |
|---|---|
| Hamburger menu | `MdOutlineMenu` |
| Search | `IoSearchOutline` |
| Settings | `IoSettingsOutline` |
| Compose | `LuPencil` |
| Inbox | `RiInboxFill` |
| Sent | `RiSendPlane2Line` |
| Draft | `MdOutlineInsertDriveFile` |
| Trash | `FaRegTrashAlt` |
| Back arrow | `IoArrowBackOutline` |
| Compose close | `IoClose` |

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run preview` — Preview production build
