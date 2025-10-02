import { Card } from '$components/card';
import { Button } from '$components/button';
import { useCallback, useMemo, useState } from 'react';

const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const onIncrement = useCallback(() => setCount((prevCount) => prevCount + 1), []);
  const onDecrement = useCallback(() => setCount((prevCount) => prevCount - 1), []);
  const onReset = useCallback(() => setCount(initialValue), [initialValue]);

  const dispatches = useMemo(
    () => ({ onIncrement, onDecrement, onReset }),
    [onIncrement, onDecrement, onReset],
  );

  const state = useMemo(() => ({ count }), [count]);

  return { ...state, ...dispatches };
};

export function CounterWidgetWrong() {
  const { count, onIncrement, onDecrement, onReset } = useCounter(0);

  console.log('CounterWidget rendered');

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
        Counter Widget
      </h3>
      <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
        A simple counter. Notice this re-renders when ANY widget updates because state is in the
        parent.
      </p>

      <div className="flex items-center justify-center space-x-4">
        <Button onClick={onDecrement} variant="secondary">
          -
        </Button>
        <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">{count}</span>
        <Button onClick={() => onIncrement()} variant="secondary">
          +
        </Button>
      </div>

      <div className="mt-4 flex justify-center">
        <Button onClick={() => onReset()} variant="secondary" size="small">
          Reset
        </Button>
      </div>
    </Card>
  );
}
