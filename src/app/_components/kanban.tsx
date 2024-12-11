"use client";

import { FormEvent, type FormEventHandler, useState } from "react";
import { DndContext, type DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "~/lib/utils";
import { Plus } from "lucide-react";
import JSConfetti from 'js-confetti'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";


function KanbanTable() {
  const [items, setItems] = useState([]);

  const addNewItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

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
        <KanbanColumn id="Applications Sent" title="Applications Sent" items={items} bgColor="bg-[#b3d0ff]" borderColor="  border-[#045be6]" textColor="text-[#045be6]" onAddNewItem={addNewItem} />

        {/* Sección de 'Interviews' */}
        <KanbanColumn id="Interviews" title="Interviews" items={items} bgColor="bg-[#ffffbe]" borderColor="border-[#e7e781]" textColor="text-[#e7e781]"/>


        <KanbanColumn id="Offers Received" title="Offers Received" items={items} bgColor="bg-[#c2efc2]" borderColor="border-[#64da64]" textColor="text-[#64da64]" />


        <KanbanColumn id="Declined" title="Declined" items={items} bgColor="bg-[#ffc3c3]" borderColor="border-[#ff3535]" textColor="text-[#ff3535]" />
      </div>
    </DndContext>
  );
}

// Componente para manejar las columnas
function KanbanColumn({ id, title, items, bgColor, borderColor, textColor, onAddNewItem }) {
  const { setNodeRef } = useDroppable({ id });
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleSelectChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    if (items.length >= 3) return

    const { elements } = e.currentTarget;

    const newItem = {
      id: crypto.randomUUID(), // Genera un ID único
      title: (elements.namedItem("title") as HTMLInputElement).value,
      description: (elements.namedItem("description") as HTMLInputElement).value,
      salary: (elements.namedItem("salary") as HTMLInputElement).value,
      link: (elements.namedItem("link") as HTMLInputElement).value,
      category: selectedStatus || id, // Usa el estado actual si no se selecciona uno
    };

    // Agrega el nuevo ítem al estado
    onAddNewItem(newItem);

    setIsDialogOpen(false);

    setTimeout(async () => {
      const jsConfetti = new JSConfetti();
      await jsConfetti.addConfetti();
    }, 300);
  };



  return (
    <section ref={setNodeRef} className="flex flex-col gap-2 w-40">
      <div className="flex gap-2">
        <div className={cn("border border-[#045be6] text-[#045be6] bg-[#b3d0ff] rounded-md text-[10px] p-1 font-bold", bgColor, borderColor, textColor)}>{title}</div>
        <div className="border border-[#cecece] rounded-full bg-white text-[10px] w-3 flex items-center justify-center font-bold">{items.filter(item => item.category === id).length}</div>
      </div>
      {items
        .filter((item) => item.category === id)
        .map((item) => (
          <DraggableItem key={item.id} id={item.id} title={item.title} info={item.description} />
        ))}
      {id === "Applications Sent" && items.length < 3 ? (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger onClick={() => setIsDialogOpen(true)} className="border-2 border-dashed border-[#cecece] flex justify-center items-center rounded-sm text-[#cecece] p-[2px] cursor-pointer hover:border-[#a4a4a4] hover:text-[#a4a4a4] transition-all ease-in duration-150">
            <Plus size={18}></Plus>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Job Offer</DialogTitle>
              <DialogDescription>
                Add job offer to job management tool
              </DialogDescription>
            </DialogHeader>
            <form action="" onSubmit={handleAddJob}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Job Title
                  </Label>
                  <Input
                    id="title"
                    defaultValue="Oracle"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    defaultValue="2+ years C++, Bachelor Degree..."
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Salary
                  </Label>
                  <Input
                    id="salary"
                    defaultValue="$400"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Link Offer
                  </Label>
                  <Input
                    id="link"
                    defaultValue="https://fa-ewfi-saasfaprod1.fa.ocs.oraclecloud.com"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Job Status
                  </Label>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="Applications Sent">Applications Sent</SelectItem>
                        <SelectItem value="Interviews">Interview</SelectItem>
                        <SelectItem value="Offers Received">Offers Received</SelectItem>
                        <SelectItem value="Declined">Declined</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Offer</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      ) : null}
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
      {/* <div className="mt-2 flex items-center gap-1 justify-end relative text-[#585656]">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-square-text"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M13 8H7" /><path d="M17 12H7" /></svg>
        <span className="text-[10px]">2</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-layout-list"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /><path d="M14 4h7" /><path d="M14 9h7" /><path d="M14 15h7" /><path d="M14 20h7" /></svg>
        <span className="text-[10px]">0/2</span>
      </div> */}
    </article>
  );
}

export default KanbanTable;
