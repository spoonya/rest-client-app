'use client';

import React from 'react';

import { jsonExample } from '@/data';
import { cn } from '@/utils';
import { Editor as MonacoEditor } from '@monaco-editor/react';

import type * as monaco from 'monaco-editor';
interface EditorProps {
  className?: string;
}

export const Editor = ({ className }: Readonly<EditorProps>) => {
  const [editorInstance, setEditorInstance] =
    React.useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  const formatDocument = React.useCallback(async () => {
    if (editorInstance) {
      const formatAction = editorInstance.getAction(
        'editor.action.formatDocument'
      );
      if (formatAction) {
        try {
          const wasReadOnly = editorInstance.getRawOptions().readOnly;

          editorInstance.updateOptions({ readOnly: false });
          await formatAction.run();

          editorInstance.updateOptions({ readOnly: wasReadOnly });
        } catch (error) {
          console.error('Formatting error:', error);
        }
      }
    }
  }, [editorInstance]);

  React.useEffect(() => {
    if (editorInstance) {
      editorInstance.setValue(jsonExample);
      formatDocument();
    }
  }, [editorInstance, formatDocument]);

  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    setEditorInstance(editor);
  };

  return (
    <MonacoEditor
      className={cn(className)}
      onMount={handleEditorMount}
      height={'100%'}
      width={'100%'}
      language="json"
      options={{
        automaticLayout: true,
        minimap: { enabled: false },
        formatOnPaste: true,
        readOnly: true,
        fontFamily: 'JetBrains Mono',
      }}
    />
  );
};
