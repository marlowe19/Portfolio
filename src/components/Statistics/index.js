import React from 'react'
import { Icon, Statistic } from 'semantic-ui-react'

const StatisticsSection = () => (
  <Statistic.Group widths='four'>
    <Statistic>
   
      <Statistic.Value>
      <Icon name='trophy' />
        4</Statistic.Value>
      <Statistic.Label>jaar</Statistic.Label>
    </Statistic>
    <Statistic>
      <Statistic.Value>
      <Icon name='users' />
        14
      </Statistic.Value>
      <Statistic.Label>projecten</Statistic.Label>
    </Statistic>
    <Statistic>
      <Statistic.Value>
      <Icon name='euro' />
        455.140
      </Statistic.Value>
      <Statistic.Label>omzet</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value>
        <Icon name='plane' />
        38
      </Statistic.Value>
      <Statistic.Label>Vluchten</Statistic.Label>
    </Statistic>

    
  </Statistic.Group>
)

export default StatisticsSection
