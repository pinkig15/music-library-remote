import React, { useState, useMemo, useEffect } from 'react';
import { allSongs } from './data/songs';
import SongList from './components/SongList';
import './MusicLibrary.css';

const MusicLibrary = ({ user }) => {
  const [filter, setFilter] = useState('');
  const [filterBy, setFilterBy] = useState('title');
  const [sortBy, setSortBy] = useState('title');
  const [songs, setSongs] = useState(allSongs);
  
  const filteredSongs = useMemo(() => {
    return songs
      .filter(song =>
        song[filterBy].toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) =>
        a[sortBy].localeCompare(b[sortBy])
      );
  }, [filter, filterBy, sortBy]);

  const handleAddSong = () => {
    // console.log(songs, setSongs)
    const newSong = { title: 'New Song', artist: 'New Artist', album: 'New Album' };
    setSongs([...songs, newSong]);
  };

  const handleRemoveSong = (index) => {
    const updatedSongs = [...songs];
    updatedSongs.splice(index, 1);
    setSongs(updatedSongs);
  };

  return (
    <div className="music-library">
      <h2 className="library-title">Music Library</h2>

      {user === 'admin' && (
        <button className="add-song-btn" onClick={handleAddSong}>Add Song</button>
      )}

      <div className="controls">
        <input
          className="filter-input"
          type="text"
          placeholder={`Filter by ${filterBy}`}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <select
          className="filter-select"
          onChange={(e) => setFilterBy(e.target.value)}
          value={filterBy}
        >
          <option value="title">Title</option>
          <option value="album">Album</option>
          <option value="artist">Artist</option>
        </select>

        <select
          className="sort-select"
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value="title">Sort by Title</option>
          <option value="album">Sort by Album</option>
          <option value="artist">Sort by Artist</option>
        </select>
      </div>

      <SongList 
        songs={filteredSongs}
        userRole={user} 
        onRemove={handleRemoveSong}
      />
    </div>
  );
};

export default MusicLibrary;
