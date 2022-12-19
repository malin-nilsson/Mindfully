import { getAuth } from 'firebase/auth'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase/config'
import { IMeditation } from '../../models/IMeditation'
import { StyledCard, StyledMeditationCard } from '../styledComponents/Card/Card'
import {
  StyledHeadingS,
  StyledHeadingXL,
} from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'

export default function Favorites() {
  const auth = getAuth()
  const [favorites, setFavorites] = useState<IMeditation[]>()

  useEffect(() => {
    getFavorites()
  }, [])

  const getFavorites = async () => {
    if (auth.currentUser) {
      // Get user from "Users" collection
      const userRef = doc(db, 'users', auth.currentUser.uid)

      try {
        // Get docs for user
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
          // Get user favorites
          const faves = docSnap.data().favorites
          setFavorites(faves)
        } else {
          console.log('Document does not exist')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <StyledFlexWrapper justify="flex-start" padding="1.5rem 0 0" width="100%">
      <StyledFlexWrapper width="100%">
        <StyledHeadingXL color="var(--dark-beige)">Favorites</StyledHeadingXL>
        <StyledFlexWrapper
          padding="4rem 1rem 1.5rem"
          direction="row"
          gap="3rem"
          width="100%"
        >
          {favorites &&
            favorites.map((favorite) => {
              return (
                <StyledMeditationCard
                  borderRadius="15px"
                  height="11rem"
                  justify="center"
                  key={favorite.id}
                  padding="1.5rem 1rem"
                  background="var(--dark-blue)"
                  border="1px solid var(--light-blue)"
                  color="var(--dark-beige)"
                >
                  <StyledImageWrapper maxHeight="50px">
                    <img src={favorite.img} alt="Emoji"></img>
                    <span>{favorite.title} </span>
                  </StyledImageWrapper>
                </StyledMeditationCard>
              )
            })}
        </StyledFlexWrapper>
      </StyledFlexWrapper>
    </StyledFlexWrapper>
  )
}
