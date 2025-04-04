'use client';

import { editorModes } from '@/services';
import { EditorMode } from '@/types';
import { Select, SelectItem } from '@heroui/react';

import { BodyEditor } from './BodyEditor';

interface BodyTabProps {
  body: string;
  bodyFormat: EditorMode;
  onBodyChange: (body: string) => void;
  onBodyFormatChange: (format: EditorMode) => void;
}

export const BodyTab = ({
  body,
  bodyFormat,
  onBodyChange,
  onBodyFormatChange,
}: BodyTabProps) => (
  <div className="flex flex-col gap-3 rounded-medium bg-content1 shadow-sm overflow-hidden">
    <div className="flex justify-between items-center px-4 pt-3">
      <Select
        aria-label="Select body format"
        size="sm"
        className="w-32"
        selectedKeys={[bodyFormat]}
        onChange={(e) => onBodyFormatChange(e.target.value as EditorMode)}
        disallowEmptySelection
      >
        {editorModes.map((mode) => (
          <SelectItem key={mode.value} textValue={mode.label}>
            {mode.label}
          </SelectItem>
        ))}
      </Select>
    </div>
    <div className="h-[500px]">
      <BodyEditor
        className="pr-5 pt-5 pb-5"
        value={body}
        onChange={onBodyChange}
        language={bodyFormat}
      />
    </div>
  </div>
);
