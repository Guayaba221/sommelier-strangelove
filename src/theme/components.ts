import { ThemeComponents } from '@chakra-ui/react'

export const components: ThemeComponents = {
  Button: {
    baseStyle: {
      borderRadius: 25,
      color: 'white'
    },
    defaultProps: {
      colorScheme: 'electricIndigo'
    }
  },
  Heading: {
    baseStyle: {
      color: 'text.headlines.light'
    }
  }
}