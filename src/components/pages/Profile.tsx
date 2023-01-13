import { ChangeEvent, useEffect, useState } from 'react'
// MODELS //
import { IUser } from '../../models/IUser'
// STYLED COMPONENTS //
import { StyledProfileCard } from '../styledComponents/Cards/Cards'
import { StyledHeadingXL } from '../styledComponents/Headings/StyledHeadings'
import {
  StyledButtonWrapper,
  StyledFlexWrapper,
} from '../styledComponents/Wrappers/StyledFlexWrappers'
import Loader from '../styledComponents/Loader/StyledLoader'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { StyledButton } from '../styledComponents/Button/StyledButton'
// FIREBASE //
import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { storage, database, db } from '../../firebase/config'
import { onValue, ref as databaseRef, set } from '@firebase/database'
import { setDoc, doc } from 'firebase/firestore'
// FRAMER MOTION //
import { motion } from 'framer-motion'
// MUI //
import CheckIcon from '@mui/icons-material/Check'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
// UTLS //
import { getFirstName } from '../../utils/getFirstName'

export default function Profile() {
  const auth = getAuth()
  const [disabledName, setDisabledName] = useState(true)
  const [disabledEmail, setDisabledEmail] = useState(true)
  const [disabledPassword, setDisabledPassword] = useState(true)
  const [loader, setLoader] = useState(true)
  const [newFirstName, setNewFirstName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [profilePicture, setProfilePicture] = useState<File>()
  const [pictureURL, setPictureURL] = useState('')
  const [uploadPicture, setUploadPicture] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmationName, setConfirmationName] = useState('')
  const [confirmationEmail, setConfirmationEmail] = useState('')
  const [confirmationPassword, setConfirmationPassword] = useState('')
  const [missingFields, setMissingFields] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const user: IUser = await getFirstName()
    setNewFirstName(user.firstName as string)
    setNewEmail(user.email as string)
    getProfilePicture()
  }

  const clearMessagesAndErrors = () => {
    setConfirmationName('')
    setErrorMessage('')
    setPasswordErrorMessage('')
    setConfirmationEmail('')
    setEmailErrorMessage('')
    setConfirmationPassword('')
    setError(false)
  }
  ////////////////////////
  // SAVE UPDATED NAME //
  ////////////////////////
  const saveFirstName = async () => {
    setMissingFields('')
    if (auth.currentUser && newFirstName) {
      updateProfile(auth.currentUser, {
        displayName: newFirstName,
      })
        .then(async () => {
          const userData = {
            firstName: newFirstName,
            email: auth.currentUser?.email,
            createdAt: auth.currentUser?.metadata.creationTime,
          }

          await setDoc(doc(db, 'users', auth.currentUser?.uid as string), {
            userData,
          })
        })
        .then(() => {
          setConfirmationName('Your changes have been saved.')
          setDisabledName(true)
        })
        .catch((error) => {
          setErrorMessage(error.message)
        })
    } else {
      setMissingFields('Please fill out missing fields.')
    }
  }

  ////////////////////////
  // SAVE UPDATED EMAIL //
  ////////////////////////
  const saveEmail = () => {
    setMissingFields('')
    clearMessagesAndErrors()
    if (auth.currentUser && newEmail) {
      updateEmail(auth.currentUser, newEmail)
        .then(() => {
          setConfirmationEmail('Your changes have been saved.')
          setDisabledEmail(true)
        })
        .catch((error) => {
          setError(true)

          if (error.code.includes('auth/email-already-in-use')) {
            setEmailErrorMessage('Email is already in use.')
          } else if (error.code.includes('auth/invalid-email')) {
            setEmailErrorMessage('Email is invalid. Please try again.')
          } else if (error.code.includes('auth/requires-recent-login')) {
            setEmailErrorMessage(
              "It's been a while since you logged in. For security reasons, sign out and sign in again to change your password.",
            )
          } else {
            setEmailErrorMessage(
              'Unable to make changes right now. Please try again later.',
            )
          }
        })
    } else {
      setError(true)

      setMissingFields('Please fill out missing fields.')
    }
  }

  ////////////////////////
  // SAVE UPDATED EMAIL //
  ////////////////////////
  const savePassword = async () => {
    setMissingFields('')
    if (auth.currentUser && newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        setPasswordErrorMessage("Passwords don't match. Please try again.")
      } else {
        updatePassword(auth.currentUser, newPassword)
          .then(() => {
            setConfirmationPassword('Your new password has been saved.')
            setDisabledPassword(true)
          })
          .catch((error) => {
            if (error.code.includes('auth/weak-password')) {
              setPasswordErrorMessage('Please enter a stronger password.')
            } else if (error.code.includes('auth/requires-recent-login')) {
              setPasswordErrorMessage(
                "It's been a while since you logged in. For security reasons, sign out and sign in again to change your password.",
              )
            } else {
              setPasswordErrorMessage(
                'Unable to make changes right now. Please try again later.',
              )
            }
          })
      }
    } else {
      setMissingFields('Please fill out missing fields.')
    }
  }

  //////////////////////////
  // SAVE PROFILE PICTURE //
  //////////////////////////
  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePicture(e.target.files[0])
    }
  }

  const saveProfilePicture = () => {
    const types = ['image/png', 'image/jpeg']

    if (
      auth.currentUser &&
      profilePicture &&
      // Check that file is png or jpg
      types.includes(profilePicture.type)
    ) {
      const storageRef = ref(
        storage,
        `/images/${auth.currentUser.uid}/${profilePicture.name}`,
      )
      uploadBytes(storageRef, profilePicture)
        .then((snapshot) => {
          getDownloadURL(storageRef)
            .then((url) => {
              setPictureURL(url)
              set(databaseRef(database, 'users/' + auth.currentUser?.uid), {
                profile_picture: url,
              })
              setUploadPicture(false)
            })
            .catch((error) => {
              setErrorMessage(error.message)
            })
        })
        .catch((error) => {
          setErrorMessage(error.message)
        })
    } else {
      setErrorMessage('Please select an image file (png or jpg).')
    }
  }

  const getProfilePicture = () => {
    if (auth.currentUser) {
      const imageRef = databaseRef(database, 'users/' + auth.currentUser.uid)
      onValue(imageRef, (snapshot) => {
        const data = snapshot.val()
        if (data === null) {
          setLoader(false)
          return
        }
        setPictureURL(data.profile_picture)
        setLoader(false)
      })
    }
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
            padding="1.5rem 0 0"
            width="100%"
          >
            <StyledFlexWrapper>
              <StyledHeadingXL color="var(--dark-beige)">
                Profile
              </StyledHeadingXL>
            </StyledFlexWrapper>
            <StyledFlexWrapper width="100%" color="var(--dark-beige)">
              <StyledProfileCard>
                <div className="profile-wrapper">
                  <StyledImageWrapper>
                    {pictureURL !== '' ? (
                      <div className="image">
                        <img
                          src={pictureURL}
                          alt="Profile"
                          referrerPolicy="no-referrer"
                          className="profile-picture"
                        />
                        <span
                          className="upload-icon"
                          onClick={() => {
                            setUploadPicture(!uploadPicture)
                          }}
                        >
                          <PhotoCameraIcon
                            fontSize="small"
                            style={{
                              color: 'var(--dark-blue)',
                            }}
                          />
                        </span>
                      </div>
                    ) : (
                      <div className="image">
                        <AccountCircleIcon style={{ fontSize: '6rem' }} />
                        <span
                          className="upload-icon"
                          onClick={() => {
                            setUploadPicture(!uploadPicture)
                          }}
                        >
                          <PhotoCameraIcon
                            fontSize="small"
                            style={{
                              color: 'var(--dark-blue)',
                            }}
                          />
                        </span>
                      </div>
                    )}
                  </StyledImageWrapper>
                  {uploadPicture && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <StyledFlexWrapper
                        color="var(--dark-beige)"
                        margin="0.5rem 0"
                        direction="row"
                        flexWrap="nowrap"
                      >
                        <input
                          type="file"
                          onChange={(e) => handlePictureChange(e)}
                        />
                        <StyledButton
                          className="profile-picture-btn"
                          onClick={() => {
                            saveProfilePicture()
                          }}
                        >
                          Upload image
                        </StyledButton>
                      </StyledFlexWrapper>
                    </motion.div>
                  )}
                  <StyledFlexWrapper
                    color="var(--dark-beige)"
                    align="flex-start"
                    width="100%"
                    margin="unset"
                  >
                    {missingFields && <p className="error"> {missingFields}</p>}
                    {errorMessage && <p className="error"> {errorMessage}</p>}
                    <div className="input-group">
                      <label>First name</label>
                      <input
                        type="text"
                        disabled={disabledName}
                        onChange={(e) => setNewFirstName(e.target.value)}
                        value={newFirstName}
                      ></input>
                      {confirmationName && (
                        <p className="confirmation">
                          <CheckIcon /> {confirmationName}
                        </p>
                      )}
                      <StyledButtonWrapper
                        direction="row"
                        width="100%"
                        gap="1rem"
                      >
                        <StyledButton
                          onClick={() => {
                            setDisabledName(!disabledName)
                            clearMessagesAndErrors()
                          }}
                          padding="0.8rem"
                          fontSize="0.8rem"
                          borderRadius="0.5rem"
                        >
                          {disabledName ? 'Edit' : 'Cancel'}
                        </StyledButton>
                        {disabledName ? (
                          ''
                        ) : (
                          <StyledButton
                            onClick={() => {
                              saveFirstName()
                            }}
                            padding="0.8rem"
                            fontSize="0.8rem"
                            borderRadius="0.5rem"
                            bgColor="var(--dark-blue)"
                            color="var(--dark-beige)"
                            border="2px solid var(--dark-beige)"
                            id="edit-name-btn"
                          >
                            Save
                          </StyledButton>
                        )}
                      </StyledButtonWrapper>
                    </div>

                    <div className="input-group">
                      <label>Email address</label>
                      <input
                        type="email"
                        disabled={disabledEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        value={newEmail}
                      ></input>
                      {confirmationEmail && (
                        <>
                          <p className="confirmation">
                            <CheckIcon /> {confirmationEmail}
                          </p>
                        </>
                      )}
                      {emailErrorMessage && (
                        <p className="error"> {emailErrorMessage}</p>
                      )}
                      <StyledButtonWrapper
                        direction="row"
                        width="100%"
                        gap="1rem"
                      >
                        <StyledButton
                          onClick={() => {
                            setDisabledEmail(!disabledEmail)
                            clearMessagesAndErrors()
                          }}
                          padding="0.8rem"
                          fontSize="0.8rem"
                          borderRadius="0.5rem"
                          id="edit-email-btn"
                        >
                          {disabledEmail ? 'Edit' : 'Cancel'}
                        </StyledButton>
                        {disabledEmail ? (
                          ''
                        ) : (
                          <StyledButton
                            onClick={() => {
                              saveEmail()
                            }}
                            padding="0.8rem"
                            fontSize="0.8rem"
                            borderRadius="0.5rem"
                            bgColor="var(--dark-blue)"
                            color="var(--dark-beige)"
                            border="2px solid var(--dark-beige)"
                          >
                            Save
                          </StyledButton>
                        )}
                      </StyledButtonWrapper>
                    </div>

                    <div className="input-group">
                      <label>Password</label>
                      <span>Old password:</span>
                      <input
                        type="password"
                        disabled={true}
                        placeholder="******"
                      ></input>
                      <span>New password:</span>
                      <input
                        type="password"
                        disabled={disabledPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      ></input>
                      <span>Confirm password:</span>
                      <input
                        type="password"
                        disabled={disabledPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      ></input>
                      {confirmationPassword && (
                        <>
                          <p className="confirmation">
                            <CheckIcon /> {confirmationPassword}
                          </p>
                        </>
                      )}
                      {passwordErrorMessage && (
                        <p className="error"> {passwordErrorMessage}</p>
                      )}

                      <StyledButtonWrapper
                        direction="row"
                        width="100%"
                        gap="1rem"
                      >
                        <StyledButton
                          onClick={() => {
                            setDisabledPassword(!disabledPassword)
                            clearMessagesAndErrors()
                          }}
                          padding="0.8rem"
                          fontSize="0.8rem"
                          borderRadius="0.5rem"
                          id="edit-password-btn"
                        >
                          {disabledPassword ? 'Edit' : 'Cancel'}
                        </StyledButton>
                        {disabledPassword ? (
                          ''
                        ) : (
                          <StyledButton
                            onClick={() => {
                              savePassword()
                            }}
                            padding="0.8rem"
                            fontSize="0.8rem"
                            borderRadius="0.5rem"
                            bgColor="var(--dark-blue)"
                            color="var(--dark-beige)"
                            border="2px solid var(--dark-beige)"
                          >
                            Save
                          </StyledButton>
                        )}
                      </StyledButtonWrapper>
                    </div>
                  </StyledFlexWrapper>
                </div>
              </StyledProfileCard>
            </StyledFlexWrapper>
          </StyledFlexWrapper>
        </motion.div>
      )}
    </>
  )
}
