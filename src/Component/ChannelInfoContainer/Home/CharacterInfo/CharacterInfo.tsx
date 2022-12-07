export const CharacterInfo = () => (
  <div className='w-[100%] h-[100%] relative'>
    <svg
      width='752'
      height='518'
      viewBox='0 0 752 518'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_793_8158)'>
        <rect
          width='752'
          height='518'
          rx='24'
          fill='#FFEEE6'
        />
        <circle
          cx='668.5'
          cy='266.5'
          r='166.5'
          stroke='#FFBCA5'
          strokeWidth='90'
        />
        <circle
          cx='167'
          cy='-40'
          r='212'
          fill='#FCFCFC'
        />
        <circle
          cx='34'
          cy='460'
          r='186'
          fill='#FFBCA5'
        />
      </g>
      <defs>
        <clipPath id='clip0_793_8158'>
          <rect
            width='752'
            height='518'
            rx='24'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
    <div className='absolute p-[2rem] top-0 left-0 w-[100%]'>
      <div className='flex gap-[1rem] items-center w-[100%]'>
        <div className='bg-primary-point-black px-4  py-1 rounded-[100px] text-white mb-[10px]'>
          LV 2
        </div>
        <div>
          <h1 className='border-500'>호기심 많은 새내기</h1>
          <progress
            id='progress'
            max={100}
            value={50}
          />
          <div className='w-[100%] flex justify-between'>
            <p>Lv.2</p>
            <p>Lv.3</p>
          </div>
        </div>
      </div>
      <div className='flex justify-end w-[100%]'>
        <img
          src='/asset/level2Character.svg'
          alt='캐릭터'
        />
      </div>
      <div className='w-[100%] flex p-[2rem] rounded-lg bg-grey-offWhite text-center justify-center items-center'>
        <h1>준비중</h1>
      </div>
    </div>
  </div>
);
