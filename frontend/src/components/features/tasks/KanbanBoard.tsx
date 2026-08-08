"use client";

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import type { Task, TaskStatus } from "@/types/task";

interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove: (taskId: string, status: TaskStatus) => void;
}

const columns: Array<{ status: TaskStatus; title: string }> = [
  { status: "TODO", title: "To Do" },
  { status: "IN_PROGRESS", title: "In Progress" },
  { status: "COMPLETED", title: "Completed" },
];

function DroppableColumn({
  id,
  title,
  children,
}: {
  id: TaskStatus;
  title: string;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="p-3 rounded-2xl glass-card min-h-[260px]"
      style={{
        outline: isOver ? "1px solid var(--color-primary)" : "none",
      }}
    >
      <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--text-primary)" }}>
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function DraggableTask({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="rounded-xl p-3 cursor-grab active:cursor-grabbing"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-soft)",
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      <p className="font-medium text-xs" style={{ color: "var(--text-primary)" }}>
        {task.title}
      </p>
      <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>
        {task.priority} • {task.dueDate}
      </p>
    </div>
  );
}

export function KanbanBoard({ tasks, onTaskMove }: KanbanBoardProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const tasksByStatus = useMemo(
    () => ({
      TODO: tasks.filter((task) => task.status === "TODO"),
      IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
      COMPLETED: tasks.filter((task) => task.status === "COMPLETED"),
    }),
    [tasks]
  );

  const activeTask = tasks.find((task) => task.id === activeTaskId) ?? null;

  function handleDragStart(event: DragStartEvent) {
    setActiveTaskId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTaskId(null);
    const { over, active } = event;

    if (!over) {
      return;
    }

    const destination = String(over.id) as TaskStatus;
    onTaskMove(String(active.id), destination);
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <DroppableColumn key={column.status} id={column.status} title={column.title}>
            {tasksByStatus[column.status].map((task) => (
              <DraggableTask key={task.id} task={task} />
            ))}
          </DroppableColumn>
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div
            className="rounded-xl p-3"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <p className="font-medium text-xs" style={{ color: "var(--text-primary)" }}>
              {activeTask.title}
            </p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
