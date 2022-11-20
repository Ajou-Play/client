import { Button } from '@Component/.';
import { useModal, useStep } from '@Hook/.';

const EmailChip = ({ email, handleCancel }: { email: string; handleCancel: () => void }) => (
  <button
    type='button'
    className='bg-primary-lightOrange rounded-[1rem] px-[1rem] py-[0.4rem] text-[12px] gap-[0.6rem] flex items-center text-primary-orange w-[11rem]'
  >
    <p>{email}</p>
    <button
      type='button'
      onClick={handleCancel}
    >
      <img
        src='/asset/CancelOrange.svg'
        alt='취소'
      />
    </button>
  </button>
);

export const useAddTeamModal = () => {
  const { Modal, ModalContent, ModalFooter, handleOpen, handleClose } = useModal();
  const { step, setPrev, setNext } = useStep({ count: 2 });

  const StepOneContentInAddTeamModal = ({ handleNext }: { handleNext: () => void }) => (
    <>
      <ModalContent>
        <div className='w-[800px] h-[400px] flex flex-col gap-[4rem] items-center p-[2rem]'>
          <h2 className='text-[1.4rem] font-bold'>팀 생성</h2>
          <div className='w-[100%] flex flex-col gap-[1rem] overflow-auto items-center'>
            <div className='m-[1rem] w-[100px] h-[100px] bg-grey-line rounded-[10px] relative'>
              <img
                className='absolute right-[-0.6rem] bottom-[-0.6rem]'
                src='/asset/PencilFill.svg'
                alt='펜'
              />
            </div>
            <p className='font-bold'>팀 프로필 이미지</p>
            <p>이미지를 등록하지 않을 시 기본 이미지가 적용됩니다.</p>
          </div>
        </div>
      </ModalContent>
      <ModalFooter
        buttons={[
          <Button
            key='1'
            type='orange'
            content='다음'
            onClick={handleNext}
          />,
        ]}
      />
    </>
  );

  const StepTwoContentInAddTeamModal = ({ handlePrev }: { handlePrev: () => void }) => (
    <>
      <ModalContent>
        <div className='w-[800px] h-[500px] flex flex-col gap-[4rem] items-center p-[2rem]'>
          <h2 className='text-[1.4rem] font-bold'>팀 생성</h2>
          <div className='w-[100%] flex flex-col gap-[2rem] overflow-auto'>
            <div className='w-[100%] flex flex-col gap-[1rem]'>
              <p>팀 이름 *</p>
              <input
                className='w-[100%] h-[3rem] bg-grey-background rounded-[6px] focus:outline-none p-[10px]'
                placeholder='사용자 이메일 혹은 이름을 입력해주세요'
              />
            </div>
            <div className='w-[100%] flex flex-col gap-[1rem]'>
              <p>이메일로 팀원 추가</p>
              <input
                className='w-[100%] h-[3rem] bg-grey-background rounded-[6px] focus:outline-none p-[10px]'
                placeholder='사용자 이메일 혹은 이름을 입력해주세요'
              />
            </div>
            <div className='grid gap-[0.4rem] grid-cols-3 self-start'>
              {Array(20)
                .fill('')
                .map((v, i) => (
                  <EmailChip
                    key={i}
                    email='maxcha98@ajou.ac.kr'
                    handleCancel={() => {}}
                  />
                ))}
            </div>
          </div>
        </div>
      </ModalContent>
      <ModalFooter
        buttons={[
          <Button
            key='1'
            type='orange'
            content='추가'
          />,
          <Button
            key='1'
            type='grey'
            content='뒤로'
            onClick={handlePrev}
          />,
        ]}
      />
    </>
  );

  return {
    handleOpen,
    handleClose,
    Component: () => (
      <Modal cancel>
        {step === 0 && <StepOneContentInAddTeamModal handleNext={setNext} />}
        {step === 1 && <StepTwoContentInAddTeamModal handlePrev={setPrev} />}
      </Modal>
    ),
  };
};
