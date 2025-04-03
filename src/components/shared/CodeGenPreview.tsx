'use client';

import { Copy } from 'lucide-react';
import codegen from 'postman-code-generators';
import { Request } from 'postman-collection';
import React, { useEffect, useState } from 'react';

import { LanguageGroup } from '@/types';
import { cn } from '@/utils';
import { Select, SelectItem, Snippet } from '@heroui/react';

interface CodeGenPreviewProps {
  className?: string;
}

export const CodeGenPreview = ({
  className,
}: Readonly<CodeGenPreviewProps>) => {
  const [snippet, setSnippet] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('curl-cURL');
  const [language, variant] = selected.split('-');

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSnippet('');

    const requestUrl = 'https://pokeapi.co/api/v2/pokemon/ditto';
    const request = new Request(requestUrl);

    const options = {
      indentCount: 2,
      indentType: 'Space',
      trimRequestBody: true,
      followRedirect: true,
    };

    codegen.convert(
      language,
      variant,
      request,
      options,
      (err: Error, generatedCode: string) => {
        if (err) {
          setError(err.toString());
        } else {
          setSnippet(generatedCode);
        }
        setLoading(false);
      }
    );
  }, [language, variant]);

  const languageGroups: LanguageGroup[] = codegen.getLanguageList();

  return (
    <div
      className={cn(
        className,
        'flex flex-col gap-7 p-4 bg-default-50 rounded-xl shadow-sm border-1 border-gray-200 min-w-96 max-w-96'
      )}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-foreground/80">
          Generated Code
        </h2>
        <div className="flex gap-2">
          <Select
            aria-label="Select language"
            size="sm"
            className="w-[200px]"
            selectedKeys={[selected]}
            disallowEmptySelection
            onChange={(e) => setSelected(e.target.value)}
          >
            {languageGroups.map((group: LanguageGroup) => (
              <React.Fragment key={`group-${group.key}`}>
                <SelectItem
                  key={`header-${group.key}`}
                  textValue={group.label}
                  className="text-sm font-bold pt-2 pb-1"
                  isDisabled
                >
                  <span className="text-foreground/70">{group.label}</span>
                </SelectItem>
                {group.variants.map((variant: { key: string }) => (
                  <SelectItem
                    key={`${group.key}-${variant.key}`}
                    textValue={`${group.label} (${variant.key})`}
                    className="text-sm pl-4"
                  >
                    {variant.key}
                  </SelectItem>
                ))}
              </React.Fragment>
            ))}
          </Select>
        </div>
      </div>

      <div className="h-max text-foreground rounded-lg overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full text-foreground/50">
            Generating...
          </div>
        ) : error ? (
          <div className="text-destructive text-sm">Error: {error}</div>
        ) : (
          <Snippet
            color="primary"
            copyIcon={<Copy size={16} />}
            classNames={{
              pre: 'whitespace-pre-wrap break-all',
            }}
          >
            {snippet}
          </Snippet>
        )}
      </div>
    </div>
  );
};
