import { StyledHeadingL } from '../styledComponents/Headings/StyledHeadings'
import { StyledText } from '../styledComponents/Text/StyledText'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { moods } from '../../assets/Moods/Moods'
import { StyledCard } from '../styledComponents/Card/Card'
import { getAuth } from 'firebase/auth'

export default function Home() {
  return (
    <StyledFlexWrapper
      bgColor="var(--dark-blue)"
      justify="flex-start"
      padding="1rem 0"
      height="100vh"
      width="100%"
    >
      <StyledHeadingL color="var(--dark-beige)">
        {' '}
        <StyledImageWrapper maxHeight="45px" margin="0 1.3rem 0 0">
          <img src="/assets/icons/flower.png" alt="Flower"></img>
        </StyledImageWrapper>
        Hi, Malin.
      </StyledHeadingL>
      <StyledText
        margin="0"
        color="var(--dark-beige)"
        fontSize="1.6rem"
        fontWeight="100"
      >
        How are you feeling today?
      </StyledText>
      <StyledFlexWrapper direction="row" width="50%" gap="2rem">
        {moods.map((mood) => {
          return (
            <StyledCard width="10%" borderRadius="50%">
              <StyledImageWrapper maxHeight="30px">
                <img src={mood} alt="Emoji"></img>
                Sad
              </StyledImageWrapper>
            </StyledCard>
          )
        })}
      </StyledFlexWrapper>
    </StyledFlexWrapper>
  )
}
