interface NftCardProps {
  src: string
  name: String
  select?(): void
  unselect?(): void
  
}

export const NftCardHtml = (props: NftCardProps) => {
   
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
          <div className='justify-end card-actions'>
              <button className='btn btn-primary'>
                +
              </button>
            
          </div>
        </div>
      </div>
  )
}
