import { Icon, IconProps } from "@chakra-ui/react"
import { VFC } from "react"

export const WstethIcon: VFC<IconProps> = (props) => (
  <Icon viewBox="0 0 23 21" {...props}>
    <path
      d="M255.838 315.784L105.852 230.111L101.756 236.394C55.5603 307.258 65.8774 400.066 126.56 459.524C197.969 529.492 313.746 529.492 385.155 459.524C445.838 400.066 456.155 307.258 409.959 236.394L405.862 230.109L255.838 315.784Z"
      fill="url(#paint0_radial)"
    />
    <path
      opacity="0.6"
      d="M256.03 124.412L126.74 198.34L256.03 272.175L385.227 198.341L256.03 124.412Z"
      fill="url(#paint1_radial)"
    />
    <path
      d="M256.2 143.698L105.964 230.143L255.864 315.856L405.904 230.115L256.2 143.698Z"
      fill="url(#paint2_diamond)"
    />
    <path
      d="M256.03 0.0976562L126.74 198.341L256.03 272.176V0.0976562Z"
      fill="url(#paint3_linear)"
    />
    <path
      d="M256.021 272.189L385.323 198.342L256.028 0L256.021 272.189Z"
      fill="url(#paint4_linear)"
    />
    <radialGradient
      id="paint0_radial"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(255.694 512.129) rotate(-90) scale(243.386 318.092)"
    >
      <stop offset="0.203695" stop-color="#56F2FF" />
      <stop offset="1" stop-color="#4A8CEA" />
    </radialGradient>
    <radialGradient
      id="paint1_radial"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(255.984 198.293) rotate(90.1607) scale(73.6817 139.496)"
    >
      <stop stop-color="#EEFF83" />
      <stop offset="0.689596" stop-color="#5699EC" />
    </radialGradient>
    <radialGradient
      id="paint2_diamond"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(255.934 229.777) rotate(90.16) scale(85.8461 161.867)"
    >
      <stop stop-color="#56F2FF" />
      <stop offset="1" stop-color="#5699EC" />
    </radialGradient>
    <linearGradient
      id="paint3_linear"
      x1="191.385"
      y1="0.0976562"
      x2="191.385"
      y2="272.176"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0.377179" stop-color="#FFE336" />
      <stop offset="1" stop-color="#13C0B6" stop-opacity="0.7" />
    </linearGradient>
    <linearGradient
      id="paint4_linear"
      x1="320.672"
      y1="0"
      x2="320.672"
      y2="272.189"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0.408817" stop-color="#FF7F72" />
      <stop offset="1" stop-color="#2978EF" stop-opacity="0.7" />
    </linearGradient>
  </Icon>
)
