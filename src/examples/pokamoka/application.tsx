import { useMemo, useState, useTransition } from 'react';

import { Container } from '$components/container';
import { Input } from '$components/input';
import { Pokemon } from './components/pokemon';
import { filterPokemon } from './utilities/filter-pokemon';

const Application = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPokemon = useMemo(() => filterPokemon(searchQuery), [searchQuery]);

  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputQuery(value);

    startTransition(() => {
      setSearchQuery(value);
    });
  };

  const label = (
    <div className="flex items-center gap-2">
      <span>Search Pokemon</span>
      {isPending && <span className="animate-pulse text-sm text-slate-500">Loading...</span>}
    </div>
  );

  return (
    <Container className="space-y-8">
      <section id="filters">
        <Input
          label={label}
          placeholder="Search by name, type, ability, species, or description…"
          value={inputQuery}
          onChange={handleInputChange}
        />
      </section>
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPokemon.map((pokemon) => (
          <Pokemon key={pokemon.id} {...pokemon} />
        ))}
      </section>
    </Container>
  );
};

export default Application;
