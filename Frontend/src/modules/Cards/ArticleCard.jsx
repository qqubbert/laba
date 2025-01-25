import { useState, useEffect } from 'react'

import ChemistryIcon from '../../assets/ChemistryIcon.svg';
import LeafIcon from '../../assets/LeafIcon.svg';
import RocketIcon from '../../assets/RocketIcon.svg';
import TerminalIcon from '../../assets/TerminalIcon.svg';

function UserCard({ articleData, author }) {

    useEffect(() => {
        // console.log(userData);
    }, []);

  return (
    <>
        <h1>{articleData.title}</h1>
        <h4>Дата публикации: {(articleData.creating_date)}</h4>
        {author && 
        <h4>Автор: {articleData.author_name}</h4>
        }
        <div className="articleTagsIcons">
          {articleData.it &&
          <img src={TerminalIcon} alt="" />
          }
          {articleData.chemistry &&
          <img src={ChemistryIcon} alt="" />
          }
          {articleData.biology &&
          <img src={LeafIcon} alt="" />
          }
          {articleData.physics &&
          <img src={RocketIcon} alt="" />
          }
        </div>
    </>
  )
}

export default UserCard;
