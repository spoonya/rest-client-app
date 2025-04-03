'use client';

import { useEffect, useState } from 'react';

import { EditorMode } from '@/types';
import { cn } from '@/utils';
import { Editor as MonacoEditor } from '@monaco-editor/react';

import type * as monaco from 'monaco-editor';
interface BodyEditorProps {
  className?: string;
  value?: string;
  language?: EditorMode;
  onChange?: (value: string) => void;
  onMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}

export const BodyEditor = ({
  className,
  value = '',
  language = 'json',
  onChange,
  onMount,
}: Readonly<BodyEditorProps>) => {
  const [editorInstance, setEditorInstance] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  const formatDocument = async () => {
    if (editorInstance) {
      try {
        const formatAction = editorInstance.getAction(
          'editor.action.formatDocument'
        );
        await formatAction?.run();
      } catch (error) {
        console.error('Formatting error:', error);
      }
    }
  };

  useEffect(() => {
    if (editorInstance && value !== editorInstance.getValue()) {
      editorInstance.setValue(value);
      if (language === 'json') formatDocument();
    }
  }, [value, editorInstance]);

  const handleEditorChange = (newValue?: string) => {
    onChange?.(newValue || '');
  };

  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    setEditorInstance(editor);
    onMount?.(editor);
  };

  return (
    <div className={cn('relative h-full w-full', className)}>
      <MonacoEditor
        onMount={handleEditorMount}
        onChange={handleEditorChange}
        value={value}
        height="100%"
        width="100%"
        language={language}
        options={{
          automaticLayout: true,
          lineNumbers: 'off',
          minimap: { enabled: false },
          formatOnPaste: true,
          fontFamily: 'JetBrains Mono',
          scrollBeyondLastLine: false,
          wordBasedSuggestions: 'off',
        }}
      />
    </div>
  );
};
