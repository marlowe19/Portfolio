import React from 'react'
import { Icon, Image, Statistic, Divider } from 'semantic-ui-react'

const StatisticsSection = () => (
  <Statistic.Group widths='four'>
    <Statistic>
      <Statistic.Value>4</Statistic.Value>
      <Statistic.Label>jaar</Statistic.Label>
    </Statistic>
    <Statistic>
      <Statistic.Value>
        <Image src='/assets/images/avatar/small/joe.jpg' className='circular inline' />
        10
      </Statistic.Value>
      <Statistic.Label>projecten</Statistic.Label>
    </Statistic>
    <Statistic>
      <Statistic.Value text>
        Drie
        <br />Honderdduizend euro
      </Statistic.Value>
      <Statistic.Label>omzet</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value>
        <Icon name='plane' />
        30
      </Statistic.Value>
      <Statistic.Label>Vluchten</Statistic.Label>
    </Statistic>

    
  </Statistic.Group>
)

export default StatisticsSection
