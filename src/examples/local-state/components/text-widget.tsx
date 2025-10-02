import { Card } from '$components/card';
import { Textarea } from '$components/textarea';
import { Button } from '$components/button';
import { useCallback, useMemo, useState } from 'react';

const useText = (initialValue = '') => {
  const [text, setText] = useState(initialValue);

  const wordCount = useMemo(() => (text.trim() ? text.trim().split(/\s+/).length : 0), [text]);
  const charCount = useMemo(() => text.length, [text]);
  const isSingleWord = useMemo(() => wordCount === 1, [wordCount]);

  const onSetText = useCallback((newText: string) => setText(newText), []);
  const onReset = useCallback(() => setText(initialValue), [initialValue]);

  return { text, wordCount, charCount, isSingleWord, onSetText, onReset };
};

// ✅ CORRECT: State colocated inside the component
export function TextWidget() {
  const { text, wordCount, charCount, isSingleWord, onSetText, onReset } = useText('');

  console.log('TextWidget rendered');

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Text Widget</h3>
      <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
        Type something. Notice this re-renders when ANY widget updates because state is in the
        parent.
      </p>

      <Textarea
        label="Enter some text"
        value={text}
        onChange={(e) => onSetText(e.target.value)}
        rows={4}
        placeholder="Start typing..."
      />

      <div className="mt-2 flex justify-between text-sm text-slate-600 dark:text-slate-400">
        <span>
          {wordCount} {isSingleWord ? 'word' : 'words'}
        </span>
        <span>
          {charCount} {isSingleWord ? 'character' : 'characters'}
        </span>
      </div>

      <div className="mt-4">
        <Button onClick={onReset} variant="secondary" size="small">
          Clear
        </Button>
      </div>
    </Card>
  );
}
