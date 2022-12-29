import { useState } from 'react'
import { StyledMeditationCard } from '../styledComponents/Card/Card'
import { StyledHeadingXL } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { MeditationCatalog as meditations } from '../../data/Meditations'
import { StyledSelect } from '../styledComponents/Select/Select'
import { IMeditation } from '../../models/IMeditation'
import Modal from '../styledComponents/Modal/StyledImageModal'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Video from '../styledComponents/Modal/StyledVideoModal'
import { motion } from 'framer-motion'

export default function Explore() {
  const [allMeditations, setAllMeditations] = useState<IMeditation[]>(
    meditations,
  )
  const [filteredMeditations, setFilteredMeditations] = useState<
    IMeditation[]
  >()
  const [showFilteredMeditations, setShowFilteredMeditations] = useState(false)
  const [videoModal, setVideoModal] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const [hideMeditations, setHideMeditations] = useState(false)
  const [selectedMeditation, setSelectedMeditation] = useState<IMeditation>({
    title: '',
    tag: '',
    img: '',
    icon: '',
    audio: '',
    id: 0,
  })
  const [fillHeart, setFillHeart] = useState(false)

  const handleOnChange = (e: string) => {
    let filtered: IMeditation[] = []

    if (e === 'All') {
      setShowFilteredMeditations(false)
    } else {
      allMeditations.forEach((meditation) => {
        if (meditation.tag === e) {
          filtered.push(meditation)
        }
      })
      setFilteredMeditations(filtered)
      setShowFilteredMeditations(true)
    }
  }

  const hideModal = () => {
    setVideoModal(false)
    setImageModal(false)
    setHideMeditations(false)
  }

  const showModal = (m: IMeditation) => {
    setSelectedMeditation(m)
    if (m.tag === 'Guided Breathing Meditation') {
      setImageModal(true)
      setHideMeditations(true)
    } else if (m.tag === 'Sound Meditation') {
      setVideoModal(true)
      setHideMeditations(true)
    }
  }

  return (
    <>
      {videoModal && (
        <Video meditation={selectedMeditation} closeModal={hideModal} />
      )}
      {imageModal && (
        <Modal meditation={selectedMeditation} closeModal={hideModal} />
      )}
      {allMeditations && (
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
            display={hideMeditations ? 'none' : 'flex'}
          >
            <StyledFlexWrapper>
              <StyledHeadingXL color="var(--dark-beige)">
                Explore
              </StyledHeadingXL>
            </StyledFlexWrapper>
          </StyledFlexWrapper>
          <StyledFlexWrapper direction="row" color="var(--dark-beige)">
            <span>Filter: </span>
            <StyledSelect>
              <span className="select-icon">
                <ExpandMoreIcon style={{ color: '#000' }} fontSize="medium" />
              </span>
              <select onChange={(e) => handleOnChange(e.target.value)}>
                <>
                  <option value="All">All meditations</option>;
                  <option value="Sound Meditation">Sound Meditation</option>;
                  <option value="Guided Breathing Meditation">
                    Guided Breathing Meditation
                  </option>
                </>
              </select>
            </StyledSelect>
          </StyledFlexWrapper>

          <StyledFlexWrapper
            padding="4rem 1rem 1.5rem"
            direction="row"
            gap="3rem"
          >
            {showFilteredMeditations && filteredMeditations
              ? filteredMeditations.map((meditation) => {
                  return (
                    <StyledMeditationCard
                      display={hideMeditations ? 'none' : 'flex'}
                      borderRadius="15px"
                      height="11rem"
                      justify="center"
                      key={meditation.id}
                      padding="1.5rem 1rem"
                      background="var(--dark-blue)"
                      border="1px solid var(--light-blue)"
                      color="var(--dark-beige)"
                      onClick={() => showModal(meditation)}
                    >
                      <StyledImageWrapper maxHeight="50px">
                        <img src={meditation.icon} alt="Emoji"></img>
                        <span>{meditation.title} </span>
                      </StyledImageWrapper>
                      <StyledFlexWrapper align="flex-end" width="100%">
                        <StyledImageWrapper maxHeight="22px">
                          {fillHeart ? (
                            <FavoriteIcon
                              style={{ color: '#f7dba8' }}
                              fontSize="medium"
                            />
                          ) : (
                            <FavoriteBorderIcon
                              style={{ color: '#f7dba8' }}
                              fontSize="medium"
                            />
                          )}
                        </StyledImageWrapper>
                      </StyledFlexWrapper>
                    </StyledMeditationCard>
                  )
                })
              : allMeditations &&
                allMeditations.map((meditation) => {
                  return (
                    <StyledMeditationCard
                      display={hideMeditations ? 'none' : 'flex'}
                      borderRadius="15px"
                      height="11rem"
                      justify="center"
                      key={meditation.id}
                      padding="1.5rem 1rem"
                      background="var(--dark-blue)"
                      border="1px solid var(--light-blue)"
                      color="var(--dark-beige)"
                      onClick={() => showModal(meditation)}
                    >
                      <StyledImageWrapper maxHeight="50px">
                        <img src={meditation.icon} alt="Emoji"></img>
                        <span>{meditation.title} </span>
                      </StyledImageWrapper>
                      <StyledFlexWrapper align="flex-end" width="100%">
                        <StyledImageWrapper maxHeight="22px">
                          {fillHeart ? (
                            <FavoriteIcon
                              style={{ color: '#f7dba8' }}
                              fontSize="medium"
                            />
                          ) : (
                            <FavoriteBorderIcon
                              style={{ color: '#f7dba8' }}
                              fontSize="medium"
                            />
                          )}
                        </StyledImageWrapper>
                      </StyledFlexWrapper>
                    </StyledMeditationCard>
                  )
                })}
          </StyledFlexWrapper>
        </motion.div>
      )}
    </>
  )
}
