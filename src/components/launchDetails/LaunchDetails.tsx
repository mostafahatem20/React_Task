import React from 'react'
import { Row, Col } from 'antd'
import { useGetLaunchDetails } from '../../hooks/launches/useGetLaunchDetails'
import { LaunchDetailsProps } from '../../interfaces/props.interface'
import { LoadingOutlined, FileImageOutlined } from '@ant-design/icons'
import './LaunchDetails.css'

const LaunchDetails: React.FC<LaunchDetailsProps> = ({ launchId }) => {
  const launchDetails = useGetLaunchDetails(
    /^\d+$/.test(launchId) ? launchId : '110'
  )
  let data = launchDetails?.data?.launch!

  return (
    <>
      {launchDetails?.loading ? (
        <div className="detailsDiv">
          <LoadingOutlined className="detailsLoading" />
        </div>
      ) : (
        <>
          <Row>
            <Col xs={20}>
              <Row>
                Launch details: {data.details || 'No details retrieved'}{' '}
              </Row>
              <br />
              <Row>
                More information on launch on&nbsp;
                <a href={data.links.wikipedia!}>wikipedia</a>&nbsp; or this
                &nbsp;
                <a href={data.links.article_link!}>article.</a>
              </Row>
            </Col>
            <Col xs={4}>
              <div className="detailsDiv">
                {data.links.flickr_images.length > 0 ? (
                  <img
                    className="launchImg"
                    src={data.links.flickr_images[0]}
                    alt="launch_image"
                  />
                ) : (
                  <FileImageOutlined className="defaultImg" />
                )}
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Row>
                Rocket description: &nbsp;
                {data.rocket.rocket.description || 'No details retrieved'}{' '}
              </Row>
              <br />
              <Row>
                More information on rocket on &nbsp;
                <a href={data.rocket.rocket.wikipedia!}>wikipedia.</a>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default LaunchDetails
