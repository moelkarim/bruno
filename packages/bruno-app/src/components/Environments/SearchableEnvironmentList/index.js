import React, { useState, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { IconSearch, IconX, IconDatabase, IconDatabaseOff } from '@tabler/icons';
import StyledWrapper from './StyledWrapper';

const SearchableEnvironmentList = ({ environments, activeEnvironmentUid, onSelect, onClear, dropdownTippyRef }) => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setDebouncedSearchText(value);
      }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setSearchText('');
    setDebouncedSearchText('');
  };

  const filteredEnvironments = useMemo(() => {
    if (!debouncedSearchText) {
      return environments || [];
    }
    return (
      environments?.filter((env) =>
        env.name.toLowerCase().includes(debouncedSearchText.toLowerCase())
      ) || []
    );
  }, [environments, debouncedSearchText]);

  return (
    <StyledWrapper>
    <div>
      <div className="relative px-2 py-1 search-input-container">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">
            <IconSearch size={16} strokeWidth={1.5} />
          </span>
        </div>
        <input
          type="text"
          name="environment-search"
          placeholder="Search environments..."
          id="environment-search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          autoFocus="true"
          className="block w-full pl-7 pr-8 py-1 sm:text-sm border rounded"
          value={searchText}
          onChange={handleSearchChange}
          onClick={(e) => e.stopPropagation()}
        />
        {searchText !== '' && (
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <span
              className="close-icon cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                clearSearch();
              }}
            >
              <IconX size={16} strokeWidth={1.5} />
            </span>
          </div>
        )}
      </div>

      {filteredEnvironments.length > 0
        ? filteredEnvironments.map((e) => (
            <div
              className={`dropdown-item ${e?.uid === activeEnvironmentUid ? 'active' : ''}`}
              key={e.uid}
              onClick={() => {
                onSelect(e);
                dropdownTippyRef.current.hide();
                setSearchText('');
              }}
            >
              <IconDatabase size={18} strokeWidth={1.5} /> <span className="ml-2 break-all">{e.name}</span>
            </div>
          ))
        : searchText && (
            <div className="dropdown-item disabled" disabled>
              <span className="ml-2 text-gray-500">No environments found</span>
            </div>
          )}

      {!searchText && (
        <div
          className="dropdown-item"
          onClick={() => {
            onClear();
            dropdownTippyRef.current.hide();
          }}
        >
          <IconDatabaseOff size={18} strokeWidth={1.5} />
          <span className="ml-2">No Environment</span>
        </div>
      )}
    </div>
    </StyledWrapper>
  );
};

export default SearchableEnvironmentList;
