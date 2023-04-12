import React from 'react'
import { Suspense, useEffect, useState } from 'react'
// STYLED COMPONENTS //
import {
  StyledHeadingL,
  StyledHeadingXS,
} from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrappers'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { StyledHomeCard } from '../styledComponents/Cards/Cards'
import Loader from '../styledComponents/Loader/StyledLoader'
// REACT ROUTER //
import { Link } from 'react-router-dom'
// FRAMER MOTION //
import { motion } from 'framer-motion'
import { getUser } from '../../services/getUser'
// MUI //
import { Snackbar } from '@mui/material'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CloseIcon from '@mui/icons-material/Close'
// MODELS //
import { IMeditation } from '../../models/IMeditation'
// SERVICES //
import { removeFavorite } from '../../services/removeFavorite'
import { saveFavorite } from '../../services/saveFavorite'
import { getSpecificMeditation } from '../../services/getSpecificMeditation'

const ImageModal = React.lazy(() =>
  import('../styledComponents/Modal/ImageModal'),
)

export default function Home() {
  const [displayName, setDisplayName] = useState('')
  const [greeting, setGreeting] = useState('')
  const [loader, setLoader] = useState(false)
  const [newMeditation, setNewMeditation] = useState(false)
  const [snackbar, setSnackbar] = useState(false)
  const [specificMeditation, setSpecificMeditation] = useState<IMeditation>({
    title: '',
    tag: '',
    image: {
      asset: {
        url: '',
        _id: '',
      },
    },
    icon: {
      asset: {
        url: '',
        _id: '',
      },
    },
    breatheTime: 0,
    holdTime: 0,
    totalTime: 0,
    description: '',
    _id: '',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    getNewMeditation()
    greetUser()
  }, [])

  ///////////////////////////////////
  // GET NEW / FEATURED MEDITATION //
  ///////////////////////////////////
  const getNewMeditation = async () => {
    const meditation: IMeditation = await getSpecificMeditation(
      'Five Mindful Breaths',
    )
    setSpecificMeditation(meditation)
  }

  //////////////
  // GREETING //
  //////////////
  const greetUser = async () => {
    const user = await getUser()
    const name = user.firstName
    const firstName = name.split(' ')[0]

    setDisplayName(firstName)

    let data = [
        [18, 24, 'Good evening'],
        [0, 4, 'Good evening'],
        [5, 11, 'Good morning'],
        [12, 17, 'Good afternoon'],
      ],
      hour = new Date().getHours()

    for (let i = 0; i < data.length; i++) {
      if (hour >= data[i][0] && hour <= data[i][1]) {
        setGreeting(data[i][2].toString())
      }
    }
    setLoader(false)
  }

  ///////////
  // MODAL //
  //////////
  const showModal = (m: IMeditation) => {
    setLoader(true)
    setSpecificMeditation(m)
    setNewMeditation(true)
    setTimeout(stopLoader, 1000)
  }

  const hideModal = (progress?: boolean) => {
    setNewMeditation(false)
    setSnackbar(progress as boolean)
  }

  const stopLoader = () => {
    setLoader(false)
  }

  /////////////////////////////
  // SAVE / REMOVE FAVORITES //
  /////////////////////////////
  const handleSaveFavorite = async (m: IMeditation) => {
    saveFavorite(m)
  }

  const handleRemoveFavorite = async (m: IMeditation) => {
    await removeFavorite(m)
  }

  // SNACKBAR CLOSE ICON //
  const action = (
    <React.Fragment>
      <CloseIcon fontSize="small" onClick={() => setSnackbar(false)} />
    </React.Fragment>
  )

  return (
    <>
      {snackbar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Snackbar
            ContentProps={{
              sx: {
                background: 'var(--mid-blue)',
                color: 'var(--dark-beige)',
                border: '1px solid var(--dark-beige)',
                fontSize: '1rem',
              },
            }}
            open={snackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={4000}
            message="Your progress has been saved &nbsp; &#127942;"
            onClose={() => setSnackbar(false)}
            action={action}
          />
        </motion.div>
      )}
      {loader ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <StyledFlexWrapper
            justify="flex-start"
            padding="1.5rem 0 0"
            width="100%"
          >
            <StyledFlexWrapper>
              <StyledHeadingL color="var(--dark-beige)">
                {greeting}, {displayName}.
              </StyledHeadingL>
            </StyledFlexWrapper>
          </StyledFlexWrapper>

          <StyledFlexWrapper>
            <StyledImageWrapper maxHeight="9.5rem" margin="0 auto 1rem">
              <img src="/assets/mountain.png" alt="Illustration of mountains" />
            </StyledImageWrapper>
          </StyledFlexWrapper>

          <StyledFlexWrapper margin="2rem auto">
            <StyledHomeCard onClick={() => showModal(specificMeditation)}>
              <StyledImageWrapper maxHeight="2.5rem">
                <img
                  src="/assets/icons/fiveMindful.png"
                  alt="Illustration of cloud smiling"
                ></img>
              </StyledImageWrapper>
              <StyledFlexWrapper
                justify="center"
                align="flex-start"
                color="var(--dark-beige)"
                gap="0.3rem"
                margin="unset"
              >
                <StyledHeadingXS
                  textTransform="unset"
                  fontSize="0.8rem"
                  fontWeight="300"
                  borderBottom="unset"
                >
                  New activity
                </StyledHeadingXS>
                <span>Five Mindful Breaths</span>
              </StyledFlexWrapper>
            </StyledHomeCard>
          </StyledFlexWrapper>

          <StyledFlexWrapper margin="2rem auto">
            <Link to="/explore">
              <StyledHomeCard>
                <StyledImageWrapper maxHeight="40px">
                  <SelfImprovementIcon
                    style={{ color: '#f7dba8', fontSize: '3.2rem' }}
                  />
                </StyledImageWrapper>
                <StyledFlexWrapper
                  justify="center"
                  align="flex-start"
                  color="var(--dark-beige)"
                  gap="0.3rem"
                  margin="unset"
                >
                  <StyledHeadingXS
                    textTransform="unset"
                    fontSize="0.8rem"
                    fontWeight="300"
                    borderBottom="unset"
                  >
                    Find a Meditation
                  </StyledHeadingXS>
                  <span>Explore all meditations</span>
                </StyledFlexWrapper>
              </StyledHomeCard>
            </Link>
          </StyledFlexWrapper>

          <StyledFlexWrapper margin="2rem auto">
            <Link to="/journey">
              <StyledHomeCard
                width="10rem"
                bgColor="var(--dark-beige)"
                color="var(--dark-blue)"
                padding="0.8rem 1.1rem"
                gap="1rem"
                justify="center"
              >
                <StyledImageWrapper maxHeight="40px">
                  <AutoAwesomeIcon
                    style={{ color: '#02070f', fontSize: '1.8rem' }}
                  />
                </StyledImageWrapper>
                <StyledFlexWrapper
                  justify="center"
                  align="flex-start"
                  gap="0.3rem"
                  margin="unset"
                  color="var(--dark-blue)"
                >
                  <StyledHeadingXS
                    color="var(--dark-blue)"
                    fontSize="1rem"
                    borderBottom="unset"
                    fontWeight="300"
                    textTransform="unset"
                  >
                    Your progress
                  </StyledHeadingXS>
                </StyledFlexWrapper>
              </StyledHomeCard>
            </Link>
          </StyledFlexWrapper>
        </motion.div>
      )}
      {newMeditation && (
        <Suspense fallback={<Loader />}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ImageModal
              meditation={specificMeditation}
              closeModal={hideModal}
              handleSaveFavorite={handleSaveFavorite}
              handleRemoveFavorite={handleRemoveFavorite}
            />
          </motion.div>
        </Suspense>
      )}
    </>
  )
}
