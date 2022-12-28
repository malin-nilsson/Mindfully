import { useEffect, useState } from 'react'
import { IProgress } from '../../models/IProgress'
import { getProgress } from '../../utils/getProgress'
import { getUser } from '../../utils/getUser'
import {
  StyledHeadingS,
  StyledHeadingXL,
  StyledHeadingXS,
} from '../styledComponents/Headings/StyledHeadings'
import {
  StyledFlexWrapper,
  StyledProgressWrapper,
} from '../styledComponents/Wrappers/StyledFlexWrapper'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import { StyledLink } from '../styledComponents/Link/StyledLink'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

export default function MyJourney() {
  const [progress, setProgress] = useState<IProgress[]>()
  const [minutesTotal, setMinutesTotal] = useState(0)
  const [sessionsTotal, setSessionsTotal] = useState(0)

  useEffect(() => {
    showProgress()
  }, [])

  const showProgress = async () => {
    const userRef = await getUser()
    const sessions: IProgress[] = await getProgress()

    if (userRef) {
      try {
        if (sessions) {
          setProgress(sessions as IProgress[])

          const initialValue = 0
          const total = sessions.reduce(
            (accumulator, currentValue) => accumulator + currentValue.minutes,
            initialValue,
          )
          setMinutesTotal(total)
          setSessionsTotal(sessions.length)
        } else {
          console.log('Document does not exist')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <StyledFlexWrapper
      justify="flex-start"
      padding="1.5rem 0 0"
      width="100%"
      gap="2rem"
    >
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
              Total time
            </StyledHeadingXS>
            <StyledHeadingS fontWeight="700" borderBottom="unset">
              {' '}
              {minutesTotal} min
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
              Sessions
            </StyledHeadingXS>
            <StyledHeadingS borderBottom="unset" fontWeight="700">
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
            <StyledHeadingS borderBottom="unset" fontWeight="700">
              {' '}
              days
            </StyledHeadingS>
          </StyledFlexWrapper>
        </StyledFlexWrapper>
      </StyledProgressWrapper>
      <StyledFlexWrapper direction="row" justify="flex-start" margin="unset">
        <div className="link-wrapper">
          <StyledLink color="var(--dark-blue)">History</StyledLink>
          <StyledImageWrapper background="#f7dba8" borderRadius="50%">
            {' '}
            <ExpandMoreIcon style={{ color: '#02070f' }} fontSize="medium" />
          </StyledImageWrapper>
        </div>
      </StyledFlexWrapper>
    </StyledFlexWrapper>
  )
}
