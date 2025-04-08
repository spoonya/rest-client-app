'use client';
import { Sidebar } from '@/components';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type Variable = { key: string; value: string };

export default function VariableManager() {
  const t = useTranslations('Variables');

  const [variables, setVariables] = useState<Variable[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('variables');
    return stored ? JSON.parse(stored) : [];
  });
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('variables');
    if (stored) {
      setVariables(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('variables', JSON.stringify(variables));
  }, [variables]);

  const addVariable = () => {
    if (newKey && newValue) {
      const updated = [...variables, { key: newKey, value: newValue }];
      setVariables(updated);
      console.log('Saving to localStorage:', updated);
      localStorage.setItem('variables', JSON.stringify(updated));
      setNewKey('');
      setNewValue('');
    }
  };

  const deleteVariable = (keyToDelete: string) => {
    setVariables((prev) => prev.filter((v) => v.key !== keyToDelete));
  };

  return (
    <div className="flex h-screen overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 p-10 bg-gradient-to-b from-blue-50 to-white overflow-y-auto min-w-0">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">
            {t('variables')}
          </h2>

          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder={t('key')}
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder={t('value')}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={addVariable}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {t('add')}
            </button>
          </div>

          <div className="grid gap-4">
            {variables.map((v) => (
              <div
                key={v.key}
                className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col pr-4 overflow-hidden min-w-0 flex-1">
                  <div className="text-sm text-gray-500 truncate">
                    <span className="text-blue-600 font-semibold" title={v.key}>
                      {v.key}
                    </span>
                  </div>
                  <div
                    className="text-gray-700 text-sm break-words max-w-full whitespace-normal"
                    title={v.value}
                  >
                    {v.value}
                  </div>
                </div>

                <button
                  onClick={() => deleteVariable(v.key)}
                  className="text-red-500 hover:underline text-sm shrink-0 ml-2"
                >
                  {t('delete')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
