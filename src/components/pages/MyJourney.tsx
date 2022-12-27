import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProgress } from '../../models/IProgress'
import { getProgress } from '../../utils/getProgress'
import { getUser } from '../../utils/getUser'
import {
  StyledHeadingM,
  StyledHeadingS,
  StyledHeadingXL,
} from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'

export default function MyJourney() {
  const [progress, setProgress] = useState<IProgress[]>()

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
        <StyledHeadingXL color="var(--dark-beige)">My journey</StyledHeadingXL>
      </StyledFlexWrapper>

      <StyledFlexWrapper>
        <>
          <StyledHeadingS>Meditated minutes:</StyledHeadingS>
          {progress &&
            progress.map((entry) => {
              return <StyledHeadingM>{entry.minutes}</StyledHeadingM>
            })}
        </>
      </StyledFlexWrapper>
    </StyledFlexWrapper>
  )
}
