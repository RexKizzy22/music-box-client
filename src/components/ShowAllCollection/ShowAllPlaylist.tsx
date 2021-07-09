import React, { useState, useEffect, useContext } from 'react';
import { useLocation, NavLink, useParams } from 'react-router-dom';
import albumClass from './ShowAllAlbum.module.scss';
import ash_sm from '../../asset/homepageImages/ash_sm.jpg';
import axios from 'axios';
import Loader from '../../ui/Loader/Loader';
import { AuthContext } from '../../context/AuthContext';

interface Recent {
  ownerId: string;
  title: string;
  _id: string;
  cover_medium: string;
  name: string;
  directory_info: {
    title: string;
    likedCount: number;
    likeCount: number;
    likesCount: number;
    picture_medium: string;
    cover_medium: string;
  };
  imgURL: string;
}
interface LocationState {
  playlist: Recent[];
}
const defaultImg =
  'https://cdns-images.dzcdn.net/images/artist/726daf1256ee5bd50f222c5e463fe7ae/56x56-000000-80-0-0.jpg';
export default function ShowAllAlbum() {
  const location = useLocation<LocationState>();
  const { user } = useContext(AuthContext);
  const [allPlaylist, setAllPlaylist] = useState<Recent[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams<{ id: string }>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchAllPlaylist = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {
        data: { data },
      } = await axios.get(`https://music-box-b.herokuapp.com/api/v1/music-box-api/search/?name=${id}`, config);

      console.log(data);
      const playlist = data[0].playlist.map((item: Record<string, any>) => item);
      setAllPlaylist(playlist);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (location.state) {
      setAllPlaylist(location.state.playlist);
      setIsLoading(false);
    } else {
      fetchAllPlaylist();
    }
  }, [fetchAllPlaylist, location.state]);
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && allPlaylist && (
        <div className={albumClass.allAlbum}>
          {allPlaylist.map((item: Recent) => (
            <NavLink to={`/playlist/${item._id}`} className={albumClass.Nav_link}>
              <div className={albumClass.album_img} key={item.ownerId}>
                <img className={albumClass.imgs || ash_sm} src={item.imgURL || defaultImg} alt='playlist img'></img>
                <div className={albumClass.title}>{item.name}</div>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
