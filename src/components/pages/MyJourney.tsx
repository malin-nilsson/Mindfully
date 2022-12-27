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
    <StyledFlexWrapper justify="flex-start" padding="1.5rem 0 0" width="100%">
      <StyledFlexWrapper>
        <StyledHeadingXL color="var(--dark-beige)">
          Your journey so far
        </StyledHeadingXL>
      </StyledFlexWrapper>

      <StyledProgressWrapper>
        <StyledFlexWrapper direction="row" align="center" margin="0 1.5rem">
          <StyledFlexWrapper align="flex-start">
            <AccessTimeFilledIcon
              style={{ color: '#f7dba8', fontSize: '3.5rem' }}
            />
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
            <SelfImprovementIcon
              style={{ color: '#f7dba8', fontSize: '3.5rem' }}
            />
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
      </StyledProgressWrapper>
    </StyledFlexWrapper>
  )
}
