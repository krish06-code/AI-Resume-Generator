import React from 'react'
import './notfound.scss'
import { Link } from 'react-router'

const ICON = {
    file: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 13h6 M9 17h6" />,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
    award: <><circle cx="12" cy="8" r="6" /><path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
    chart: <><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" /></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9" /></>,
    star: <path d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8-6.2-3.7-6.2 3.7 1.6-6.8L2.2 8.9l6.9-.6z" />,
    zap: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
    book: <><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v16H6.5A2.5 2.5 0 0 0 4 20.5z" /><path d="M4 4.5v16" /></>,
    users: <><circle cx="9" cy="8" r="4" /><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" /><path d="M17 3.5a4 4 0 0 1 0 7.8M22 21v-2a4 4 0 0 0-3-3.8" /></>,
    trend: <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
    message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    shield: <path d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6z" />,
    bolt: <><circle cx="12" cy="12" r="9" /><path d="M9 8v8M15 8v8M9 12h6" /></>
}

const TILE_LAYOUT = [
    { column: 0, offset: 0, tiles: [ { icon: 'file', tone: 'pink' }, { icon: 'briefcase', tone: 'neutral' }, { icon: 'star', tone: 'green' } ] },
    { column: 1, offset: 48, tiles: [ { icon: 'target', tone: 'blue' }, { icon: 'award', tone: 'pink' } ] },
    { column: 2, offset: 96, tiles: [ { icon: 'zap', tone: 'amber' } ] },
    { column: 3, offset: 24, tiles: [ { icon: 'chart', tone: 'neutral' }, { icon: 'book', tone: 'pink' }, { icon: 'clock', tone: 'green' } ] },
    { column: 4, offset: 72, tiles: [ { icon: 'check', tone: 'blue' }, { icon: 'message', tone: 'amber' } ] },
    { column: 5, offset: 12, tiles: [ { icon: 'calendar', tone: 'neutral' }, { icon: 'trend', tone: 'pink' }, { icon: 'users', tone: 'green' } ] },
    { column: 6, offset: 60, tiles: [ { icon: 'mail', tone: 'blue' }, { icon: 'shield', tone: 'amber' } ] },
    { column: 7, offset: 20, tiles: [ { icon: 'bolt', tone: 'pink' }, { icon: 'target', tone: 'neutral' }, { icon: 'file', tone: 'green' } ] }
]

const IconTile = ({ icon, tone }) => (
    <span className={`notfound-tile notfound-tile--${tone}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {ICON[icon]}
        </svg>
    </span>
)

const NotFound = () => {
    return (
        <div className="notfound-page">
            <div className="notfound-cloud" aria-hidden="true">
                {TILE_LAYOUT.map((col) => (
                    <div key={col.column} className="notfound-cloud__column" style={{ marginTop: col.offset }}>
                        {col.tiles.map((tile, i) => (
                            <IconTile key={i} icon={tile.icon} tone={tile.tone} />
                        ))}
                    </div>
                ))}
            </div>

            <div className="notfound-content">
                <span className="notfound-code">404</span>
                <p>Oops — the page you’re looking for doesn’t exist.</p>
                <Link to="/" className="button primary-button">Go back home</Link>
            </div>
        </div>
    )
}

export default NotFound
