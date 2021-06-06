import ManWithBalloons from '$assets/images/landing/man_with_balloons.png'
import ManWithLaptop from '$assets/images/landing/man_with_laptop.png'
import ManWithOculus from '$assets/images/landing/man_with_oculus.png'
import WalkingGirl from '$assets/images/landing/walking_girl.png'

export interface Wording {
  step: number
  image: string
  description: string
}

export const getInputRange = (index: number, windowWidth: number) => [
  windowWidth * (index - 1),
  windowWidth * index,
  windowWidth * (index + 1),
]

export const landingInfos: Wording[] = [
  {
    step: 1,
    image: ManWithLaptop,
    description: 'Suivez vos séries et vos films préférés',
  },
  {
    step: 2,
    image: ManWithOculus,
    description: 'Partagez vos séries préférés à vos amis',
  },
  {
    step: 3,
    image: WalkingGirl,
    description: 'Gardez le fil des films et séries tendances',
  },
  {
    step: 4,
    image: ManWithBalloons,
    description: '100% gratuit, 100% sans pub, 100% MovieApp. ',
  },
]
