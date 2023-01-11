import { useEffect, useState } from 'react'
// MODELS //
import { IProgress } from '../../models/IProgress'
// FIRESTORE //
import { getProgress } from '../../utils/getProgress'
// STYLED COMPONENTS //
import {
  StyledHeadingS,
  StyledHeadingXL,
  StyledHeadingXS,
} from '../styledComponents/Headings/StyledHeadings'
import {
  StyledFlexWrapper,
  StyledProgressWrapper,
} from '../styledComponents/Wrappers/StyledFlexWrappers'
import { StyledLink } from '../styledComponents/Link/StyledLink'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { StyledButton } from '../styledComponents/Button/StyledButton'
// MUI //
import FeedIcon from '@mui/icons-material/Feed'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
// FRAMER MOTION //
import { motion } from 'framer-motion'
// DATE STReEAK //
import { summary } from 'date-streaks'
// REACT ROUTER //
import { useNavigate } from 'react-router-dom'
import Loader from '../styledComponents/Loader/StyledLoader'

export default function MyJourney() {
  const [progress, setProgress] = useState<IProgress[]>()
  const [timeTotal, setTimeTotal] = useState('')
  const [currentStreak, setCurrentStreak] = useState(0)
  const [sessionsTotal, setSessionsTotal] = useState(0)
  const [showJourney, setShowJourney] = useState(false)
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    showProgress()
  }, [])

  const showProgress = async () => {
    const sessions: IProgress[] = await getProgress()

    if (sessions) {
      sessions.sort((a, b) => {
        return +new Date(b.date) - +new Date(a.date)
      })
      setProgress(sessions as IProgress[])
      setLoader(false)

      const dates = sessions.map((item) => {
        return item.date
      })
      const streak = summary({ dates })

      setCurrentStreak(streak.currentStreak)

      const initialValue = 0
      const totalSeconds = sessions.reduce(
        (accumulator, currentValue) => accumulator + currentValue.seconds,
        initialValue,
      )

      const time = toDaysMinutesSeconds(totalSeconds)
      setTimeTotal(time)

      setSessionsTotal(sessions.length)
    } else {
      setTimeTotal('0')
      setLoader(false)
    }
  }

  // https://bobbyhadz.com/blog/javascript-convert-seconds-to-days-hours-minutes-seconds //
  const toDaysMinutesSeconds = (totalSeconds: number) => {
    const seconds = Math.floor(totalSeconds % 60)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
    const days = Math.floor(totalSeconds / (3600 * 24))

    const secondsStr = makeHumanReadable(seconds, 'second')
    const minutesStr = makeHumanReadable(minutes, 'minute')
    const hoursStr = makeHumanReadable(hours, 'hour')
    const daysStr = makeHumanReadable(days, 'day')

    return `${daysStr}${hoursStr}${minutesStr}${secondsStr}`.replace(
      /,\s*$/,
      '',
    )
  }

  const makeHumanReadable = (num: number, singular: string) => {
    return num > 0
      ? num + (num === 1 ? ` ${singular}, ` : ` ${singular}s, `)
      : ''
  }

  const rotateIcon = {
    transform: showJourney ? 'rotate(180deg)' : '',
    transition: 'transform .3s ease-in-out',
  }

  return (
    <>
      {loader ? (
        <Loader position="relative" width="unset" />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <StyledFlexWrapper
            justify="flex-start"
            padding="1.5rem 0 2rem"
            width="100%"
          >
            <StyledFlexWrapper>
              <StyledHeadingXL color="var(--dark-beige)">
                Your journey so far
              </StyledHeadingXL>
            </StyledFlexWrapper>

            <StyledProgressWrapper>
              <StyledFlexWrapper
                direction="row"
                align="center"
                margin="0 1.5rem"
              >
                <StyledFlexWrapper>
                  <StyledImageWrapper
                    background="#f7dba8"
                    borderRadius="50%"
                    padding="0.5rem"
                  >
                    <AccessTimeFilledIcon
                      style={{ color: '#02070f', fontSize: '2.2rem' }}
                    />
                  </StyledImageWrapper>
                </StyledFlexWrapper>
                <StyledFlexWrapper align="flex-start" gap="unset">
                  <StyledHeadingXS
                    borderBottom="unset"
                    textTransform="uppercase"
                    fontWeight="100"
                  >
                    Total Time
                  </StyledHeadingXS>
                  <StyledHeadingS
                    fontSize="1rem"
                    fontWeight="700"
                    borderBottom="unset"
                  >
                    {' '}
                    {timeTotal}
                  </StyledHeadingS>
                </StyledFlexWrapper>
              </StyledFlexWrapper>

              <StyledFlexWrapper direction="row" margin="0 1.5rem">
                <StyledFlexWrapper align="flex-start">
                  <StyledImageWrapper
                    background="#f7dba8"
                    borderRadius="50%"
                    padding="0.5rem"
                  >
                    <SelfImprovementIcon
                      style={{ color: '#02070f', fontSize: '2.4rem' }}
                    />
                  </StyledImageWrapper>
                </StyledFlexWrapper>
                <StyledFlexWrapper align="flex-start" gap="unset">
                  <StyledHeadingXS
                    borderBottom="unset"
                    textTransform="uppercase"
                    fontWeight="100"
                  >
                    Total Sessions
                  </StyledHeadingXS>
                  <StyledHeadingS
                    fontSize="1rem"
                    borderBottom="unset"
                    fontWeight="700"
                  >
                    {' '}
                    {sessionsTotal}
                  </StyledHeadingS>
                </StyledFlexWrapper>
              </StyledFlexWrapper>

              <StyledFlexWrapper direction="row" margin="0 1.5rem">
                <StyledFlexWrapper align="flex-start">
                  <StyledImageWrapper
                    background="#f7dba8"
                    borderRadius="50%"
                    padding="0.5rem"
                  >
                    <EmojiEventsIcon
                      style={{ color: '#02070f', fontSize: '2.2rem' }}
                    />
                  </StyledImageWrapper>
                </StyledFlexWrapper>
                <StyledFlexWrapper align="flex-start" gap="unset">
                  <StyledHeadingXS
                    borderBottom="unset"
                    textTransform="uppercase"
                    fontWeight="100"
                  >
                    Practice streak
                  </StyledHeadingXS>
                  <StyledHeadingS
                    fontSize="1rem"
                    borderBottom="unset"
                    fontWeight="700"
                  >
                    {' '}
                    {currentStreak} days
                  </StyledHeadingS>
                </StyledFlexWrapper>
              </StyledFlexWrapper>
            </StyledProgressWrapper>
            <StyledFlexWrapper
              onClick={() => setShowJourney((journey) => !journey)}
              direction="row"
              justify="flex-start"
              margin="unset"
            >
              <div className="link-wrapper">
                <StyledLink color="var(--dark-blue)">History</StyledLink>
                <span style={rotateIcon}>
                  <StyledImageWrapper background="#f7dba8" borderRadius="50%">
                    {' '}
                    <ExpandMoreIcon
                      style={{ color: '#02070f' }}
                      fontSize="medium"
                    />
                  </StyledImageWrapper>
                </span>
              </div>
            </StyledFlexWrapper>

            <StyledFlexWrapper
              className={showJourney ? 'show' : 'hide'}
              width="100%"
            >
              <div className="history-wrapper">
                <>
                  {progress ? (
                    progress.map((session) => {
                      return (
                        <div className="history-single" key={session.id}>
                          <StyledFlexWrapper
                            justify="flex-start"
                            align="center"
                            width="100%"
                            direction="row"
                          >
                            <StyledImageWrapper
                              maxHeight="20px"
                              margin="0 0.5rem 0 0"
                            >
                              <img
                                src={session.meditation.icon.asset.url}
                                alt="Meditation icon"
                              />
                            </StyledImageWrapper>

                            <span>{session.meditation.title}</span>
                          </StyledFlexWrapper>
                          <StyledFlexWrapper width="100%">
                            <span>{session.date}</span>
                          </StyledFlexWrapper>
                        </div>
                      )
                    })
                  ) : (
                    <StyledFlexWrapper gap="2rem">
                      <FeedIcon
                        style={{ color: '#f7dba8', fontSize: '3rem' }}
                      />
                      <StyledHeadingS borderBottom="unset">
                        No history yet
                      </StyledHeadingS>

                      <StyledButton
                        onClick={() => {
                          navigate('/explore')
                        }}
                      >
                        <AutoAwesomeIcon />
                        Find a meditation
                      </StyledButton>
                    </StyledFlexWrapper>
                  )}
                </>
              </div>
            </StyledFlexWrapper>
          </StyledFlexWrapper>
        </motion.div>
      )}
    </>
  )
}
