import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RepoListControls } from '../RepoListControls';
import * as useRepoListControlsModule from '../hooks/useRepoListControls';
import type { FetchReposParams } from '../../types';
import { DEFAULT_SEARCH_PARAMS } from '../constants';

vi.mock('../hooks/useRepoListControls', () => ({
  useRepoListControls: vi.fn(),
}));

vi.mock('../RepoListControls/TextSearchControl', () => ({
  TextSearchControl: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => (
    <div data-testid="text-search-control">
      <input
        data-testid="text-search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  ),
}));

vi.mock('../RepoListControls/SelectControl', () => ({
  SelectControl: ({
    value,
    onChange,
    options,
    label,
  }: {
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
    label: string;
  }) => (
    <div
      data-testid={`select-control-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <select
        data-testid={`select-${label.toLowerCase().replace(/\s+/g, '-')}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  ),
}));

describe('RepoListControls', () => {
  let mockSetSearchParams: ReturnType<typeof vi.fn>;
  let mockResetSearchParams: ReturnType<typeof vi.fn>;
  let mockSearchParams: FetchReposParams;

  beforeEach(() => {
    mockSetSearchParams = vi.fn();
    mockResetSearchParams = vi.fn();
    mockSearchParams = { ...DEFAULT_SEARCH_PARAMS };

    vi.mocked(useRepoListControlsModule.useRepoListControls).mockReturnValue({
      searchParams: mockSearchParams,
      setSearchParams: mockSetSearchParams as (
        searchParams: FetchReposParams,
      ) => void,
      resetSearchParams: mockResetSearchParams as () => void,
    });
  });

  it('should call setSearchParams with updated searchString when text input changes', async () => {
    const user = userEvent.setup();
    render(<RepoListControls />);

    const textInput = screen.getByTestId('text-search-input');
    await user.type(textInput, 'r');

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      ...mockSearchParams,
      searchString: 'r',
    });
  });

  it('should call setSearchParams with updated language when language select changes', async () => {
    const user = userEvent.setup();
    render(<RepoListControls />);

    const languageSelect = screen.getByTestId('select-language');
    await user.selectOptions(languageSelect, 'typescript');

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      ...mockSearchParams,
      language: 'typescript',
    });
  });

  it('should call resetSearchParams when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<RepoListControls />);

    const resetButton = screen.getByLabelText(
      'Reset all search filters and parameters',
    );
    await user.click(resetButton);

    expect(mockResetSearchParams).toHaveBeenCalledTimes(1);
  });
});
