import { useContext } from 'react';
import { RepoListControlsContext } from '../RepoListControlsContext';

export function useRepoListControls() {
  const context = useContext(RepoListControlsContext);
  if (!context) {
    throw new Error(
      'useRepoListControls must be used within a RepoListControlsProvider',
    );
  }
  return context;
}
