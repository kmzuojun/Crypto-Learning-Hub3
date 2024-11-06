import React, { useState } from 'react';
import { addTask } from '../store';
import { Task } from '../types';
import { v4 as uuidv4 } from 'uuid';

export function TeacherPanel() {
  const [rule, setRule] = useState('');
  const [content, setContent] = useState('');
  const [encrypted, setEncrypted] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rule && content && encrypted) {
      const task: Task = {
        id: uuidv4(),
        rule,
        content,
        encrypted,
        createdAt: Date.now()
      };
      addTask(task);
      setRule('');
      setContent('');
      setEncrypted('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">创建解密任务</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">加密规则</label>
          <textarea
            value={rule}
            onChange={(e) => setRule(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={3}
            placeholder="请输入加密规则说明..."
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">原文内容</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={3}
            placeholder="请输入需要加密的内容..."
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">密文</label>
          <textarea
            value={encrypted}
            onChange={(e) => setEncrypted(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={3}
            placeholder="请输入加密后的内容..."
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          创建任务
        </button>
      </form>
    </div>
  );
}