import React from 'react';
import type { Task } from '../../types/task';
import TaskCard from './TaskCard';
import { cn } from '../../utils/helpers';

interface KanbanBoardProps {
  tasks: Task[];
}

const columns = [
  {
    id: 'TODO',
    title: 'To Do',
    borderColor: 'border-slate-400',
    bgColor: 'bg-slate-50 dark:bg-gray-800/40',
    badgeBg: 'bg-slate-200 dark:bg-gray-700 text-slate-600 dark:text-gray-300',
  },
  {
    id: 'IN_PROGRESS',
    title: 'In Progress',
    borderColor: 'border-blue-400',
    bgColor: 'bg-blue-50/60 dark:bg-blue-900/10',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
  },
  {
    id: 'REVIEW',
    title: 'Review',
    borderColor: 'border-violet-400',
    bgColor: 'bg-violet-50/60 dark:bg-violet-900/10',
    badgeBg: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
  },
  {
    id: 'DONE',
    title: 'Done',
    borderColor: 'border-emerald-400',
    bgColor: 'bg-emerald-50/60 dark:bg-emerald-900/10',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
  },
];

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.id);
        return (
          <div key={column.id} className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-gray-200">
                {column.title}
              </h3>
              <span
                className={cn(
                  'inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded-full text-xs font-bold whitespace-nowrap',
                  column.badgeBg
                )}
                role="status"
                aria-atomic="true"
              >
                {columnTasks.length}
              </span>
            </div>
            <div
              className={cn(
                'rounded-xl border-t-2 p-3 min-h-[200px] flex flex-col gap-3',
                column.bgColor,
                column.borderColor,
                'border border-slate-200 dark:border-gray-700'
              )}
            >
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {columnTasks.length === 0 && (
                <div className="flex-1 flex items-center justify-center py-8 text-xs text-slate-400 dark:text-gray-500">
                  No tasks
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
