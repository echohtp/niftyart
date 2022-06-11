interface NftCardHtmlProps {
  src: string
  name: String
  description?: String
  profile?: any
  select?(): void
  unselect?(): void
}

export const NftCardHtml = (props: NftCardHtmlProps) => {
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
        {props.profile && (<div>{props.profile.handle} - <img src={props.profile.profileImageUrlLowres}/></div>)}
        
      </div>
    </div>
  )
}
