import React, { useState } from 'react';
import { TeacherLogin } from './components/TeacherLogin';
import { StudentLogin } from './components/StudentLogin';
import { TeacherPanel } from './components/TeacherPanel';
import { StudentPanel } from './components/StudentPanel';
import { Lock, Users } from 'lucide-react';

type UserType = 'none' | 'teacher' | 'student';

function App() {
  const [userType, setUserType] = useState<UserType>('none');
  const [playerName, setPlayerName] = useState('');

  if (userType === 'none') {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">解密游戏</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          <button
            onClick={() => setUserType('teacher')}
            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Lock className="w-12 h-12 text-indigo-600 mb-4" />
            <span className="text-xl font-semibold">我是教师</span>
          </button>
          <button
            onClick={() => setUserType('student')}
            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Users className="w-12 h-12 text-indigo-600 mb-4" />
            <span className="text-xl font-semibold">我是学生</span>
          </button>
        </div>
      </div>
    );
  }

  if (userType === 'teacher' && !playerName) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <TeacherLogin onLogin={() => setPlayerName('teacher')} />
      </div>
    );
  }

  if (userType === 'student' && !playerName) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <StudentLogin onLogin={setPlayerName} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              解密游戏 - {userType === 'teacher' ? '教师端' : '学生端'}
            </h1>
            <button
              onClick={() => {
                setUserType('none');
                setPlayerName('');
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              退出
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {userType === 'teacher' ? (
          <TeacherPanel />
        ) : (
          <StudentPanel playerName={playerName} />
        )}
      </main>
    </div>
  );
}

export default App;