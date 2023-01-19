import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { allPinsQuery, feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { userContext } from './context/UserContext';

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const { user } = useContext(userContext);
  console.log('userFeed', user);
  console.log('PinsFeed', pins);

  useEffect(() => {
    const fetchData = async () => {
      // Usamos async/await para mejor legibilidad
      setLoading(true);
      try {
        let query;
        if (user) {
          // Verifica si hay un usuario
          if (categoryId) {
            query = searchQuery(categoryId);
          } else {
            query = feedQuery;
          }
        } else {
          query = allPinsQuery(); // Usa allPinsQuery si no hay usuario
        }
        const data = await client.fetch(query);
        setPins(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, user]);

  const ideaName = categoryId || 'new';
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }
  return (
    <div>
      {pins && (
        <MasonryLayout pins={pins} />
      )}
    </div>
  );
};

export default Feed;
