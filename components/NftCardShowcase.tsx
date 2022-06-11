import { gql } from '@apollo/client'
import client from '../client'

interface NftCardProps {
  src: string
  name: String
  description?: String
  profile?: any
  select?(): void
  unselect?(): void
}

const GET_PROFILE = gql`
  query GetProfile($address: String!) {
    nft(address: $address) {
      name
      description
      files {
        uri
      }
    }
  }
`

export const NftCardShowcase = (props: NftCardProps) => {
  return (
    <div className='shadow-xl card card-compact bg-base-100'>
      <figure>
        <iframe
          src={props.src}
          className='image-square'
          width={'500px'}
          height={'500px'}
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{props.name}</h2>
        <p>{props.description}</p>
        {props.profile && (
          <div className=''>
              <img
                className='inline object-cover w-12 h-12 mr-2 rounded-full'
                src={props.profile.profileImageUrlLowres}
                alt='user image'
              />
            <p className='inline-block'>{props.profile.handle}</p>
          </div>
        )}
      </div>
    </div>
  )
}