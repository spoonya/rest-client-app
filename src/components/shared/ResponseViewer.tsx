'use client';

import React from 'react';

import { jsonExample } from '@/data';
import { ResponseTabs } from '@/services';
import { cn } from '@/utils';
import { Tab, Tabs } from '@heroui/react';
import { Editor as MonacoEditor } from '@monaco-editor/react';

import type * as monaco from 'monaco-editor';

interface ResponseViewerProps {
  className?: string;
  language?: string;
  statusCode?: number;
  statusText?: string;
  headers?: Array<{ key: string; value: string }>;
  responseBody?: string;
  requestMethod?: string;
}

export const ResponseViewer = ({
  className,
  language = 'json',
  statusCode = 200,
  statusText = 'OK',
  headers = [],
  responseBody = jsonExample,
  requestMethod = 'GET',
}: Readonly<ResponseViewerProps>) => {
  const [editorInstance, setEditorInstance] =
    React.useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [activeTab, setActiveTab] = React.useState<ResponseTabs>(
    ResponseTabs.BODY
  );

  const formatDocument = React.useCallback(async () => {
    if (editorInstance && responseBody) {
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
  }, [editorInstance, responseBody]);

  React.useEffect(() => {
    if (editorInstance && responseBody) {
      editorInstance.setValue(responseBody);
      formatDocument();
    }
  }, [editorInstance, formatDocument, responseBody]);

  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    setEditorInstance(editor);
  };

  const detailsTabTitle = `${ResponseTabs.DETAILS} ${requestMethod} `;
  const bodyTabTitle = `${ResponseTabs.BODY}${
    statusCode ? ` (${statusCode})` : ''
  }`;

  return (
    <div
      className={cn(
        className,
        'flex flex-col gap-2 p-4 bg-default-50 rounded-xl shadow-sm border-1 border-gray-200 w-full'
      )}
    >
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as ResponseTabs)}
        variant="light"
      >
        <Tab key={ResponseTabs.DETAILS} title={detailsTabTitle}>
          <div className="flex flex-col gap-3 rounded-medium bg-content1 p-3 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Status</h3>
                <div className="flex gap-2 items-center">
                  {statusCode && (
                    <span className="px-2 py-1 bg-success-100 text-success-800 rounded-md text-sm">
                      {statusCode} {statusText}
                    </span>
                  )}
                  {!statusCode && (
                    <span className="text-foreground/50">
                      No status available
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Headers</h3>
                {headers.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {headers.map((header, index) => (
                      <div
                        key={index}
                        className="flex gap-4 items-center text-sm"
                      >
                        <span className="text-foreground/70">
                          {header.key}:
                        </span>
                        <span className="text-foreground/90">
                          {header.value}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-foreground/50">
                    No headers received
                  </span>
                )}
              </div>
            </div>
          </div>
        </Tab>
        <Tab key={ResponseTabs.BODY} title={bodyTabTitle}>
          <div className="flex flex-col gap-3 rounded-medium bg-content1 shadow-sm overflow-hidden">
            <div className="h-[500px]">
              <MonacoEditor
                className="pr-5 pt-5 pb-5"
                onMount={handleEditorMount}
                height="100%"
                width="100%"
                language={language}
                options={{
                  automaticLayout: true,
                  minimap: { enabled: false },
                  readOnly: true,
                  fontFamily: 'JetBrains Mono',
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
