// src/components/SongList.jsx
import React from 'react';

const SongList = ({ songs, userRole, onRemove }) => {
  return (
    <div className="song-list">
      {songs.map((song, index) => (
        <div key={song.id || index} className="song-item" style={styles.songItem}>
          <div style={styles.songInfo}>
            <div><strong>Title:</strong> {song.title}</div>
            <div><strong>Album:</strong> {song.album}</div>
            <div><strong>Artist:</strong> {song.artist}</div>
          </div>

          {/* Show Remove button only if user is admin */}
          {userRole === 'admin' && (
            <button style={styles.removeButton} onClick={() => onRemove(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  songInfo: {
    backgroundColor: '#ffffff',
    padding: '16px',
    margin: '12px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    transition: 'transform 0.2s ease-in-out',
  },
  songInfoHover: {
    transform: 'scale(1.02)',
  },
  field: {
    marginBottom: '8px',
    fontSize: '16px',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
};


export default SongList;
