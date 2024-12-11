"use client";
import React from 'react'
import { Button } from '~/components/ui/button'
import KanbanTable from './kanban'
import { DataTable } from './data-table'
import { columns } from './columns';

const DATA = [
    {
        id: "728ed52f",
        link: "https://holohire.zohorecruit.com",
        status: "Interviews",
        company: "✅Bosch",
    },
    {
        id: "728ed52f",
        link: "https://boards.greenhouse.io",
        status: "Applications Sent",
        company: "📋Oracle",
    },
    {
        id: "728ed52f",
        link: "https://fa-ewfi-saasfaprod1.fa.ocs.oraclecloud.com",
        status: "Applications Sent",
        company: "🤝Microsoft",
    },
]

function Dashboard() {
    const [view, setView] = React.useState("kanban");

    return (
        <>
            <div className="mt-3">
                <Button variant={"outline"} className="rounded-r-none" onClick={() => setView("kanban")}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-kanban"><path d="M6 5v11" /><path d="M12 5v6" /><path d="M18 5v14" /></svg> <span>Kanban</span></Button>
                {/* <Button variant={"outline"} className="rounded-l-none" onClick={() => setView("table")}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-table-of-contents"><path d="M16 12H3" /><path d="M16 18H3" /><path d="M16 6H3" /><path d="M21 12h.01" /><path d="M21 18h.01" /><path d="M21 6h.01" /></svg> <span>Table</span></Button> */}
                <Button variant={"outline"} className="rounded-l-none" onClick={() => setView("list")}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-table"><path d="M12 3v18" /><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" /></svg> <span>List View</span></Button>
            </div>
            <div>
                <div className="flex gap-3 mb-6">
                    {view === "kanban" && <KanbanTable />}
                    {view === "list" && <DataTable columns={columns} data={DATA} />}
                </div>
            </div>
        </>
    )
}

export default Dashboard