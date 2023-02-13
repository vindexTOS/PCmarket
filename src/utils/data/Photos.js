import AMDCput from '../../utils/amdcput.jpg'
import AMDGpu from '../../utils/amdgpu.webp'
import AMDGpu2 from '../../utils/amdgpu2.webp'
import Nvidia from '../../utils/nvidia.jpg'
import gaming from '../icons/gaming.png'
import laptop from '../icons/laptop.png'
import { AiOutlineLaptop } from 'react-icons/ai'
import { RiComputerLine } from 'react-icons/ri'
import { GiComputerFan } from 'react-icons/gi'
import { MdOutlinePhoneAndroid } from 'react-icons/md'
import { ImHeadphones } from 'react-icons/im'
export const Photodata = [
  { img: AMDCput },
  { img: AMDGpu },
  {
    img: AMDGpu2,
  },
  {
    img: Nvidia,
  },
]

export const Icons = {
  gaming: <RiComputerLine />,
  laptop: <AiOutlineLaptop />,
  fan: <GiComputerFan />,
  phone: <MdOutlinePhoneAndroid />,
  headphone: <ImHeadphones />,
}
