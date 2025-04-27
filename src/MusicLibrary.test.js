import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MusicLibrary from './MusicLibrary';
import '@testing-library/jest-dom';  // For jest matchers
import { allSongs } from './data/songs'; // Assuming you have a file that exports a sample array of songs

describe('MusicLibrary Component', () => {
  const user = { username: 'admin', role: 'admin' };

  test('renders music library with songs', () => {
    render(<MusicLibrary user={user} />);

    // Check if the title is rendered
    expect(screen.getByText('Music Library')).toBeInTheDocument();

    // Check if all song titles are displayed
    allSongs.forEach(song => {
      expect(screen.getByText(song.title)).toBeInTheDocument();
    });
  });

  test('shows "Add Song" button for admin', () => {
    render(<MusicLibrary user={user} />);

    // Ensure the "Add Song" button is visible for the admin user
    expect(screen.getByText('Add Song')).toBeInTheDocument();
  });

  test('does not show "Add Song" button for non-admin', () => {
    const nonAdminUser = { username: 'user', role: 'user' };
    render(<MusicLibrary user={nonAdminUser} />);

    // Ensure the "Add Song" button is not visible for non-admin user
    expect(screen.queryByText('Add Song')).toBeNull();
  });

//   test('filters songs based on filter input', () => {
//     render(<MusicLibrary user={user} />);

//     // Find the filter input and simulate user typing
//     const filterInput = screen.getByPlaceholderText('Filter by title');
//     fireEvent.change(filterInput, { target: { value: 'Song 1' } });

//     // Ensure that only songs with 'Song 1' in the title are displayed
//     expect(screen.getByText('Song 1')).toBeInTheDocument();
//     expect(screen.queryByText('Song 2')).toBeNull();
//   });

//   test('sorts songs by title', () => {
//     render(<MusicLibrary user={user} />);

//     // Find the sort by title select and select "Sort by Title"
//     const sortSelect = screen.getByRole('option', { name: /Sort by Title/i });
//     fireEvent.change(sortSelect, { target: { value: 'title' } });

//     // Expect the songs to be sorted by title
//     const songItems = screen.getAllByText(/Song/i);  // Assuming song titles contain 'Song'
//     expect(songItems[0]).toHaveTextContent('Song 1');
//     expect(songItems[1]).toHaveTextContent('Song 2');
//   });

//   test('adds a song when "Add Song" button is clicked', async () => {
//     render(<MusicLibrary user={user} />);

//     // Get the "Add Song" button
//     const addButton = screen.getByText('Add Song');

//     // Simulate a click on the "Add Song" button
//     fireEvent.click(addButton);

//     // Wait for the song to be added to the list (should show "New Song")
//     await waitFor(() => screen.getByText('New Song'));

//     // Check that the new song appears in the list
//     expect(screen.getByText('New Song')).toBeInTheDocument();
//   });

  test('removes a song when "Remove" button is clicked', () => {
    render(<MusicLibrary user={user} />);

    // Assuming "Song 1" exists and has a Remove button
    const removeButton = screen.getAllByText('Remove')[0];
    
    // Simulate click on remove button
    fireEvent.click(removeButton);

    // Check that the song is removed from the list
    expect(screen.queryByText('Song 1')).toBeNull();
  });

//   test('changes filter criteria', () => {
//     render(<MusicLibrary user={user} />);

//     // Filter by artist
//     const filterBySelect = screen.getByRole('combobox', { name: /filter by/i });
//     fireEvent.change(filterBySelect, { target: { value: 'artist' } });

//     // Filter input should update to "Filter by artist"
//     expect(screen.getByPlaceholderText('Filter by artist')).toBeInTheDocument();
//   });

// test('displays no songs available when the song list is empty', () => {
//     render(<MusicLibrary user={user} />);

//     // Use a function to find the element with the text "Sorry! No Music available!"
//     const noDataMessage = screen.getByText((content, element) => 
//       element.textContent.includes('Sorry! No Music available!')
//     );
    
//     // Expect the message to be in the document
//     expect(noDataMessage).toBeInTheDocument();
//   });
});
