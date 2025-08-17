
'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { Check, X, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Badge } from '@/shared/ui/badge';

export type OptionType = {
  label: string;
  value: string;
  group?: string;
};

interface MultiSelectProps {
  options: OptionType[];
  selected: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  placeholder?: string;
}

function MultiSelect({
  options,
  selected,
  onChange,
  className,
  placeholder = 'Select options...',
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  const groupedOptions = React.useMemo(() => {
    return options.reduce((acc, option) => {
        const group = option.group || 'Прочее';
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(option);
        return acc;
    }, {} as Record<string, OptionType[]>);
  }, [options]);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${
            selected.length > 1 ? 'h-full' : 'h-10'
          }`}
          onClick={() => setOpen(!open)}
        >
          <div className="flex gap-1 flex-wrap">
            {selected.length > 0 ? (
              options
                .filter((option) => selected.includes(option.value))
                .map((option) => (
                  <Badge
                    variant="secondary"
                    key={option.value}
                    className="mr-1 mb-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnselect(option.value);
                    }}
                  >
                    {option.label}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className={className}>
          <CommandInput placeholder="Поиск..." />
          <CommandEmpty>Ничего не найдено.</CommandEmpty>
          <CommandList className="max-h-60">
            {Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                <CommandGroup key={groupName} heading={groupName}>
                    {groupOptions.map((option) => (
                    <CommandItem
                        key={option.value}
                        onSelect={() => {
                        onChange(
                            selected.includes(option.value)
                            ? selected.filter((item) => item !== option.value)
                            : [...selected, option.value]
                        );
                        setOpen(true);
                        }}
                    >
                        <Check
                        className={cn(
                            'mr-2 h-4 w-4',
                            selected.includes(option.value) ? 'opacity-100' : 'opacity-0'
                        )}
                        />
                        {option.label}
                    </CommandItem>
                    ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
