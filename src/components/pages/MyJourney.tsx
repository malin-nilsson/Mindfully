import { useEffect, useState } from 'react'
// MODELS //
import { IProgress } from '../../models/IProgress'
// FIRESTORE //
import { getProgress } from '../../utils/getProgress'
import { getUser } from '../../utils/getUser'
// STYLED COMPONENTS //
import {
  StyledHeadingS,
  StyledHeadingXL,
  StyledHeadingXS,
} from '../styledComponents/Headings/StyledHeadings'
import {
  StyledFlexWrapper,
  StyledProgressWrapper,
} from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledLink } from '../styledComponents/Link/StyledLink'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
// MUI //
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
// FRAMER MOTION //
import { motion } from 'framer-motion'
import { summary } from 'date-streaks'

export default function MyJourney() {
  const [progress, setProgress] = useState<IProgress[]>()
  const [timeTotal, setTimeTotal] = useState('')
  const [currentStreak, setCurrentStreak] = useState(0)
  const [sessionsTotal, setSessionsTotal] = useState(0)
  const [showJourney, setShowJourney] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    showProgress()
  }, [])

  const showProgress = async () => {
    const userRef = await getUser()
    const sessions: IProgress[] = await getProgress()

    if (userRef) {
      try {
        if (sessions) {
          setProgress(sessions as IProgress[])

          const dates = sessions.map((item) => {
            return item.date
          })
          const streak = summary({ dates })
          console.log(summary({ dates }))

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
        }
      } catch (error) {
        console.log(error)
      }
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <StyledFlexWrapper justify="flex-start" padding="1.5rem 0 0" width="100%">
        <StyledFlexWrapper>
          <StyledHeadingXL color="var(--dark-beige)">
            Your journey so far
          </StyledHeadingXL>
        </StyledFlexWrapper>

        <StyledProgressWrapper>
          <StyledFlexWrapper direction="row" align="center" margin="0 1.5rem">
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
              {progress &&
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
                            src={session.meditation.icon}
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
                })}
            </>
          </div>
        </StyledFlexWrapper>
      </StyledFlexWrapper>
    </motion.div>
  )
}
