import * as SQLite from 'expo-sqlite';
import {Movie} from '@custom_types/sqlite';

const DB_NAME = 'mymovies.db';

export const connectToDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  try {
    return await SQLite.openDatabaseAsync(DB_NAME);
  } catch (error) {
    console.error('Database connection error:', error);
    throw Error('Could not connect to database');
  }
};

export const createTables = async (): Promise<boolean> => {
  try {
    const db = await connectToDatabase();
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS SavedMovies (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        poster_path TEXT,
        backdrop_path TEXT,
        overview TEXT,
        genre_ids TEXT,
        video INTEGER DEFAULT 0,
        release_date TEXT,
        vote_average REAL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    return true;
  } catch (error) {
    console.error('Failed to create tables:', error);
    throw Error('Failed to create tables');
  }
};

export const saveMovie = async (movie: Movie): Promise<boolean> => {
  try {
    const db = await connectToDatabase();
    await db.runAsync(
      `INSERT INTO SavedMovies (
        id, title, poster_path, backdrop_path, overview, 
        genre_ids, video, release_date, vote_average
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        movie.id,
        movie.title,
        movie.poster_path,
        movie.backdrop_path,
        movie.overview,
        JSON.stringify(movie.genre_ids),
        movie.video ? 1 : 0,
        movie.release_date,
        movie.vote_average,
      ],
    );
    return true;
  } catch (error) {
    console.error('Failed to save movie:', error);
    throw Error('Failed to add movie');
  }
};

export const deleteSavedMovie = async (movieId: number): Promise<boolean> => {
  try {
    const db = await connectToDatabase();
    await db.runAsync('DELETE FROM SavedMovies WHERE id = ?', [movieId]);
    return true;
  } catch (error) {
    console.error('Failed to delete movie:', error);
    throw Error('Failed to delete movie from database');
  }
};

export const getSavedMovies = async (): Promise<Movie[]> => {
  try {
    const db = await connectToDatabase();
    const results = await db.getAllAsync<{
      id: number;
      title: string;
      poster_path: string;
      overview: string;
      genre_ids: string;
      video: number;
      release_date: string;
      vote_average: number;
      backdrop_path: string;
    }>('SELECT * FROM SavedMovies');

    return results.map(item => ({
      id: item.id,
      title: item.title,
      poster_path: item.poster_path,
      backdrop_path: item.backdrop_path,
      overview: item.overview,
      genre_ids: JSON.parse(item.genre_ids),
      video: Boolean(item.video),
      release_date: item.release_date,
      vote_average: item.vote_average,
    }));
  } catch (error) {
    console.error('Failed to get movies:', error);
    throw Error('Failed to get movies from database');
  }
};

export const isMovieSaved = async (movieId: number): Promise<boolean> => {
  try {
    const db = await connectToDatabase();
    const results = await db.getAllAsync<{count: number}>(
      'SELECT COUNT(*) as count FROM SavedMovies WHERE id = ?',
      [movieId],
    );
    return results[0].count > 0;
  } catch (error) {
    console.error('Failed to check movie:', error);
    throw Error('Failed to check if movie exists in database');
  }
};
