import React, { useState } from 'react'
import TableFrontEnd from '../table/Table-frontend-actions'
import Table from '../table/Table'
import { Layout, Radio, Divider } from 'antd'
import Header from '../header/Header'
import './App.css'

const { Content } = Layout
const App: React.FC = () => {
  const [selectionType, setSelectionType] = useState<'upcoming' | 'past'>(
    'past'
  )
  const tableType = process.env.REACT_APP_ACTIONS

  return (
    <Layout>
      <Header />
      <Content className="site-layout-content">
        <div style={{ margin: '0 auto' }}>
          <Radio.Group
            onChange={({ target: { value } }) => {
              setSelectionType(value)
            }}
            value={selectionType}
          >
            <Radio value="past">Past Launches</Radio>
            <Radio value="upcoming">Upcoming Launches</Radio>
          </Radio.Group>

          <Divider />
          {tableType === 'Frontend' ? (
            <TableFrontEnd selectionType={selectionType} />
          ) : (
            <Table selectionType={selectionType} />
          )}
        </div>
      </Content>
    </Layout>
  )
}

export default App
