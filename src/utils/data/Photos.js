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
import CPU from '../icons/cpu.png'
import Chip from '../icons/microchip.png'
import Picture from '../icons/picture.png'
import userpfp from '../userpfp.png'
import camera from '../camera.png'
import georgia from '../icons/georgia.png'
import UK from '../icons/UK.png'
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
  CPU: CPU,
  Chip: Chip,
  Picture: Picture,
  georgia,
  UK,
}

export const Utils = {
  userpfp,
  camera,
}
