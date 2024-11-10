"use client";
import React from 'react'
import { Button } from '~/components/ui/button'
import KanbanTable from './kanban'
import { DataTable } from './data-table'
import { columns } from './columns';

const DATA = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "a@example.com",
    },
]

function Dashboard() {
    const [view, setView] = React.useState("none");

    return (
        <>
            <div className="mt-3">
                <Button variant={"outline"} className="rounded-r-none" onClick={() => setView("kanban")}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-kanban"><path d="M6 5v11" /><path d="M12 5v6" /><path d="M18 5v14" /></svg> <span>Kanban</span></Button>
                <Button variant={"outline"} className="rounded-l-none rounded-r-none" onClick={() => setView("list")}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-table"><path d="M12 3v18" /><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" /></svg> <span>List View</span></Button>
                <Button variant={"outline"} className="rounded-l-none" onClick={() => setView("table")}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-table-of-contents"><path d="M16 12H3" /><path d="M16 18H3" /><path d="M16 6H3" /><path d="M21 12h.01" /><path d="M21 18h.01" /><path d="M21 6h.01" /></svg> <span>Table</span></Button>
            </div>
            <div>
                <div className="flex gap-3 mb-6">
                    {view === "kanban" && <KanbanTable />}
                    {view === "list" && <DataTable columns={columns} data={DATA} />}
                    {view === "table" && <p>No se seleccionó ningún componente</p>}
                    {view === "none" && <p>No se seleccionó ningún componente</p>}
                </div>
            </div>
        </>
    )
}

export default Dashboard