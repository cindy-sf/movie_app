import { ImageSourcePropType } from 'react-native'

import ToyFaces_Colored_BG_47 from '@assets/images/user_pictures/ToyFaces_Colored_BG_47.png'
import ToyFaces_Colored_BG_8 from '@assets/images/user_pictures/ToyFaces_Colored_BG_8.png'
import ToyFaces_Colored_BG_29 from '@assets/images/user_pictures/ToyFaces_Colored_BG_29.png'
import ToyFaces_Colored_BG_32 from '@assets/images/user_pictures/ToyFaces_Colored_BG_32.png'
import ToyFaces_Colored_BG_37 from '@assets/images/user_pictures/ToyFaces_Colored_BG_37.png'
import ToyFaces_Colored_BG_49 from '@assets/images/user_pictures/ToyFaces_Colored_BG_49.png'
import ToyFaces_Colored_BG_56 from '@assets/images/user_pictures/ToyFaces_Colored_BG_56.png'
import ToyFaces_Colored_BG_59 from '@assets/images/user_pictures/ToyFaces_Colored_BG_59.png'

export interface UserPictures {
  pictureUrl: ImageSourcePropType
  imageName: string
}

export const userPictures: UserPictures[] = [
  { pictureUrl: ToyFaces_Colored_BG_47, imageName: 'ToyFaces_Colored_BG_47' },
  { pictureUrl: ToyFaces_Colored_BG_8, imageName: 'ToyFaces_Colored_BG_8' },
  { pictureUrl: ToyFaces_Colored_BG_29, imageName: 'ToyFaces_Colored_BG_29' },
  { pictureUrl: ToyFaces_Colored_BG_32, imageName: 'ToyFaces_Colored_BG_32' },
  { pictureUrl: ToyFaces_Colored_BG_37, imageName: 'ToyFaces_Colored_BG_37' },
  { pictureUrl: ToyFaces_Colored_BG_49, imageName: 'ToyFaces_Colored_BG_49' },
  { pictureUrl: ToyFaces_Colored_BG_56, imageName: 'ToyFaces_Colored_BG_56' },
  { pictureUrl: ToyFaces_Colored_BG_59, imageName: 'ToyFaces_Colored_BG_59' },
]
