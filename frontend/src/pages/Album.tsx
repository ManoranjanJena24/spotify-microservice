import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useSongData } from '../context/SongContext';
import { useEffect } from 'react';

const Album = () => {
  // 1. Destructure hooks at the top level of the component
  const {
    fetchAlbumSongs,
    albumSong,
    albumData,
    setIsPlaying,
    setSelectedSong,
    loading,
  } = useSongData();

  const params = useParams<{id: string}>();
  console.log("parrrraaammmssss",params.id)

  // 2. Trigger fetch when ID changes
  useEffect(() => {
    if (params.id) {
      fetchAlbumSongs(params.id);
    }
  }, [params.id, fetchAlbumSongs]); // Added fetchAlbumsongs to dependency array

  // 3. Optional: Add a loading state check
  if (loading) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <h1>{albumData?.name || "Album"}</h1>
      {/* Map through your albumSong data here */}
      <ul>
        {albumSong.map((song: any) => (
          <li key={song._id} onClick={() => {
            setSelectedSong(song);
            setIsPlaying(true);
          }}>
            {song.title}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Album;