import {
  Box,
  Grid,
  GridItem,
  GridProps,
  Heading,
  HeadingProps,
  HStack,
  StackDivider,
  Text,
  TextProps,
  VStack
} from '@chakra-ui/react'
import Layout from 'components/Layout'
import { PerformanceCard } from 'components/_cards/PerformanceCard'
import CellarMetaCard from 'components/_cards/CellarMetaCard'
import { CellarTxCard } from 'components/_cards/CellarTxCard'
import { Section } from 'components/_layout/Section'
import { useConnect } from 'wagmi'
import { UserPerformanceCard } from 'components/_cards/UserPerformanceCard'
import { BaseButton } from 'components/_buttons/BaseButton'
import { TextDisclosure } from 'components/TextDisclosure'
import { BreadCrumb } from 'components/BreadCrumb'

const gridProps: GridProps = {
  gap: 6,
  templateColumns: 'repeat(6, 1fr)'
}

const bottomGridProps: GridProps = {
  ...gridProps,
  rowGap: 7,
  templateRows: '30px 1fr'
}

const textProps: TextProps = {
  pb: 4
}

const h2Props: HeadingProps = {
  color: 'brilliantRose.500',
  as: 'h2',
  fontSize: '3xl',
  pb: 2
}

const placeholderButtons = ['1D', '1W', 'All Time']

const PageCellar = () => {
  const [auth] = useConnect()

  const isConnected = auth.data.connected

  return (
    <Layout>
      <Section>
        <VStack spacing={4} align='stretch'>
          <BreadCrumb fontSize='xl' />
          <HStack spacing={4} justify='space-between'>
            <Heading pb={4}>Cellar Presentation Name</Heading>
            <HStack>
              <BaseButton flex={1} px={8} variant='solid'>
                Deposit/Withdraw
              </BaseButton>
              <BaseButton flex={1} px={8} variant='solid'>
                Bond Liquidity
              </BaseButton>
            </HStack>
          </HStack>
          <UserPerformanceCard />
        </VStack>
      </Section>
      <Section>
        <VStack spacing={4} align='stretch'>
          <Heading>Overview</Heading>
          <Grid {...gridProps}>
            <GridItem colSpan={3}>
              <TextDisclosure>
                <Heading {...h2Props}>Goals</Heading>
                <Text {...textProps}>
                  The Aave stablecoin strategy aims to select the optimal
                  stablecoin lending position available to lend across Aave
                  markets on a continuous basis. The goal is to outperform a
                  static strategy of lending any single stablecoin. Returns are
                  amplified for Sommelier users as they will not suffer
                  opportunity costs from passively sitting in less profitable
                  lending positions at any given moment.
                </Text>
                <Heading {...h2Props}>Strategy</Heading>
                <Text {...textProps}>
                  This strategy involves observation of several variables
                  including Aave interest rates, rate volatility, gas fees,
                  slippage estimations, and TVL. This data is the input for a
                  custom predictive model which recommends position adjustments
                  periodically. The entire process is automated as the model
                  delivers a feed to Sommelier validators who relay necessary
                  function calls to the Cellar.
                </Text>
                <Heading {...h2Props}>Somm Alpha</Heading>
                <Text {...textProps}>
                  The alpha Somm delivers for this Strategy is generated by our
                  Data Scientists & Quants. They are the masterminds behind the
                  brilliant model that determines the precise moment that is
                  best to capitalize on new market conditions. Their edge is
                  compounded by Somm's unique ability to dynamically adjust in
                  real time. Unlike traditional vault architecture, Cellars are
                  not limited by rigid smart contract code that allows positions
                  to be adjusted under a narrow set of circumstances. The Aave
                  Strategy uses high-powered predictive analytics to respond
                  instantly when opportunity arises. The old vault model is a
                  tortoise that pokes its head out of its shell occasionally
                  when conditions are safe. We are cheetahs on the savannah.
                </Text>
              </TextDisclosure>
            </GridItem>
            <GridItem colSpan={3}>
              <CellarMetaCard />
            </GridItem>
          </Grid>
        </VStack>
      </Section>
      <Section>
        <VStack spacing={4} align='stretch'>
          <HStack justify='space-between'>
            <Heading fontSize='1.75rem'>Performance</Heading>
            <HStack
              border='1px solid'
              borderColor='electricIndigo.500'
              borderRadius='2rem'
              overflow='hidden'
              justify='space-around'
              spacing={0}
              divider={<StackDivider borderColor='electricIndigo.500' />}
            >
              {placeholderButtons.map((button, i) => (
                <Box
                  flex={1}
                  px={4}
                  py={2}
                  key={i}
                  as='button'
                  bg={i === 0 ? 'electricIndigo.500' : ''}
                  fontSize='sm'
                  whiteSpace='nowrap'
                >
                  {button}
                </Box>
              ))}
            </HStack>
          </HStack>
          <PerformanceCard />
        </VStack>
      </Section>
      <Section>
        <VStack spacing={4} align='stretch'>
          <Heading>Investments</Heading>
          <Text></Text>
          <Grid {...bottomGridProps}>
            <GridItem colSpan={2}>
              <Heading fontSize='1.75rem'>Deposits</Heading>
            </GridItem>
            <GridItem colSpan={4} />
            <GridItem colSpan={2}>
              <CellarTxCard isConnected={isConnected} />
            </GridItem>
          </Grid>
        </VStack>
      </Section>
    </Layout>
  )
}

export default PageCellar
