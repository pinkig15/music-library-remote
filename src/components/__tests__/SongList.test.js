import { render, screen, fireEvent } from '@testing-library/react';
import SongList from '../SongList';  // Adjust the path to your component
import '@testing-library/jest-dom';  // For jest matchers

describe('SongList Component', () => {
  const songs = [
    { id: 1, title: 'Song 1', album: 'Album 1', artist: 'Artist 1' },
    { id: 2, title: 'Song 2', album: 'Album 2', artist: 'Artist 2' },
  ];

  const mockRemove = jest.fn();

  test('renders songs correctly', () => {
    render(<SongList songs={songs} userRole="user" onRemove={mockRemove} />);

    // Check if each song's title, album, and artist are displayed correctly
    expect(screen.getByText(/Song 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Album 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Artist 1/i)).toBeInTheDocument();

    expect(screen.getByText(/Song 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Album 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Artist 2/i)).toBeInTheDocument();
  });

  test('does not show remove button for non-admin user', () => {
    render(<SongList songs={songs} userRole="user" onRemove={mockRemove} />);

    // Check that the Remove button does not appear
    expect(screen.queryByText("Remove")).not.toBeInTheDocument();
  });

  test('shows remove button for admin user', () => {
    render(<SongList songs={songs} userRole="admin" onRemove={mockRemove} />);

    // Check that the Remove button appears for each song
    expect(screen.getAllByText("Remove")[0]).toBeInTheDocument();
  });

  test('calls onRemove function when Remove button is clicked', () => {
    render(<SongList songs={songs} userRole="admin" onRemove={mockRemove} />);

    const removeButton = screen.getAllByText("Remove")[0];
    fireEvent.click(removeButton);

    // Check if onRemove was called with correct index
    expect(mockRemove).toHaveBeenCalledWith(0);
  });

  test('shows "No Music available" when there are no songs', () => {
    render(<SongList songs={[]} userRole="admin" onRemove={mockRemove} />);

    // Check for the no data message
    expect(screen.getByText(/Sorry! No Music available!/i)).toBeInTheDocument();
  });
});
