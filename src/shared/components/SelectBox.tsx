'use client';

import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from 'react';

interface OptionType {
  label: string;
  value: string;
}

interface SelectBoxContextType {
  open: boolean;
  selected: OptionType | null;
  selectOption: (option: OptionType) => void;
  toggleOpen: () => void;
}

const SelectBoxContext = createContext<SelectBoxContextType | null>(null);
const useSelectBoxContext = () => {
  const ctx = useContext(SelectBoxContext);
  if (!ctx) throw new Error('SelectBox compound components must be used inside <SelectBox />');
  return ctx;
};

interface SelectBoxProps {
  defaultValue?: OptionType | null;
  onChange?: (option: OptionType) => void;
  className?: string;
  children: ReactNode;
}

function SelectBox({ defaultValue = null, onChange, className, children }: SelectBoxProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<OptionType | null>(defaultValue);
  const ref = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen((prev) => !prev);

  const selectOption = (option: OptionType) => {
    setSelected(option);
    onChange?.(option);
    setOpen(false);
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <SelectBoxContext.Provider value={{ open, selected, selectOption, toggleOpen }}>
      <div className={cn('relative', className)} ref={ref}>
        {children}
      </div>
    </SelectBoxContext.Provider>
  );
}

function Trigger() {
  const { selected, toggleOpen, open } = useSelectBoxContext();

  return (
    <button
      type="button"
      onClick={toggleOpen}
      className="flex h-full w-full items-center justify-between gap-2 rounded-lg bg-white px-4 py-2 text-left text-gray-800 shadow-lg transition-all hover:bg-[#eeeeee] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0]"
    >
      <span>{selected?.label ?? '선택하세요'}</span>
      <motion.span animate={{ scale: open ? 1.1 : 1 }} transition={{ type: 'spring', stiffness: 250, damping: 15 }}>
        <ChevronDown size={16} />
      </motion.span>
    </button>
  );
}

function Options({ children }: { children: ReactNode }) {
  const { open } = useSelectBoxContext();

  return (
    <AnimatePresence>
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 0.2 }}
          className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}

function Option({ label, value }: OptionType) {
  const { selected, selectOption } = useSelectBoxContext();
  const isSelected = selected?.value === value;

  return (
    <li>
      <button
        type="button"
        className={cn('w-full px-4 py-2 text-left', isSelected ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50')}
        onClick={() => selectOption({ label, value })}
      >
        {label}
      </button>
    </li>
  );
}

SelectBox.Trigger = Trigger;
SelectBox.Options = Options;
SelectBox.Option = Option;

export default SelectBox;
