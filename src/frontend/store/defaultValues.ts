import { Name } from '@/types'

export const defaultProfile = {
  bio: '',
  image: '',
  title: '',
}

export const defaultLook = {
  background: {
    color: '',
  },
  gradient: {
    color: '',
    position: { top: true },
    show: false,
  },
  theme: '',
}

export const defaultName: Name = {
  name: '',
  controllers: [],
  links: [],
  look: defaultLook,
  profile: defaultProfile,
}
