import React, { useState, useEffect } from 'react';
import { loadGameState, addRecord } from '../store';
import { Task, Record } from '../types';
import { Timer, Trophy } from 'lucide-react';

interface Props {
  playerName: string;
}

export function StudentPanel({ playerName }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [records, setRecords] = useState<Record[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [answer, setAnswer] = useState('');
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const state = loadGameState();
    setTasks(state.tasks);
    setRecords(state.records);
  }, []);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
    setAnswer('');
    setTimer(0);
    setIsRunning(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTask && answer === selectedTask.content) {
      setIsRunning(false);
      const record: Record = {
        taskId: selectedTask.id,
        playerName,
        timeSpent: timer,
        completedAt: Date.now()
      };
      addRecord(record);
      const state = loadGameState();
      setRecords(state.records);
      setSelectedTask(null);
      setAnswer('');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-6">解密任务</h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-white rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleTaskSelect(task)}
              >
                <h3 className="font-bold mb-2">加密规则：</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{task.rule}</p>
                <p className="mt-2 font-bold">密文：</p>
                <p className="text-gray-800 break-all">{task.encrypted}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          {selectedTask ? (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">正在解密</h3>
                <div className="flex items-center text-gray-600">
                  <Timer className="w-5 h-5 mr-2" />
                  {formatTime(timer)}
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    请输入解密结果：
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    rows={4}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  提交答案
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
                <h3 className="text-xl font-bold">排行榜</h3>
              </div>
              <div className="space-y-4">
                {records
                  .sort((a, b) => a.timeSpent - b.timeSpent)
                  .map((record, index) => {
                    const task = tasks.find((t) => t.id === record.taskId);
                    return (
                      <div
                        key={`${record.taskId}-${record.completedAt}`}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded"
                      >
                        <div>
                          <span className="font-bold mr-2">#{index + 1}</span>
                          <span>{record.playerName}</span>
                          <span className="text-gray-500 text-sm ml-2">
                            ({task?.rule.slice(0, 20)}...)
                          </span>
                        </div>
                        <span className="text-gray-600">
                          {formatTime(record.timeSpent)}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}