"use client";

import { useState } from "react";
import { DndContext, type DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "~/lib/utils";

function KanbanTable() {
  const [items, setItems] = useState([
    { id: "1", title: "🤝Gather feedback", category: "Applications Sent", info: "lorem ipsime dolore casium derium..." },
    { id: "2", title: "📋Prepare report", category: "Applications Sent", info: "lorem ipsime dolore casium derium dolore epsum..." },
    { id: "3", title: "✅Attend interview", category: "Interviews", info: "lorem ipsime dolore casium derium diol areum sebata..."  },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (over && over.id !== active.id) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === active.id
            ? { ...item, category: String(over.id) } // Asegurarse de que 'category' sea una cadena
            : item
        )
      );
    }
  };


  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="mt-6 flex gap-3 mb-6">
        {/* Sección de 'Applications Sent' */}
        <KanbanColumn id="Applications Sent" title="Applications Sent" items={items} bgColor="bg-[#b3d0ff]" borderColor="  border-[#045be6]" textColor="text-[#045be6]"/>

        {/* Sección de 'Interviews' */}
        <KanbanColumn id="Interviews" title="Interviews" items={items}  bgColor="bg-[#ffffbe]" borderColor="border-[#e7e781]" textColor="text-[#e7e781]" />


        <KanbanColumn id="Offers Received" title="Offers Received" items={items}  bgColor="bg-[#c2efc2]" borderColor="border-[#64da64]" textColor="text-[#64da64]" />


        <KanbanColumn id="Declined" title="Declined" items={items} bgColor="bg-[#ffc3c3]" borderColor="border-[#ff3535]" textColor="text-[#ff3535]" />
      </div>
    </DndContext>
  );
}

// Componente para manejar las columnas
function KanbanColumn({ id, title, items, bgColor, borderColor, textColor }: { id: string, title: string, items: any[], bgColor: string, borderColor: string, textColor: string }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <section ref={setNodeRef} className="flex flex-col gap-2 w-40">
      <div className="flex gap-2">
        <div className={cn("border border-[#045be6] text-[#045be6] bg-[#b3d0ff] rounded-md text-[10px] p-1 font-bold", bgColor, borderColor, textColor)}>{title}</div>
        <div className="border border-[#cecece] rounded-full bg-white text-[10px] w-3 flex items-center justify-center font-bold">{items.filter(item => item.category === id).length}</div>
      </div>
      {items
        .filter((item) => item.category === id)
        .map((item) => (
          <DraggableItem key={item.id} id={item.id} title={item.title} info={item.info} />
        ))}
    </section>
  );
}

// Componente para manejar los items arrastrables
function DraggableItem({ id, title, info }: { id: string, title: string, info: string }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
  });

  return (
    <article ref={setNodeRef}
      {...listeners}
      {...attributes} className="border border-[#cecece] bg-white p-2 rounded-sm max-w-40 cursor-pointer">
      <h1 className="font-bold text-sm">{title}</h1>
      <p className="text-[10px] text-[#9f9c9c] py-2">{info}</p>
      {/* <div className="mt-2 flex items-center gap-1 justify-end relative">
        <div className="flex absolute left-0">
          <div className="relative flex items-center">
            <div className="border border-white bg-[#cecece] rounded-full h-5 w-5 absolute left-0"></div>
            <div className="border border-white bg-[#cecece] rounded-full h-5 w-5 absolute left-3"></div>
            <div className="border border-white bg-[#cecece] rounded-full h-5 w-5 absolute left-6"></div>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-square-text"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M13 8H7" /><path d="M17 12H7" /></svg>
        <span className="text-[10px]">2</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-layout-list"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /><path d="M14 4h7" /><path d="M14 9h7" /><path d="M14 15h7" /><path d="M14 20h7" /></svg>
        <span className="text-[10px]">0/2</span>
      </div> */}
    </article>
  );
}

export default KanbanTable;
