export const MessageWindow = () => (
  <>
    <div className='min-h-[calc(100vh_-_170px)]' />
    <div className='flex justify-center items-center h-[90px] w-[100%] outline outline-1 outline-[#F1F1F1]'>
      <div className='relative w-[260px] h-[44px]'>
        <input
          className='rounded bg-grey-background  placeholder:text-center w-[100%] h-[100%]'
          placeholder='내용을 입력해주세요...'
        />
        <img
          className='w-[24px] h-[24px] absolute right-[1rem] top-[50%] translate-y-[-50%] cursor-pointer'
          src='/asset/Cursor.svg'
          alt='cursor'
        />
      </div>
    </div>
  </>
);
